# myweb

宮崎光世の個人サイト。Astro で組み立て、Cloudflare（Workers の静的アセット配信）で公開する。

## 構成

| 場所 | 中身 |
|---|---|
| `src/data/site.ts` | 名前・肩書き・noteのID・メニュー。表記を直すときはここ |
| `src/pages/` | 各ページ（トップ、プロフィール、自治体DX、担当科目、検索とAI、ゼミ、ご相談） |
| `src/content/essays/` | 「検索とAI」の論考。Markdownを1本ずつ置く |
| `src/styles/global.css` | みやざきゼミのデザイン基準（paper地・ink文字・yellowはページに1か所） |
| `wrangler.jsonc` | Cloudflareの設定（`dist/` を配信） |

## 論考の追加

`src/content/essays/<英数字のファイル名>.md` を作る。

```md
---
title: タイトル
date: 2026-12-01
summary: 一覧に出す1行の要約
draft: true   # 公開するときに false にするか消す
---
本文
```

## noteの最新記事

`src/data/site.ts` の `seminarNoteId` にゼミnoteのIDを入れると、トップとゼミのページに最新5本が出る（ビルド時に取得）。毎日更新したい場合は、Cloudflareのデプロイフックを1日1回呼ぶ設定を追加する。

## 公開

Cloudflareの「Workers & Pages」でこのリポジトリを接続する。ビルドコマンドは `npm run build`、配信は `wrangler.jsonc` の設定どおり `dist/`。mainに保存すると自動で公開される。
