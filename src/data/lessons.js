// 지안이의 우주 파이썬 탐험대 레슨 데이터
// - id는 저장된 학습 기록과 연결되어 있어 바꾸지 않아요. 배우는 순서는 curriculum.js에서 정해요.
// - starterCode의 # 주석 줄은 코드 창 위 '미션 가이드' 카드로 따로 보여줘요.
// - solution은 아이가 막혔을 때 보여주는 '정답 예시'예요. (직접 따라 적도록 자동 입력은 하지 않아요)
// - level: "기본" 또는 "도전"(초2 수준보다 한 걸음 앞선 내용)

const out = (stdout) => stdout || "";
const lines = (stdout) => out(stdout).split("\n").map((line) => line.trim()).filter(Boolean);
// 주석(#) 줄을 빼고 실제 코드만 검사해요.
const codeOnly = (code) =>
  code
    .split("\n")
    .filter((line) => !line.trim().startsWith("#"))
    .join("\n");

export const lessons = [
  {
    id: 1,
    emoji: "👋",
    level: "기본",
    planet: "안녕 행성",
    title: "첫 인사! print()",
    goal: "print( )로 화면에 글자를 보여줘요.",
    story: "안녕 행성에 도착했어요! 로봇 친구 파이디에게 첫인사를 해 볼까요?\n\n컴퓨터에게 '화면에 보여줘!' 하고 시키는 주문은 print 예요.",
    instructions: [
      "코드 창에 print(\"안녕 파이디\") 라고 적어요.",
      "print는 '화면에 보여줘!'라는 뜻이에요. 꼭 소문자로 적어요.",
      "글자 양쪽에는 큰따옴표 \" \" 옷을 입혀요. 그래야 컴퓨터가 '이건 글자구나!' 하고 알아요.",
      "다 적었으면 [주문 외우기] 버튼을 눌러요!"
    ],
    starterCode: "# print를 써서 \"안녕 파이디\" 라고 말해 보세요!\n",
    solution: "print(\"안녕 파이디\")",
    hints: {
      NameError: "print 철자를 확인해요! 대문자 Print 나 printt 처럼 쓰면 컴퓨터가 못 알아들어요.",
      SyntaxError: "따옴표 \" 가 글자 앞뒤에 모두 있는지, 괄호 ( ) 가 잘 닫혔는지 봐요!"
    },
    validation: (code, stdout) => out(stdout).includes("안녕 파이디"),
    quiz: {
      question: "화면에 글자를 보여줄 때, 글자 양쪽에 꼭 입혀야 하는 옷(기호)은 무엇일까요?",
      options: ['큰따옴표 ( " " )', "물음표 ( ? )"],
      answer: '큰따옴표 ( " " )',
      feedback: "딩동댕! 글자에는 큰따옴표 옷을 입혀야 컴퓨터가 글자로 알아봐요. 🌟"
    },
    miniGame: {
      type: "balloon-pop",
      mode: "spell",
      title: "스펠링 풍선 터트리기!",
      description: "글자 풍선을 p → r → i → n → t 순서대로 톡! 터트려 print 를 완성해요!",
      word: "print",
      balloons: ["p", "r", "i", "n", "t"]
    }
  },
  {
    id: 2,
    emoji: "🏷️",
    level: "기본",
    planet: "글자와 숫자 행성",
    title: "글자와 숫자는 달라요",
    goal: "따옴표가 있으면 글자, 없으면 숫자예요.",
    story: "글자와 숫자 행성이에요. 파이썬 나라에서는 글자와 숫자를 다르게 생각해요.\n\n따옴표 옷을 입었는지 아닌지로 구분한답니다!",
    instructions: [
      "첫째 줄에 print(30) 을 적어요. 따옴표가 없는 30은 '숫자'예요.",
      "둘째 줄에 print(\"파이디\") 를 적어요. 따옴표를 입은 \"파이디\"는 '글자'예요.",
      "숫자는 따옴표 없이, 글자는 따옴표를 입혀서! 두 줄이 모두 나오면 성공이에요.",
      "🌟 더 해보기: print(\"30\") 도 적어 보세요. 화면에서는 똑같아 보이지만 이건 글자예요!"
    ],
    starterCode: "# 1. 첫째 줄: 숫자 30을 출력해요.\n# 2. 둘째 줄: 글자 \"파이디\"를 출력해요.\n",
    solution: "print(30)\nprint(\"파이디\")",
    hints: {
      NameError: "파이디 같은 글자는 꼭 따옴표로 감싸야 해요. \"파이디\" 처럼요!",
      SyntaxError: "따옴표가 글자 앞뒤에 짝으로 있는지 확인해요!"
    },
    validation: (code, stdout) => out(stdout).includes("30") && out(stdout).includes("파이디"),
    quiz: {
      question: "따옴표 없는 숫자 30은 따옴표를 입은 \"30\"과 무엇이 다를까요?",
      options: ["숫자 30은 계산을 할 수 있어요.", "둘은 완전히 똑같아요."],
      answer: "숫자 30은 계산을 할 수 있어요.",
      feedback: "정답! 따옴표 없는 숫자는 더하기, 빼기 같은 계산을 할 수 있어요. ⭐"
    },
    miniGame: {
      type: "balloon-pop",
      mode: "spell",
      title: "파이디 이름 풍선",
      description: "로봇 친구 파이디의 영어 이름 p → y → d → i 풍선을 순서대로 터트려요!",
      word: "pydi",
      balloons: ["p", "y", "d", "i"]
    }
  },
  {
    id: 3,
    emoji: "➕",
    level: "기본",
    planet: "별 계산 행성",
    title: "파이썬 계산기! 더하기와 빼기",
    goal: "+ 와 - 로 계산을 시켜요.",
    story: "계산 행성에 도착했어요. 파이썬은 계산을 아주 빠르게 하는 똑똑한 친구예요.\n\n우주선에 실을 별 사탕 개수를 계산해 볼까요?",
    instructions: [
      "print(5 + 7) 을 적어요. 파이썬이 대신 계산해서 12를 보여줘요.",
      "아랫줄에 print(10 - 4) 를 적어 빼기도 해 봐요.",
      "계산할 때는 따옴표를 쓰지 않아요. print(\"5 + 7\") 처럼 따옴표를 쓰면 계산하지 않고 글자 모양 그대로 나와요."
    ],
    starterCode: "# 1. 5 더하기 7 을 계산해서 출력해요.\n# 2. 10 빼기 4 를 계산해서 출력해요.\n",
    solution: "print(5 + 7)\nprint(10 - 4)",
    hints: {
      SyntaxError: "+ 나 - 앞뒤에 숫자가 모두 있는지, 괄호가 닫혔는지 봐요!"
    },
    validation: (code, stdout) => lines(stdout).includes("12") && lines(stdout).includes("6"),
    quiz: {
      question: "계산하지 않고 '5 + 7' 모양 그대로 보여주고 싶다면 어떻게 적을까요?",
      options: ['print("5 + 7")', "print(5 + 7)"],
      answer: 'print("5 + 7")',
      feedback: "훌륭해요! 따옴표 옷을 입히면 계산하지 않는 글자가 돼요. 🎨"
    },
    miniGame: {
      type: "balloon-pop",
      mode: "pick",
      title: "12 만들기 풍선",
      description: "계산하면 12가 되는 풍선 3개를 모두 찾아 톡! 터트려요.",
      target: "12",
      answers: ["5+7", "6+6", "15-3"],
      decoys: ["10-2", "9-4", "4+6"]
    }
  },
  {
    id: 4,
    emoji: "📦",
    level: "기본",
    planet: "마법 상자 행성",
    title: "이름표 상자! 변수",
    goal: "상자(변수)에 값을 담고 꺼내 봐요.",
    story: "상자 행성에 도착했어요. 파이썬에서는 값을 이름표 붙인 상자에 담아 두었다가 나중에 꺼내 쓸 수 있어요.\n\n이 상자를 '변수'라고 불러요.",
    instructions: [
      "첫 줄에 stars = 10 을 적어요. stars 라는 이름표 상자에 10을 넣는 거예요.",
      "여기서 = 는 '같다'가 아니에요! '오른쪽 값을 왼쪽 상자에 넣어라'라는 뜻이에요.",
      "둘째 줄에 print(stars) 를 적어요. 상자 이름에는 따옴표를 쓰지 않아요.",
      "🌟 더 해보기: print(stars + 5) 도 적어 보세요. 상자 속 값으로 계산할 수 있어요!"
    ],
    starterCode: "# 1. stars 상자에 숫자 10을 담아요.\n# 2. stars 상자를 출력해요.\n",
    solution: "stars = 10\nprint(stars)",
    hints: {
      NameError: "상자를 먼저 만들고 나서 열어야 해요! stars = 10 이 print(stars) 보다 위에 있는지 봐요. 철자도 똑같은지 확인해요.",
      SyntaxError: "stars = 10 처럼 상자 이름이 왼쪽, 값이 오른쪽에 있는지 봐요!"
    },
    validation: (code, stdout) =>
      lines(stdout).includes("10") && /stars\s*=/.test(codeOnly(code)) && /print\(\s*stars/.test(codeOnly(code)),
    quiz: {
      question: "stars = 10 에서 = 기호는 무슨 일을 할까요?",
      options: ["오른쪽 값 10을 왼쪽 상자 stars에 넣어요.", "stars와 10이 같은지 물어봐요."],
      answer: "오른쪽 값 10을 왼쪽 상자 stars에 넣어요.",
      feedback: "딩동댕! '상자이름 = 값' 으로 적으면 오른쪽 값이 왼쪽 상자에 쏙 들어가요. 📦"
    },
    miniGame: {
      type: "code-defense",
      title: "숫자 바이러스 막기!",
      description: "다가오는 값이 숫자면 [숫자 대포], 따옴표를 입은 글자면 [글자 대포]를 쏘아요!",
      enemies: [
        { label: "10", type: "number" },
        { label: '"안녕"', type: "string" },
        { label: "500", type: "number" },
        { label: '"로봇"', type: "string" },
        { label: "77", type: "number" }
      ]
    }
  },
  {
    id: 5,
    emoji: "📢",
    level: "기본",
    planet: "우주 확성기 행성",
    title: "글자 이어 붙이기! +",
    goal: "글자끼리 + 하면 이어 붙여져요.",
    story: "우주 확성기 행성이에요. 글자 조각들을 풀칠하듯 이어 붙여서 크게 인사해 볼까요?",
    instructions: [
      "첫 줄에 name = \"지안\" 을 적어 이름 상자를 만들어요.",
      "둘째 줄에 print(\"안녕 \" + name) 을 적어요.",
      "글자끼리 + 를 하면 계산이 아니라 풀칠처럼 이어 붙여요. \"안녕 \" 뒤의 빈칸 덕분에 '안녕 지안'으로 띄어져 나와요.",
      "🌟 더 해보기: name 상자에 친구 이름을 넣어 보세요!"
    ],
    starterCode: "# 1. name 상자에 글자 \"지안\"을 담아요.\n# 2. \"안녕 \" 과 name 을 + 로 이어서 출력해요.\n",
    solution: "name = \"지안\"\nprint(\"안녕 \" + name)",
    hints: {
      NameError: "name 상자를 먼저 만들었는지, 철자가 똑같은지 봐요. \"지안\"에는 따옴표가 있어야 해요!",
      TypeError: "글자와 숫자는 + 로 붙일 수 없어요. 글자끼리 붙여 주세요."
    },
    validation: (code, stdout) => out(stdout).replace(/\s+/g, "").includes("안녕") && /name/.test(codeOnly(code)) && /\+/.test(codeOnly(code)),
    quiz: {
      question: "print(\"우주\" + \"선\") 을 실행하면 무엇이 나올까요?",
      options: ["우주선", "우주 + 선"],
      answer: "우주선",
      feedback: "정답! 글자끼리 + 를 하면 하나로 착 붙어요. ✨"
    },
    miniGame: {
      type: "code-defense",
      title: "글자 바이러스 막기!",
      description: "따옴표 옷을 입은 글자에는 [글자 대포], 숫자에는 [숫자 대포]를 쏘아요!",
      enemies: [
        { label: '"우주선"', type: "string" },
        { label: "123", type: "number" },
        { label: '"별나라"', type: "string" },
        { label: "9", type: "number" },
        { label: '"파이디"', type: "string" }
      ]
    }
  },
  {
    id: 6,
    emoji: "💬",
    level: "기본",
    planet: "우주 번역 행성",
    title: "내가 좋아하는 것! 상자 여러 개",
    goal: "상자를 여러 개 만들어 문장을 만들어요.",
    story: "우주 번역 행성에 왔어요. 지안이가 좋아하는 것들을 상자에 담아서 외계인 친구에게 소개해 봐요!",
    instructions: [
      "첫 줄에 food = \"피자\" 를 적어요. (진짜 좋아하는 음식으로 바꿔도 좋아요!)",
      "둘째 줄에 color = \"파랑\" 을 적어요. 상자는 여러 개 만들 수 있어요.",
      "셋째 줄에 print(\"내가 좋아하는 음식은 \" + food) 를 적어요.",
      "넷째 줄에 print(\"내가 좋아하는 색은 \" + color) 를 적고 실행해요."
    ],
    starterCode: "# 1. food 상자와 color 상자를 만들어요.\n# 2. 두 상자를 써서 문장 두 개를 출력해요.\n",
    solution: "food = \"피자\"\ncolor = \"파랑\"\nprint(\"내가 좋아하는 음식은 \" + food)\nprint(\"내가 좋아하는 색은 \" + color)",
    hints: {
      NameError: "food, color 상자를 print 보다 먼저 만들었는지, 철자가 똑같은지 봐요!",
      SyntaxError: "따옴표와 괄호의 짝이 맞는지 하나씩 세어 봐요!"
    },
    validation: (code, stdout) => out(stdout).includes("내가 좋아하는 음식은") && out(stdout).includes("내가 좋아하는 색은"),
    quiz: {
      question: "food = \"피자\" 다음 줄에 food = \"치킨\" 이라고 적으면, food 상자에는 무엇이 들어 있을까요?",
      options: ["치킨", "피자"],
      answer: "치킨",
      feedback: "정답! 상자에 새 값을 넣으면 예전 값은 빠지고 새 값으로 바뀌어요. 🍗"
    },
    miniGame: {
      type: "code-defense",
      title: "섞여 오는 바이러스 막기",
      description: "글자와 숫자가 섞여서 와요! 알맞은 대포를 골라 쏘아요.",
      enemies: [
        { label: "100", type: "number" },
        { label: '"피자"', type: "string" },
        { label: '"콜라"', type: "string" },
        { label: "88", type: "number" },
        { label: '"치킨"', type: "string" }
      ]
    }
  },
  {
    id: 7,
    emoji: "⚖️",
    level: "기본",
    planet: "참과 거짓 행성",
    title: "맞아? 틀려? True와 False",
    goal: "> < == 로 비교하면 True나 False로 대답해요.",
    story: "참과 거짓 행성이에요. 파이썬에게 '이게 더 크니?' 하고 물어보면, 맞으면 True(참), 틀리면 False(거짓)로 대답해요.",
    instructions: [
      "print(10 > 5) 를 적어요. > 는 '왼쪽이 더 크니?' 하고 묻는 기호예요. 수학 시간에 배운 > 와 같아요.",
      "아랫줄에 print(3 > 8) 도 적어요. 이번엔 뭐라고 대답할지 먼저 생각해 보고 실행해요!",
      "'같니?' 하고 물을 때는 = 를 두 개 붙인 == 를 써요. 예: print(5 == 5)",
      "True와 False 가 모두 나오면 성공이에요."
    ],
    starterCode: "# 1. 10 이 5 보다 큰지 물어봐요.\n# 2. 3 이 8 보다 큰지 물어봐요.\n",
    solution: "print(10 > 5)\nprint(3 > 8)",
    hints: {
      SyntaxError: "'같니?'는 == (등호 두 개)예요. = 하나만 쓰면 에러가 나요!",
      NameError: "True, False 는 첫 글자만 대문자예요."
    },
    validation: (code, stdout) => out(stdout).includes("True") && out(stdout).includes("False"),
    quiz: {
      question: "print(2 > 9) 를 실행하면 무엇이 나올까요?",
      options: ["False", "True"],
      answer: "False",
      feedback: "정답! 2는 9보다 크지 않으니까 틀렸다는 뜻의 False 가 나와요. ⚖️"
    },
    miniGame: {
      type: "rhythm-beat",
      title: "참과 거짓 리듬 댄스!",
      description: "음표가 판정선에 오면, 식이 맞으면 [O], 틀리면 [X]를 눌러요!",
      beats: [
        { expr: "10 > 5", expect: "O" },
        { expr: "3 > 8", expect: "X" },
        { expr: "5 == 5", expect: "O" }
      ]
    }
  },
  {
    id: 8,
    emoji: "🚧",
    level: "기본",
    planet: "우주 관문 행성",
    title: "만약에~ 라면! if",
    goal: "if로 조건이 맞을 때만 실행해요.",
    story: "우주 관문 행성이에요. 장애물이 가까이 오면 경보를 울려야 해요!\n\n'만약 ~라면' 하고 조건을 거는 주문이 if 예요.",
    instructions: [
      "장애물까지의 거리가 distance 상자에 3 으로 들어 있어요.",
      "둘째 줄에 if distance < 5: 를 적어요. '만약 거리가 5보다 작다면'이라는 뜻이에요. 끝의 쌍점 : 을 잊지 마세요!",
      "Enter 를 누른 다음 Tab 키로 안쪽으로 들어가서 print(\"삐삐!\") 를 적어요. 안쪽으로 들어간 줄은 조건이 맞을 때만 실행돼요.",
      "🌟 더 해보기: distance 를 10으로 바꾸면 경보가 울릴까요?"
    ],
    starterCode: "# if 로 거리가 5보다 작으면 \"삐삐!\" 경보를 울려요.\ndistance = 3\n",
    solution: "distance = 3\nif distance < 5:\n    print(\"삐삐!\")",
    hints: {
      IndentationError: "if 아랫줄은 Tab 키를 눌러 안쪽으로 밀어 써야 해요!",
      SyntaxError: "if distance < 5 끝에 쌍점 : 이 있는지 확인해요!"
    },
    validation: (code, stdout) => out(stdout).includes("삐삐") && /\bif\b/.test(codeOnly(code)),
    quiz: {
      question: "if 아랫줄 코드를 안쪽으로 밀어 쓸(들여쓰기) 때 누르는 키는 무엇일까요?",
      options: ["Tab 키", "Enter 키"],
      answer: "Tab 키",
      feedback: "훌륭해요! Tab 키(또는 스페이스바 4번)로 밀어 써야 'if 안쪽'으로 인정돼요. 🚧"
    },
    miniGame: {
      type: "shield-defense",
      title: "if 조건 실드 디펜스",
      description: "다가오는 조건이 맞으면(True) [True 실드], 틀리면(False) [False 실드]로 막아요!",
      lanes: ["True 실드", "False 실드"],
      obstacles: [
        { label: "distance < 5 (distance = 3)", dangerLane: 1, safeLane: 0, hazard: "if 운석", success: "방어 성공! 3은 5보다 작으니 True예요. 🛡️" },
        { label: "distance > 10 (distance = 3)", dangerLane: 0, safeLane: 1, hazard: "조건 운석", success: "방어 성공! 3은 10보다 크지 않으니 False예요. 🛡️" },
        { label: "distance == 3 (distance = 3)", dangerLane: 1, safeLane: 0, hazard: "비교 운석", success: "정확해요! 두 값이 같으니 True예요. 🛡️" }
      ]
    }
  },
  {
    id: 9,
    emoji: "🛂",
    level: "기본",
    planet: "우주 검사소 행성",
    title: "두 갈래 길! if-else",
    goal: "조건이 맞을 때와 아닐 때 다르게 행동해요.",
    story: "우주 검사소 행성이에요. 에너지가 충분하면 출발하고, 모자라면 충전하러 가야 해요.\n\n'그렇지 않으면'을 뜻하는 else 를 배워 봐요.",
    instructions: [
      "if energy >= 50: 을 적고, 다음 줄 안쪽(Tab)에 print(\"출발!\") 을 적어요. >= 는 '크거나 같다(이상)'예요.",
      "그다음 줄은 다시 왼쪽 끝으로 나와서 else: 를 적어요. else 는 '그렇지 않으면'이에요.",
      "else: 아랫줄 안쪽(Tab)에 print(\"충전 필요\") 를 적고 실행해요.",
      "🌟 더 해보기: energy 를 30으로 바꾸면 어느 길로 갈까요?"
    ],
    starterCode: "# 에너지가 50 이상이면 \"출발!\", 아니면 \"충전 필요\" 를 출력해요.\nenergy = 80\n",
    solution: "energy = 80\nif energy >= 50:\n    print(\"출발!\")\nelse:\n    print(\"충전 필요\")",
    hints: {
      SyntaxError: "if 줄과 else 줄 끝에 모두 쌍점 : 이 있는지, else 가 if 와 같은 왼쪽 끝에 있는지 봐요!",
      IndentationError: "if 아래 print 와 else 아래 print 모두 Tab 으로 안쪽에 있어야 해요."
    },
    validation: (code, stdout) =>
      (out(stdout).includes("출발!") || out(stdout).includes("충전 필요")) && /\belse\s*:/.test(codeOnly(code)),
    quiz: {
      question: "if 조건이 틀렸을 때 실행할 길을 만드는 단어는 무엇일까요?",
      options: ["else", "if"],
      answer: "else",
      feedback: "정답! else: 아래 안쪽에 적은 코드는 if 조건이 틀렸을 때 실행돼요. 🛂"
    },
    miniGame: {
      type: "shield-defense",
      title: "if-else 실드 디펜스",
      description: "조건이 맞으면(True) [True 실드], 틀리면(False) [False 실드]로 우주선을 지켜요!",
      lanes: ["True 실드", "False 실드"],
      obstacles: [
        { label: "energy >= 50 (energy = 80)", dangerLane: 1, safeLane: 0, hazard: "출발 관문", success: "방어 성공! 80은 50 이상이니 True, if 길로 가요. 🛡️" },
        { label: "energy < 50 (energy = 80)", dangerLane: 0, safeLane: 1, hazard: "충전 관문", success: "방어 성공! 80은 50보다 작지 않으니 False예요. 🛡️" },
        { label: "energy >= 50 (energy = 30)", dangerLane: 0, safeLane: 1, hazard: "갈림길 운석", success: "맞아요! 30은 50보다 작으니 False, else 길로 가요. 🛡️" }
      ]
    }
  },
  {
    id: 10,
    emoji: "🌀",
    level: "기본",
    planet: "은하수 행성",
    title: "별 그리기! for 반복",
    goal: "for로 같은 일을 여러 번 반복해요.",
    story: "은하수 행성에 왔어요. 별을 하나씩 다섯 번 그리기는 귀찮죠?\n\n똑같은 일을 여러 번 시키는 반복 주문 for 를 써 봐요.",
    instructions: [
      "먼저 그대로 실행해 봐요. 별이 몇 개 나오나요?",
      "for i in range(3): 은 '아래 안쪽 줄을 3번 반복해!'라는 뜻이에요. 스크래치의 [3번 반복하기]와 같아요.",
      "3을 5로 바꿔서 별 5개를 그려 봐요!",
      "🌟 더 해보기: 안쪽에 print(i) 를 넣어 보면 i가 0, 1, 2… 로 바뀌어요. 파이썬은 0부터 세요!"
    ],
    starterCode: "# 숫자를 바꿔서 별을 5개 그려요.\nfor i in range(3):\n    print(\"★\")\n",
    solution: "for i in range(5):\n    print(\"★\")",
    hints: {
      IndentationError: "for 아랫줄도 if 처럼 Tab 으로 안쪽에 써야 해요!",
      SyntaxError: "for i in range(5) 끝에 쌍점 : 이 있는지 봐요!"
    },
    validation: (code, stdout) => (out(stdout).match(/★/g) || []).length >= 5 && /\bfor\b/.test(codeOnly(code)),
    quiz: {
      question: "for i in range(5): 아래 안쪽 줄은 몇 번 실행될까요?",
      options: ["5번", "10번"],
      answer: "5번",
      feedback: "정답! range 괄호 안의 숫자만큼 반복해요. 🌀"
    },
    miniGame: {
      type: "balloon-pop",
      mode: "pick",
      title: "별 풍선 3개 터트리기",
      description: "for 가 3번 반복하듯, 별 ★ 풍선만 3개 터트려요. 해골과 폭탄은 피해요!",
      answers: ["★", "★", "★"],
      decoys: ["💀", "💣", "🚫"]
    }
  },
  {
    id: 11,
    emoji: "🌤️",
    level: "기본",
    planet: "우주 날씨 행성",
    title: "날씨 물어보기! magic.get_weather()",
    goal: "마법 명령으로 정보를 받아 상자에 담아요.",
    story: "우주 날씨 행성이에요. 우주 기상청에 '오늘 날씨 어때?' 하고 물어보면 대답을 보내 줘요.\n\n이렇게 다른 곳에 정보를 물어보고 받아오는 통로를 API 라고 불러요.",
    instructions: [
      "첫 줄의 magic.get_weather() 는 기상청에 날씨를 물어보는 마법이에요. 대답은 today_weather 상자에 담겨요.",
      "둘째 줄에 print(\"오늘 날씨는 \" + today_weather) 를 적어요.",
      "여러 번 실행해 보세요. 실행할 때마다 날씨가 바뀔 수도 있어요!"
    ],
    starterCode: "# 받아온 날씨를 \"오늘 날씨는 \" 글자와 이어서 출력해요.\ntoday_weather = magic.get_weather()\n",
    solution: "today_weather = magic.get_weather()\nprint(\"오늘 날씨는 \" + today_weather)",
    hints: {
      AttributeError: "magic.get_weather() 철자와 점(.)을 확인해요!",
      NameError: "today_weather 상자 이름의 철자가 첫 줄과 똑같은지 봐요."
    },
    validation: (code, stdout) =>
      out(stdout).includes("오늘 날씨는") &&
      ["맑음", "비", "눈", "구름"].some((word) => out(stdout).includes(word)) &&
      codeOnly(code).includes("magic.get_weather"),
    quiz: {
      question: "우주 기상청에서 날씨를 받아오는 마법 명령은 무엇이었나요?",
      options: ["magic.get_weather()", "magic.show_cat()"],
      answer: "magic.get_weather()",
      feedback: "정답! get_weather 는 '날씨 가져오기'라는 뜻이에요. 🌤️"
    },
    miniGame: {
      type: "api-connect",
      title: "날씨 안테나 연결",
      description: "기상청에 날씨를 물어보는 알맞은 마법 명령을 골라 안테나를 연결해요!",
      targetRequest: "날씨 연결",
      options: [
        { code: "magic.get_weather()", isCorrect: true, feedback: "정답! 기상청 연결 성공! 📡☀️" },
        { code: "magic.show_cat()", isCorrect: false, feedback: "이건 고양이 구조 명령이에요." }
      ]
    }
  },
  {
    id: 12,
    emoji: "🐱",
    level: "기본",
    planet: "고양이 구조 행성",
    title: "고양이 구조! magic.show_cat()",
    goal: "남이 만든 마법 명령을 불러 써요.",
    story: "고양이 구조 행성이에요! 길 잃은 우주 아기 고양이를 구조해야 해요.\n\n다행히 다른 탐험가가 고양이 구조 마법을 미리 만들어 두었어요. 우리는 불러 쓰기만 하면 돼요!",
    instructions: [
      "magic.show_cat() 을 적고 실행해요. (아래 퀵 키보드 버튼을 눌러도 돼요)",
      "magic 은 마법 명령이 잔뜩 들어 있는 '마법 상자'예요. 점(.) 뒤에 명령 이름을 적으면 꺼내 쓸 수 있어요.",
      "끝의 괄호 ( ) 는 '지금 실행해!'라는 신호예요. 괄호를 빼먹으면 실행되지 않아요.",
      "🌟 더 해보기: 두 줄 적으면 고양이가 몇 마리 나올까요?"
    ],
    starterCode: "# magic.show_cat() 으로 우주 고양이를 구조해요!\n",
    solution: "magic.show_cat()",
    hints: {
      AttributeError: "magic.show_cat() 철자를 확인해요. 밑줄 _ 이 있어요!",
      NameError: "magic 철자가 맞는지 확인해요. 모두 소문자예요."
    },
    validation: (code, stdout) => out(stdout).includes("야옹") && codeOnly(code).includes("magic.show_cat"),
    quiz: {
      question: "아기 고양이를 구조하는 마법 명령은 무엇일까요?",
      options: ["magic.show_cat()", "magic.get_weather()"],
      answer: "magic.show_cat()",
      feedback: "정답! show_cat 은 '고양이 보여주기'라는 뜻이에요. 🐱🐾"
    },
    miniGame: {
      type: "api-connect",
      title: "고양이 구조 전파",
      description: "고양이 구조대에 연결되는 알맞은 마법 명령을 골라요!",
      targetRequest: "고양이 구조",
      options: [
        { code: "magic.show_cat()", isCorrect: true, feedback: "정답! 고양이 구조 성공! 📡🐾" },
        { code: "magic.get_weather()", isCorrect: false, feedback: "이건 날씨를 물어보는 명령이에요." }
      ]
    }
  },
  {
    id: 13,
    emoji: "✖️",
    level: "기본",
    planet: "우주 복제 행성",
    title: "연료 복제! 곱하기 *",
    goal: "* 기호로 곱셈을 해요.",
    story: "우주 복제 행성이에요. 연료 통이 5개씩 3묶음 있으면 모두 몇 개일까요?\n\n수학 시간에 배우는 곱셈을 파이썬에게 시켜 봐요!",
    instructions: [
      "파이썬에서 곱하기는 × 대신 별표 * 를 써요. (키보드 Shift + 8)",
      "print(5 * 3) 을 적어서 15가 나오는지 확인해요.",
      "아랫줄에 내가 아는 곱셈 하나를 더 적어 봐요. 예: print(7 * 8)",
      "🔥 더 해보고 싶다면: 나누기는 / 를 써요. print(10 / 2) 는 5.0 처럼 점(.)이 붙어 나와요."
    ],
    starterCode: "# 1. 5 곱하기 3 을 계산해서 출력해요.\n# 2. 내가 아는 곱셈을 하나 더 출력해요.\n",
    solution: "print(5 * 3)\nprint(7 * 8)",
    hints: {
      SyntaxError: "곱하기는 x 나 × 가 아니라 별표 * 예요!",
      NameError: "곱하기에 알파벳 x 를 쓰면 파이썬이 상자 이름인 줄 알아요. 별표 * 를 써요!"
    },
    validation: (code, stdout) => lines(stdout).includes("15") && codeOnly(code).includes("*"),
    quiz: {
      question: "친구 3명에게 사탕을 5개씩 나눠 주려면 모두 몇 개가 필요할까요? 알맞은 코드는?",
      options: ["print(5 * 3)", "print(5 + 3)"],
      answer: "print(5 * 3)",
      feedback: "딩동댕! 5개씩 3명이니까 5 * 3 = 15개예요. 🍬"
    },
    miniGame: {
      type: "balloon-pop",
      mode: "pick",
      title: "15 만들기 풍선",
      description: "계산하면 15가 되는 풍선 3개를 모두 터트려 연료를 복제해요!",
      target: "15",
      answers: ["5*3", "3*5", "10+5"],
      decoys: ["5*2", "4*4", "10+4"]
    }
  },
  {
    id: 14,
    emoji: "💎",
    level: "도전",
    planet: "우주 배분 행성",
    title: "보석 나누기! 몫 // 과 나머지 %",
    goal: "나눠 갖고 남은 개수를 계산해요.",
    story: "🔥 도전 행성이에요! 3학년에서 배울 나눗셈을 미리 맛봐요.\n\n보석 10개를 친구 3명이 똑같이 나눠 가지면, 한 명이 몇 개씩 갖고 몇 개가 남을까요?",
    instructions: [
      "print(10 // 3) 을 적어요. 슬래시 두 개 // 는 '한 명이 몇 개씩 받는지(몫)'를 알려줘요.",
      "아랫줄에 print(10 % 3) 을 적어요. 퍼센트 % 는 '나눠 주고 남은 개수(나머지)'를 알려줘요.",
      "3개씩 3명이면 9개, 10개에서 9개를 주고 나면 1개가 남죠? 3 과 1 이 나오면 성공!"
    ],
    starterCode: "# 1. 10 을 3 으로 나눈 몫(//)을 출력해요.\n# 2. 10 을 3 으로 나눈 나머지(%)를 출력해요.\n",
    solution: "print(10 // 3)\nprint(10 % 3)",
    hints: {
      ZeroDivisionError: "0으로는 나눌 수 없어요! 나누는 수가 3인지 확인해요.",
      SyntaxError: "// 는 슬래시 두 개를 붙여 써요. 띄우면 안 돼요!"
    },
    validation: (code, stdout) =>
      lines(stdout).includes("3") && lines(stdout).includes("1") && codeOnly(code).includes("//") && codeOnly(code).includes("%"),
    quiz: {
      question: "나눠 주고 '남은 개수'만 알고 싶을 때 쓰는 기호는 무엇일까요?",
      options: ["퍼센트 ( % )", "슬래시 두 개 ( // )"],
      answer: "퍼센트 ( % )",
      feedback: "정답! % 는 나머지, // 는 몫을 알려줘요. 💎"
    },
    miniGame: {
      type: "rhythm-beat",
      title: "나머지 리듬 게임!",
      description: "음표가 판정선에 오면, 식이 맞으면 [O], 틀리면 [X]를 눌러요!",
      beats: [
        { expr: "10 % 3 == 1", expect: "O" },
        { expr: "5 % 2 == 0", expect: "X" },
        { expr: "12 // 5 == 2", expect: "O" }
      ]
    }
  },
  {
    id: 15,
    emoji: "🔁",
    level: "기본",
    planet: "글자 도장 행성",
    title: "글자 도장 찍기! 글자 * 숫자",
    goal: "글자에 숫자를 곱하면 여러 번 반복돼요.",
    story: "글자 도장 행성이에요. 파이썬에서는 글자에 숫자를 곱하면 도장을 찍듯 여러 번 반복해 줘요!",
    instructions: [
      "먼저 print(\"하\" * 2) 를 그대로 실행해 봐요. 무엇이 나오나요?",
      "글자 * 숫자 는 그 글자를 숫자만큼 도장 찍어 줘요.",
      "2를 5로 바꿔서 \"하하하하하\" 가 나오게 해 봐요!",
      "🌟 더 해보기: print(\"★\" * 10) 으로 별 10개도 만들어 봐요. (★ 는 이 글자를 복사해서 붙여넣어도 돼요)"
    ],
    starterCode: "# 숫자를 바꿔서 \"하하하하하\" 를 만들어요.\nprint(\"하\" * 2)\n",
    solution: "print(\"하\" * 5)",
    hints: {
      TypeError: "글자끼리는 곱할 수 없어요. 글자 * 숫자 로 적어요!"
    },
    validation: (code, stdout) => out(stdout).includes("하하하하하") && codeOnly(code).includes("*"),
    quiz: {
      question: "print(\"호\" * 3) 을 실행하면 무엇이 나올까요?",
      options: ["호호호", "호3"],
      answer: "호호호",
      feedback: "최고예요! 곱한 숫자만큼 글자가 반복돼요. 🔁"
    },
    miniGame: {
      type: "balloon-pop",
      mode: "pick",
      title: "호호호 풍선 찾기",
      description: "\"호호호\" 를 만드는 코드 풍선을 찾아 터트려요!",
      target: "호호호",
      answers: ['"호"*3'],
      decoys: ['"호"*4', '"호호"*3', '"호"+3']
    }
  },
  {
    id: 16,
    emoji: "🙅",
    level: "기본",
    planet: "우주 천칭 행성",
    title: "서로 달라요! !=",
    goal: "!= 로 '서로 다르니?' 하고 물어봐요.",
    story: "우주 천칭 행성이에요. '같니?'는 == 로 물어봤죠?\n\n이번에는 '서로 다르니?' 하고 물어보는 방법을 배워요.",
    instructions: [
      "먼저 print(5 == 3) 을 그대로 실행해요. 5와 3은 같지 않으니 False 가 나와요.",
      "== 를 != 로 바꿔서 실행해 봐요.",
      "! 는 '아니다'라는 뜻이에요. 그래서 != 는 '같지 않다(다르다)'예요. 5와 3은 다르니까 True!"
    ],
    starterCode: "# == 를 != 로 바꿔서 True 가 나오게 해요.\nprint(5 == 3)\n",
    solution: "print(5 != 3)",
    hints: {
      SyntaxError: "느낌표가 먼저 와요! =! 가 아니라 != 예요."
    },
    validation: (code, stdout) => out(stdout).includes("True") && codeOnly(code).includes("!="),
    quiz: {
      question: "두 값이 '서로 다른지' 물어볼 때 쓰는 기호는 무엇일까요?",
      options: ["!=", "=="],
      answer: "!=",
      feedback: "정답! == 는 '같니?', != 는 '다르니?' 하고 물어봐요. 🌈"
    },
    miniGame: {
      type: "shield-defense",
      title: "다르니? 실드 디펜스",
      description: "!= 식이 맞으면(True) [True 실드], 틀리면(False) [False 실드]로 막아요!",
      lanes: ["True 실드", "False 실드"],
      obstacles: [
        { label: "5 != 5", dangerLane: 0, safeLane: 1, hazard: "쌍둥이 외계인", success: "방어 성공! 5와 5는 같으니 '다르다'는 틀렸어요. False! 🛡️" },
        { label: "10 != 3", dangerLane: 1, safeLane: 0, hazard: "비교 외계인", success: "방어 성공! 10과 3은 다르니까 True예요. 🛡️" },
        { label: "'A' != 'B'", dangerLane: 1, safeLane: 0, hazard: "문자 외계인", success: "방어 성공! A와 B는 다른 글자라서 True예요. 🛡️" }
      ]
    }
  },
  {
    id: 17,
    emoji: "🔑",
    level: "기본",
    planet: "쌍둥이 관문 행성",
    title: "둘 다 맞아야 해! and",
    goal: "and 는 양쪽이 모두 맞아야 True예요.",
    story: "쌍둥이 관문 행성이에요. 이 문은 열쇠 두 개가 모두 맞아야 열려요!",
    instructions: [
      "먼저 그대로 실행해 봐요. 왜 False 가 나올까요?",
      "and 는 '그리고'예요. 양쪽이 둘 다 맞아야(True) True 가 돼요. 3 > 5 가 틀려서 False 가 나왔어요.",
      "3 > 5 를 3 < 5 로 바꿔서 True 가 나오게 해 봐요!"
    ],
    starterCode: "# 식을 고쳐서 True 가 나오게 해요.\nprint(10 > 5 and 3 > 5)\n",
    solution: "print(10 > 5 and 3 < 5)",
    hints: {
      NameError: "and 는 모두 소문자로 적어요."
    },
    validation: (code, stdout) =>
      lines(stdout).includes("True") && !out(stdout).includes("False") && /\band\b/.test(codeOnly(code)),
    quiz: {
      question: "print(5 > 1 and 2 > 9) 를 실행하면 무엇이 나올까요?",
      options: ["False", "True"],
      answer: "False",
      feedback: "훌륭해요! 5 > 1 은 맞지만 2 > 9 가 틀렸어요. and 는 하나라도 틀리면 False! 🔑"
    },
    miniGame: {
      type: "code-defense",
      title: "and 관문 방어",
      description: "식의 결과가 True 면 [True 대포], False 면 [False 대포]를 쏘아요!",
      defenseOptions: [
        { type: "string", label: "✅ True 대포 발사", className: "btn-cyan" },
        { type: "number", label: "❌ False 대포 발사", className: "btn-pink" }
      ],
      enemies: [
        { label: "True and True", type: "string" },
        { label: "True and False", type: "number" },
        { label: "5 > 3 and 2 < 4", type: "string" },
        { label: "4 > 10 and 5 == 5", type: "number" }
      ]
    }
  },
  {
    id: 18,
    emoji: "🚪",
    level: "기본",
    planet: "자유의 길 행성",
    title: "하나만 맞아도 좋아! or",
    goal: "or 는 하나만 맞아도 True예요.",
    story: "자유의 길 행성이에요. 이 문은 둘 중 하나만 맞아도 열어 주는 너그러운 문이에요.",
    instructions: [
      "먼저 그대로 실행해 봐요. 양쪽 다 틀려서 False 가 나와요.",
      "or 는 '또는'이에요. 둘 중 하나만 맞아도 True 가 돼요.",
      "둘 중 하나만 고쳐서 True 가 나오게 해 봐요. 예: 3 > 5 를 3 < 5 로!"
    ],
    starterCode: "# 한쪽만 고쳐서 True 가 나오게 해요.\nprint(5 > 10 or 3 > 5)\n",
    solution: "print(5 > 10 or 3 < 5)",
    hints: {
      NameError: "or 는 모두 소문자로 적어요."
    },
    validation: (code, stdout) =>
      lines(stdout).includes("True") && !out(stdout).includes("False") && /\bor\b/.test(codeOnly(code)),
    quiz: {
      question: "print(5 > 10 or 3 < 5) 를 실행하면 무엇이 나올까요?",
      options: ["True", "False"],
      answer: "True",
      feedback: "정답! 5 > 10 은 틀렸지만 3 < 5 가 맞으니까 True예요. 🚪"
    },
    miniGame: {
      type: "code-defense",
      title: "or 자유 관문 방어",
      description: "식의 결과가 True 면 [True 대포], False 면 [False 대포]를 쏘아요!",
      defenseOptions: [
        { type: "string", label: "✅ True 대포 발사", className: "btn-cyan" },
        { type: "number", label: "❌ False 대포 발사", className: "btn-pink" }
      ],
      enemies: [
        { label: "False or True", type: "string" },
        { label: "5 > 10 or 2 > 1", type: "string" },
        { label: "False or False", type: "number" },
        { label: "3 == 4 or 9 < 2", type: "number" }
      ]
    }
  },
  {
    id: 19,
    emoji: "🧭",
    level: "도전",
    planet: "갈림길 행성",
    title: "세 갈래 길! elif",
    goal: "elif 로 길을 하나 더 만들어요.",
    story: "🔥 도전 행성이에요! 길이 두 갈래가 아니라 세 갈래라면 어떻게 할까요?\n\n'그게 아니고 만약 ~라면'을 뜻하는 elif 를 써 봐요.",
    instructions: [
      "지금은 90점 이상이면 A, 아니면 모두 C예요. 먼저 실행해 봐요. 75점은 C가 나와요.",
      "70점 이상이면 B가 나오게 길을 하나 더 만들어요.",
      "print(\"A\") 줄과 else: 줄 사이에 elif score >= 70: 을 넣어요. (if, else 와 같은 왼쪽 끝에!)",
      "그 아래 안쪽(Tab)에 print(\"B\") 를 적고 실행해요. 위에서부터 차례로 검사해서 처음 맞는 길로 가요."
    ],
    starterCode: "score = 75\nif score >= 90:\n    print(\"A\")\nelse:\n    print(\"C\")\n",
    solution: "score = 75\nif score >= 90:\n    print(\"A\")\nelif score >= 70:\n    print(\"B\")\nelse:\n    print(\"C\")",
    hints: {
      SyntaxError: "elif 줄 끝에도 쌍점 : 이 필요해요. 그리고 elif 는 else 보다 위에 와야 해요!",
      IndentationError: "elif 는 if, else 와 같은 왼쪽 끝에, print(\"B\") 는 안쪽에 적어요."
    },
    validation: (code, stdout) => lines(stdout).includes("B") && /\belif\b/.test(codeOnly(code)),
    quiz: {
      question: "if 와 else 사이에 길을 하나 더 만들 때 쓰는 단어는 무엇일까요?",
      options: ["elif", "else if"],
      answer: "elif",
      feedback: "딩동댕! 파이썬은 else if 를 줄여서 elif 라고 써요. 🧭"
    },
    miniGame: {
      type: "rhythm-beat",
      title: "갈림길 리듬 게임",
      description: "score = 75 일 때, 식이 맞으면 [O], 틀리면 [X]를 눌러요!",
      beats: [
        { expr: "score >= 70 (score = 75)", expect: "O" },
        { expr: "score >= 90 (score = 75)", expect: "X" },
        { expr: "score < 70 (score = 75)", expect: "X" }
      ]
    }
  },
  {
    id: 20,
    emoji: "🧺",
    level: "기본",
    planet: "마법 바구니 행성",
    title: "보물 바구니! 리스트",
    goal: "[ ] 바구니에 여러 값을 모아 담아요.",
    story: "마법 바구니 행성이에요. 상자 하나에는 값 하나만 담았지만, 바구니(리스트)에는 여러 개를 한꺼번에 담을 수 있어요!",
    instructions: [
      "fruits = [\"사과\", \"바나나\", \"체리\"] 를 적어요. 대괄호 [ ] 가 바구니예요.",
      "바구니 속 값들은 쉼표 , 로 나눠요. 글자는 하나하나 따옴표를 입혀요.",
      "아랫줄에 print(fruits) 를 적어 바구니 속을 들여다봐요.",
      "🌟 내가 좋아하는 과일로 바꿔 담아도 좋아요!"
    ],
    starterCode: "# 1. fruits 바구니에 과일 3개를 담아요.\n# 2. fruits 바구니를 출력해요.\n",
    solution: "fruits = [\"사과\", \"바나나\", \"체리\"]\nprint(fruits)",
    hints: {
      SyntaxError: "[ 로 열고 ] 로 닫았는지, 값 사이에 쉼표 , 가 있는지, 글자마다 따옴표가 있는지 봐요.",
      NameError: "과일 이름에 따옴표를 입혔는지 확인해요!"
    },
    validation: (code, stdout) => /fruits\s*=\s*\[/.test(codeOnly(code)) && out(stdout).includes("[") && out(stdout).includes(","),
    quiz: {
      question: "여러 값을 담는 바구니(리스트)를 만들 때 양 끝에 쓰는 기호는 무엇일까요?",
      options: ["대괄호 [ ]", "소괄호 ( )"],
      answer: "대괄호 [ ]",
      feedback: "정답! 대괄호 [ ] 가 리스트 바구니예요. 🧺"
    },
    miniGame: {
      type: "code-defense",
      title: "바구니 찾기 디펜스",
      description: "다가오는 값이 리스트 바구니 [ ] 면 [바구니 맞아요], 아니면 [바구니 아니에요]를 쏘아요!",
      defenseOptions: [
        { type: "string", label: "🧺 바구니 맞아요", className: "btn-cyan" },
        { type: "number", label: "🚫 바구니 아니에요", className: "btn-pink" }
      ],
      enemies: [
        { label: "[1, 2, 3]", type: "string" },
        { label: "55", type: "number" },
        { label: '["우주", "별"]', type: "string" },
        { label: '"외계인"', type: "number" }
      ]
    }
  },
  {
    id: 21,
    emoji: "🔢",
    level: "기본",
    planet: "보물 찾기 행성",
    title: "0번 방의 비밀! 리스트 번호",
    goal: "바구니 속 값을 방 번호로 꺼내요.",
    story: "보물 찾기 행성이에요. 바구니 속 값들에는 방 번호가 있어요.\n\n그런데 비밀이 있어요. 파이썬은 1번이 아니라 0번부터 센답니다!",
    instructions: [
      "print(fruits[0]) 을 적어요. 0번 방에 있는 첫 번째 과일 \"사과\"가 나와요.",
      "[0] 처럼 바구니 이름 뒤에 [방 번호] 를 붙이면 그 방의 값을 꺼내요.",
      "🌟 바나나는 몇 번 방일까요? print(fruits[1]) 도 적어 봐요."
    ],
    starterCode: "# 0번 방의 과일을 꺼내서 출력해요.\nfruits = [\"사과\", \"바나나\", \"체리\"]\n",
    solution: "fruits = [\"사과\", \"바나나\", \"체리\"]\nprint(fruits[0])",
    hints: {
      IndexError: "과일이 3개면 방 번호는 0, 1, 2 까지만 있어요!",
      SyntaxError: "fruits[0] 처럼 대괄호를 써요. 소괄호 ( ) 가 아니에요."
    },
    validation: (code, stdout) => out(stdout).includes("사과") && codeOnly(code).includes("[0]"),
    quiz: {
      question: "바구니의 세 번째 값은 몇 번 방에 있을까요?",
      options: ["2번 방", "3번 방"],
      answer: "2번 방",
      feedback: "정답! 0, 1, 2 로 세니까 세 번째는 2번 방이에요. 🔑"
    },
    miniGame: {
      type: "balloon-pop",
      mode: "pick",
      title: "방 번호 풍선",
      description: "fruits = [\"사과\", \"바나나\", \"체리\"] 에서 \"바나나\"를 꺼내는 코드 풍선을 터트려요!",
      target: "바나나",
      answers: ["fruits[1]"],
      decoys: ["fruits[0]", "fruits[2]", "fruits[3]"]
    }
  },
  {
    id: 22,
    emoji: "📏",
    level: "기본",
    planet: "자 척도 행성",
    title: "몇 개 들었지? len()",
    goal: "len( )으로 바구니 속 개수를 세요.",
    story: "자 척도 행성이에요. 바구니 속에 보물이 몇 개 들었는지 하나하나 세지 않아도 돼요!",
    instructions: [
      "print(len(fruits)) 를 적어요.",
      "len 은 길이(length)를 줄인 말이에요. 괄호 안 바구니에 값이 몇 개 들었는지 세어 줘요.",
      "과일이 3개니까 3 이 나오면 성공!"
    ],
    starterCode: "# 바구니 속 과일 개수를 세서 출력해요.\nfruits = [\"사과\", \"바나나\", \"체리\"]\n",
    solution: "fruits = [\"사과\", \"바나나\", \"체리\"]\nprint(len(fruits))",
    hints: {
      NameError: "len 은 모두 소문자예요.",
      SyntaxError: "괄호가 두 겹이에요! print( len( fruits ) ) 처럼 닫는 괄호도 두 개예요."
    },
    validation: (code, stdout) => lines(stdout).includes("3") && codeOnly(code).includes("len("),
    quiz: {
      question: "len([10, 20, 30, 40]) 의 결과는 무엇일까요?",
      options: ["4", "40"],
      answer: "4",
      feedback: "정답! 값이 4개 들어 있으니 4예요. 📏"
    },
    miniGame: {
      type: "rhythm-beat",
      title: "바구니 길이 리듬",
      description: "바구니 길이 식이 맞으면 [O], 틀리면 [X]를 눌러요!",
      beats: [
        { expr: "len([1, 2]) == 2", expect: "O" },
        { expr: "len(['a', 'b', 'c']) == 4", expect: "X" },
        { expr: "len([]) == 0", expect: "O" }
      ]
    }
  },
  {
    id: 23,
    emoji: "➕",
    level: "기본",
    planet: "바구니 채우기 행성",
    title: "보물 추가! append()",
    goal: "append( )로 바구니 끝에 값을 넣어요.",
    story: "바구니 채우기 행성이에요. 이미 만든 바구니에 새 보물을 넣고 싶어요!",
    instructions: [
      "fruits.append(\"체리\") 를 적어요. 바구니 이름 뒤에 점(.)을 찍고 append 를 써요.",
      "append 는 '뒤에 덧붙이다'라는 뜻이에요. 괄호 안의 값을 바구니 맨 끝에 넣어 줘요.",
      "아랫줄에 print(fruits) 를 적어 체리가 들어갔는지 확인해요."
    ],
    starterCode: "# 1. fruits 바구니에 \"체리\"를 추가해요.\n# 2. fruits 를 출력해요.\nfruits = [\"사과\", \"바나나\"]\n",
    solution: "fruits = [\"사과\", \"바나나\"]\nfruits.append(\"체리\")\nprint(fruits)",
    hints: {
      AttributeError: "append 철자를 확인해요. p 가 두 개예요!",
      SyntaxError: "fruits.append(\"체리\") 처럼 점(.)과 괄호를 확인해요."
    },
    validation: (code, stdout) => out(stdout).includes("체리") && codeOnly(code).includes("append("),
    quiz: {
      question: "바구니 맨 끝에 새 값을 넣는 명령은 무엇일까요?",
      options: ["append", "add"],
      answer: "append",
      feedback: "정답! append 로 바구니 끝에 쏙 넣어요. 🧺"
    },
    miniGame: {
      type: "balloon-pop",
      mode: "spell",
      title: "append 스펠링 풍선",
      description: "a → p → p → e → n → d 순서대로 풍선을 터트려요!",
      word: "append",
      balloons: ["a", "p", "p", "e", "n", "d"]
    }
  },
  {
    id: 24,
    emoji: "🎠",
    level: "도전",
    planet: "회전목마 행성",
    title: "~하는 동안 반복! while",
    goal: "while 로 조건이 맞는 동안 반복해요.",
    story: "🔥 도전 행성이에요! 회전목마는 티켓이 있는 동안 계속 돌아요.\n\n'~하는 동안 계속 반복해'라는 주문이 while 이에요.",
    instructions: [
      "이 코드를 그대로 실행하면 1이 끝없이 나와요! count 가 계속 1이라서 'count <= 3' 이 영원히 맞거든요. (파이디가 알아서 멈춰 주니까 실행해 봐도 괜찮아요)",
      "print(count) 아랫줄(같은 안쪽 칸)에 count = count + 1 을 적어요. 한 바퀴 돌 때마다 count 가 1씩 커져요.",
      "count 가 4가 되면 'count <= 3' 이 틀려서 반복이 멈춰요. 1, 2, 3 이 나오면 성공!"
    ],
    starterCode: "count = 1\nwhile count <= 3:\n    print(count)\n",
    solution: "count = 1\nwhile count <= 3:\n    print(count)\n    count = count + 1",
    hints: {
      IndentationError: "count = count + 1 도 print(count) 와 같은 안쪽 칸에 있어야 반복 안에 들어가요!",
      SyntaxError: "while 줄 끝에 쌍점 : 이 있는지 봐요."
    },
    validation: (code, stdout) => {
      const printed = lines(stdout);
      return printed.includes("1") && printed.includes("2") && printed.includes("3") && !printed.includes("4") && printed.length <= 10 && /\bwhile\b/.test(codeOnly(code));
    },
    quiz: {
      question: "while 반복 안에 count = count + 1 을 빼먹어서 영원히 멈추지 않는 것을 무엇이라고 할까요?",
      options: ["무한 루프", "나누기 에러"],
      answer: "무한 루프",
      feedback: "딩동댕! 끝나지 않는 반복을 무한 루프라고 해요. 멈추는 장치를 꼭 만들어요! 🎠"
    },
    miniGame: {
      type: "rhythm-beat",
      title: "while 탈출 리듬",
      description: "n = 5 일 때, 식이 맞으면 [O], 틀리면 [X]를 눌러요!",
      beats: [
        { expr: "n < 10 (n = 5)", expect: "O" },
        { expr: "n > 10 (n = 5)", expect: "X" },
        { expr: "n == 5 (n = 5)", expect: "O" }
      ]
    }
  },
  {
    id: 25,
    emoji: "🛑",
    level: "도전",
    planet: "비상 탈출 행성",
    title: "멈춰! break",
    goal: "break 로 반복을 바로 멈춰요.",
    story: "🔥 도전 행성이에요! while True: 는 '영원히 반복해'라는 뜻이에요.\n\n이렇게 끝없이 도는 기차를 원하는 순간 멈추는 비상 버튼이 break 예요.",
    instructions: [
      "print(count) 바로 아래 빈 줄(안쪽 칸)에 if count == 3: 을 적어요.",
      "그 아래 한 칸 더 안쪽(Tab 두 번)에 break 를 적어요.",
      "count 가 3이 되는 순간 break 가 반복을 멈춰요. 1, 2, 3 까지만 나오면 성공!"
    ],
    starterCode: "count = 1\nwhile True:\n    print(count)\n    \n    count = count + 1\n",
    solution: "count = 1\nwhile True:\n    print(count)\n    if count == 3:\n        break\n    count = count + 1",
    hints: {
      IndentationError: "if count == 3: 은 while 안쪽(Tab 한 번), break 는 if 안쪽(Tab 두 번)이에요!",
      SyntaxError: "'같니?'는 == 두 개예요. if count == 3: 끝의 쌍점도 확인해요."
    },
    validation: (code, stdout) => {
      const printed = lines(stdout);
      return printed.includes("1") && printed.includes("2") && printed.includes("3") && !printed.includes("4") && /\bbreak\b/.test(codeOnly(code));
    },
    quiz: {
      question: "반복을 바로 멈추고 빠져나올 때 쓰는 단어는 무엇일까요?",
      options: ["break", "exit"],
      answer: "break",
      feedback: "정답! break 는 '부수다'라는 뜻이에요. 반복을 부수고 탈출해요! 🛑"
    },
    miniGame: {
      type: "balloon-pop",
      mode: "spell",
      title: "break 스펠링 풍선",
      description: "b → r → e → a → k 순서대로 풍선을 터트려요!",
      word: "break",
      balloons: ["b", "r", "e", "a", "k"]
    }
  },
  {
    id: 26,
    emoji: "📜",
    level: "기본",
    planet: "마법 주문서 행성",
    title: "나만의 주문 만들기! def",
    goal: "def 로 주문을 만들고, 이름( )으로 불러요.",
    story: "마법 주문서 행성이에요. 자주 쓰는 코드를 묶어서 나만의 주문(함수)으로 만들 수 있어요.\n\n스크래치의 [나만의 블록 만들기]와 같아요!",
    instructions: [
      "먼저 그대로 실행해 봐요. 아무것도 안 나오죠? 주문을 '만들기만' 하고 '부르지' 않았기 때문이에요.",
      "def 는 '새 주문을 만들게!'라는 뜻이에요. hello 라는 이름의 주문을 만들었어요.",
      "맨 아랫줄 왼쪽 끝(안쪽 말고!)에 hello() 라고 적어서 주문을 불러요.",
      "🌟 더 해보기: hello() 를 두 번 적으면 어떻게 될까요?"
    ],
    starterCode: "# 맨 아래에 hello() 를 적어 주문을 불러요.\ndef hello():\n    print(\"안녕!\")\n",
    solution: "def hello():\n    print(\"안녕!\")\n\nhello()",
    hints: {
      SyntaxError: "def hello(): 끝에 쌍점 : 이 있는지, hello() 괄호를 닫았는지 봐요.",
      IndentationError: "주문 안에 들어갈 print 는 안쪽(Tab)에, 부르는 hello() 는 왼쪽 끝에 적어요."
    },
    validation: (code, stdout) => out(stdout).includes("안녕!") && /^hello\(\)/m.test(codeOnly(code)),
    quiz: {
      question: "나만의 주문(함수)을 만들기 시작할 때 맨 앞에 적는 단어는 무엇일까요?",
      options: ["def", "function"],
      answer: "def",
      feedback: "훌륭해요! def 는 'define(정하다)'를 줄인 말이에요. 📜"
    },
    miniGame: {
      type: "balloon-pop",
      mode: "spell",
      title: "def 스펠링 풍선",
      description: "d → e → f 순서대로 풍선을 터트려요!",
      word: "def",
      balloons: ["d", "e", "f"]
    }
  },
  {
    id: 27,
    emoji: "🥤",
    level: "도전",
    planet: "믹서기 행성",
    title: "재료 넣기! 매개변수",
    goal: "주문에 재료를 넣어 다르게 실행해요.",
    story: "🔥 도전 행성이에요! 믹서기에 딸기를 넣으면 딸기 주스, 바나나를 넣으면 바나나 주스가 나오죠?\n\n주문에도 재료 투입구를 만들 수 있어요.",
    instructions: [
      "greeting 주문에는 name 이라는 재료 투입구가 있어요.",
      "greeting(\"지안\") 처럼 괄호 안에 재료를 넣으면 name 상자에 \"지안\"이 들어가서 '안녕 지안'이 나와요.",
      "맨 아랫줄에 greeting(\"파이디\") 를 추가해서 파이디에게도 인사해요!",
      "주문은 한 번만 만들고, 재료만 바꿔서 여러 번 쓸 수 있어요."
    ],
    starterCode: "# 맨 아래에 greeting(\"파이디\") 를 추가해요.\ndef greeting(name):\n    print(\"안녕 \" + name)\n\ngreeting(\"지안\")\n",
    solution: "def greeting(name):\n    print(\"안녕 \" + name)\n\ngreeting(\"지안\")\ngreeting(\"파이디\")",
    hints: {
      NameError: "파이디에 따옴표를 입혔는지 확인해요. greeting(\"파이디\") 처럼요!",
      TypeError: "greeting 괄호 안에 재료를 꼭 하나 넣어야 해요."
    },
    validation: (code, stdout) => out(stdout).includes("안녕 지안") && out(stdout).includes("안녕 파이디"),
    quiz: {
      question: "def add(a, b): 로 만든 주문에는 재료 투입구가 몇 개 있을까요?",
      options: ["2개 (a 와 b)", "1개 (ab)"],
      answer: "2개 (a 와 b)",
      feedback: "정답! 쉼표로 나뉜 a 와 b, 두 개의 투입구가 있어요. 🥤"
    },
    miniGame: {
      type: "code-defense",
      title: "재료 개수 맞추기",
      description: "greeting 은 재료 1개, add 는 재료 2개가 필요해요. 개수가 맞으면 [맞음], 틀리면 [안 맞음]을 쏘아요!",
      defenseOptions: [
        { type: "string", label: "✅ 재료 개수 맞음", className: "btn-cyan" },
        { type: "number", label: "⚠️ 재료 개수 안 맞음", className: "btn-pink" }
      ],
      enemies: [
        { label: "greeting('지안')", type: "string" },
        { label: "greeting()", type: "number" },
        { label: "add(5, 10)", type: "string" },
        { label: "add(5)", type: "number" }
      ]
    }
  },
  {
    id: 28,
    emoji: "🎁",
    level: "도전",
    planet: "자판기 행성",
    title: "결과 돌려받기! return",
    goal: "return 으로 주문의 결과를 돌려받아요.",
    story: "🔥 도전 행성이에요! 자판기에 돈을 넣으면 과자가 밖으로 나오죠?\n\n주문이 계산한 결과를 밖으로 돌려주는 마법이 return 이에요.",
    instructions: [
      "먼저 그대로 실행해 봐요. add(3, 5) 가 계산한 8을 돌려받아 출력해요.",
      "return 은 '계산한 결과를 밖으로 돌려줘!'라는 뜻이에요.",
      "맨 아랫줄에 print(add(10, 20)) 을 적어서 30 이 나오게 해 봐요.",
      "🌟 더 해보기: total = add(1, 2) 처럼 돌려받은 값을 상자에 담을 수도 있어요."
    ],
    starterCode: "# 맨 아래에 print(add(10, 20)) 을 추가해요.\ndef add(a, b):\n    return a + b\n\nprint(add(3, 5))\n",
    solution: "def add(a, b):\n    return a + b\n\nprint(add(3, 5))\nprint(add(10, 20))",
    hints: {
      SyntaxError: "괄호가 두 겹이에요! print( add(10, 20) ) 처럼 닫는 괄호도 두 개예요.",
      TypeError: "add 괄호 안에는 숫자 두 개를 쉼표로 나눠 넣어요."
    },
    validation: (code, stdout) => lines(stdout).includes("30") && codeOnly(code).includes("add("),
    quiz: {
      question: "주문이 계산한 결과를 밖으로 돌려주는 단어는 무엇일까요?",
      options: ["return", "print"],
      answer: "return",
      feedback: "정답! print 는 화면에 보여주기만 하고, return 은 결과를 돌려줘서 다시 쓸 수 있게 해요. 🎁"
    },
    miniGame: {
      type: "balloon-pop",
      mode: "spell",
      title: "return 스펠링 풍선",
      description: "r → e → t → u → r → n 순서대로 풍선을 터트려요!",
      word: "return",
      balloons: ["r", "e", "t", "u", "r", "n"]
    }
  },
  {
    id: 29,
    emoji: "🍎",
    level: "기본",
    planet: "바구니 털기 행성",
    title: "하나씩 꺼내기! for 와 리스트",
    goal: "for 로 바구니 속 값을 하나씩 꺼내요.",
    story: "바구니 털기 행성이에요. 바구니 속 과일을 하나씩 모두 꺼내서 진열대에 올려 봐요!",
    instructions: [
      "for fruit in fruits: 를 적어요. '바구니 fruits 에서 과일을 하나씩 꺼내서 fruit 에 담아'라는 뜻이에요.",
      "아랫줄 안쪽(Tab)에 print(fruit) 를 적어요.",
      "사과, 바나나, 체리가 한 줄씩 나오면 성공! 과일이 3개라서 3번 반복했어요.",
      "🌟 더 해보기: print(fruit + \" 맛있어!\") 로 바꿔 봐요."
    ],
    starterCode: "# for 로 과일을 하나씩 꺼내 출력해요.\nfruits = [\"사과\", \"바나나\", \"체리\"]\n",
    solution: "fruits = [\"사과\", \"바나나\", \"체리\"]\nfor fruit in fruits:\n    print(fruit)",
    hints: {
      IndentationError: "for 아랫줄은 Tab 으로 안쪽에 적어요!",
      NameError: "for 에서 만든 이름(fruit)과 print 안의 이름이 똑같은지 봐요."
    },
    validation: (code, stdout) =>
      ["사과", "바나나", "체리"].every((fruit) => out(stdout).includes(fruit)) && /for\s+\w+\s+in\s+fruits/.test(codeOnly(code)),
    quiz: {
      question: "for fruit in fruits: 에서 꺼낸 과일이 하나씩 담기는 상자의 이름은 무엇일까요?",
      options: ["fruit", "fruits"],
      answer: "fruit",
      feedback: "정답! for 꺼낸상자 in 바구니: 모양이에요. fruit 에 과일이 하나씩 담겨요. 🍎"
    },
    miniGame: {
      type: "code-defense",
      title: "출력값 맞추기",
      description: "for x in [1, 2, 3]: print(x * 2) 를 실행하면 나오는 값이면 [나와요], 아니면 [안 나와요]를 쏘아요!",
      defenseOptions: [
        { type: "string", label: "✅ 나와요", className: "btn-cyan" },
        { type: "number", label: "❌ 안 나와요", className: "btn-pink" }
      ],
      enemies: [
        { label: "2", type: "string" },
        { label: "4", type: "string" },
        { label: "6", type: "string" },
        { label: "9", type: "number" }
      ]
    }
  },
  {
    id: 30,
    emoji: "🎓",
    level: "도전",
    planet: "우주 졸업식",
    title: "졸업 작품! 행성 여행",
    goal: "리스트·for·if·else 를 모두 써서 작품을 만들어요.",
    story: "드디어 졸업 행성이에요! 지금까지 배운 바구니(리스트), 반복(for), 갈림길(if-else)을 모두 써서 행성 여행 프로그램을 만들어 봐요.\n\n바구니 속 행성을 차례로 지나가다가 화성에 도착하면 착륙해요!",
    instructions: [
      "for planet in planets: 를 적어 행성을 하나씩 꺼내요.",
      "안쪽(Tab 한 번)에 if planet == \"화성\": 을 적고, 한 칸 더 안쪽(Tab 두 번)에 print(planet + \" 착륙!\") 을 적어요.",
      "if 와 같은 칸(Tab 한 번)에 else: 를 적고, 한 칸 더 안쪽에 print(planet + \" 지나가요\") 를 적어요.",
      "지구 지나가요 → 화성 착륙! → 목성 지나가요 가 나오면 졸업이에요! 🎓"
    ],
    starterCode: "# 행성을 하나씩 지나가다가 \"화성\"이면 착륙해요.\nplanets = [\"지구\", \"화성\", \"목성\"]\n",
    solution: "planets = [\"지구\", \"화성\", \"목성\"]\nfor planet in planets:\n    if planet == \"화성\":\n        print(planet + \" 착륙!\")\n    else:\n        print(planet + \" 지나가요\")",
    hints: {
      IndentationError: "for 안쪽은 Tab 한 번, if/else 안쪽은 Tab 두 번이에요. if 와 else 는 같은 칸에 있어야 해요!",
      SyntaxError: "for, if, else 줄 끝에 모두 쌍점 : 이 있는지, '같니?'는 == 인지 확인해요."
    },
    validation: (code, stdout) =>
      out(stdout).includes("화성 착륙") && out(stdout).includes("지구 지나가요") && /\bfor\b/.test(codeOnly(code)) && /\bif\b/.test(codeOnly(code)) && /\belse\b/.test(codeOnly(code)),
    quiz: {
      question: "planets 바구니에 행성이 3개 있을 때, for planet in planets: 반복은 몇 번 돌까요?",
      options: ["3번", "1번"],
      answer: "3번",
      feedback: "정답! 바구니 속 값 개수만큼 반복해요. 졸업을 축하해요, 지안 탐험가님! 🎉🚀🎓"
    },
    miniGame: {
      type: "api-connect",
      title: "졸업장 발급 통신",
      description: "졸업 축하 고양이를 불러서 졸업장을 받아요!",
      targetRequest: "졸업 축하 고양이",
      options: [
        { code: "magic.show_cat()", isCorrect: true, feedback: "축하합니다! 졸업 축하 고양이가 왔어요! 🎓🐾" },
        { code: "magic.get_weather()", isCorrect: false, feedback: "오늘 날씨는 '아주 맑음'! 하지만 졸업 축하는 고양이가 해 줘요." }
      ]
    }
  }
];
