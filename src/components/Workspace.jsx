import { useState, useEffect, useRef } from "react";
import { ArrowLeft, ArrowRight, Play, RefreshCw, Terminal, HelpCircle, BookOpen, Gamepad2 } from "lucide-react";
import { runPythonCode, initPyodide } from "../utils/pyodideRunner";
import { audioSynth } from "../utils/audioSynth";
import { getChapterOfLesson, getLesson, getLessonNumber, getNextLessonId, getPrevLessonId } from "../data/curriculum";

// 단계별로 지안이가 적던 코드를 저장해 두었다가 다시 들어오면 이어서 쓸 수 있게 해요.
const codeStorageKey = (lessonId) => `jian_code_${lessonId}`;

const readSavedCode = (lessonId) => {
  try {
    return localStorage.getItem(codeStorageKey(lessonId));
  } catch {
    return null;
  }
};

// Extract comment instructions and clean code from starterCode
const getCleanedStarter = (rawCode) => {
  if (!rawCode) return { comments: [], cleanCode: "" };
  const lines = rawCode.split("\n");
  const comments = [];
  const codeLines = [];
  lines.forEach(line => {
    if (line.trim().startsWith("#")) {
      const cleanComment = line.trim().replace(/^#\s*/, "");
      if (cleanComment) comments.push(cleanComment);
    } else {
      codeLines.push(line);
    }
  });
  return {
    comments,
    cleanCode: codeLines.join("\n").trim()
  };
};

// 마법 퀵 키보드: 태블릿처럼 Tab 키가 없어도 들여쓰기를 넣을 수 있어요.
// back 은 입력 후 커서를 몇 글자 앞으로 보낼지예요. (예: 따옴표 안쪽)
const quickKeys = [
  { label: "⇥ 들여쓰기", text: "    ", color: "#ffd700" },
  { label: "↵ 줄바꿈", text: "\n", color: "#ffd700" },
  { label: 'print("✍️")', text: 'print("")', back: 2, color: "#00f0ff" },
  { label: '" " 따옴표', text: '""', back: 1 },
  { label: "( )", text: "()", back: 1 },
  { label: "[ ]", text: "[]", back: 1 },
  { label: ":", text: ":" },
  { label: "= 담기", text: " = " },
  { label: "== 같니?", text: " == " },
  { label: "+", text: " + " },
  { label: "-", text: " - " },
  { label: "*", text: " * " },
  { label: ">", text: " > " },
  { label: "<", text: " < " },
  { label: "if", text: "if ", color: "#ff007f" },
  { label: "else:", text: "else:", color: "#ff007f" },
  { label: "elif", text: "elif ", color: "#ff007f" },
  { label: "for 반복", text: "for i in range(5):", color: "#bd00ff" },
  { label: "while", text: "while ", color: "#bd00ff" },
  { label: "break", text: "break", color: "#bd00ff" },
  { label: "def", text: "def ", color: "#9966ff" },
  { label: "True", text: "True", color: "#10b981" },
  { label: "False", text: "False", color: "#10b981" },
  { label: "magic.show_cat()", text: "magic.show_cat()", color: "#ffd700" },
  { label: "magic.get_weather()", text: "magic.get_weather()", color: "#ffd700" }
];

function WorkspaceContent({ lessonId, isCompleted, onBack, onOpenLesson, onLessonSolved, onPlayGame }) {
  const isSandbox = lessonId === 0;

  const lesson = isSandbox 
    ? {
        id: 0,
        planet: "Infinity Sandbox (무한 자유 연습 행성)",
        title: "자유 코딩 연습실 🚀",
        story: "하고 싶은 파이썬 마법을 마음껏 테스트해보세요! ✨\n\n글자 쓰기, 숫자 계산, 고양이 소환 등 배우고 싶은 어떤 코드도 마음대로 입력해서 결과를 볼 수 있는 지안이만의 낙서장이에요.",
        instructions: [
          "자유롭게 마법 명령을 적고 [주문 외우기]를 눌러 실행해봐요!",
          "예: print('우주 고양이 만세!')",
          "예: print(magic.get_weather())",
          "예: for i in range(3):  →  다음 줄에 Tab 누르고 print(\"★\")",
          "예: magic.show_cat()"
        ],
        starterCode: "# 지안이의 자유 파이썬 연습장\nprint(\"안녕 지안! 어떤 마법을 부려볼까요?\")\n",
        hints: { default: "지안이가 적고 싶은 글자를 print() 괄호 안에 넣어서 마음껏 출력해 보세요!" }
      }
    : getLesson(lessonId);

  const chapter = isSandbox ? null : getChapterOfLesson(lessonId);
  const lessonNumber = isSandbox ? 0 : getLessonNumber(lessonId);
  const prevLessonId = isSandbox ? null : getPrevLessonId(lessonId);
  const nextLessonId = isSandbox ? null : getNextLessonId(lessonId);

  const { comments: starterComments, cleanCode: cleanStarterCode } = getCleanedStarter(lesson?.starterCode);
  const [code, setCode] = useState(() => readSavedCode(lessonId) ?? cleanStarterCode);
  const [stdout, setStdout] = useState("");
  const [error, setError] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [pyodideLoaded, setPyodideLoaded] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [quizSolved, setQuizSolved] = useState(false);
  const [quizError, setQuizError] = useState(false);
  
  // UI & UX States
  const [showHint, setShowHint] = useState(false);
  const [showStoryModal, setShowStoryModal] = useState(!isCompleted); // 아직 안 끝낸 단계는 이야기 팝업부터 보여줘요
  const [failCount, setFailCount] = useState(0); // 실패한 횟수 (2번 이상이면 정답 예시를 볼 수 있어요)
  const [errorHint, setErrorHint] = useState(""); // 에러 종류에 맞춘 이 단계 전용 힌트
  const [showSolution, setShowSolution] = useState(false);
  const [hasBeenFocused, setHasBeenFocused] = useState(false); // 처음 터치할 때 커서 이동을 제어하는 상태
  const [showScratchCompareModal, setShowScratchCompareModal] = useState(false); // 스크래치 비교 사전 모달 표시 여부

  const editorRef = useRef(null);

  // 코드가 바뀔 때마다 저장해요.
  useEffect(() => {
    try {
      localStorage.setItem(codeStorageKey(lessonId), code);
    } catch {
      // 저장 공간을 쓸 수 없어도 코딩은 계속할 수 있어요.
    }
  }, [lessonId, code]);

  // Initialize Pyodide
  useEffect(() => {
    let active = true;
    const load = async () => {
      try {
        await initPyodide();
        if (active) setPyodideLoaded(true);
      } catch (err) {
        console.error(err);
        if (active) setError("파이썬 엔진을 로드할 수 없습니다. 인터넷 상태를 확인해 주세요.");
      }
    };
    load();
    return () => {
      active = false;
    };
  }, []);


  // 각 레벨별로 지안이가 현재 배우는 파이썬 주문이 스크래치의 어떤 블록과 1:1로 매핑되는지 보여주는 지도사전이에요!
  const scratchRelationMap = {
    1: { block: "[안녕! 라고 말하기]", color: "#4c97ff", text: "스크래치에서 고양이가 말하게 하던 파란색 말하기 블록이에요!" },
    2: { block: "[안녕! 라고 말하기]", color: "#4c97ff", text: "말하기 블록에 글자나 숫자를 바꿔 넣어 보여주는 것과 똑같아요!" },
    3: { block: "[ (5) + (3) ] 연산", color: "#59c059", text: "초록색 연산 방에 들어있던 더하기(+), 빼기(-) 계산 블록과 똑같아요!" },
    4: { block: "[ (score) 를 (10) 으로 정하기 ]", color: "#ff8c1a", text: "주황색 변수 카테고리의 [변수 값을 정하기] 블록과 똑같아요!" },
    5: { block: "[ (안녕) 과 (지안) 결합하기 ]", color: "#59c059", text: "글자 조각을 풀칠하듯 길게 이어붙이는 [글자 결합하기] 연산 블록과 똑같아요!" },
    6: { block: "[ (음식) 을 (피자) 로 정하기 ]", color: "#ff8c1a", text: "변수 블록을 여러 개 만들어 각각 다른 값을 담아 두는 것과 똑같아요!" },
    7: { block: "[ (10) > (5) ] 연산", color: "#59c059", text: "크기를 비교해서 참(True)과 거짓(False)을 판단하는 비교 연산 블록과 똑같아요!" },
    8: { block: "[만약 <> 이라면] 제어", color: "#ffab19", text: "노란색 제어 카테고리의 [만약 조건이 참이라면] 실행하는 블록과 똑같아요!" },
    9: { block: "[만약 <> 이라면 / 아니면] 제어", color: "#ffab19", text: "조건이 맞을 때와 맞지 않을 때 두 갈래로 나뉘어 행동하는 제어 블록과 같아요!" },
    10: { block: "[ (10) 번 반복하기 ] 제어", color: "#ffab19", text: "정해진 횟수만큼 안쪽 명령을 뱅글뱅글 반복시키는 루프 제어 블록과 똑같아요!" },
    11: { block: "[ 대답 ] 감지", color: "#5cb1d6", text: "물어보고 받은 대답을 쓰는 하늘색 감지 블록처럼, 바깥에서 받아온 값을 써요!" },
    12: { block: "[ 확장 기능 추가하기 ]", color: "#0fbd8c", text: "스크래치에서 펜·음악 확장 블록을 추가해 쓰는 것처럼, 미리 만들어진 마법 명령을 불러 써요!" },
    13: { block: "[ (5) * (3) ] 연산", color: "#59c059", text: "초록색 연산 카테고리의 곱하기(*) 블록과 똑같아요!" },
    14: { block: "[ (10) 나누기 (3) 의 나머지 ]", color: "#59c059", text: "수학 계산 후 찌꺼기(나머지) 값만 구하는 초록색 나머지 연산 블록과 똑같아요!" },
    15: { block: "[ (하) 와 (하) 결합하기 ]", color: "#59c059", text: "결합하기 블록을 여러 번 겹쳐 쓰는 일을 한 번에 해 주는 도장 찍기예요!" },
    16: { block: "[ < (5) = (3) > 가 아니다 ]", color: "#59c059", text: "[ = ] 블록을 [~가 아니다] 블록으로 감싼 것과 같아요!" },
    17: { block: "[ < > 그리고 < > ] 연산", color: "#59c059", text: "두 개의 조건이 둘 다 맞아야 통과하는 [~ 그리고 ~] 연산 블록과 똑같아요!" },
    18: { block: "[ < > 또는 < > ] 연산", color: "#59c059", text: "둘 중에 하나만 맞아도 관문을 통과하는 [~ 또는 ~] 연산 블록과 똑같아요!" },
    19: { block: "[만약 <> 이라면 / 아니면] 다중", color: "#ffab19", text: "제어 블록 안에 조건 블록을 여러 겹 겹쳐서 복잡한 판단을 내리는 구조와 같아요!" },
    20: { block: "[ (과일) 리스트 만들기 ]", color: "#ff6680", text: "여러 개의 아이템을 차곡차곡 모아두는 분홍색 리스트 바구니와 똑같아요!" },
    21: { block: "[ (과일) 의 (1) 번째 항목 ]", color: "#ff6680", text: "바구니의 순서 방 값을 가져와요. 파이썬은 0번 방부터 센다는 점만 달라요!" },
    22: { block: "[ (과일) 의 길이 ]", color: "#ff6680", text: "바구니 속에 보물 장난감이 총 몇 개 들어있는지 알아내는 리스트 세기 블록과 같아요!" },
    23: { block: "[ (사과) 을 (과일) 에 추가하기 ]", color: "#ff6680", text: "바구니 맨 뒤에 새 보물을 쏙 집어넣어 크기를 키우는 리스트 추가 블록과 같아요!" },
    24: { block: "[ < > 까지 반복하기 ]", color: "#ffab19", text: "주의! 스크래치는 조건이 '맞을 때까지', 파이썬 while 은 조건이 '맞는 동안' 반복해요. 반대예요!" },
    25: { block: "[ 이 스크립트 멈추기 ]", color: "#ffab19", text: "뱅글뱅글 돌던 반복 열차에서 강제로 멈추고 튀어나오는 탈출(break) 블록과 같아요!" },
    26: { block: "[ (인사하기) 정의하기 ]", color: "#9966ff", text: "보라색 나만의 블록 만들기 카테고리의 [블록 정의하기] 마법과 똑같아요!" },
    27: { block: "[ (믹서기) 정의하기 (재료) ]", color: "#9966ff", text: "나만의 블록을 생성할 때 믹서기 재료(매개변수) 투입구를 만드는 것과 같아요!" },
    28: { block: "[ (자판기) 결과값 내보내기 ]", color: "#9966ff", text: "나만의 블록이 작동한 뒤 결과 물건(return)을 자판기 밖으로 뿅 돌려보내는 마법이에요!" },
    29: { block: "[ 리스트의 모든 항목 훑기 ]", color: "#ffab19", text: "리스트 바구니 속에 들어있는 모든 과일을 하나씩 전부 꺼내보는 반복문이에요!" },
    30: { block: "[ 종합 연산/제어 졸업 블록 ]", color: "#ffab19", text: "지금껏 배운 조건, 반복, 연산, 리스트 블록을 총출동시켜 조립하는 졸업 작품 블록이에요!" }
  };

  // 스크래치를 잘하는 지안이를 위해 마련된 파이썬 문법 대조 마법 사전 데이터예요!
  const scratchCompareData = [
    {
      category: "🗣️ 화면에 보여주기 (말하기)",
      scratch: "[안녕! 라고 말하기]",
      scratchColor: "#4c97ff", // 스크래치 말하기 블록 파란색
      python: "print(\"안녕!\")",
      desc: "화면에 글자나 숫자를 띄워주는 파이썬의 가장 기본 주문이에요. 글자 양쪽에 큰따옴표(\"\")를 꼭 안겨주어야 해요!"
    },
    {
      category: "🧮 수학 계산하기 (연산)",
      scratch: "[ (5) + (3) ]\n[ (5) * (3) ]\n[ (10) 나누기 (3) 의 나머지 ]",
      scratchColor: "#59c059", // 연산 초록색
      python: "5 + 3\n5 * 3\n10 % 3",
      desc: "수학 계산을 해요. 곱하기는 별표(*), 나누기는 슬래시(/)를 쓰고, 나머지는 퍼센트(%) 기호로 찌꺼기만 구해요!"
    },
    {
      category: "📦 상자에 값 담아두기 (변수)",
      scratch: "[ (점수) 를 (10) 으로 정하기 ]",
      scratchColor: "#ff8c1a", // 변수 오렌지색
      python: "score = 10",
      desc: "score라는 이름의 보물 상자를 만들고 그 안에 숫자 10을 담아두는 파이썬의 저장 마법이에요."
    },
    {
      category: "🧭 만약에~ 라면 (조건문)",
      scratch: "[만약 < (점수) > (90) > 이라면]\n  └─ [ A 라고 말하기 ]\n[아니면]\n  └─ [ B 라고 말하기 ]",
      scratchColor: "#ffab19", // 제어 노란색
      python: "if score > 90:\n    print(\"A\")\nelse:\n    print(\"B\")",
      desc: "조건을 검사해요. 파이썬은 조건 끝에 꼭 쌍점(:)을 적고, 조건에 맞아 실행할 문장은 줄을 맞춰 띄어쓰기(Tab) 해줘요!"
    },
    {
      category: "🌀 뱅글뱅글 반복하기 (반복문)",
      scratch: "[ (5) 번 반복하기 ]\n  └─ [ ★ 라고 말하기 ]",
      scratchColor: "#ffab19", // 제어 노란색
      python: "for i in range(5):\n    print(\"★\")",
      desc: "같은 행동을 정해진 횟수만큼 반복해요. range(5)는 기계를 5바퀴 뱅글뱅글 돌려 별을 5개 그려냅니다."
    },
    {
      category: "🧺 장난감 바구니 (리스트)",
      scratch: "[ (과일) 리스트 만들기 ]\n[ (과일) 의 (1) 번째 항목 ]",
      scratchColor: "#ff6680", // 리스트/데이터 분홍색
      python: "fruits = [\"사과\", \"바나나\"]\nfruits[0]",
      desc: "여러 장난감을 바구니에 모아둬요. 파이썬은 특이하게 1번이 아닌 0번 방부터 보물의 숫자를 센답니다! (0번 방의 비밀)"
    },
    {
      category: "🛠️ 나만의 블록 만들기 (함수)",
      scratch: "[ (인사하기) 정의하기 ]\n  └─ [ 안녕! 라고 말하기 ]",
      scratchColor: "#9966ff", // 내블록 보라색
      python: "def greeting():\n    print(\"안녕!\")",
      desc: "def는 '정의하다(define)'에서 왔어요. 나만의 마법 명령어 블록을 새로 만드는 설계도 작성이랍니다."
    }
  ];

  // 지안이가 처음 코드창을 탭(터치)했을 때 커서를 자동으로 끝으로 보내주는 마법 기능이에요!
  const handleEditorFocus = (e) => {
    if (!hasBeenFocused) {
      setHasBeenFocused(true);
      const textarea = e.target;
      setTimeout(() => {
        textarea.setSelectionRange(textarea.value.length, textarea.value.length);
      }, 10);
    }
  };

  // 탭(Tab) 키를 누르면 다음 버튼으로 이동하지 않고 들여쓰기(공백 4칸)가 입력되도록 제어해요.
  const handleKeyDown = (e) => {
    if (e.key === "Tab") {
      e.preventDefault(); // 기본 포커스 이동 동작을 차단해요.
      
      const textarea = e.target;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const currentVal = textarea.value;
      
      const indent = "    "; // 공백 4칸 들여쓰기
      const newVal = currentVal.substring(0, start) + indent + currentVal.substring(end);
      
      setCode(newVal);
      
      // 커서 위치를 들여쓰기된 바로 뒤쪽으로 보내줘요.
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + indent.length;
      }, 0);
    }
  };

  // 코드창 바깥을 터치했다가 다시 터치할 때도 동작할 수 있도록 포커스가 풀리면 초기화해줘요
  const handleEditorBlur = () => {
    setHasBeenFocused(false);
  };

  // Insert code helper
  const handleInsertCode = (textToInsert, cursorOffset = 0) => {
    audioSynth.playSelect();
    const textarea = editorRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const currentVal = textarea.value;

    const newVal = currentVal.substring(0, start) + textToInsert + currentVal.substring(end);
    setCode(newVal);

    setTimeout(() => {
      textarea.focus();
      const newCursorPos = start + textToInsert.length - cursorOffset;
      textarea.setSelectionRange(newCursorPos, newCursorPos);
    }, 0);
  };

  const markFailure = (hint) => {
    setFailCount((count) => count + 1);
    setErrorHint(hint || "");
    audioSynth.playError();
    setIsSuccess(false);
    setQuizSolved(false);
  };

  const handleRunCode = async () => {
    if (isRunning) return;
    setIsRunning(true);
    setStdout("");
    setError(null);
    setErrorHint("");
    audioSynth.playBeep(523.25, 0.08);

    const result = await runPythonCode(
      code,
      (text) => {
        setStdout((prev) => prev + text + "\n");
      }
    );

    setIsRunning(false);

    if (isSandbox) {
      if (result.success) {
        audioSynth.playCoin();
      } else {
        setError(result.error);
        audioSynth.playError();
      }
      return;
    }

    if (result.success) {
      if (lesson.validation(code, result.stdout)) {
        if (!isSuccess) {
          audioSynth.playSuccess();
        }
        setIsSuccess(true);
      } else if (!isSuccess) {
        setError("코드는 잘 실행됐어요! 그런데 아직 이번 임무와 결과가 달라요. 왼쪽 [임무 지침]을 다시 읽고, 결과 창에 무엇이 나왔는지 비교해 봐요.");
        markFailure("");
      }
    } else if (isSuccess) {
      // 이미 통과한 뒤 자유롭게 바꿔 보다가 난 에러는 결과 창에만 알려줘요.
      setStdout((prev) => prev + "⚠️ 파이디의 에러 알림:\n" + result.error + "\n");
    } else {
      setError(result.error);
      markFailure(lesson.hints?.[result.errorType]);
    }
  };

  const handleResetCode = () => {
    audioSynth.playBeep(300, 0.1);
    if (window.confirm("코드를 처음 상태로 되돌릴까요?")) {
      setCode(cleanStarterCode);
      setStdout("");
      setError(null);
      setErrorHint("");
      setIsSuccess(false);
      setQuizSolved(false);
      setQuizError(false);
      audioSynth.playLaser();
    }
  };

  const handleQuizAnswer = (option) => {
    if (option === lesson.quiz.answer) {
      audioSynth.playCoin();
      setQuizSolved(true);
      setQuizError(false);
      onLessonSolved(lesson.id);
    } else {
      audioSynth.playError();
      setQuizError(true);
      setTimeout(() => setQuizError(false), 500); // Reset shake
    }
  };

  const goToLesson = (targetId) => {
    if (!targetId) return;
    audioSynth.playSelect();
    onOpenLesson(targetId);
  };

  // Safe hint text parser
  const getHintText = () => {
    const hintList = Object.values(lesson?.hints || {});
    if (hintList.length > 0) {
      return hintList.map((hint) => `• ${hint}`).join("\n");
    }
    return "글자 양쪽에 꼭 큰따옴표(\"\")가 들어가는지 확인해 봐요!";
  };

  if (!pyodideLoaded) {
    return (
      <div style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "24px"
      }}>
        <div className="animate-float" style={{ fontSize: "6rem" }}>🚀</div>
        <div style={{ fontSize: "2rem", color: "#00f0ff", fontWeight: "900" }} className="neon-text-cyan">
          파이디가 우주선 엔진 시동 거는 중...
        </div>
        <p style={{ color: "#a5b4fc", fontSize: "1.1rem" }}>브라우저 내 파이썬 연구소를 세팅하고 있어요. 잠시만 기다려주세요!</p>
        <div style={{
          width: "240px",
          height: "8px",
          background: "rgba(255,255,255,0.1)",
          borderRadius: "4px",
          overflow: "hidden",
          position: "relative"
        }}>
          <div style={{
            position: "absolute",
            height: "100%",
            width: "50%",
            background: "linear-gradient(to right, #00f0ff, #ff007f)",
            borderRadius: "4px",
            animation: "pulse 1.5s infinite ease-in-out"
          }} />
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "20px", display: "flex", flexDirection: "column", gap: "20px", minHeight: "100vh" }}>
      
      {/* 1. 파이디 마법 스토리 설명 팝업 모달 */}
      {showStoryModal && !isSandbox && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(6, 7, 20, 0.88)",
          backdropFilter: "blur(10px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 90
        }}>
          <div className="glass-panel neon-cyan-glow" style={{
            padding: "36px 40px",
            width: "90%",
            maxWidth: "640px",
            maxHeight: "85vh",
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "24px",
            textAlign: "center",
            borderWidth: "2px",
            borderColor: "rgba(0, 240, 255, 0.45)"
          }}>
            <div style={{ fontSize: "5rem" }} className="animate-float">🤖✨</div>
            
            <div>
              <span style={{ fontSize: "1rem", color: "#bd00ff", fontWeight: "bold" }}>
                {lessonNumber}단계 • {chapter?.emoji} {chapter?.title} • {lesson.planet}
              </span>
              <h2 style={{ fontSize: "2.4rem", color: "white", marginTop: "4px" }}>
                {lesson.emoji} {lesson.title}
              </h2>
              {lesson.level === "도전" && (
                <span className="level-tag" style={{ display: "inline-block", marginTop: "6px" }}>🔥 도전 단계 · 어려우면 건너뛰었다가 나중에 와도 돼요</span>
              )}
            </div>

            <div style={{ background: "rgba(0, 240, 255, 0.08)", border: "1.5px solid rgba(0, 240, 255, 0.3)", borderRadius: "16px", padding: "12px 18px", color: "#00f0ff", fontWeight: 800, fontSize: "1.15rem" }}>
              🎯 오늘의 목표: {lesson.goal}
            </div>

            <div style={{
              background: "rgba(10, 11, 27, 0.5)",
              padding: "24px",
              borderRadius: "20px",
              border: "1.5px solid rgba(0, 240, 255, 0.15)",
              fontSize: "1.2rem",
              lineHeight: "1.7",
              color: "#e2e8f0",
              textAlign: "left",
              whiteSpace: "pre-wrap"
            }}>
              {lesson.story}
            </div>

            <button
              onClick={() => {
                audioSynth.playSelect();
                setShowStoryModal(false);
              }}
              className="btn-cosmic btn-cyan animate-pulse-cyan"
              style={{
                padding: "16px 40px",
                fontSize: "1.3rem",
                fontWeight: "900",
                width: "100%",
                borderRadius: "30px",
                boxShadow: "0 0 25px rgba(0, 240, 255, 0.5)"
              }}
            >
              🚀 우주 모험 시작하기!
            </button>
          </div>
        </div>
      )}

      {/* 2. 스크래치 vs 파이썬 1:1 비교 사전 모달 팝업 */}
      {showScratchCompareModal && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(6, 7, 20, 0.92)",
          backdropFilter: "blur(12px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 95
        }}>
          <div className="glass-panel" style={{
            padding: "36px 40px",
            width: "95%",
            maxWidth: "880px",
            maxHeight: "85vh",
            overflowY: "auto",
            borderWidth: "2.5px",
            borderColor: "rgba(189, 0, 255, 0.45)",
            boxShadow: "0 0 30px rgba(189, 0, 255, 0.25)"
          }}>
            {/* Modal Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <span style={{ fontSize: "2.4rem" }}>🐱⚡</span>
                <div>
                  <h3 style={{ fontSize: "2rem", color: "#e879f9", margin: 0 }}>지안이의 스크래치 vs 파이썬 마법 사전</h3>
                  <p style={{ color: "#a5b4fc", fontSize: "0.95rem", margin: "2px 0 0 0" }}>스크래치 블록 조립이 파이썬 글자 마법으로 변하는 매핑 규칙이에요!</p>
                </div>
              </div>
              <button 
                onClick={() => {
                  audioSynth.playSelect();
                  setShowScratchCompareModal(false);
                }}
                className="btn-cosmic btn-outline"
                style={{ padding: "8px 16px", fontSize: "0.95rem", color: "#ffffff", borderColor: "#cbd5e1" }}
              >
                사전 닫기
              </button>
            </div>

            {/* Compare Table */}
            <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginTop: "10px" }}>
              {scratchCompareData.map((item, idx) => (
                <div key={idx} style={{
                  background: "rgba(10, 11, 27, 0.6)",
                  border: "1.5px solid rgba(255,255,255,0.06)",
                  borderRadius: "18px",
                  padding: "18px 24px",
                  display: "grid",
                  gridTemplateColumns: "1.2fr 1fr 1fr",
                  gap: "20px",
                  alignItems: "center"
                }}>
                  {/* Category & Explanation */}
                  <div>
                    <strong style={{ display: "block", color: "white", fontSize: "1.1rem", marginBottom: "4px" }}>{item.category}</strong>
                    <p style={{ color: "#9ca3af", fontSize: "0.88rem", lineHeight: "1.4", margin: 0 }}>{item.desc}</p>
                  </div>

                  {/* Scratch Block Representer */}
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <div style={{
                      background: item.scratchColor,
                      color: "white",
                      padding: "10px 16px",
                      borderRadius: "10px",
                      fontFamily: "var(--font-ui)",
                      fontWeight: "bold",
                      fontSize: "0.95rem",
                      boxShadow: "0 4px 6px rgba(0,0,0,0.25)",
                      borderLeft: "6px solid rgba(0,0,0,0.15)",
                      whiteSpace: "pre-line",
                      lineHeight: "1.4",
                      textAlign: "left",
                      width: "100%",
                      maxWidth: "200px"
                    }}>
                      {item.scratch}
                    </div>
                  </div>

                  {/* Python Code block */}
                  <div style={{
                    background: "#050614",
                    border: "1px solid rgba(0,240,255,0.15)",
                    borderRadius: "10px",
                    padding: "10px 16px",
                    fontFamily: "monospace",
                    fontSize: "1.05rem",
                    color: "var(--color-neon-cyan)",
                    boxShadow: "0 0 10px rgba(0,240,255,0.05)",
                    whiteSpace: "pre-line",
                    lineHeight: "1.4"
                  }}>
                    {item.python}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Workspace Header */}
      <header className="workspace-header">
        <button onClick={onBack} className="btn-cosmic btn-outline" style={{ padding: "10px 20px", fontSize: "1rem" }}>
          <ArrowLeft size={18} /> 행성 지도
        </button>

        <div style={{ textAlign: "center", minWidth: 0 }}>
          <span style={{ color: "#bd00ff", fontSize: "1rem", fontWeight: "bold" }}>
            {isSandbox ? "FREE SPACE" : `${lessonNumber}단계 • ${chapter?.emoji} ${chapter?.title}`}
            {!isSandbox && isCompleted && <span style={{ color: "#10b981" }}> • ✅ 완료한 단계</span>}
          </span>
          <h2 style={{ fontSize: "2.2rem", color: "white", marginTop: "2px", lineHeight: 1.15 }}>
            {!isSandbox && lesson.emoji} {lesson.title}
          </h2>
        </div>

        {!isSandbox ? (
          <div className="workspace-nav">
            <button
              onClick={() => goToLesson(prevLessonId)}
              disabled={!prevLessonId}
              className="btn-cosmic btn-outline"
              style={{ padding: "10px 14px", fontSize: "0.95rem", opacity: prevLessonId ? 1 : 0.4 }}
              title="이전 단계"
            >
              <ArrowLeft size={16} /> 이전
            </button>
            <button
              onClick={() => goToLesson(nextLessonId)}
              disabled={!nextLessonId}
              className="btn-cosmic btn-outline"
              style={{ padding: "10px 14px", fontSize: "0.95rem", opacity: nextLessonId ? 1 : 0.4 }}
              title="다음 단계"
            >
              다음 <ArrowRight size={16} />
            </button>
            <button
              onClick={() => {
                audioSynth.playBeep(660, 0.08);
                setShowStoryModal(true);
              }}
              className="btn-cosmic btn-outline"
              style={{ padding: "10px 14px", fontSize: "0.95rem", color: "#00f0ff", borderColor: "#00f0ff" }}
            >
              <BookOpen size={16} /> 이야기
            </button>
            <button
              onClick={() => onPlayGame(lesson.id)}
              className="btn-cosmic btn-outline"
              style={{ padding: "10px 14px", fontSize: "0.95rem", color: "#f9a8d4", borderColor: "#f9a8d4" }}
              title="복습 미니게임"
            >
              <Gamepad2 size={16} /> 게임
            </button>
          </div>
        ) : (
          <div />
        )}
      </header>

      {/* Non-blocking Success Banner at the top of workspace */}
      {isSuccess && (
        <div 
          className="glass-panel neon-cyan-glow animate-pulse-cyan" 
          style={{
            background: "linear-gradient(to right, rgba(0, 240, 255, 0.18), rgba(189, 0, 255, 0.18))",
            borderColor: "rgba(0, 240, 255, 0.5)",
            padding: "20px 32px",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            borderRadius: "24px"
          }}
        >
          {!quizSolved ? (
            /* Quiz Challenge State */
            <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "12px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <span style={{ fontSize: "1.8rem" }}>🤖❓</span>
                <strong style={{ fontSize: "1.3rem", color: "#ffd700" }}>
                  코딩 통과! 마지막으로 파이디의 퀴즈를 맞혀 봐요!
                </strong>
              </div>
              
              <p style={{ color: "white", fontSize: "1.15rem", fontWeight: "bold", marginLeft: "38px" }}>
                Q. {lesson.quiz.question}
              </p>

              <div style={{
                display: "flex",
                gap: "16px",
                marginLeft: "38px",
                marginTop: "6px",
                flexWrap: "wrap",
                animation: quizError ? "shake 0.3s" : "none"
              }}>
                {lesson.quiz.options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleQuizAnswer(opt)}
                    className="btn-cosmic btn-cyan"
                    style={{
                      padding: "10px 24px",
                      fontSize: "1.1rem",
                      background: "linear-gradient(135deg, #799f0c, #4b5563)",
                      border: "1.5px solid #ffd700"
                    }}
                  >
                    {opt}
                  </button>
                ))}
              </div>
              {quizError && (
                <span style={{ color: "#ef4444", fontSize: "0.95rem", marginLeft: "38px", fontWeight: "bold" }}>
                  아쉬워요! 임무 지침을 다시 떠올려 보고 다른 답을 골라 봐요!
                </span>
              )}
            </div>
          ) : (
            /* Quiz Solved & Ready for Game State */
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              flexWrap: "wrap",
              gap: "20px"
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "16px", flex: 1, minWidth: "260px" }}>
                <span style={{ fontSize: "2.5rem" }}>🎉⭐</span>
                <div>
                  <strong style={{ fontSize: "1.4rem", color: "#00f0ff" }}>임무 완료! 별 연료를 얻었어요!</strong>
                  <p style={{ color: "#e2e8f0", fontSize: "1.05rem", marginTop: "4px", lineHeight: "1.6" }}>
                    🤖 <strong>파이디:</strong> "{lesson.quiz.feedback}" 코드 창에서 숫자나 글자를 바꿔 보며 더 연습해도 좋아요!
                  </p>
                </div>
              </div>

              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                <button
                  onClick={() => onPlayGame(lesson.id)}
                  className="btn-cosmic btn-pink animate-pulse-cyan"
                  style={{ padding: "14px 26px", fontSize: "1.1rem", fontWeight: "900" }}
                >
                  🎮 복습 미니게임
                </button>
                {nextLessonId ? (
                  <button
                    onClick={() => goToLesson(nextLessonId)}
                    className="btn-cosmic btn-cyan"
                    style={{ padding: "14px 26px", fontSize: "1.1rem", fontWeight: "900" }}
                  >
                    다음 단계로 <ArrowRight size={18} />
                  </button>
                ) : (
                  <button onClick={onBack} className="btn-cosmic btn-cyan" style={{ padding: "14px 26px", fontSize: "1.1rem", fontWeight: "900" }}>
                    🎓 행성 지도로
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Main Workspace Layout (50:50 Side-by-Side balanced layout) */}
      <div className="workspace-layout" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", flexGrow: 1, alignItems: "start" }}>
        
        {/* LEFT COLUMN: Mission Instructions, Toggleable Hint, and Magic Keyboard */}
        <section style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          
          {/* Mission Checklist Panel */}
          <div className="glass-panel" style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "16px", borderColor: "rgba(255, 0, 127, 0.25)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h3 style={{ fontSize: "1.6rem", color: "#ff007f", margin: 0, display: "flex", alignItems: "center", gap: "8px" }}>
                🛸 임무 지침
              </h3>
              
              <div style={{ display: "flex", gap: "8px" }}>
                {/* Integrated Scratch vs Python Dictionary Toggle Button */}
                <button 
                  onClick={() => {
                    audioSynth.playBeep(800, 0.05);
                    setShowScratchCompareModal(true);
                  }}
                  className="btn-cosmic btn-outline"
                  style={{
                    padding: "6px 14px",
                    fontSize: "0.9rem",
                    height: "auto",
                    borderColor: "#bd00ff",
                    color: "#e879f9",
                    background: "rgba(189, 0, 255, 0.06)"
                  }}
                >
                  🐱 스크래치 사전
                </button>

                {/* Integrated Hint Toggle Button */}
                <button 
                  onClick={() => {
                    audioSynth.playBeep(900, 0.05);
                    setShowHint(!showHint);
                  }}
                  className={`btn-cosmic btn-outline ${showHint ? "active-hint-btn" : ""}`}
                  style={{
                    padding: "6px 14px",
                    fontSize: "0.9rem",
                    height: "auto",
                    borderColor: showHint ? "#ffd700" : "var(--color-panel-border)",
                    color: showHint ? "#ffd700" : "#ffffff",
                    background: showHint ? "rgba(255, 215, 0, 0.08)" : "none"
                  }}
                >
                  <HelpCircle size={15} /> {showHint ? "힌트 접기" : "힌트 보기"}
                </button>
              </div>
            </div>

            {/* 현재 레벨에서 배우는 파이썬 주문이 스크래치 어떤 블록과 같은지 한눈에 알려주는 알림 띠 */}
            {scratchRelationMap[lesson.id] && (
              <div style={{
                border: "1.5px dashed rgba(189, 0, 255, 0.25)",
                padding: "14px 18px",
                borderRadius: "16px",
                display: "flex",
                alignItems: "center",
                gap: "14px",
                background: "linear-gradient(90deg, rgba(153, 102, 255, 0.05), rgba(76, 151, 255, 0.05))"
              }}>
                <div style={{
                  background: scratchRelationMap[lesson.id].color,
                  color: "white",
                  padding: "8px 14px",
                  borderRadius: "8px",
                  fontFamily: "var(--font-ui)",
                  fontWeight: "bold",
                  fontSize: "0.9rem",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                  borderLeft: "5px solid rgba(0,0,0,0.15)",
                  whiteSpace: "nowrap"
                }}>
                  {scratchRelationMap[lesson.id].block}
                </div>
                <div style={{ fontSize: "0.95rem", color: "#cbd5e1", lineHeight: "1.4" }}>
                  🤖 <strong>파이디:</strong> "{scratchRelationMap[lesson.id].text}"
                </div>
              </div>
            )}

            <ul style={{ listStyleType: "none", display: "flex", flexDirection: "column", gap: "12px", padding: 0, margin: 0 }}>
              {lesson.instructions.map((inst, idx) => (
                <li 
                  key={idx} 
                  style={{
                    background: "rgba(255, 255, 255, 0.02)",
                    padding: "14px 18px",
                    borderRadius: "14px",
                    borderLeft: "5px solid #ff007f",
                    fontSize: "1.1rem",
                    lineHeight: "1.55",
                    color: "#f1f5f9"
                  }}
                >
                  <span style={{ fontWeight: "bold", marginRight: "8px", color: "#ff007f" }}>{idx + 1}.</span>
                  {inst}
                </li>
              ))}
            </ul>
          </div>

          {/* Expanded Yellow Glowing Hint Panel (Directly under instructions) */}
          {showHint && (
            <div className="glass-panel" style={{
              padding: "20px",
              background: "rgba(255, 215, 0, 0.06)",
              borderColor: "rgba(255, 215, 0, 0.45)",
              boxShadow: "0 0 20px rgba(255, 215, 0, 0.15)",
              borderRadius: "20px",
              animation: "float 4s ease-in-out infinite"
            }}>
              <h4 style={{ color: "#ffd700", fontWeight: "bold", marginBottom: "8px", display: "flex", alignItems: "center", gap: "6px", fontSize: "1.15rem", margin: 0 }}>
                💡 파이디의 마법 힌트
              </h4>
              <p style={{ fontSize: "1.08rem", color: "#fef08a", lineHeight: "1.6", whiteSpace: "pre-wrap", margin: "8px 0 0 0" }}>
                {getHintText()}
              </p>
              {!isSandbox && lesson.solution && (
                failCount >= 2 || isCompleted ? (
                  <div style={{ marginTop: "12px" }}>
                    <button
                      onClick={() => {
                        audioSynth.playSelect();
                        setShowSolution(!showSolution);
                      }}
                      className="btn-cosmic btn-outline"
                      style={{ padding: "8px 16px", fontSize: "0.95rem", borderColor: "#ffd700", color: "#ffd700" }}
                    >
                      🙋 {showSolution ? "정답 예시 접기" : "정답 예시 보기"}
                    </button>
                    {showSolution && (
                      <>
                        <div className="solution-box">{lesson.solution}</div>
                        <p style={{ color: "#fde68a", fontSize: "0.95rem", marginTop: "8px" }}>
                          복사하지 말고 한 글자씩 직접 따라 적어 봐요. 손으로 적어야 기억에 남아요! ✍️
                        </p>
                      </>
                    )}
                  </div>
                ) : (
                  <p style={{ color: "#fde68a", fontSize: "0.9rem", marginTop: "10px", opacity: 0.85 }}>
                    🙋 두 번 도전해 보고도 어려우면 여기서 정답 예시를 볼 수 있어요. (지금 {failCount}번 도전)
                  </p>
                )
              )}
            </div>
          )}

          {/* Quick Keyboard Panel */}
          <div className="glass-panel" style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "12px" }}>
            <h4 style={{ fontSize: "1.1rem", color: "#a5b4fc", margin: 0, fontWeight: "bold" }}>
              ⚡ 마법 퀵 키보드 (클릭하면 바로 코드가 적혀요!)
            </h4>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {quickKeys.map((key) => (
                <button
                  key={key.label}
                  onClick={() => handleInsertCode(key.text, key.back || 0)}
                  className="magic-key-btn"
                  style={{ padding: "8px 14px", fontSize: "1.05rem", ...(key.color ? { color: key.color, borderColor: key.color } : {}) }}
                >
                  {key.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* RIGHT COLUMN: Code Editor + Real-time Output Console */}
        <section style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          
          {/* Code Editor Panel */}
          <div className="glass-panel" style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "12px", background: "#0e0f24", borderRadius: "24px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h3 style={{ fontSize: "1.6rem", color: "#00f0ff", margin: 0, display: "flex", alignItems: "center", gap: "8px" }}>
                💻 지안이의 파이썬 코드 창
              </h3>
              <button onClick={handleResetCode} className="btn-cosmic btn-outline" style={{ padding: "6px 14px", fontSize: "0.9rem" }}>
                <RefreshCw size={14} /> 처음으로 돌리기
              </button>
            </div>

            {/* 설명 주석을 코드창 위쪽에 가이드 카드로 표시 */}
            {starterComments.length > 0 && (
              <div style={{
                background: "rgba(0, 240, 255, 0.05)",
                border: "1.5px solid rgba(0, 240, 255, 0.25)",
                borderRadius: "16px",
                padding: "14px 18px",
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                boxShadow: "0 0 15px rgba(0, 240, 255, 0.05)"
              }}>
                <div style={{
                  color: "#00f0ff",
                  fontWeight: "bold",
                  fontSize: "1.05rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px"
                }}>
                  <span>💡</span> 이번 관문 미션 가이드
                </div>
                <ul style={{
                  margin: 0,
                  paddingLeft: "20px",
                  color: "#cbd5e1",
                  fontSize: "1.05rem",
                  lineHeight: "1.6",
                  display: "flex",
                  flexDirection: "column",
                  gap: "4px"
                }}>
                  {starterComments.map((comment, index) => (
                    <li key={index}>{comment}</li>
                  ))}
                </ul>
              </div>
            )}

            <textarea
              ref={editorRef}
              value={code}
              onChange={(e) => setCode(e.target.value)}
              onFocus={handleEditorFocus}
              onBlur={handleEditorBlur}
              onKeyDown={handleKeyDown}
              style={{
                width: "100%",
                height: "220px",
                background: "#050614",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                borderRadius: "20px",
                color: "#f1f5f9",
                fontFamily: "monospace",
                fontSize: "1.2rem",
                padding: "20px",
                resize: "none",
                outline: "none",
                lineHeight: "1.6",
              }}
              placeholder="# 여기에 코드를 마음대로 적어 테스트해보세요!"
            />

            <button
              onClick={handleRunCode}
              disabled={isRunning}
              className="btn-cosmic btn-cyan"
              style={{
                width: "100%",
                padding: "16px",
                fontSize: "1.35rem",
                fontWeight: "900",
                borderRadius: "50px",
                boxShadow: isRunning ? "none" : "0 0 20px rgba(0, 240, 255, 0.35)"
              }}
            >
              {isRunning ? (
                <>Pydi가 계산하는 중...</>
              ) : (
                <>
                  <Play size={22} fill="white" /> 주문 외우기 (코드 실행)
                </>
              )}
            </button>
          </div>

          {/* Real-time Console Terminal */}
          <div className="glass-panel" style={{ flexGrow: 1, minHeight: "230px", display: "flex", flexDirection: "column", overflow: "hidden", borderRadius: "24px" }}>
            <div style={{
              display: "flex",
              background: "rgba(0,0,0,0.25)",
              borderBottom: "1.5px solid var(--color-panel-border)",
              padding: "12px 20px",
              alignItems: "center",
              gap: "8px",
              color: "#00f0ff",
              fontSize: "1.1rem",
              fontWeight: "bold"
            }}>
              <Terminal size={18} /> 콘솔 결과 확인 창 (Console)
            </div>

            <div style={{ padding: "20px", flexGrow: 1, background: "rgba(5, 6, 20, 0.65)", overflowY: "auto" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {error && (
                  <div style={{
                    background: "rgba(239, 68, 68, 0.06)",
                    border: "1px solid rgba(239, 68, 68, 0.25)",
                    padding: "14px 18px",
                    borderRadius: "16px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "6px"
                  }}>
                    <div style={{ color: "#f87171", fontWeight: "900", fontSize: "1.05rem", display: "flex", alignItems: "center", gap: "6px" }}>
                      ⚠️ 파이디의 에러 해결 도우미
                    </div>
                    <div style={{ color: "#fca5a5", fontSize: "1.05rem", lineHeight: "1.55", whiteSpace: "pre-wrap" }}>
                      {error}
                    </div>
                    {errorHint && (
                      <div style={{ color: "#fef08a", fontSize: "1rem", lineHeight: "1.5", borderTop: "1px dashed rgba(255, 215, 0, 0.3)", paddingTop: "8px" }}>
                        💡 이번 행성 힌트: {errorHint}
                      </div>
                    )}
                    {!isSandbox && failCount >= 2 && !showHint && (
                      <button
                        onClick={() => {
                          audioSynth.playBeep(900, 0.05);
                          setShowHint(true);
                        }}
                        className="btn-cosmic btn-outline"
                        style={{ alignSelf: "flex-start", padding: "6px 14px", fontSize: "0.9rem", borderColor: "#ffd700", color: "#ffd700" }}
                      >
                        <HelpCircle size={15} /> 힌트와 정답 예시 보기
                      </button>
                    )}
                  </div>
                )}

                {stdout && (
                  <div style={{ whiteSpace: "pre-wrap", fontFamily: "monospace", color: "#10b981", fontSize: "1.25rem", lineHeight: "1.45" }}>
                    {stdout}
                  </div>
                )}

                {!stdout && !error && (
                  <div style={{ color: "#4b5563", fontStyle: "italic", textAlign: "center", marginTop: "40px", fontSize: "1.05rem" }}>
                    코드 창에 마법을 적고 실행하면 결과가 여기에 나타나요! 미션 통과 후에도 마음껏 테스트해 봐요.
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}

export default function Workspace(props) {
  return <WorkspaceContent key={props.lessonId ?? "sandbox"} {...props} />;
}
