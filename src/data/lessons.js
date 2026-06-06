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
      balloons: ["5+7", "10-2", "9-4"]
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
      description: "energy = 80 일 때 각 조건식이 맞는지 판단하세요!",
      beats: [
        { expr: "energy >= 50", expect: "O" },
        { expr: "energy < 50", expect: "X" },
        { expr: "energy == 80", expect: "O" }
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
  },
  {
    id: 13,
    planet: "Planet Multiply (우주 복제 행성)",
    title: "연료 복제하기! 곱하기와 나누기",
    story: "지안 탐험가님, 우주선 연료를 복제해 볼까요? 🛸\n\n파이썬 나라는 곱하기 기호로 별표(`*`)를, 나누기 기호로 슬래시(`/`)를 사용해요!\n\n초콜릿 5개를 3배로 불리려면 `5 * 3`을, 젤리 10개를 둘이서 똑같이 반으로 가르려면 `10 / 2`를 계산해서 파이디에게 전달해봐요. 기호들이 아주 신기하죠?",
    instructions: [
      "첫 번째 줄에 5 곱하기 3을 계산하는 print(5 * 3) 을 적어봐요.",
      "두 번째 줄에 10 나누기 2를 계산하는 print(10 / 2) 를 적어봐요.",
      "별표 기호(`*`)와 슬래시 기호(`/`)를 소문자 print와 함께 잘 입력했는지 확인하세요!"
    ],
    starterCode: "# 1. 첫 번째 줄에 5 곱하기 3을 출력해보세요.\n# 2. 두 번째 줄에 10 나누기 2를 출력해보세요.\n",
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
    story: "초코칩 10개를 친구 3명에게 똑같이 나누어주면, 각각 3개씩 가지고(몫), 1개가 남아요! 🍪\n\n파이썬에게 나누고 남은 '나머지 찌꺼기'만 구하라고 하려면 퍼센트(`%`)를 쓰고, '몫'만 깔끔하게 구하라고 하려면 슬래시 두 개(`//`)를 써요!\n\n각각 계산해서 몇 개씩 갖고 몇 개가 남는지 확인해 볼까요?",
    instructions: [
      "첫 번째 줄에 몫을 구하는 print(10 // 3) 을 적으세요.",
      "두 번째 줄에 나머지를 구하는 print(10 % 3) 을 적으세요.",
      "몫(//)과 나머지(%) 기호의 차이를 느껴보세요!"
    ],
    starterCode: "# 1. 10을 3으로 나눈 몫(//)을 출력해 보세요.\n# 2. 10을 3으로 나눈 나머지(%)를 출력해 보세요.\n",
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
      description: "정렬선에 닿는 수식들의 나머지 값이 올바른지 [O] 또는 [X] 버튼을 눌러 판단해 보세요!",
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
    story: "파이썬에서는 정말 신기하게도 **글자에 숫자를 곱하는** 마법을 부릴 수 있어요! 🎨\n\n예를 들어 별 도장 \"★\"에 5를 곱해서 \"★\" * 5 라고 적으면, 별을 다섯 번 연속으로 찍어 ★★★★★ 가 화면에 나와요.\n\n일일이 별 다섯 개를 다 타이핑할 필요 없이, 곱하기 기호 하나로 글자 도장을 쾅쾅 찍어볼까요?",
    instructions: [
      "print(\"★\" * 5) 라고 코드를 적어 실행해 보세요.",
      "따옴표 안에 든 별 문자열에 숫자 5를 곱해 출력합니다."
    ],
    starterCode: "# 별 \"★\" 글자에 5를 곱해서 출력(print)해 보세요.\n",
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
    story: "파이썬에서 두 물건이 서로 **'같지 않다(다르다)'**고 질문하고 싶을 때는 느낌표와 같다를 붙인 != 기호를 사용해요! ⚖️\n\n'5와 3은 서로 다르니?'라고 5 != 3 으로 물어보면, 진짜로 다르기 때문에 파이썬은 맞다는 뜻으로 **True**라고 대답해 줘요.\n\n서로 다른 그림을 찾아내는 마법 기호 !=를 써볼까요?",
    instructions: [
      "print(5 != 3) 을 입력하여 5와 3이 같지 않은지 물어보세요.",
      "결과로 True가 출력되는 것을 확인해 보세요!"
    ],
    starterCode: "# 5와 3이 서로 같지 않다(!=)고 질문을 던져 출력해 보세요.\n",
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
    miniGame: {
      type: "rhythm-beat",
      title: "천칭 비교 판단 비트",
      description: "아래 비교 수식 질문들이 진실(O)인지 거짓(X)인지 판정에 맞춰 클릭하세요!",
      beats: [
        { expr: "5 != 5", expect: "X" },
        { expr: "10 != 3", expect: "O" },
        { expr: "7 >= 7", expect: "O" }
      ]
    }
  },
  {
    id: 17,
    planet: "Planet Logical And (쌍둥이 관문 행성)",
    title: "쌍둥이 열쇠 구멍! and",
    story: "우주 비밀의 문을 열려면 왼쪽 열쇠 구멍 and 오른쪽 열쇠 구멍에 **두 개의 열쇠를 둘 다 넣고 돌려야** 해요! 🔑🔑\n\n두 조건이 **'둘 다 맞을 때만'** 참(True)으로 인정해주는 마법 단어가 바로 **and** 예요.\n\n예를 들어 `True and True`는 참이지만, 하나라도 거짓이 섞인 `True and False`는 문이 열리지 않아 거짓(False)이 됩니다. 둘 다 참인 관문을 열어봐요!",
    instructions: [
      "print(True and True) 라고 적어서 실행해 보세요.",
      "파이썬이 True를 출력하는지 확인해봐요!"
    ],
    starterCode: "# True와 True 사이에 and를 넣어 둘 다 참인지 출력해보세요.\n",
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
    story: "초코 아이스크림과 딸기 아이스크림 중 **'둘 중 하나만'** 식탁에 올라와도 지안이는 행복해요! 🍦\n\n둘 중 **'어느 한쪽이라도 맞으면'** 참(True)으로 인정해주는 마법 단어가 바로 **or** 이에요.\n\n`True or False`는 한쪽이 참이므로 결과는 참(True)이 됩니다. 둘 다 싫을(거짓) 때만 거짓이 돼요. 문을 열어볼까요?",
    instructions: [
      "print(True or False) 를 코딩창에 적고 실행해 보세요.",
      "한쪽만 True여도 전체 결과가 True로 판정되는 것을 확인해 보세요!"
    ],
    starterCode: "# True 와 False 사이에 or를 넣어 결과를 출력해 보세요.\n",
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
    story: "만약 비가 오면 장화를 신고, 눈이 오면 패딩을 입고, 해가 쨍쨍하면 모자를 써요! 👒\n\n이렇게 여러 갈래 조건에 맞춰 서로 다른 옷을 고르는 마법을 **elif** 라고 해요.\n\n'이게 아니고, 만약 또 다른 조건이 맞다면'이라는 뜻이지요. 오늘 점수가 75점일 때, 등급 방을 알맞게 골라 인쇄해 볼까요?",
    instructions: [
      "elif score >= 70: 구문 아래 빈칸 들여쓰기(Tab) 자리에 print(\"B\") 를 채워보세요.",
      "score가 75점이므로, 두 번째 elif 조건에 걸려 화면에 B가 인쇄됩니다!"
    ],
    starterCode: "score = 75\nif score >= 90:\n    print(\"A\")\nelif score >= 70:\n    \nelse:\n    print(\"C\")\n",
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
    story: "장난감 여러 개를 한 상자에 몽땅 담아두는 **'마법 바구니(리스트)'**를 만들 수 있어요! 🧺\n\n바구니를 만들 때는 양옆에 대괄호 `[ ]`를 씌우고, 안에 장난감마다 쉼표(,)를 찍어서 담아줘요.\n\n`fruits = [\"사과\", \"바나나\", \"체리\"]` 처럼 쓰면 과일 바구니가 완성돼요. 직접 바구니를 짜 볼까요?",
    instructions: [
      "첫 줄에 fruits = [\"사과\", \"바나나\", \"체리\"] 라고 적어 리스트를 생성하세요.",
      "값들이 쉼표로 잘 나뉘어 담겼는지 확인하세요!"
    ],
    starterCode: "# fruits 라는 이름의 바구니 상자를 만들고 \"사과\", \"바나나\", \"체리\" 세 글자를 담아보세요.\n",
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
    story: "바구니에 담긴 보물들은 방 번호가 매겨져 있어요. 🔑\n\n그런데 컴퓨터 나라는 신기하게 1번 방이 아니라 **0번 방부터** 숫자를 세요!\n\n`fruits = [\"사과\", \"바나나\", \"체리\"]` 가 있으면 첫 번째 과일인 사과는 `fruits[0]` 방에 살고 있어요. 바구니의 0번 방을 열어서 사과를 꺼내볼까요?",
    instructions: [
      "이미 fruits 리스트가 준비되어 있습니다.",
      "print(fruits[0]) 을 적어 첫 번째 과일을 출력해 보세요."
    ],
    starterCode: "fruits = [\"사과\", \"바나나\", \"체리\"]\n# 아래에 fruits 리스트에서 첫 번째 원소(인덱스 0)를 출력해 보세요.\n",
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
    story: "바구니 안에 보물이 모두 몇 개 들어있는지 알고 싶을 때가 있죠?\n\n이때 개수를 자로 쓱 재서 알려주는 마법 명령어가 바로 **len()** 이에요! 📐\n\n`fruits = [\"사과\", \"바나나\", \"체리\"]` 를 `len(fruits)`에 쏙 넣으면 개수인 숫자 3을 알려준답니다. 과일 개수를 세어볼까요?",
    instructions: [
      "print(len(fruits)) 를 적어 fruits 리스트 안에 든 개수를 세어 출력하세요."
    ],
    starterCode: "fruits = [\"사과\", \"바나나\", \"체리\"]\n# 아래에 len을 사용해 fruits 리스트의 아이템 개수를 구해 출력해 보세요.\n",
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
    story: "이미 만들어진 바구니에 새로운 보물을 더 담고 싶을 땐 **.append()** 라는 마법을 써요. 🧺✨\n\n바구니 이름 뒤에 마침표(.)를 찍고 `fruits.append(\"체리\")` 라고 쓰면 바구니 맨 끝에 체리가 쏙 들어가요.\n\n원래 사과와 바나나만 들어있던 바구니에 '체리'를 추가해 볼까요?",
    instructions: [
      "이미 fruits = [\"사과\", \"바나나\"] 상자가 있습니다.",
      "fruits.append(\"체리\") 라고 적어 리스트 뒤에 체리를 추가해 보세요.",
      "마지막 줄에 print(fruits) 를 적어 세 개의 과일이 다 들어갔는지 확인하세요!"
    ],
    starterCode: "fruits = [\"사과\", \"바나나\"]\n# 1. fruits 리스트 맨 뒤에 \"체리\"를 추가(append)해 보세요.\n# 2. fruits 리스트의 전체 내용을 출력(print)해 보세요.\n",
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
    story: "회전목마 탈 티켓이 있는 동안(`티켓 > 0`) 계속 뱅글뱅글 도는 마법이 **while 문**이에요! 🎠\n\n조건이 참(True)인 동안에는 멈추지 않고 계속 아래 방 코드를 실행해요.\n\n대신 회전목마를 탈 때마다 티켓을 하나씩 줄여야 해요(`count = count + 1` 등으로 횟수를 세기).\n\n그렇지 않으면 멈추지 않는 감옥에 갇히니 조심해요! count가 3이 될 때까지 돌아볼까요?",
    instructions: [
      "while count <= 3: 의 다음 줄(들여쓰기 공간)에 print(count) 와 count = count + 1 을 차례대로 적으세요.",
      "1, 2, 3이 순서대로 찍히고 반복이 끝나는지 확인하세요!"
    ],
    starterCode: "count = 1\n# 아래에 count가 3 이하인 동안 돌며 숫자를 출력하고, count를 1씩 늘리는 while 문을 완성해 보세요.\nwhile count <= 3:\n    \n",
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
    story: "회전목마를 타고 뱅글뱅글 돌다가 머리가 어지러우면 즉시 멈추고 내려야 해요! 🚨\n\n반복문을 강제로 멈추고 밖으로 탈출하는 비상 멈춤 버튼이 바로 **break** 예요.\n\n무한 루프 `while True` 속에서 돌다가, 숫자가 3이 되는 순간 `break` 버튼을 눌러 탈출해 볼까요?",
    instructions: [
      "if count == 3: 아랫줄(들여쓰기된 공간)에 비상 탈출 명령어인 break 를 적으세요.",
      "숫자가 3까지만 찍히고 프로그램이 멈추는지 확인하세요!"
    ],
    starterCode: "count = 1\nwhile True:\n    print(count)\n    if count == 3:\n        \n    count = count + 1\n",
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
    story: "매번 같은 코드를 길게 적기 힘들 때, **'마법 주문 버튼(함수)'**을 미리 조립해둘 수 있어요! 🤖\n\n주문을 정의(Define)한다는 뜻에서 **def** 라는 단어를 써서 자판기를 만들어요.\n\n`def hello():` 처럼 적고, 그 아래에 들여쓰기를 한 뒤 실행할 일을 적어두면 끝이에요.\n\n그 다음엔 `hello()` 라고 이름만 부르면 알아서 척척 실행돼요. 나만의 주문을 만들어 볼까요?",
    instructions: [
      "첫 줄에 def hello(): 를 적으세요.",
      "다음 줄에 들여쓰기 후 print(\"안녕!\") 을 적어 함수 내부 행동을 등록하세요.",
      "마지막 줄에는 들여쓰기 없이 hello() 를 적어 마법 주문을 실제로 소리 내어 작동시켜 보세요!"
    ],
    starterCode: "# 1. hello 함수를 선언(def)하고 그 안에서 \"안녕!\"을 인쇄하도록 만드세요.\n# 2. 맨 아랫줄에 hello()를 호출해 함수를 실행시켜 보세요.\n",
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
      description: "함수를 선언할 때 사용하는 특수 기워드 'def' 스펠링 풍선을 찾아 터트려 주세요!",
      word: "def",
      balloons: ["d", "e", "f"]
    }
  },
  {
    id: 27,
    planet: "Planet Param (매개 변수 행성)",
    title: "믹서기에 딸기 넣기! 매개변수",
    story: "주문 버튼을 누를 때 괄호 안에 재료를 던져줄 수 있어요! 🍓🥤\n\n이 괄호 안의 재료 상자를 **'매개변수'**라고 해요.\n\n요술 믹서기에 바나나를 넣으면 바나나 쥬스가, 딸기를 넣으면 딸기 쥬스가 나오는 원리와 같아요!\n\n`def greeting(name):` 으로 name 상자를 준비하고, `greeting(\"지안\")`을 불러 실행해 볼까요?",
    instructions: [
      "def greeting(name): 아래 줄 빈칸에 print(\"안녕 \" + name) 을 들여쓰기 해서 완성해 보세요.",
      "맨 아래에 greeting(\"지안\") 이 호출되면서 '안녕 지안'이 출력되는지 확인하세요!"
    ],
    starterCode: "def greeting(name):\n    # name 상자를 더해서 인사말을 출력하도록 아래 코드를 완성해보세요.\n    \n\ngreeting(\"지안\")\n",
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
      enemies: [
        { label: "greeting('지안')", type: "string" },
        { label: "add(5, 10)", type: "string" },
        { label: "hello()", type: "number" }
      ]
    }
  },
  {
    id: 28,
    planet: "Planet Return (보답 행성)",
    title: "자판기에서 나오는 과자! return",
    story: "자판기에 동전을 넣으면 맛있는 초코칩 과자를 밖으로 뿅 돌려주지요? 🎁\n\n함수가 열심히 계산한 진짜 결과물을 나에게 다시 돌려보내 주는 마법 명령어가 바로 **return** 이에요.\n\n개인 자판기에서 돌려받은 값을 다른 상자에 담거나 화면에 보여줄 수 있어요. 두 수를 더해서 결과를 돌려주는 더하기 자판기를 완성해 볼까요?",
    instructions: [
      "def add(a, b): 아랫줄 들여쓰기 자리에 두 수의 합을 돌려주는 return a + b 를 적으세요.",
      "맨 아랫줄에 print(add(3, 5)) 의 결과로 8이 깔끔하게 찍히는지 확인하세요!"
    ],
    starterCode: "def add(a, b):\n    # 여기에 a와 b를 더한 값을 return(반환)하도록 완성하세요.\n    \n\nprint(add(3, 5))\n",
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
    story: "바구니에 담긴 장난감들을 하나씩 다 꺼내서 구경하고 싶을 때가 있죠? 🌀🧺\n\n`for fruit in fruits:` 라고 쓰면, fruits 바구니에서 첫 번째 것부터 하나씩 꺼내어 `fruit` 임시 상자에 담아 보여줘요. 바구니에 담긴 과일들을 전부 꺼내서 구경해 볼까요?",
    instructions: [
      "for fruit in fruits: 의 아랫줄 들여쓰기(Tab) 공간에 print(fruit) 를 적으세요.",
      "과일 이름이 사과, 바나나, 체리 순으로 한 줄씩 알아서 연속 인쇄되는 광경을 확인해 보세요!"
    ],
    starterCode: "fruits = [\"사과\", \"바나나\", \"체리\"]\n# fruits 리스트의 모든 아이템들을 하나씩 꺼내 출력하는 반복문을 완성하세요.\nfor fruit in fruits:\n    \n",
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
    story: "지안 탐험가님! 정말 축하해요! 드디어 30번째 졸업식장에 도착했어요! 🎓🎉🚀\n\n마지막 과제는 1부터 10까지 든 풍선 바구니에서, 2로 나누어떨어지는 **짝수(2, 4, 6, 8, 10)** 풍선만 터트려 불꽃놀이를 하는 것이에요!\n\n짝수인지 묻는 힌트는 `number % 2 == 0` 이에요. 멋지게 짝수만 출력하고 우주 졸업장을 받아 가세요!",
    instructions: [
      "1부터 10까지 든 numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] 리스트가 준비되어 있습니다.",
      "for number in numbers: 반복문 안에서, 만약(if) number를 2로 나눈 나머지(%)가 0과 같다면(==) 그 숫자를 출력(print)하도록 완성하세요."
    ],
    starterCode: "numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]\n# numbers 리스트를 돌며 짝수(2로 나눈 나머지가 0인 수)만 출력하는 코드를 완성해 보세요!\nfor number in numbers:\n    if number % 2 == 0:\n        \n",
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
