export const lessons = [
  {
    id: 1,
    planet: "Planet Hello (안녕 행성)",
    title: "우주선 시동 걸기! print()",
    story: "지안 탐험가님! 반가워요! 🚀\n\n우주선에 타서 시동을 걸려면, 동반자 로봇 '파이디(Pydi)'에게 소리 내어 인사를 건네야 해요.\n\n컴퓨터 화면에 글자를 보여주는 마법 명령어는 바로 **print()** 예요!\n\n괄호 () 안에는 큰따옴표(\"\") 옷을 입힌 글자를 넣어주어야 파이디가 글자로 소리 낼 수 있어요.\n\n따옴표 옷이 없으면 파이썬이 기계 명령어로 착각해서 고장 나니 조심해요! 🤖",
    instructions: [
      "코딩 창에 print(\"안녕 파이디\") 라고 정확하게 적어봐요.",
      "영어 글자 p-r-i-n-t 는 꼭 소문자로 적어야 해요!",
      "글자 앞뒤에 큰따옴표(\"\")가 이쁘게 쌍을 맞췄는지 확인해요.",
      "다 적었으면 오른쪽 아래 [주문 외우기 (실행)] 버튼을 눌러보세요!"
    ],
    starterCode: "# 여기에 print를 사용해서 \"안녕 파이디\" 라고 적어보세요!\n# 힌트: print(\"...\") 양식에 맞춰 빈칸을 채워봐요\n",
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
    story: "파이썬 나라에는 **'글자(문자열)'**와 **'숫자'**가 살고 있어요.\n\n글자는 꼭 큰따옴표(\"\") 옷을 입고 다니지만, 숫자는 옷 없이 날씬하게 다녀요!\n\n옷을 입은 글자 \"30\"은 낱말이라 계산이 안 되지만, 그냥 숫자 30은 수학 계산을 할 수 있답니다.\n\n파이디의 몸무게인 **숫자 30**과 이름인 **글자 '파이디'**를 출력해볼까요?",
    instructions: [
      "첫 번째 줄에는 따옴표가 없는 숫자만 넣어 print(30) 을 적어봐요.",
      "두 번째 줄에는 따옴표 옷을 입혀서 print(\"파이디\") 를 적어봐요.",
      "숫자 30은 옷 없이 그냥 적고, 파이디 이름엔 따옴표 옷을 꼭 씌워주세요!"
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
    story: "파이썬은 수학 계산을 아주 좋아하는 계산 천재예요! 🧮\n\n더하기는 `+`, 빼기는 `-` 기호를 써서 수학 계산을 시킬 수 있어요.\n\n계산을 시킬 때는 따옴표 옷 없이 print(5 + 7) 이라고 적어야 해요.\n\n만약 따옴표 옷을 입혀 print(\"5 + 7\") 이라고 쓰면 계산하지 않고 글자 모양 그대로 인쇄되니 주의하세요!",
    instructions: [
      "따옴표 옷을 입히지 않고 print(5 + 7) 을 적어보세요.",
      "파이썬이 스스로 수학 계산을 완료해 결과값인 12만 깔끔하게 출력하는지 확인해봐요!"
    ],
    starterCode: "# 5와 7을 더한 값을 print를 사용해 계산해 보세요.\n# 따옴표 옷을 입히지 않아야 진짜 계산을 한답니다!\n",
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
      balloons: ["5+7", "10-2", "9-4"] // 5+7 is correct
    }
  },
  {
    id: 4,
    planet: "Planet Box (변수 마법 상자 행성)",
    title: "마법 상자 만들기! 변수(Variable)",
    story: "파이썬에서는 보석을 담아두는 **'이름표 마법 상자(변수)'**를 만들 수 있어요. 📦\n\n상자 앞면에 stars 같은 예쁜 이름을 붙여놓고 물건을 보관해두는 것이죠.\n\n여기서 같다(=) 기호는 수학의 '똑같다'가 아니에요!\n\n**'오른쪽의 보석을 왼쪽 이름표 상자에 쏙 집어넣는 마법의 전달 벨트'**랍니다!\n\n`stars = 10` 이라고 써서 stars 상자에 별 10개를 담아볼까요?",
    instructions: [
      "첫 줄에 stars = 10 이라고 적어 10을 담아둔 stars 상자를 만드세요.",
      "그 아랫줄에 print(stars) 를 적어 상자 안에 든 보석을 꺼내 보여주세요.",
      "상자 이름을 인쇄할 때는 따옴표 옷(\"\")을 적지 않아요! 상자 이름 그대로 적어야 뚜껑이 열려요."
    ],
    starterCode: "# 1. stars 이름표 상자를 만들고 숫자 10을 대입(=)해 보세요.\n# 2. 그 아랫줄에 stars 상자를 열어 화면에 출력(print)해 보세요.\n",
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
    story: "이름표 마법 상자에는 숫자뿐만 아니라 따옴표 옷을 입은 글자도 담아둘 수 있어요.\n\n더하기(+) 기호를 글자 상자들 사이에 쓰면, 글자 조각들을 풀칠하듯 길게 이어붙일 수 있답니다!\n\n예를 들어 `\"안녕\" + \"지안\"` 이라고 적으면 `\"안녕지안\"`이 돼요.\n\n`name` 상자에 지안이 이름을 넣고 인사말 글자와 보석을 결합해 큰 목소리로 말해봐요!",
    instructions: [
      "name = \"지안\" 이라고 적어 글자가 보관된 name 상자를 준비하세요.",
      "그 아래 print(\"안녕 \" + name) 을 적어 안녕이라는 인사말과 상자 값을 이어붙여 인쇄해보세요!"
    ],
    starterCode: "# 1. name 상자를 만들고 글자 \"지안\"을 담아보세요.\n# 2. 그 아랫줄에 \"안녕 \" 글자와 name 상자를 더해서 인쇄해보세요.\n",
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
    planet: "Planet Input (우주 번역 행성)",
    title: "무엇을 좋아하나요? 입력 상자",
    story: "지안이가 키보드로 직접 쳐서 입력한 대답도 상자에 이쁘게 담아둘 수 있어요. 💬\n\n이번 실습에서는 `answer` 상자에 지안이가 가장 좋아하는 우주 음식인 `\"피자\"`를 담아볼게요.\n\n그리고 스피커로 \"내가 좋아하는 음식은 피자\"라고 말하도록 이어붙여서 출력해볼까요?",
    instructions: [
      "answer = \"피자\" 라고 적어 좋아하는 음식을 answer 상자에 잘 보관하세요.",
      "그 다음 줄에 print(\"내가 좋아하는 음식은 \" + answer) 를 적어 파이디에게 들려주세요!"
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
    story: "파이썬 나라의 로봇들은 아주 정직해서 어떤 질문을 받으면 참(**True**) 혹은 거짓(**False**)으로만 대답해요. ⚖️\n\n크기를 비교할 때 크다(`>`), 작다(`<`) 기호를 써서 파이썬에게 질문을 던질 수 있답니다.\n\n10이 5보다 큰지 파이썬에게 질문을 던지고 대답을 들어볼까요?",
    instructions: [
      "print(10 > 5) 를 적어서 실행해보세요.",
      "화면에 파이썬이 진실을 판단해 준 영어 True 가 예쁘게 찍히는지 확인해봐요!",
      "참고로 파이썬에서 True와 False는 첫 글자가 항상 대문자랍니다!"
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
    story: "만약(if) 우주선 앞에 장애물이 가까이 오면, 경로를 꺾어 피해야 해요! 🚧\n\n조건에 따라 행동을 바꾸는 마법을 바로 **if 문**이라고 불러요.\n\n`if 조건식:` 구문을 적고 그 바로 밑줄은 꼭 키보드 Tab키를 눌러 **'안쪽 방으로 밀어 써야(들여쓰기)'** 해요.\n\n그래야 조건방이 열렸을 때 방 안에 있는 행동(`print`)을 실행해준답니다!",
    instructions: [
      "distance = 3 상자가 준비되어 있습니다.",
      "if distance < 5: 조건문 아랫줄에 들여쓰기(Tab)를 한 뒤 print(\"삐삐!\") 를 채워보세요.",
      "거리가 5보다 작으므로(3), 조건 방이 열려 '삐삐!' 경보음이 성공적으로 인쇄됩니다!"
    ],
    starterCode: "distance = 3\n# 아래에 distance가 5보다 작으면 \"삐삐!\"를 출력하는 if 문을 완성해 보세요!\nif distance < 5:\n    \n",
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
    miniGame: {
      type: "rhythm-beat",
      title: "만약에(if) 회피 비트",
      description: "조건식이 참(O)인지 거짓(X)인지 흐르는 판정에 따라 리듬 버튼을 클릭해 관문을 회피하세요!",
      beats: [
        { expr: "distance < 5 (distance = 3 일때)", expect: "O" },
        { expr: "distance > 10 (distance = 3 일때)", expect: "X" },
        { expr: "distance == 3 (distance = 3 일때)", expect: "O" }
      ]
    }
  },
  {
    id: 9,
    planet: "Planet Passport (우주 검사소 행성)",
    title: "두 갈래 길! if-else 문",
    story: "만약(if) 에너지가 가득하면 출발하고, 그렇지 않으면(else) 충전을 해야 해요! 🛂\n\n조건이 맞을 때와 안 맞을 때 각각 다른 행동을 하도록 지시하는 것이 **if-else** 마법이에요.\n\n조건이 참이면 첫 번째 if 방이 실행되고, 참이 아니면 아래 else 방이 무조건 작동해요.\n\n에너지 수치가 80일 때 출발 관문을 통과시켜 볼까요?",
    instructions: [
      "조건이 만족되면 \"출발!\"을 인쇄하고,",
      "만족되지 않는 나머지 경우(else:)에 속하면 \"충전 필요\"를 인쇄하도록 코드를 완성해봐요.",
      "else: 뒤에도 꼭 콜론(:)을 적고 그 밑줄에는 들여쓰기를 잊지 마세요!"
    ],
    starterCode: "energy = 80\n# 에너지가 50 이상이면 \"출발!\", 아니면 \"충전 필요\"를 인쇄하는 if-else 구문을 작성하세요.\nif energy >= 50:\n    \nelse:\n    \n",
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
    miniGame: {
      type: "rhythm-beat",
      title: "더블 패스포트 리듬 비트",
      description: "에너지 energy가 80일 때, 각 조건식 판정에 맞게 리듬 키를 눌러 충돌을 제어하세요!",
      beats: [
        { expr: "energy >= 50 (energy = 80)", expect: "O" },
        { expr: "energy < 50 (energy = 80)", expect: "X" },
        { expr: "energy == 80 (energy = 80)", expect: "O" }
      ]
    }
  },
  {
    id: 10,
    planet: "Planet Galaxy (은하수 행성)",
    title: "별 그리기 대작전! for 반복문",
    story: "똑같은 행동을 여러 번 반복해서 그리고 싶을 때는 **for** 반복 톱니 장치 마법을 부려요. 🌀\n\n`for i in range(5):` 라고 적으면 아래 방에 있는 일을 컴퓨터가 정확히 5번 반복해 줘요.\n\n이 톱니바퀴를 돌려 예쁜 별(★)을 5개 연속으로 찍어 예쁜 은하수를 수놓아봐요!",
    instructions: [
      "for i in range(5): 아래 줄에 들여쓰기(Tab)를 하고 print(\"★\") 을 적어주세요.",
      "파이썬 톱니가 5바퀴 돌아가 별을 5번 연속 인쇄하는 마술을 확인해봐요!"
    ],
    starterCode: "# 아래에 for 문을 완성해서 별(★)을 5번 연속 출력해보세요!\nfor i in range(5):\n    \n",
    hints: {
      "IndentationError": "for 문도 if 문처럼 바로 아랫줄은 무조건 들여쓰기(Tab)를 해서 방을 만들어야 해요!",
      "NameError": "for나 range 단어 스펠링을 틀리지 않았는지 눈을 크게 뜨고 살펴보세요!"
    },
    validation: (code, stdout) => {
      const starCount = (stdout.match(/★/g) || []).length;
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
    story: "드디어 우주선 너머에 통신을 거는 마법 API를 써볼 시간이에요! 🌤️\n\n`magic.get_weather()`를 주문서로 보내면, 우주 기상청 드론이 실시간 날씨 정보를 배달해 와요.\n\n이 배달받은 날씨를 `today_weather` 상자에 보관해둔 후 파이디 확성기로 인쇄해봐요!",
    instructions: [
      "첫 줄에 today_weather = magic.get_weather() 라고 작성해 날씨 배달을 상자에 보관해둬요.",
      "그 다음 줄에 print(\"오늘 날씨는: \" + today_weather) 를 적어 날씨가 콘솔에 뜨는지 테스트해봐요!"
    ],
    starterCode: "# 1. today_weather 상자에 magic.get_weather() API 호출 결과를 담아주세요.\n# 2. \"오늘 날씨는: \" 와 today_weather를 결합해서 출력해보세요.\n",
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
    story: "지안 탐험가님, 정말 장해요! 마지막 행성에 도착했어요! 🐱🐾\n\n이곳에는 우주 미아가 된 아기 고양이가 있어요. 구조 신호 API인 `magic.show_cat()` 주문을 적어 호출해봐요.\n\n주문이 성공하면 콘솔 창에 귀여운 8비트 아기 고양이 그림이 나타나며 지안이의 탐험 수료증 배지를 받게 돼요!",
    instructions: [
      "magic.show_cat() 주문을 입력하여 구조선 통신을 가동해봐요.",
      "콘솔 창에 아기 고양이가 무사히 도착하는 모습을 확인한 후 미니게임을 깨면 우주 졸업장을 얻어요!"
    ],
    starterCode: "# 여기에 우주 아기 고양이를 통신 구조하는 단 한 줄의 API 마법 주문을 외워보세요!\n",
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
  }
];
