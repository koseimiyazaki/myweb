// サイト全体で使う名前・リンク。表記を直すときはここだけ変える。
export const site = {
  // 内容が固まるまで検索エンジンに載せない。公開準備ができたら false にする
  noindex: true,
  name: '宮崎 光世',
  nameEn: 'Kosei Miyazaki',
  affiliation: '兵庫大学 現代ビジネス学部 教授',
  question: '技術は、人がよりよい情報を見つけ、理解し、判断する助けになるか。',
  // ゼミnoteアカウントのID（例: 'miyazaki_seminar'）。空なら最新記事欄を出さない
  seminarNoteId: '',
  // 個人noteアカウントのID。検索とAIの論考をnoteに置く場合に使う
  personalNoteId: '',
  // Cloudflare Turnstile のサイトキー（公開してよい値）。空なら問い合わせフォームを出さない
  turnstileSiteKey: '0x4AAAAAAGNEg1ybW4v-uYU8',
};

export const nav = [
  { href: '/about/', label: 'about' },
  { href: '/seminar/', label: 'みやざきゼミ' },
];
