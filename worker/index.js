// 問い合わせフォームの受付。/api/contact だけをこの処理が受け、それ以外は静的なサイト（dist/）を返す。
// スパム対策は3段：ハニーポット（人には見えない欄）→ Turnstile（Cloudflareのボット判定）→ 入力チェック。
import { EmailMessage } from 'cloudflare:email';

const FROM = 'form@kosei.page';
const TO = 'kosei.page@gmail.com';
const LIMITS = { name: 100, email: 200, org: 200, message: 4000 };
// Turnstile の判定で受け付けるホスト名とアクション（本番に localhost は入れない）
const ALLOWED_HOSTS = ['kosei.page'];
const ACTION = 'contact';

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === '/api/contact') {
      if (request.method !== 'POST') return json({ ok: false, error: 'method' }, 405);
      return handleContact(request, env);
    }
    return env.ASSETS.fetch(request);
  },
};

async function handleContact(request, env) {
  let form;
  try { form = await request.formData(); } catch { return json({ ok: false, error: 'bad_request' }, 400); }
  const get = (k) => String(form.get(k) ?? '').trim();

  // 1. ハニーポット：埋まっていたらロボット。成功したふりをして何もしない
  if (get('website')) return json({ ok: true });

  // 2. Turnstile（トークンは1回限り。サーバー側で siteverify に問い合わせる）
  const token = form.get('cf-turnstile-response');
  if (typeof token !== 'string' || !token || token.length > 2048) return json({ ok: false, error: 'captcha' }, 400);
  if (!env.TURNSTILE_SECRET || ALLOWED_HOSTS.length === 0) return json({ ok: false, error: 'captcha' }, 500);
  let verify = { success: false };
  try {
    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body: new URLSearchParams({ secret: env.TURNSTILE_SECRET, response: token, remoteip: request.headers.get('CF-Connecting-IP') ?? '' }),
    });
    if (res.ok) verify = await res.json();
  } catch { verify = { success: false }; }
  if (verify.success !== true || verify.action !== ACTION || !ALLOWED_HOSTS.includes(verify.hostname)) {
    return json({ ok: false, error: 'captcha' }, 400);
  }

  // 3. 入力チェック
  const data = { name: get('name'), email: get('email'), org: get('org'), message: get('message') };
  if (!data.name || !data.email || !data.message) return json({ ok: false, error: 'required' }, 400);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) return json({ ok: false, error: 'email' }, 400);
  for (const [k, max] of Object.entries(LIMITS)) if (data[k].length > max) return json({ ok: false, error: 'too_long' }, 400);
  // ヘッダーに入る値は改行を除く（ヘッダー差し込み対策）
  const oneLine = (s) => s.replace(/[\r\n]+/g, ' ');

  const body = [
    `お名前：${data.name}`,
    `ご所属：${data.org || '（未記入）'}`,
    `メール：${data.email}`,
    '',
    data.message,
    '',
    '---',
    'kosei.page の問い合わせフォームから送信されました。',
  ].join('\n');

  const raw = [
    `From: kosei.page フォーム <${FROM}>`,
    `To: ${TO}`,
    `Reply-To: ${oneLine(data.email)}`,
    `Subject: ${encodeHeader(`【kosei.page】${oneLine(data.name)}さんからのお問い合わせ`)}`,
    `Date: ${new Date().toUTCString()}`,
    `Message-ID: <${crypto.randomUUID()}@kosei.page>`,
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: base64',
    '',
    base64(body).replace(/.{76}/g, '$&\r\n'),
  ].join('\r\n');

  try {
    await env.CONTACT.send(new EmailMessage(FROM, TO, raw));
  } catch (e) {
    console.error('send failed', e);
    return json({ ok: false, error: 'send' }, 500);
  }
  return json({ ok: true });
}

function base64(str) {
  const bytes = new TextEncoder().encode(str);
  let bin = '';
  for (const b of bytes) bin += String.fromCharCode(b);
  return btoa(bin);
}
function encodeHeader(str) { return `=?UTF-8?B?${base64(str)}?=`; }
function json(obj, status = 200) {
  return new Response(JSON.stringify(obj), { status, headers: { 'content-type': 'application/json; charset=utf-8' } });
}
