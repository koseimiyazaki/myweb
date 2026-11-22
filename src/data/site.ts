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
};

export const nav = [
  { href: '/', label: 'トップ' },
  { href: '/profile/', label: 'プロフィール' },
  { href: '/dx/', label: '自治体DX' },
  { href: '/courses/', label: '担当科目' },
  { href: '/search/', label: '検索とAI' },
  { href: '/seminar/', label: 'ゼミ' },
  { href: '/contact/', label: 'ご相談' },
];
