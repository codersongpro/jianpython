import { lessons } from "./lessons.js";

// 레슨 id는 저장된 학습 기록과 연결되어 있어서 바꾸지 않고,
// 배우는 순서는 아래 행성계(챕터) 묶음으로 정해요.
// 쉬운 개념 → 어려운 개념, 앞에서 배운 것을 뒤에서 다시 쓰는 순서예요.
export const chapters = [
  {
    id: "talk",
    emoji: "🗣️",
    title: "말하기 행성계",
    goal: "print로 컴퓨터가 글자와 숫자를 말하게 해요.",
    color: "#4c97ff",
    lessonIds: [1, 2],
  },
  {
    id: "math",
    emoji: "🧮",
    title: "계산 행성계",
    goal: "파이썬을 계산기처럼 써서 더하기·빼기·곱하기를 해요.",
    color: "#59c059",
    lessonIds: [3, 13, 14],
  },
  {
    id: "box",
    emoji: "📦",
    title: "상자 행성계",
    goal: "이름표를 붙인 상자(변수)에 값을 담고 꺼내 써요.",
    color: "#ff8c1a",
    lessonIds: [4, 5, 6, 15],
  },
  {
    id: "magic",
    emoji: "📡",
    title: "마법 통신 행성계",
    goal: "다른 사람이 만들어 둔 마법 명령을 불러 써요.",
    color: "#06b6d4",
    lessonIds: [12, 11],
  },
  {
    id: "truth",
    emoji: "⚖️",
    title: "참·거짓 행성계",
    goal: "비교해서 맞으면 True, 틀리면 False라고 대답해요.",
    color: "#6366f1",
    lessonIds: [7, 16, 17, 18],
  },
  {
    id: "branch",
    emoji: "🚦",
    title: "갈림길 행성계",
    goal: "if로 '만약에 ~라면' 다르게 행동하게 해요.",
    color: "#ffab19",
    lessonIds: [8, 9, 19],
  },
  {
    id: "loop",
    emoji: "🌀",
    title: "반복 행성계",
    goal: "같은 일을 여러 번 시키고, 원할 때 멈춰요.",
    color: "#14b8a6",
    lessonIds: [10, 24, 25],
  },
  {
    id: "list",
    emoji: "🧺",
    title: "바구니 행성계",
    goal: "여러 값을 한 바구니(리스트)에 모아서 다뤄요.",
    color: "#ff6680",
    lessonIds: [20, 21, 22, 23, 29],
  },
  {
    id: "function",
    emoji: "🛠️",
    title: "나만의 주문 행성계",
    goal: "나만의 명령어(함수)를 만들어 여러 번 써요.",
    color: "#9966ff",
    lessonIds: [26, 27, 28],
  },
  {
    id: "graduation",
    emoji: "🎓",
    title: "졸업 행성",
    goal: "지금까지 배운 마법을 모두 모아 작품을 만들어요.",
    color: "#facc15",
    lessonIds: [30],
  },
];

// 배우는 순서대로 펼친 레슨 id 목록
export const orderedLessonIds = chapters.flatMap((chapter) => chapter.lessonIds);

const lessonById = new Map(lessons.map((lesson) => [lesson.id, lesson]));

export const getLesson = (lessonId) => lessonById.get(lessonId);

// 화면에 보여줄 단계 번호 (1부터 시작)
export const getLessonNumber = (lessonId) => orderedLessonIds.indexOf(lessonId) + 1;

export const getChapterOfLesson = (lessonId) =>
  chapters.find((chapter) => chapter.lessonIds.includes(lessonId));

export const getPrevLessonId = (lessonId) => {
  const index = orderedLessonIds.indexOf(lessonId);
  return index > 0 ? orderedLessonIds[index - 1] : null;
};

export const getNextLessonId = (lessonId) => {
  const index = orderedLessonIds.indexOf(lessonId);
  return index >= 0 && index < orderedLessonIds.length - 1 ? orderedLessonIds[index + 1] : null;
};

// 아직 끝내지 않은 첫 번째 단계를 추천해요.
export const getRecommendedLessonId = (completedLessons) =>
  orderedLessonIds.find((id) => !completedLessons.includes(id)) ?? null;
