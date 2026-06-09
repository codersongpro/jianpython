export const lessons = [
  {
    id: 1,
    planet: "Planet Hello (안녕 행성)",
    title: "우주선 시동 걸기! print()",
    story: "안녕 행성에 도착했어요! 우주선 시동을 걸기 위해 로봇 동반자 파이디에게 인사를 건네봅시다.",
    instructions: [
      "print(\"안녕 파이디\") 라고 코딩 창에 정확하게 적어봐요.",
      "print는 괄호 () 안의 값을 화면에 인쇄하듯 보여주는 명령어예요. 대소문자를 구분하므로 꼭 소문자로 적어야 해요.",
      "안녕 파이디 양쪽의 큰따옴표(\"\")는 컴퓨터에게 '이건 명령어 정보가 아니라 그냥 말소리 글자야!'라고 알려주는 말풍선 옷이에요.",
      "다 적었다면 오른쪽 아래 [주문 외우기]를 클릭하세요!"
    ],
    starterCode: "# 여기에 print를 사용해서 \"안녕 파이디\" 라고 적어보세요!\n",
    hints: {
      "NameError": "앗! 혹시 'print' 철자를 대문자(Print)로 썼거나 오타(printt)가 났는지 봐요! 컴퓨터는 대소문자를 아주 엄격하게 구분한답니다.",
      "SyntaxError": "따옴표(\"\")가 양쪽에 예쁘게 닫혀 있는지 확인해보세요. 괄호 () 안에도 쉼표가 빠졌는지 봐요!"
    },
    validation: (code, stdout) => stdout && stdout.trim().includes("안녕 파이디"),
    quiz: {
      question: "파이디에게 전송할 말소리(글자) 조각에 반드시 입혀주어야 하는 마법 옷(기호)은 무엇인가요?",
      options: ['큰따옴표 ( " " )', '물음표 ( ? )'],
      answer: '큰따옴표 ( " " )',
      feedback: "딩동댕! 글자를 적을 때는 반드시 양쪽에 큰따옴표 옷을 입혀주어야 컴퓨터가 낱말로 이해해요! 🌟"
    },
    miniGame: {
      type: "balloon-pop",
      title: "스펠링 풍선 터트리기!",
      description: "하늘에 둥실둥실 떠오르는 글자 풍선들을 마우스로 클릭해 톡! 터트려 순서대로 단어를 완성해보세요!",
      word: "print",
      balloons: ["p", "r", "i", "n", "t"]
    }
  },
  {
    id: 2,
    planet: "Planet Type (글자와 숫자 행성)",
    title: "이름표 만들기! 글자와 숫자",
    story: "글자와 숫자 행성이에요. 파이썬 나라는 글자와 숫자를 다르게 취급한답니다. 각각 출력해 볼까요?",
    instructions: [
      "첫째 줄에 print(30)을 적으세요. 따옴표가 없는 30은 수학 계산이 가능한 날씬한 '숫자' 데이터예요.",
      "둘째 줄에 print(\"파이디\")를 적으세요. 따옴표를 입힌 \"파이디\"는 계산을 하지 않는 낱말 카드인 '글자' 데이터예요.",
      "숫자는 따옴표 없이, 글자는 따옴표 옷을 꼭 씌워서 구분해 출력해 봅시다."
    ],
    starterCode: "# 1. 첫 번째 줄에 숫자 30을 출력해 보세요.\n# 2. 두 번째 줄에 글자 \"파이디\"를 출력해 보세요.\n",
    hints: {
      "TypeError": "숫자와 글자는 섞어서 출력하면 파이썬이 헷갈려해요. 둘을 섞어 쓰진 않았는지 봐요!",
      "SyntaxError": "따옴표가 글자의 앞이나 뒤 중 한쪽에만 붙어 있는지 체크해보세요!"
    },
    validation: (code, stdout) => {
      const trimmed = stdout ? stdout.trim() : "";
      return trimmed.includes("30") && trimmed.includes("파이디");
    },
    quiz: {
      question: "큰따옴표 옷을 입지 않는 '숫자'는 글자와 무엇이 다를까요?",
      options: ["수학 계산(+ , -)을 시킬 수 있어요.", "화면에 파랗게 빛나서 예뻐요."],
      answer: "수학 계산(+ , -)을 시킬 수 있어요.",
      feedback: "정답! 따옴표를 입지 않은 순수 숫자는 파이썬이 수학 계산을 시켜서 결과를 낼 수 있답니다. ⭐"
    },
    miniGame: {
      type: "balloon-pop",
      title: "글자 풍선 소환 작전",
      description: "귀여운 마법사 로봇 파이디의 이름 'pydi'를 순서대로 터치해 소환해 주세요!",
      word: "pydi",
      balloons: ["p", "y", "d", "i"]
    }
  },
  {
    id: 3,
    planet: "Planet Math (별 계산 행성)",
    title: "우주 물건 세기! 더하기와 빼기",
    story: "계산기 행성에 도착했어요. 파이썬은 계산을 아주 잘하는 똑똑한 수학 천재 친구예요!",
    instructions: [
      "print(5 + 7)을 적어보세요. + 기호는 두 숫자를 더해주는 수학 연산자예요.",
      "따옴표 없이 적어야 파이썬이 직접 계산을 수행해 결과인 12를 구해요. 만약 \"5 + 7\"처럼 따옴표를 쓰면 계산 없이 식 모양 그대로 출력돼요.",
      "오른쪽 아래 [주문 외우기]를 눌러 계산된 결과 12가 정상적으로 뜨는지 확인하세요."
    ],
    starterCode: "# 5와 7을 더한 값을 계산해 출력해보세요.\n",
    hints: {
      "SyntaxError": "+ 나 - 기호 뒤에 숫자가 빠졌거나 불필요한 알파벳 글자가 들어가지 않았는지 봐요!"
    },
    validation: (code, stdout) => stdout && stdout.trim().includes("12"),
    quiz: {
      question: "수학 계산을 시키지 않고 식의 모양 그대로 '5 + 7' 글자를 보여주고 싶을 때는 어떻게 코딩해야 할까요?",
      options: ['print("5 + 7") 처럼 따옴표로 감싸요.', 'print(5 + 7) 처럼 그냥 적어요.'],
      answer: 'print("5 + 7") 처럼 따옴표로 감싸요.',
      feedback: "훌륭해요! 따옴표 옷을 씌우면 계산하지 않는 일반 글자(문자열)로 변해요. 🎨"
    },
    miniGame: {
      type: "balloon-pop",
      title: "수식 계산 풍선 터트리기!",
      description: "더하기 계산 결과가 12가 되는 맛있는 수식 풍선을 터트려 우주선을 충전하세요!",
      word: "12",
      balloons: ["5+7", "10-2", "9-4"]
    }
  },
  {
    id: 4,
    planet: "Planet Box (변수 마법 상자 행성)",
    title: "마법 상자 만들기! 변수(Variable)",
    story: "상자 행성에 도착했어요. 파이썬에서는 필요한 값을 예쁜 상자에 담아서 보관할 수 있답니다.",
    instructions: [
      "첫 줄에 stars = 10을 적으세요. = 기호는 오른쪽의 값 10을 왼쪽 이름표 상자 stars에 쏙 집어넣는 배달 벨트 역할을 해요.",
      "둘째 줄에 print(stars)를 적으세요. 상자를 열어 내용물을 인쇄하라는 뜻이에요. 상자 이름에는 따옴표를 씌우지 않아야 뚜껑이 열려요.",
      "stars 상자를 만들어 10을 대입하고 출력하는 것까지 완료하세요."
    ],
    starterCode: "# 1. stars 이름표 상자에 숫자 10을 담아보세요.\n# 2. 그 아랫줄에 stars 상자를 화면에 출력해 보세요.\n",
    hints: {
      "NameError": "상자를 먼저 만든 다음에 열어야 해요! stars = 10 을 print(stars)보다 윗줄에 적었는지 위치를 보세요."
    },
    validation: (code, stdout) => {
      const trimmed = stdout ? stdout.trim() : "";
      return trimmed.includes("10") && code.includes("stars");
    },
    quiz: {
      question: "파이썬의 대입 기호인 같다(=) 마법 벨트가 작동하여 물건을 집어넣는 방향은 어느 쪽인가요?",
      options: ["오른쪽 값을 왼쪽 상자에 담는다.", "왼쪽 값을 오른쪽 상자에 담는다."],
      answer: "오른쪽 값을 왼쪽 상자에 담는다.",
      feedback: "딩동댕! '상자이름 = 보석' 형태로 써서 오른쪽의 선물을 왼쪽 이름의 상자에 보관한답니다. 📦"
    },
    miniGame: {
      type: "code-defense",
      title: "우주 백신 디펜스!",
      description: "기어오는 외계인 바이러스 데이터 중 숫자(정수) 바이러스만 골라 [숫자 대포]를 발사하여 물리치세요!",
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
    planet: "Planet Speaker (우주 확성기 행성)",
    title: "우주 스피커! 글자 상자 더하기",
    story: "우주 확성기 행성이에요. 글자 여러 개를 풀칠하듯이 길게 이어 붙여서 말해볼까요?",
    instructions: [
      "첫 줄에 name = \"지안\"을 적어 지안이 이름이 담긴 name 상자를 준비하세요.",
      "둘째 줄에 print(\"안녕 \" + name)을 적으세요. 글자 사이에 쓰는 + 기호는 글자 조각들을 풀칠하듯 길게 이어 붙여주는 역할을 해요.",
      "\"안녕 \" 글자와 name 상자의 값을 풀칠해 '안녕 지안'으로 인쇄해 보세요."
    ],
    starterCode: "# 1. name 상자를 만들어 글자 \"지안\"을 담아보세요.\n# 2. 그 아랫줄에 \"안녕 \" 글자와 name 상자를 더해서 인쇄해보세요.\n",
    hints: {
      "NameError": "name 변수 상자의 글자를 만들 때 철자가 맞는지 확인해보고, 큰따옴표가 잘 감싸고 있는지 봐요!",
      "TypeError": "글자 상자와 숫자 상자를 바로 더하면 파이썬이 덧셈인지 풀칠인지 알 수 없어 고장 나요! 꼭 글자끼리 더해주세요."
    },
    validation: (code, stdout) => {
      const clean = stdout ? stdout.replace(/\s+/g, "") : "";
      return clean.includes("안녕지안") && code.includes("name");
    },
    quiz: {
      question: "글자 두 개를 앞뒤로 길게 하나로 이어붙여서 풀칠하고 싶을 때 사용하는 연산 기호는 무엇인가요?",
      options: ["더하기 ( + )", "빼기 ( - )"],
      answer: "더하기 ( + )",
      feedback: "정답! 글자와 글자 사이에 + 기호를 쓰면 두 글자가 찰떡같이 결합된 하나의 큰 글자가 돼요! ✨"
    },
    miniGame: {
      type: "code-defense",
      title: "글자 백신 대포 디펜스",
      description: "우측 침입자 중 따옴표 옷을 입은 글자(문자열) 바이러스만 골라 [글자 대포]로 파괴하세요!",
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
    planet: "Planet Message (우주 번역 행성)",
    title: "무엇을 좋아하나요? 글자 변수",
    story: "우주 번역 행성에 왔어요. 지안이가 좋아하는 음식을 상자에 담아서 조립해 말해봅시다.",
    instructions: [
      "첫 줄에 answer = \"피자\"를 적어 answer 이름표 상자에 좋아하는 음식을 담아 보관하세요.",
      "둘째 줄에 print(\"내가 좋아하는 음식은 \" + answer)를 적으세요. +를 사용해 설명 글자와 answer 상자의 내용물을 풀칠해 합쳐줘요.",
      "문장을 예쁘게 조립하여 화면에 출력하세요."
    ],
    starterCode: "# 1. answer 상자를 만들고 좋아하는 음식인 \"피자\" 글자를 담으세요.\n# 2. \"내가 좋아하는 음식은 \" 글자와 answer 상자를 더해서 출력해 보세요.\n",
    hints: {
      "SyntaxError": "따옴표가 부족하거나 괄호 짝이 안 맞으면 에러가 날 수 있어요. 기호 쌍을 점검해봐요!"
    },
    validation: (code, stdout) => {
      const clean = stdout ? stdout.trim() : "";
      return clean.includes("내가 좋아하는 음식은") && code.includes("answer");
    },
    quiz: {
      question: "좋아하는 음식을 담기 위해 이번 실습에서 직접 만들어 지정한 마법 보관함 상자의 이름은 무엇인가요?",
      options: ["answer", "print"],
      answer: "answer",
      feedback: "정답! answer 라는 이름표를 붙인 상자에 글자 '피자'를 대입하여 보관했습니다! 👍"
    },
    miniGame: {
      type: "code-defense",
      title: "데이터 혼합 침공 방어",
      description: "침공 바이러스 데이터에 알맞게 [글자 대포]와 [숫자 대포]를 번갈아 쏘아 우주선을 방어하세요!",
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
    planet: "Planet Truth (참과 거짓 행성)",
    title: "참과 거짓! True와 False",
    story: "참과 거짓 행성이에요. 파이썬에게 어떤 크기 질문을 던지면 참(True) 또는 거짓(False)으로 대답해요.",
    instructions: [
      "print(10 > 5)를 적으세요. > 기호는 왼쪽 값이 오른쪽 값보다 큰지 묻는 크기 비교 기호예요.",
      "10이 5보다 크기 때문에 사실이 맞으므로, 파이썬은 참이라는 뜻의 예약어인 True를 대답해 줍니다.",
      "파이썬이 진실을 판단해 돌려준 영어 True가 콘솔창에 찍히는지 확인하세요."
    ],
    starterCode: "# 10이 5보다 큰지 크다 기호(>)를 사용해 파이썬에게 물어보고 출력(print)해봐요!\n",
    hints: {
      "NameError": "True와 False는 파이썬에서 예약해둔 특수 단어예요. 철자 대소문자를 틀리면 알 수 없는 이름 에러가 나요."
    },
    validation: (code, stdout) => stdout && stdout.trim().includes("True"),
    quiz: {
      question: "파이썬 기계에게 크기 질문을 던져 그 질문이 사실(맞음)일 때 얻는 대답 단어는 무엇인가요?",
      options: ["True", "False"],
      answer: "True",
      feedback: "정답! 참을 뜻하는 영어 단어인 True를 출력하여 맞다고 응답해 준답니다. ⚖️"
    },
    miniGame: {
      type: "rhythm-beat",
      title: "참과 거짓 리듬 댄스!",
      description: "리듬 판정선 위치에 노드가 정렬될 때, 비교 기식 식에 맞게 [O] 또는 [X] 버튼을 리듬에 맞춰 클릭하세요!",
      beats: [
        { expr: "10 > 5", expect: "O" },
        { expr: "3 > 8", expect: "X" },
        { expr: "5 == 5", expect: "O" }
      ]
    }
  },
  {
    id: 8,
    planet: "Planet Gate (우주 관문 행성)",
    title: "장애물이 나타났다! if 문",
    story: "우주 관문 행성에 왔어요. 장애물이 눈앞에 나타났을 때 조건에 맞춰 피하는 마법을 부려봅시다.",
    instructions: [
      "아랫줄에 if distance < 5: 조건문을 작성하고 그 다음 줄에 들여쓰기(Tab)를 한 뒤 print(\"삐삐!\")를 적으세요.",
      "if는 '만약에'라는 뜻이고, 조건식 끝의 :(콜론)은 '조건이 맞으면 이 문을 열고 들어가라'는 열쇠예요. 들여쓰기(Tab)는 그 문 안의 방 행동임을 뜻해요.",
      "distance가 3이라 5보다 작으므로, if 조건방이 참으로 열려 경보음 '삐삐!'가 출력됩니다."
    ],
    starterCode: "distance = 3\n",
    hints: {
      "IndentationError": "들여쓰기(줄 맞춤) 에러예요! if 밑에 있는 행동 코드는 꼭 안쪽으로 밀어 적어주세요.",
      "SyntaxError": "if 문 조건 뒤에 마법 관문 기호인 콜론(:)을 빠뜨렸는지 살펴보세요!"
    },
    validation: (code, stdout) => stdout && stdout.trim().includes("삐삐!") && code.includes("if"),
    quiz: {
      question: "if 문 바로 아랫줄 코드는 어떤 키를 사용해서 수직 시작 위치를 안쪽으로 밀어 정렬해야(들여쓰기) 할까요?",
      options: ["Tab 키", "Enter 키"],
      answer: "Tab 키",
      feedback: "훌륭해요! Tab 키(또는 스페이스바 4번)로 밀어 적어야 'if 조건 방 안의 내용'으로 인정해줘요! 🚧"
    },
    // [미니게임 개편] 참길/거짓길 피하기 게임을 '조건 실드 디펜스' 게임으로 교체합니다.
    miniGame: {
      type: "shield-defense", // 신규 게임 타입 지정
      title: "if 조건 실드 디펜스",
      description: "다가오는 수식 운석이 참(True)이면 [True 실드], 거짓(False)이면 [False 실드]를 작동해 방어하세요!",
      lanes: ["True 실드", "False 실드"], // 보호막 종류
      obstacles: [
        { label: "distance < 5 (distance = 3)", dangerLane: 1, safeLane: 0, hazard: "if 운석", success: "방어 성공! 참(True)이므로 if 문이 활성화되었습니다. 🛡️" },
        { label: "distance > 10 (distance = 3)", dangerLane: 0, safeLane: 1, hazard: "조건 운석", success: "방어 성공! 거짓(False) 조건을 잘 판별했습니다. 🛡️" },
        { label: "distance == 3 (distance = 3)", dangerLane: 1, safeLane: 0, hazard: "비교 운석", success: "정확해요! 두 값이 같으므로 참(True) 실드로 방어 완료! 🛡️" }
      ]
    }
  },
  {
    id: 9,
    planet: "Planet Passport (우주 검사소 행성)",
    title: "두 갈래 길! if-else 문",
    story: "우주 검사소 행성에 왔어요. 에너지가 충분할 때와 모자랄 때 각각 다른 활주로로 대피해 봐요.",
    instructions: [
      "에너지가 50 이상이면 출발하고, 아니면 충전 필요를 출력하는 전체 if-else 문을 작성하세요.",
      "if energy >= 50: 조건식 아래 들여쓰기 공간에 print(\"출발!\")을 적으세요.",
      "그 아래 줄에는 if와 수직 위치를 맞춰 else:를 적고, 그 아래 들여쓰기 공간에 print(\"충전 필요\")를 작성하세요. else:는 if의 조건이 안 맞을 때 작동하는 나머지 방이에요."
    ],
    starterCode: "energy = 80\n",
    hints: {
      "SyntaxError": "else 뒤에 콜론(:)이 없거나, if와 else 단어의 시작 줄 위치가 수직으로 일치하지 않는지 확인해보세요!",
      "IndentationError": "else 밑의 print문도 Tab 키를 눌러 들여쓰기가 되었는지 보세요."
    },
    validation: (code, stdout) => {
      const clean = stdout ? stdout.trim() : "";
      return clean.includes("출발!") && code.includes("else");
    },
    quiz: {
      question: "조건이 충족되지 않는 '나머지 반대 상황'의 행동을 열어주기 위해 사용하는 파이썬 짝꿍 명령어 단어는 무엇인가요?",
      options: ["else", "if"],
      answer: "else",
      feedback: "정답! if 조건이 아닐 때 작동할 방을 else: 기호 아래 들여쓰기로 작성한답니다. 🛂"
    },
    // [미니게임 개편] if-else 활주로 피하기 게임을 'if-else 실드 디펜스'로 변경합니다.
    miniGame: {
      type: "shield-defense", // 신규 게임 타입 지정
      title: "if-else 실드 디펜스",
      description: "조건이 참(True)이면 [True 실드], 거짓(False)이면 [False 실드]를 작동시켜 우주선을 보호하세요!",
      lanes: ["True 실드", "False 실드"], // 보호막 종류
      obstacles: [
        { label: "energy >= 50 (energy = 80)", dangerLane: 1, safeLane: 0, hazard: "출발 관문", success: "방어 성공! 참(True)이므로 if 방어막이 활성화되었습니다. 🛡️" },
        { label: "energy < 50 (energy = 80)", dangerLane: 0, safeLane: 1, hazard: "충전 관문", success: "방어 성공! 거짓(False)이므로 else 방어막으로 막아냈습니다. 🛡️" },
        { label: "else 실행? (energy = 80)", dangerLane: 0, safeLane: 1, hazard: "갈림길 운석", success: "맞아요! if가 참이므로 else 문은 실행되지 않아 False입니다. 🛡️" }
      ]
    }
  },
  {
    id: 10,
    planet: "Planet Galaxy (은하수 행성)",
    title: "별 그리기 대작전! for 반복문",
    story: "은하수 행성에 왔어요. 똑같은 행동을 자동으로 여러 번 반복해 은하수를 수놓아 볼까요?",
    // 레벨 10: for 반복문을 사용한 은하수 별 그리기 실습
    instructions: [
      "for i in range(5): 반복문을 작성하고, 그 아래 들여쓰기(Tab) 줄에 print(\"★\")를 적어 별을 그리세요.",
      "💡 별 기호(★) 입력 팁: 키보드의 자음 [ㅁ]을 누르고 [한자] 키(또는 우측 Ctrl)를 누르거나, 여기 지문의 '★'을 드래그해서 복사(Ctrl + C) 후 붙여넣기(Ctrl + V) 하시면 쉬워요!",
      "for는 반복하라는 뜻이고, range(5)는 대기열 번호인 0, 1, 2, 3, 4를 제공하는 명령어예요.",
      "i는 임시 배달원으로, 0부터 4까지의 숫자를 하나씩 i 상자에 얹어가며 아래 방 코드를 총 5번 반복하여 돌려줍니다."
    ],
    starterCode: "",
    hints: {
      "IndentationError": "for 문도 if 문처럼 바로 아랫줄은 무조건 들여쓰기(Tab)를 해서 방을 만들어야 해요!",
      "NameError": "for나 range 단어 스펠링을 틀리지 않았는지 눈을 크게 뜨고 살펴보세요!"
    },
    validation: (code, stdout) => {
      const starCount = stdout ? (stdout.match(new RegExp("★", "g")) || []).length : 0;
      return starCount >= 5 && code.includes("for");
    },
    quiz: {
      question: "for i in range(5): 구문을 완성해 실행하면 아래 들여쓰기된 코드는 몇 번 실행될까요?",
      options: ["5번", "10번"],
      answer: "5번",
      feedback: "정답! range 괄호 안의 숫자는 반복 횟수를 통제하는 마법의 제어 수치와도 같아요! 🌀"
    },
    miniGame: {
      type: "balloon-pop",
      title: "반복문 별 풍선 터트리기",
      description: "for 문이 3번 반복되어 예쁜 별 3개(★★★)를 채울 수 있도록, 별 풍선 3개를 톡! 터트려 완성하세요!",
      word: "★★★",
      balloons: ["★", "★", "★"]
    }
  },
  {
    id: 11,
    planet: "Planet Weather (우주 날씨 행성)",
    title: "우주 날씨 마법! API 정보 받기",
    story: "우주 날씨 행성이에요. API를 연결해 멀리 있는 기상청 서버의 실시간 정보를 가져와 봅시다.",
    instructions: [
      "첫 줄에 today_weather = magic.get_weather()를 적어 날씨 정보를 today_weather 상자에 저장하세요.",
      "magic.get_weather()는 기상청 위성에 전파를 쏘아 현재 날씨를 배달해 달라고 부르는 마법 API 명령어예요.",
      "둘째 줄에 print(\"오늘 날씨는: \" + today_weather)를 작성해 글자와 받아온 정보를 풀칠해 출력하세요."
    ],
    starterCode: "",
    hints: {
      "AttributeError": "magic.get_weather() 의 소문자 대문자가 틀렸거나 점(.) 기호를 빠뜨리지 않았는지 보세요!",
      "TypeError": "날씨 글자를 다른 형식과 연산할 때 기호가 잘못 섞였는지 봐주세요."
    },
    validation: (code, stdout) => {
      const clean = stdout ? stdout.trim() : "";
      return (clean.includes("맑음") || clean.includes("비") || clean.includes("눈") || clean.includes("구름")) && code.includes("magic.get_weather");
    },
    quiz: {
      question: "위성 기상청과 연결하여 실시간 날씨를 문자 형태로 가져왔던 마법 API 통신 명령어의 이름은 무엇인가요?",
      options: ["magic.get_weather()", "magic.show_cat()"],
      answer: "magic.get_weather()",
      feedback: "정답! get_weather(날씨 가져오기) 통신 주파수를 쏘아 우주의 실시간 기상 데이터를 불러왔습니다. 🌤️"
    },
    miniGame: {
      type: "api-connect",
      title: "우주 API 통신 안테나 조율",
      description: "기상청에 날씨 정보를 요청하는 올바른 API 안테나 주파수를 연결하세요!",
      targetRequest: "날씨 연결",
      options: [
        { code: "magic.get_weather()", isCorrect: true, feedback: "정답! 기상청 드론 통신에 성공하여 날씨를 인쇄합니다! 📡☀️" },
        { code: "magic.show_cat()", isCorrect: false, feedback: "이것은 고양이 구조 신호 전송 주파수예요." }
      ]
    }
  },
  {
    id: 12,
    planet: "Planet Kitten (고양이 구조 행성)",
    title: "우주 고양이 소환! magic.show_cat()",
    story: "고양이 구조 행성에 도달했어요. 미아가 된 우주 고양이를 즉시 소환하는 신호를 보내봅시다.",
    instructions: [
      "magic.show_cat() 주문을 입력하세요.",
      "magic.show_cat()은 고양이 위치로 통신 구조 빔을 쏘아 화면에 고양이 이미지를 뿅 띄워주는 이미지 구조 API 명령어예요.",
      "성공하면 콘솔창에 귀여운 8비트 고양이 그림이 소환되는 것을 볼 수 있어요."
    ],
    starterCode: "",
    hints: {
      "AttributeError": "magic.show_cat() 철자가 맞는지 확인해보고, 괄호 ()가 잘 닫혀 있는지 봐요!"
    },
    validation: (code, stdout) => code.includes("magic.show_cat"),
    quiz: {
      question: "잃어버린 아기 고양이를 즉시 우리 구조선 콘솔로 소환해주는 API 명령어의 이름은 무엇인가요?",
      options: ["magic.show_cat()", "magic.get_weather()"],
      answer: "magic.show_cat()",
      feedback: "축하합니다! show_cat(고양이 소환) API를 성공적으로 외워 졸업 뱃지를 확보할 수 있게 되었어요! 🐱🐾"
    },
    miniGame: {
      type: "api-connect",
      title: "우주 고양이 마법 전파",
      description: "고양이 구조대를 연결해 아기 고양이를 무사히 귀환시키는 통신 빔을 쏘세요!",
      targetRequest: "고양이 구조",
      options: [
        { code: "magic.show_cat()", isCorrect: true, feedback: "정답! 고양이 구조 통신 안테나를 정상 연결해 콘솔로 워프 소환합니다! 📡🐾" },
        { code: "magic.get_weather()", isCorrect: false, feedback: "이것은 고양이가 아닌 날씨 배송을 연동하는 주문이에요." }
      ]
    }
  },
  {
    id: 13,
    planet: "Planet Multiply (우주 복제 행성)",
    title: "연료 복제하기! 곱하기와 나누기",
    story: "우주 복제 행성에 왔어요. 연료와 식량의 개수를 여러 배로 불리고 나누는 계산을 해봐요.",
    instructions: [
      "첫 줄에 print(5 * 3)을 적으세요. 별표 * 기호는 파이썬에서 숫자를 곱해주는 곱하기 기호예요.",
      "둘째 줄에 print(10 / 2)를 적으세요. 슬래시 / 기호는 파이썬에서 나누기를 해주는 나누기 기호예요.",
      "나누기를 계산하면 컴퓨터는 소수점 몫인 5.0 실수 형태로 친절하게 보여줍니다."
    ],
    starterCode: "",
    hints: {
      "SyntaxError": "곱하기(`*`)와 나누기(`/`) 기호가 제 위치에 들어갔는지, 괄호가 닫혀 있는지 확인하세요."
    },
    validation: (code, stdout) => stdout && stdout.trim().includes("15") && stdout.trim().includes("5.0"),
    quiz: {
      question: "사탕 5개를 3명에게 똑같이 주려 해요. 필요한 사탕의 전체 개수를 파이썬이 곱셈 계산을 하도록 시키는 올바른 코드는 무엇일까요?",
      options: ["print(5 * 3)", "print(5 + 3)"],
      answer: "print(5 * 3)",
      feedback: "딩동댕! 곱셈은 별표 기호 `*`를 사용해서 아주 쉽게 계산할 수 있답니다! 🍬"
    },
    miniGame: {
      type: "balloon-pop",
      title: "곱셈 수식 터트리기!",
      description: "계산 결과가 15가 되는 올바른 수식 풍선만 골라 터트려 연료를 3배로 복제해 보세요!",
      word: "15",
      balloons: ["5*3", "30/2", "10+5"]
    }
  },
  {
    id: 14,
    planet: "Planet Remainder (우주 배분 행성)",
    title: "보석 나누어 갖기! 몫과 나머지",
    story: "우주 배분 행성에 왔어요. 보석들을 똑같이 나눠 가질 때 몫과 나머지를 따로 구해봅시다.",
    instructions: [
      "첫 줄에 print(10 // 3)을 적으세요. 슬래시 두 개 //는 소수점을 버리고 정수로 딱 몇 번 들어가는지 몫만 구해줘요.",
      "둘째 줄에 print(10 % 3)을 적으세요. 퍼센트 %는 나눈 뒤 마지막 찌꺼기가 몇 개 남았는지 나머지만 구해줘요.",
      "보석 10개를 3명에게 나눴을 때의 몫(3)과 나머지(1) 결과를 각각 출력해 보세요."
    ],
    starterCode: "",
    hints: {
      "ZeroDivisionError": "0으로 나누려고 하면 컴퓨터가 놀라요! 나누는 수가 3인지 확인하세요."
    },
    validation: (code, stdout) => stdout && stdout.trim().includes("3") && stdout.trim().includes("1"),
    quiz: {
      question: "초코칩을 나누고 남은 '나머지 개수'만 알고 싶을 때 쓰는 마법 기호는 무엇인가요?",
      options: ["퍼센트 기호 ( % )", "슬래시 두 개 ( // )"],
      answer: "퍼센트 기호 ( % )",
      feedback: "정답! 퍼센트 기호 `%`를 쓰면 나눗셈을 한 후 남은 나머지만 쏙 알려준답니다! 💎"
    },
    miniGame: {
      type: "rhythm-beat",
      title: "나머지 비트 리듬게임!",
      description: "정렬선에 닿는 수식들의 나머지 값이 올바른지 [O] / [X] 버튼을 눌러 판단해 보세요!",
      beats: [
        { expr: "10 % 3 == 1", expect: "O" },
        { expr: "5 % 2 == 0", expect: "X" },
        { expr: "12 // 5 == 2", expect: "O" }
      ]
    }
  },
  {
    id: 15,
    planet: "Planet String Repeat (글자 증식 행성)",
    title: "글자 도장 찍기! 문자열 반복",
    story: "글자 증식 행성이에요. 파이썬에서는 글자에 숫자를 곱해 도장을 찍듯 늘릴 수 있어요.",
    instructions: [
      "print(\"★\" * 5) 라고 적어보세요.",
      "글자 카드 뒤에 * 5를 쓰면, 별 도장을 5번 쾅쾅 찍어 ★★★★★라는 길쭉한 글자로 증식 복제해 주는 마법이에요.",
      "글자 문자열과 숫자를 곱하기 연산자로 연결해 별 다섯 개가 출력되는지 테스트해 보세요."
    ],
    starterCode: "",
    hints: {
      "TypeError": "글자끼리 곱하면 파이썬이 헷갈려해요! 꼭 글자 하나와 숫자를 곱해주세요."
    },
    validation: (code, stdout) => stdout && stdout.trim().includes("★★★★★"),
    quiz: {
      question: "print(\"호\" * 3)의 결과로 올바른 화면 출력은 무엇일까요?",
      options: ["호호호", "호3"],
      answer: "호호호",
      feedback: "최고예요! 곱한 숫자만큼 글자가 반복해서 복사되어 출력된답니다! 🌀"
    },
    miniGame: {
      type: "balloon-pop",
      title: "글자 반복 풍선 찾기",
      description: "\"호\" 글자를 3번 반복해서 \"호호호\"를 만들 수 있는 올바른 파이썬 코드 풍선을 터트리세요!",
      word: "호호호",
      balloons: ['"호"*3', '"호호"*3', '"호"+3']
    }
  },
  {
    id: 16,
    planet: "Planet Compare (우주 천칭 행성)",
    title: "얼굴이 다른 외계인! 같지 않다",
    story: "우주 천칭 행성에 왔어요. 두 물건의 생김새가 서로 다른지 질문하는 방법을 배워봅시다.",
    instructions: [
      "print(5 != 3)을 입력하세요.",
      "!=는 느낌표 !(아니다)와 =가 만나 '서로 같지 않니(다르니)?'라고 묻는 같지 않다 연산자예요.",
      "5와 3은 서로 다르므로 질문이 사실이라 파이썬은 맞다며 True를 대답해 줍니다."
    ],
    starterCode: "",
    hints: {
      "SyntaxError": "반드시 느낌표가 먼저 와야 해요! =! 라고 순서를 바꾸어 적지 마세요."
    },
    validation: (code, stdout) => stdout && stdout.trim().includes("True") && code.includes("!="),
    quiz: {
      question: "두 수가 '서로 같지 않다(다르다)'라고 질문할 때 쓰는 기호는 무엇인가요?",
      options: ["!=", "=="],
      answer: "!=",
      feedback: "정답! `==`는 같은지 묻는 기호이고, `!=`는 같지 않은지(다르지 않은지) 묻는 기호입니다. 느낌표(!)는 '아니다'라는 뜻이에요! 🌈"
    },
    // [미니게임 개편] 다른 얼굴 외계인 피하기 게임을 '비교 연산 실드 디펜스'로 변경합니다.
    miniGame: {
      type: "shield-defense", // 신규 게임 타입 지정
      title: "비교 연산 실드 디펜스",
      description: "같지 않다(!=) 수식이 참(True)이면 [True 실드], 거짓(False)이면 [False 실드]를 가동해 외계 신호를 막아내세요!",
      lanes: ["True 실드", "False 실드"], // 보호막 종류
      obstacles: [
        { label: "5 != 5", dangerLane: 0, safeLane: 1, hazard: "쌍둥이 외계인", success: "방어 성공! 5는 5와 같으므로 거짓(False)입니다. 🛡️" },
        { label: "10 != 3", dangerLane: 1, safeLane: 0, hazard: "비교 외계인", success: "방어 성공! 10과 3은 서로 다르므로 참(True)입니다. 🛡️" },
        { label: "'A' != 'B'", dangerLane: 1, safeLane: 0, hazard: "문자 외계인", success: "방어 성공! 다른 글자이므로 참(True) 실드로 방어 완료! 🛡️" }
      ]
    }
  },
  {
    id: 17,
    planet: "Planet Logical And (쌍둥이 관문 행성)",
    title: "쌍둥이 열쇠 구멍! and",
    story: "쌍둥이 관문 행성이에요. 두 개의 규칙이 모두 맞아야 문이 열리는 논리 결합을 해봐요.",
    instructions: [
      "print(True and True)를 적어 실행하세요.",
      "and는 양옆에 놓인 두 가지 조건식이 '둘 다 참(True)일 때만' 최종 참으로 인정해 주는 논리 연산자예요.",
      "한쪽이라도 거짓(False)이 있으면 무조건 거짓이 되어 문이 열리지 않아요."
    ],
    starterCode: "",
    hints: {
      "NameError": "and는 모두 소문자로, True는 첫 글자를 대문자로 정확하게 적었는지 보세요."
    },
    validation: (code, stdout) => stdout && stdout.trim().includes("True") && code.includes("and"),
    quiz: {
      question: "다음 중 `10 > 5 and 3 > 5` 의 계산 결과로 올바른 것은 무엇일까요?",
      options: ["False", "True"],
      answer: "False",
      feedback: "훌륭해요! 앞의 `10 > 5`는 참(맞음)이지만, 뒤의 `3 > 5`는 거짓(틀림)이므로, 하나가 거짓이라 결과도 False가 됩니다! 🚧"
    },
    miniGame: {
      type: "code-defense",
      title: "and 관문 방어선",
      description: "두 조건식 A and B 중 둘 다 참(True)인 바이러스 데이터만 골라 [참 대포]로 요격하세요!",
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
    planet: "Planet Logical Or (자유의 길 행성)",
    title: "하나만 맞아도 좋아! or",
    story: "자유의 길 행성이에요. 둘 중에 하나만 맞아도 통과시켜 주는 너그러운 규칙을 배워봅시다.",
    instructions: [
      "print(True or False)를 코딩창에 적어보세요.",
      "or는 양옆의 조건식 중 '어느 한쪽이라도 맞으면(True)' 통과시켜 전체를 참(True)으로 인정하는 논리 연산자예요.",
      "오로지 둘 다 거짓(False or False)일 때만 전체가 거짓이 돼요."
    ],
    starterCode: "",
    hints: {
      "NameError": "or는 모두 소문자로, True/False는 첫 글자를 대문자로 정확하게 적었는지 보세요."
    },
    validation: (code, stdout) => stdout && stdout.trim().includes("True") && code.includes("or"),
    quiz: {
      question: "다음 중 `5 > 10 or 3 < 5` 의 계산 결과는 무엇일까요?",
      options: ["True", "False"],
      answer: "True",
      feedback: "정답! `5 > 10`은 거짓이지만, `3 < 5`가 참이므로 어느 한쪽이라도 참이라 전체 결과는 True가 됩니다! 🌈"
    },
    miniGame: {
      type: "code-defense",
      title: "or 자유 관문 방어",
      description: "or 조건식 중 최종 결과가 참(True)이 되는 데이터 바이러스를 모두 찾아 대포를 발사하세요!",
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
    planet: "Planet Elif (갈림길 행성)",
    title: "날씨별 우주복 고르기! elif 문",
    story: "갈림길 행성에 왔어요. 날씨나 등급이 다양할 때 여러 갈래 조건식을 차례대로 검사해 봅시다.",
    instructions: [
      "점수가 90점 이상이면 A, 70점 이상이면 B, 그 외에는 C를 출력하는 전체 if-elif-else 문을 작성하세요.",
      "elif score >= 70:은 '그렇지 않고 만약 점수가 70점 이상이라면'이라는 뜻을 갖는 Else If의 줄임말이에요.",
      "score가 75점이므로, 두 번째 elif 조건이 참이 되어 B가 화면에 출력되게 됩니다."
    ],
    starterCode: "score = 75\n",
    hints: {
      "SyntaxError": "elif 조건문 뒤에도 문을 닫아주는 콜론(:)이 예쁘게 들어갔는지 확인하세요."
    },
    validation: (code, stdout) => stdout && stdout.trim().includes("B") && code.includes("elif"),
    quiz: {
      question: "if 문과 else 문 사이에 다른 조건을 추가해 여러 개의 조건을 순서대로 검사할 때 쓰는 파이썬 명령어는 무엇인가요?",
      options: ["elif", "else if"],
      answer: "elif",
      feedback: "딩동댕! 다른 프로그래밍 언어의 else if를 파이썬은 귀엽게 줄여서 `elif`라고 쓴답니다! 🧭"
    },
    miniGame: {
      type: "rhythm-beat",
      title: "갈림길 기차 노선 조율",
      description: "주어진 변수 값과 조건식들의 참/거짓 판정을 빠르게 읽고 리듬 버튼을 클릭해 기차 방향을 돌리세요!",
      beats: [
        { expr: "score >= 70 (score = 75 일때)", expect: "O" },
        { expr: "score >= 90 (score = 75 일때)", expect: "X" },
        { expr: "score < 70 (score = 75 일때)", expect: "X" }
      ]
    }
  },
  {
    id: 20,
    planet: "Planet List (마법 주머니 행성)",
    title: "장난감 보물 상자! 리스트(List)",
    story: "마법 주머니 행성이에요. 여러 장난감 보석들을 한 상자에 모아서 보관해 볼까요?",
    instructions: [
      "fruits = [\"사과\", \"바나나\", \"체리\"]를 작성해 과일 상자를 만드세요.",
      "대괄호 [ ]는 여러 개 목록을 한 주머니에 묶어 '리스트'를 만들겠다는 약속 기호예요.",
      "주머니 안의 각각의 데이터 조각들은 쉼표 , 기호로 서로 벽을 쳐서 담아줍니다."
    ],
    starterCode: "",
    hints: {
      "SyntaxError": "대괄호 `[` 로 열어서 `]` 로 닫았는지 확인하시고, 문자열마다 따옴표가 잘 감싸졌는지 보세요."
    },
    validation: (code, stdout) => {
      const cleanCode = code.replace(/\s+/g, "");
      return cleanCode.includes('fruits=["사과","바나나","체리"]') || cleanCode.includes("fruits=['사과','바나나','체리']");
    },
    quiz: {
      question: "여러 개의 데이터를 순서대로 하나로 묶어 보관하는 '리스트'를 만들 때 양 끝에 씌워주는 기호는 무엇인가요?",
      options: ["대괄호 ( [ ] )", "중괄호 ( { } )"],
      answer: "대괄호 ( [ ] )",
      feedback: "정답! 파이썬에서 대괄호 `[ ]`는 여러 데이터 목록인 리스트를 생성하는 마법 주머니 표시랍니다! 🧺"
    },
    miniGame: {
      type: "code-defense",
      title: "리스트 바구니 디펜스",
      description: "침공 바이러스 데이터 중 여러 값들의 모음인 [리스트 형식]만 골라 대포로 파괴하세요!",
      enemies: [
        { label: '[1, 2, 3]', type: "string" },
        { label: "55", type: "number" },
        { label: '["우주", "별"]', type: "string" },
        { label: '"외계인"', type: "number" }
      ]
    }
  },
  {
    id: 21,
    planet: "Planet Index (보물 찾기 행성)",
    title: "0번 방의 비밀! 리스트 인덱싱",
    story: "보물 찾기 행성에 왔어요. 리스트 주머니 속 보물방은 신기한 방 번호 규칙을 갖고 있어요.",
    instructions: [
      "print(fruits[0])을 적어 첫 번째 과일을 출력해 보세요.",
      "[0]은 리스트의 첫 번째 원소 위치를 뜻해요. 파이썬은 1번 방이 아닌 0번 방부터 순서를 세기 때문이에요.",
      "fruits[0]은 0번 인덱스의 사과를, fruits[1]은 1번 인덱스의 바나나를 가져오게 돼요."
    ],
    starterCode: "fruits = [\"사과\", \"바나나\", \"체리\"]\n",
    hints: {
      "IndexError": "바구니에 든 물건 수보다 큰 인덱스 번호를 적으면 컴퓨터가 당황해요! 0번을 정확히 적었는지 보세요."
    },
    validation: (code, stdout) => stdout && stdout.trim().includes("사과") && code.includes("[0]"),
    quiz: {
      question: "리스트의 세 번째 아이템을 가리키는 방 번호(인덱스) 수치는 무엇일까요?",
      options: ["2", "3"],
      answer: "2",
      feedback: "정답! 0번부터 시작하기 때문에 첫 번째는 0, 두 번째는 1, 세 번째는 2가 된답니다! 🔑"
    },
    miniGame: {
      type: "balloon-pop",
      title: "방 번호 풍선 맞추기",
      description: "리스트 fruits = ['apple', 'banana', 'cherry'] 에서 'banana'를 꺼내기 위한 올바른 코드 풍선을 터트리세요!",
      word: "banana",
      balloons: ["fruits[1]", "fruits[0]", "fruits[2]"]
    }
  },
  {
    id: 22,
    planet: "Planet Length (자 척도 행성)",
    title: "바구니에 든 보물 세기! len() 함수",
    story: "자 척도 행성에 왔어요. 바구니 속에 보물들이 총 몇 개 담겨 있는지 자로 재 볼까요?",
    instructions: [
      "print(len(fruits))를 적어 과일 상자 안에 든 보물의 개수를 출력하세요.",
      "len()은 괄호 안 리스트의 '길이(개수)'를 자로 재서 정수 숫자로 돌려받는 명령어예요.",
      "fruits 리스트의 과일 개수인 3이 화면에 찍히는지 테스트하세요."
    ],
    starterCode: "fruits = [\"사과\", \"바나나\", \"체리\"]\n",
    hints: {
      "NameError": "len 철자를 대문자(Len)로 적지 않았는지 체크하세요."
    },
    validation: (code, stdout) => stdout && stdout.trim().includes("3") && code.includes("len("),
    quiz: {
      question: "`len([10, 20, 30, 40])` 의 최종 결과로 얻을 숫자는 무엇일까요?",
      options: ["4", "30"],
      answer: "4",
      feedback: "정답! 리스트 안에 4개의 숫자가 들어있으므로 길이는 4가 됩니다! 📐"
    },
    miniGame: {
      type: "rhythm-beat",
      title: "바구니 길이 측정 비트",
      description: "흘러오는 리스트들의 길이가 옆에 표시된 숫자가 맞는지 [O] / [X] 리듬 버튼을 클릭해 맞춰보세요!",
      beats: [
        { expr: "len([1, 2]) == 2", expect: "O" },
        { expr: "len(['a', 'b', 'c']) == 4", expect: "X" },
        { expr: "len([]) == 0", expect: "O" }
      ]
    }
  },
  {
    id: 23,
    planet: "Planet Append (바구니 채우기 행성)",
    title: "바구니에 새 보물 넣기! append()",
    story: "바구니 채우기 행성에 왔어요. 이미 만들어둔 바구니 꼬리에 보물을 추가해 봅시다.",
    instructions: [
      "둘째 줄에 fruits.append(\"체리\")를 적어 fruits 주머니 맨 끝에 체리를 추가해 보세요.",
      ".append()는 주머니 이름 뒤에 마침표 .를 찍어 연결하며, 괄호 안의 새 물건을 리스트 맨 뒤에 추가하는 마법이에요.",
      "셋째 줄에 print(fruits)를 적어 과일이 3개로 잘 늘어났는지 확인해봐요."
    ],
    starterCode: "fruits = [\"사과\", \"바나나\"]\n",
    hints: {
      "AttributeError": "append를 쓸 때 점(.)을 빠뜨리지 않았는지, spelling에 오타가 없는지 보세요."
    },
    validation: (code, stdout) => stdout && stdout.includes("체리") && code.includes("append("),
    quiz: {
      question: "리스트 맨 끝에 새로운 항목을 추가하는 마법의 명령어 이름은 무엇인가요?",
      options: ["append", "add"],
      answer: "append",
      feedback: "정답! 덧붙인다는 뜻의 단어인 `append`를 사용하여 리스트 끝에 아이템을 쏙 추가합니다! 🧺"
    },
    miniGame: {
      type: "balloon-pop",
      title: "추가 마법 스펠링 풍선",
      description: "리스트에 요소를 추가해주는 명령어 'append' 철자 풍선을 순서대로 톡 터트려 보세요!",
      word: "append",
      balloons: ["a", "p", "p", "e", "n", "d"]
    }
  },
  {
    id: 24,
    planet: "Planet While (반복 회전 행성)",
    title: "티켓이 있는 동안 타기! while 문",
    story: "반복 회전 행성에 왔어요. 티켓이 여전히 있는 동안 회전목마를 계속 돌려 타 봅시다.",
    instructions: [
      "count가 3 이하인 동안 반복하는 while count <= 3: 반복문을 작성하세요.",
      "반복문 아래 들여쓰기 줄에 print(count)를 적고, 그 아래에 count = count + 1을 완성하세요.",
      "count = count + 1은 횟수를 1씩 늘려 나중에 조건식이 거짓이 되어 무한 루프에서 탈출하게 만드는 안전장치예요."
    ],
    starterCode: "count = 1\n",
    hints: {
      "SyntaxError": "while 문 조건 끝에도 관문을 열어주는 콜론(:)이 꼭 붙어야 해요!",
      "IndentationError": "while 아래의 print문과 count = count + 1 식도 들여쓰기(Tab) 줄을 꼭 맞춰주세요."
    },
    validation: (code, stdout) => stdout && stdout.includes("1") && stdout.includes("2") && stdout.includes("3") && code.includes("while"),
    quiz: {
      question: "while 문에서 값을 1씩 늘리는 코드 `count = count + 1`을 적지 않아 조건이 항상 True가 되어 멈추지 않는 현상을 무엇이라 부를까요?",
      options: ["무한 루프(Infinite Loop)", "나누기 에러"],
      answer: "무한 루프(Infinite Loop)",
      feedback: "딩동댕! 조건이 영원히 거짓(False)이 되지 못해 프로그램이 영원히 뱅글뱅글 도는 상황을 무한 루프라고 해요. 탈출 장치를 꼭 만들어야 한답니다! 🌀"
    },
    miniGame: {
      type: "rhythm-beat",
      title: "while 무한 루프 탈출 비트",
      description: "변수 n이 5일 때, 아래 조건이 참(O)인지 거짓(X)인지 구분하여 무한 루프를 멈추는 비트를 쳐 보세요!",
      beats: [
        { expr: "n < 10 (n = 5)", expect: "O" },
        { expr: "n > 10 (n = 5)", expect: "X" },
        { expr: "n == 5 (n = 5)", expect: "O" }
      ]
    }
  },
  {
    id: 25,
    planet: "Planet Break (비상 탈출 행성)",
    title: "어지러워! 멈춰! break 문",
    story: "비상 탈출 행성에 왔어요. 뱅글뱅글 무한히 돌던 기차를 강제로 멈추고 탈출해 봅시다.",
    instructions: [
      "if count == 3: 조건문과 그 아래 들여쓰기 줄에 break를 직접 작성해 넣으세요.",
      "break는 뱅글뱅글 돌아가던 반복문(while/for)을 강제로 와장창 부수고 탈출하는 비상 멈춤 버튼 명령어예요.",
      "count가 3이 되는 순간 break가 가동되어 출력이 3까지만 찍히고 안전하게 정지하는지 확인하세요."
    ],
    starterCode: "count = 1\nwhile True:\n    print(count)\n    \n    count = count + 1\n",
    hints: {
      "IndentationError": "break 문도 if 문 아래의 행동이므로 Tab 키를 눌러 올바르게 안으로 밀어 넣어야 작동합니다!"
    },
    validation: (code, stdout) => stdout && stdout.includes("3") && !stdout.includes("4") && code.includes("break"),
    quiz: {
      question: "반복문(while, for) 안에서 실행을 멈추고 탈출(Break)하기 위해 사용하는 파이썬 예약어는 무엇인가요?",
      options: ["break", "exit"],
      answer: "break",
      feedback: "정답! 부순다는 뜻의 영어 단어 `break`를 쓰면 루프를 와장창 부수고 탈출한답니다! 💥"
    },
    miniGame: {
      type: "balloon-pop",
      title: "탈출 장치 완성 풍선",
      description: "비상 탈출을 의미하는 단어 'break' 스펠링 풍선을 찾아 순서대로 톡 터트려 보세요!",
      word: "break",
      balloons: ["b", "r", "e", "a", "k"]
    }
  },
  {
    id: 26,
    planet: "Planet Function (마법 주문서 행성)",
    title: "마법 자판기 만들기! 함수(def)",
    story: "마법 주문서 행성에 왔어요. 자주 쓰는 긴 주문 코드를 전용 마법 자판기 버튼으로 조립해 봐요.",
    instructions: [
      "첫 줄에 def hello():를 적고, 둘째 줄 들여쓰기 칸에 print(\"안녕!\")을 적어 함수를 생성하세요.",
      "def는 새로운 명령어(함수)를 조립해 알려주겠다는 정의(Define) 선언이고, : 끝에 붙여 내부 방을 조립해요.",
      "셋째 줄에 들여쓰기 없이 hello()를 적어 조립된 버튼을 꾹 눌러 작동(호출)시키세요."
    ],
    starterCode: "",
    hints: {
      "SyntaxError": "def hello(): 끝에 마법 콜론(:)을 꼭 적어주었는지 보고, 호출할 때 hello() 괄호를 닫았는지 보세요.",
      "IndentationError": "함수 내부에 보관될 명령들은 무조건 들여쓰기(Tab)를 해서 방 안에 넣어주어야 합니다!"
    },
    validation: (code, stdout) => stdout && stdout.trim().includes("안녕!") && code.includes("def hello"),
    quiz: {
      question: "파이썬에서 새로운 나만의 마법 함수(주문)를 정의하여 만들기 시작할 때 적어주는 예약어 단어는 무엇인가요?",
      options: ["def", "function"],
      answer: "def",
      feedback: "훌륭해요! `def`는 'Define(정의하다)'의 약자로, 컴퓨터에게 '이제부터 새로운 명령어를 알려줄게!'라고 선언하는 표식입니다. 📜"
    },
    miniGame: {
      type: "balloon-pop",
      title: "함수 정의 마법 풍선",
      description: "함수를 선언할 때 사용하는 특수 키워드 'def' 스펠링 풍선을 찾아 터트려 주세요!",
      word: "def",
      balloons: ["d", "e", "f"]
    }
  },
  {
    id: 27,
    planet: "Planet Param (매개 변수 행성)",
    title: "믹서기에 딸기 넣기! 매개변수",
    story: "매개 변수 행성에 왔어요. 믹서기 투입구에 던져 넣는 과일 종류에 따라 다른 주스를 만들어 봐요.",
    instructions: [
      "def greeting(name): 함수를 만들고, 그 아래 들여쓰기 줄에 print(\"안녕 \" + name)을 작성하세요.",
      "괄호 속 name은 외부에서 던져주는 재료(인수)를 받아두기 위해 문앞에 뚫어놓은 매개변수 상자예요.",
      "함수 정의 아래 들여쓰기 없이 greeting(\"지안\")을 적어 name 투입구 상자에 지안이를 넣어 실행시키세요."
    ],
    starterCode: "",
    hints: {
      "NameError": "greeting 함수 내부에서 name 변수의 스펠링을 바르게 입력했는지 살펴보세요."
    },
    validation: (code, stdout) => stdout && stdout.trim().includes("안녕 지안") && code.includes("def greeting"),
    quiz: {
      question: "`def add(a, b):` 라는 함수가 선언되었을 때, 이 함수가 작동하기 위해 받아들이는 전달 재료(매개변수)는 총 몇 개일까요?",
      options: ["2개 (a 와 b)", "1개 (ab)"],
      answer: "2개 (a 와 b)",
      feedback: "정답! 쉼표로 분리되어 `a`와 `b`라는 두 개의 매개변수 상자를 준비한 것이랍니다. 🧪"
    },
    miniGame: {
      type: "code-defense",
      title: "매개변수 재료 공급 디펜스",
      description: "함수 호출문 중 재료(매개변수)의 개수가 올바르게 짝지어진 것만 골라 대포로 통과시키세요!",
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
    planet: "Planet Return (보답 행성)",
    title: "자판기에서 나오는 과자! return",
    story: "보답 행성에 왔어요. 기계가 계산한 결과물을 밖으로 뿅 돌려받아 다른 상자에 담아봅시다.",
    instructions: [
      "def add(a, b): 함수를 만들고, 그 아래 들여쓰기 줄에 return a + b를 작성해 결과물을 반환하세요.",
      "return은 함수 기계 내부에서 열심히 계산한 결과 정답 값을 기계 바깥으로 돌려보내 주는(반환) 마법이에요.",
      "마지막 줄에 print(add(3, 5))를 작성하여 8이 반환받아 화면에 출력되는지 확인하세요."
    ],
    starterCode: "",
    hints: {
      "SyntaxError": "return은 소문자로 적어야 해요. return과 a + b 사이에 띄어쓰기를 꼭 넣어주세요."
    },
    validation: (code, stdout) => stdout && stdout.trim().includes("8") && code.includes("return"),
    quiz: {
      question: "함수의 계산 결과를 원래 명령이 있던 자리로 돌려보내 주는(반환) 파이썬 예약어는 무엇인가요?",
      options: ["return", "print"],
      answer: "return",
      feedback: "정답! `print`는 화면에 그냥 보여만 주는 것이고, `return`은 계산 결과 값을 진짜로 돌려주어 사용할 수 있게 하는 마법이랍니다! 🎁"
    },
    miniGame: {
      type: "balloon-pop",
      title: "결과 반환 스펠링 풍선",
      description: "함수 보답 명령어 'return' 스펠링 풍선을 찾아 순서대로 톡톡 터트려 활성화하세요!",
      word: "return",
      balloons: ["r", "e", "t", "u", "r", "n"]
    }
  },
  {
    id: 29,
    planet: "Planet Loop List (바구니 털기 행성)",
    title: "상자 물건 하나씩 열기! for와 리스트",
    story: "바구니 털기 행성이에요. 바구니 속 과일들을 하나씩 전부 꺼내 순서대로 진열대에 올려봅시다.",
    instructions: [
      "fruits 리스트의 모든 아이템을 순회하는 for fruit in fruits: 반복문을 작성하고, 그 아래 들여쓰기 공간에 print(fruit)를 채우세요.",
      "in 뒤의 전체 바구니 fruits에서 과일을 하나씩 꺼내어, in 앞의 임시 진열대 상자인 fruit에 얹어요.",
      "바구니가 빌 때까지 톱니바퀴가 돌아가며 사과, 바나나, 체리 순서대로 한 줄씩 꺼내 인쇄하게 됩니다."
    ],
    starterCode: "fruits = [\"사과\", \"바나나\", \"체리\"]\n",
    hints: {
      "IndentationError": "for 문 밑의 행동 코드이므로 꼭 Tab 키로 줄을 맞춰 넣었는지 봐요!"
    },
    validation: (code, stdout) => stdout && stdout.includes("사과") && stdout.includes("바나나") && stdout.includes("체리") && code.includes("in"),
    quiz: {
      question: "바구니 fruits에서 꺼낸 각각의 과일 이름이 순서대로 담기는 '임시 보관함' 상자의 이름은 무엇이었나요?",
      options: ["fruit", "fruits"],
      answer: "fruit",
      feedback: "정답! `for 임시상자 in 전체바구니:` 형태로 쓰여서 임시 상자인 `fruit`에 한 놈씩 번갈아 담기게 된답니다! 🌀"
    },
    miniGame: {
      type: "code-defense",
      title: "리스트 순회 연산 대포",
      description: "리스트 [1, 2, 3] 의 값을 2배씩 튀겨 출력하는 `for x in [1, 2, 3]:` 루프에서 x의 값이 맞게 출력된 바이러스만 파괴하세요!",
      defenseOptions: [
        { type: "string", label: "✅ 출력되는 값", className: "btn-cyan" },
        { type: "number", label: "❌ 출력되지 않는 값", className: "btn-pink" }
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
    planet: "Planet Graduation (우주 졸업식)",
    title: "우주 대탐험 완성! 종합 코딩",
    story: "우주 졸업식장이에요! 지금껏 연마한 조건식, 반복문, 리스트 마법을 총동원해 졸업 작품을 완성해 봐요.",
    instructions: [
      "numbers 리스트를 순회하는 for number in numbers: 루프와 그 아래 들여쓰기 한 if number % 2 == 0: 조건문을 직접 작성하세요.",
      "조건문 아래 들여쓰기가 2번 적용된 곳에 print(number)를 적으세요. %는 나머지 연산자이며 == 0은 짝수를 판별하는 식이에요.",
      "조건방이 열려 짝수(2, 4, 6, 8, 10)만 골라 예쁘게 밤하늘에 발사되는지 확인한 뒤 우주 졸업장을 얻으세요!"
    ],
    starterCode: "numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]\n",
    hints: {
      "IndentationError": "들여쓰기가 두 번 꺾여 들어갑니다! if 문도 들여쓰고, 그 아래 print는 Tab을 두 번 한 셈이 됩니다. 줄 맞춤을 신중히 해보세요!",
      "SyntaxError": "if 문 뒤에 콜론(:)이 잘 닫혔는지 꼭 점검해 보세요!"
    },
    validation: (code, stdout) => stdout && stdout.includes("2") && stdout.includes("4") && stdout.includes("6") && stdout.includes("8") && stdout.includes("10") && !stdout.includes("3"),
    quiz: {
      question: "이 영광스러운 졸업식날, 최종 탐험 수료를 완수한 탐험가님의 기분은 어떠한가요?",
      options: ["우주 최고로 행복해요!", "더 많은 코딩 모험을 떠나고 싶어요!"],
      answer: "우주 최고로 행복해요!",
      feedback: "졸업을 온 마음으로 축하드립니다! 🎉 이제 지안님은 훌륭한 주니어 파이썬 탐험가입니다. 우주선을 타고 어디든 갈 수 있어요! 🚀🎓"
    },
    miniGame: {
      type: "api-connect",
      title: "최종 졸업장 발급 통신 주파수",
      description: "마지막 졸업장 데이터 전송을 위해, 우주 연합 통신 안테나 주파수를 연결해 졸업을 완성하세요!",
      targetRequest: "졸업장 발급",
      options: [
        { code: "magic.show_cat()", isCorrect: true, feedback: "축하합니다! 졸업 축하 고양이가 귀여운 야옹 소리와 함께 대미를 장식합니다! 🎓🐾" },
        { code: "magic.get_weather()", isCorrect: false, feedback: "오늘의 날씨는 '매우 기쁘고 맑음'이지만, 졸업 고양이와 함께 졸업장을 받아야 해요!" }
      ]
    }
  }
];
