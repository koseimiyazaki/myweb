# myweb

宮崎光世の個人サイト。Astro で組み立て、Cloudflare（Workers の静的アセット配信）で公開する。

## 構成

| 場所 | 中身 |
|---|---|
| `src/data/works.ts` | トップに並べる「つくったもの」（名前とリンク先）。並び順がそのまま表示順 |
| `src/data/site.ts` | 名前・noteのID・Turnstileのサイトキー・ヘッダーのメニュー |
| `src/layouts/Material.astro` | トップ、about、ご相談の枠。デザインは Artifact Material |
| `src/layouts/Base.astro` | みやざきゼミのページの枠。デザインはみやざきゼミの基準 |
| `src/styles/material/` | Artifact Material の tokens.css（tokens.json から生成）と bundle.css |
| `src/styles/global.css` | みやざきゼミのデザイン基準 |
| `worker/index.js` | 問い合わせフォームの受付（/api/contact） |
| `wrangler.jsonc` | Cloudflareの設定 |

## noteの最新記事

`src/data/site.ts` の `seminarNoteId` にゼミnoteのIDを入れると、トップとゼミのページに最新5本が出る（ビルド時に取得）。毎日更新したい場合は、Cloudflareのデプロイフックを1日1回呼ぶ設定を追加する。

## 公開

Cloudflareの「Workers & Pages」でこのリポジトリを接続する。ビルドコマンドは `npm run build`、配信は `wrangler.jsonc` の設定どおり `dist/`。mainに保存すると自動で公開される。
