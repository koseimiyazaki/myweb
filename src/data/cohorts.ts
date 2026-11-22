// みやざきゼミの学年ごとのページ。並び順がそのままタブの順になる（新しい学年が左）。
//
// photos  : 写真は public/seminar/cohorts/<year>/ に置き、src に '/seminar/cohorts/<year>/<ファイル名>' を書く。
//           写真は位置情報（EXIF）を消し、幅1600px程度に縮めてから置く。写っている学生の了解を取ってから載せる。
// members : 名前はファーストネームをカタカナで。卒論タイトルと進路は、本人の了解が取れたものだけ書く（空欄なら出さない）。
//           進路は企業名でも「IT企業」「地元の自治体」のような書き方でもよい。

export type Photo = { src: string; caption?: string };
export type Member = { name: string; thesis?: string; career?: string };
export type Cohort = {
  year: number;
  label: string;
  note?: string; // 学年のひとこと（手書き風の書体で出る）
  photos: Photo[];
  members: Member[];
};

export const cohorts: Cohort[] = [
  { year: 2028, label: '2028年卒（予定）', photos: [], members: [] },
  { year: 2027, label: '2027年卒（予定）', photos: [], members: [] },
  { year: 2026, label: '2026年卒', photos: [], members: [] },
  { year: 2025, label: '2025年卒', photos: [], members: [] },
];
