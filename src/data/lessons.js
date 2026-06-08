export const lessons = [
  {
    id: 1,
    planet: "Planet Hello (안녕 행성)",
    title: "우주선 시동 걸기! print()",
    story: "지안 탐험가님! 반가워요! 🚀\n\n우주선에 타서 시동을 걸려면, 동반자 로봇 '파이디(Pydi)'에게 소리 내어 인사를 건네야 해요.\n\n컴퓨터 화면에 글자를 보여주는 마법 명령어는 바로 print() 예요!\n\n* print: 영어로 '인쇄하다'라는 뜻으로, 괄호 `()` 안에 넣은 값을 화면에 보여주라는 명령어예요.\n* 큰따옴표(\"\"): 컴퓨터에게 \"이건 명령어가 아니라 그냥 글자(문장)야!\"라고 알려주는 말풍선 옷이에요. 따옴표 옷이 없으면 파이썬이 기계 명령어로 착각해서 고장 나니 조심해요! 🤖",
    instructions: [
      "print(\"안녕 파이디\") 라고 코딩 창에 정확하게 적어봐요.",
      "print 단어는 컴퓨터가 알아들을 수 있게 꼭 소문자로 적어주세요. (대문자 Print는 못 알아들어요!)",
      "괄호 `()` 안에 들어간 글자 앞뒤로 큰따옴표 `\" \"` 가 예쁘게 감싸고 있는지 확인해요.",
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
    story: "파이썬 나라에는 '글자(문자열)'와 '숫자'가 살고 있어요.\n\n* 글자(String): 말 그대로 글자예요. 꼭 큰따옴표(`\" \"`) 옷을 입고 다녀요. 예: `\"파이디\"`\n* 숫자(Number): 수학 계산을 할 수 있는 진짜 수예요. 따옴표 옷 없이 날씬하게 생으로 다녀요. 예: `30`\n\n만약 따옴표 옷을 입은 글자 `\"30\"`은 낱말 카드일 뿐이라 덧셈 계산이 안 되지만, 그냥 숫자 `30`은 다른 숫자와 더하고 빼는 진짜 계산을 할 수 있답니다. 파이디의 몸무게인 숫자 30과 이름인 글자 '파이디'를 출력해볼까요?",
    instructions: [
      "첫 번째 줄에는 따옴표가 없는 진짜 숫자를 넣어 print(30) 을 적어봐요.",
      "두 번째 줄에는 따옴표 옷을 입혀서 글자 형태로 print(\"파이디\") 를 적어봐요.",
      "줄을 나누어 첫째 줄엔 숫자 30을 출력하고, 둘째 줄엔 글자 파이디를 출력하는 거예요!"
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
    story: "파이썬은 수학 계산을 아주 좋아하는 계산 천재예요! 🧮\n\n더하기는 `+`, 빼기는 `-` 기호를 써서 수학 계산을 시킬 수 있어요.\n\n* print(5 + 7): 따옴표 옷 없이 숫자를 넣고 `+`를 쓰면, 파이썬이 직접 5와 7을 더해 계산 결과인 `12`를 구해서 화면에 보여줘요.\n* print(\"5 + 7\"): 만약 이렇게 따옴표 옷을 입히면, 파이썬은 계산할 필요가 없는 일반 글자 카드로 이해해 식의 모양 그대로 `5 + 7`을 인쇄하게 돼요.\n\n파이썬에게 직접 계산을 시켜 결과를 받아볼까요?",
    instructions: [
      "따옴표 옷을 전혀 입히지 않고 print(5 + 7) 을 적어보세요.",
      "실행 후 결과가 수식 모양(5+7)이 아니라, 계산이 완료된 깔끔한 숫자 12로 나오는지 확인해봐요!"
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
    story: "파이썬에서는 데이터를 담아두는 '이름표 마법 상자(변수)'를 만들 수 있어요. 📦\n\n상자 앞면에 `stars` 같은 예쁜 이름을 붙여놓고 필요한 보석이나 숫자를 보관해두는 것이죠.\n\n* `=` (대입 연산자): 파이썬에서 `=`는 수학의 '같다'가 아니에요! '오른쪽의 보석을 왼쪽 이름표 상자에 쏙 집어넣는 마법의 전달 벨트'랍니다!\n* `stars = 10`: 이 문장은 `10`이라는 숫자를 `stars`라는 이름을 붙인 상자에 전달 벨트로 쏙 넣어 보관하라는 주문이에요.\n* `print(stars)`: 상자 안에 든 보석을 꺼내서 화면에 보여주라는 명령어예요. 이때 상자 이름에는 따옴표 옷(`\"\"`)을 입히지 않아야 상자가 열려요! (따옴표를 씌우면 상자 내용물이 아니라 그냥 'stars'라는 글자 카드가 출력돼요.)",
    instructions: [
      "첫 줄에 stars = 10 이라고 적어 10을 보관한 stars 상자를 만드세요. (공백은 기호 앞뒤에 1칸씩 띄어주면 가독성이 좋아요!)",
      "그 아래 줄에 print(stars) 를 적어 상자의 뚜껑을 열어 내용물(10)을 인쇄하세요.",
      "상자 이름 stars 에는 절대 따옴표 옷(\"\")을 입히지 마세요!"
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
    story: "이름표 마법 상자에는 숫자뿐만 아니라 따옴표 옷을 입은 글자도 담아둘 수 있어요. 💬\n\n글자가 담긴 상자와 다른 글자를 결합하고 싶을 땐 어떻게 할까요?\n\n* 글자 더하기 (`+`): 글자와 글자 사이에 `+` 기호를 쓰면, 글자들을 풀칠하듯이 앞뒤로 찰떡처럼 길게 이어붙일 수 있답니다! 예: `\"안녕\" + \"지안\"` -> `\"안녕지안\"`이 돼요.\n* `name = \"지안\"`: `name` 상자에 `\"지안\"` 글자 카드를 보관해요.\n* `print(\"안녕 \" + name)`: 글자 `\"안녕 \"`과 `name` 상자 안에 든 글자(`\"지안\"`)를 `+`로 이어붙여서 `\"안녕 지안\"`을 화면에 크게 말해요.",
    instructions: [
      "첫 줄에 name = \"지안\" 이라고 적어 지안이 이름이 담긴 name 상자를 만드세요.",
      "그 아랫줄에 print(\"안녕 \" + name) 을 적어 안녕이라는 인사말과 상자 속 이름을 합해 출력해보세요!",
      "안녕 뒤에 띄어쓰기가 한 칸 들어가 있는 글자(\"안녕 \")와 name 상자를 더해 글자가 예쁘게 띄어지게 해주세요."
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
    planet: "Planet Message (우주 번역 행성)",
    title: "무엇을 좋아하나요? 글자 변수",
    story: "이번 행성에서도 글자 상자를 만들어 인사말을 조립해 봐요. 💬\n\n* `answer = \"피자\"`: `answer`라는 이름의 마법 상자를 만들고 그 안에 `\"피자\"`라는 문자열을 저장해요.\n* `\"내가 좋아하는 음식은 \" + answer`: 상자에 저장된 값 앞에 설명해주는 글자를 덧붙여서 의미가 통하는 문장으로 조립하는 풀칠 마법이에요.",
    instructions: [
      "첫 줄에 answer = \"피자\" 라고 작성해 좋아하는 음식 이름을 answer 상자에 잘 보관해 두세요.",
      "두 번째 줄에 print(\"내가 좋아하는 음식은 \" + answer) 를 작성하여 문장 완성본을 파이디 스피커로 출력하세요!"
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
    story: "파이썬 나라의 로봇들은 아주 정직해서 어떤 질문이나 수식을 비교하면 참(True) 혹은 거짓(False)으로만 대답해요. ⚖️\n\n* True(참): 식의 질문이 진짜 맞다(진실)는 것을 뜻해요.\n* False(거짓): 식의 질문이 틀렸다(거짓)는 것을 뜻해요.\n* `>` (크다 기호): 왼쪽 값이 오른쪽 값보다 더 큰지 파이썬에게 판단을 요청하는 비교 기호예요.\n* `print(10 > 5)`: '10이 5보다 큰가요?'라고 묻는 수식이에요. 10이 더 크기 때문에 진실이죠! 파이썬은 이 질문을 해결해 화면에 참이라는 뜻의 `True`를 직접 인쇄해 줍니다.",
    instructions: [
      "코딩 창에 print(10 > 5) 를 적어서 실행해보세요.",
      "실행 후 콘솔에 영어로 True가 깔끔하게 출력되는지 확인해봐요!",
      "참고로 파이썬에서 True와 False는 반드시 첫 글자를 대문자로 써야 하는 고유 이름이에요. (소문자 true는 안 돼요!)"
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
    story: "만약(if) 우주선 앞에 장애물이 가까이 오면, 경로를 꺾어 피해야 해요! 🚧\n\n조건에 따라 컴퓨터의 행동을 통제하는 마법을 바로 if 문(조건문)이라고 불러요.\n\n* `if`: 영어로 '만약에 ~라면'이라는 뜻을 가져요.\n* `if distance < 5:`: '만약에 distance 상자 값이 5보다 작다면'이라는 비교 공식이에요.\n* `:` (콜론): 조건식의 끝에 붙여요. '조건이 맞으면 이 문을 열고 아래 방으로 들어가라!'라는 열쇠 기호예요. 절대 빼먹으면 안 돼요!\n* 들여쓰기(Tab/공백 4칸): 콜론 문을 열고 방 안으로 들어왔다면, 그 방에 속한 코드는 수직 시작 위치를 안쪽으로 밀어 써야 해요. 이것을 들여쓰기라고 하며, 조건이 참일 때만 이 방 안의 행동들이 실행돼요.",
    instructions: [
      "이미 `distance = 3` 상자가 윗줄에 선언되어 있습니다.",
      "셋째 줄의 `if distance < 5:` 바로 아래 빈 칸에 들여쓰기(Tab)를 한 번 넣고 print(\"삐삐!\") 코드를 완성하세요.",
      "거리가 3이라 5보다 작기 때문에, 조건방이 참(True)으로 열려 '삐삐!' 경고 글자가 인쇄될 거예요!"
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
      type: "dodge-code",
      title: "if 관문 운석 피하기",
      description: "다가오는 조건식을 보고 참이면 [참 길], 거짓이면 [거짓 길]로 우주선을 재빨리 이동하세요!",
      lanes: ["참 길", "거짓 길"],
      obstacles: [
        { label: "distance < 5 (distance = 3)", dangerLane: 1, safeLane: 0, hazard: "if 운석", success: "참 길 통과! if 문이 열렸어요." },
        { label: "distance > 10 (distance = 3)", dangerLane: 0, safeLane: 1, hazard: "조건 운석", success: "거짓 길 통과! 조건을 잘 읽었어요." },
        { label: "distance == 3 (distance = 3)", dangerLane: 1, safeLane: 0, hazard: "비교 운석", success: "정확해요! 같은 값인지 잘 확인했어요." }
      ]
    }
  },
  {
    id: 9,
    planet: "Planet Passport (우주 검사소 행성)",
    title: "두 갈래 길! if-else 문",
    story: "만약(if) 에너지가 충분하면 출발하고, 그렇지 않으면(else) 충전을 해야 해요! 🛂\n\n조건이 맞을 때와 안 맞을 때 각각 전혀 다른 행동을 하도록 활주로를 나누는 것이 if-else 마법이에요.\n\n* `else:`: 영어로 '그렇지 않으면 / 나머지의 경우'라는 뜻이에요.\n* 동작 원리: 위의 `if` 조건식이 참(True)이면 `if` 방의 코드를 실행하고, 만약 `if` 조건이 거짓(False)으로 어긋나면 무조건 아래 `else:` 방으로 강제 연결되어 그 안의 코드를 실행해요.\n\n조건이 참일 때와 거짓일 때 두 갈래 길의 행동을 등록해 볼까요?",
    instructions: [
      "if 방(`energy >= 50`)이 열렸을 때 실행할 행동인 `print(\"출발!\")`을 if 아래 들여쓰기 공간에 채워 넣으세요.",
      "else 방(`else:`)이 가동될 때 실행할 행동인 `print(\"충전 필요\")`를 else 아래 들여쓰기 공간에 채워 넣으세요.",
      "if 아래와 else 아래 모두 꼭 4칸 공백(Tab) 들여쓰기가 똑같이 잘 맞춰졌는지 확인하세요!"
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
      type: "dodge-code",
      title: "if-else 두 갈래 활주로",
      description: "조건이 참이면 if 활주로, 거짓이면 else 활주로로 순발력 있게 피하세요!",
      lanes: ["if 활주로", "else 활주로"],
      obstacles: [
        { label: "energy >= 50 (energy = 80)", dangerLane: 1, safeLane: 0, hazard: "출발 관문", success: "if 활주로 진입! 에너지가 충분해요." },
        { label: "energy < 50 (energy = 80)", dangerLane: 0, safeLane: 1, hazard: "충전 관문", success: "else 활주로 진입! 거짓 조건을 잘 피했어요." },
        { label: "else 실행? (energy = 80)", dangerLane: 0, safeLane: 1, hazard: "갈림길 운석", success: "맞아요. if가 참이면 else는 실행되지 않아요." }
      ]
    }
  },
  {
    id: 10,
    planet: "Planet Galaxy (은하수 행성)",
    title: "별 그리기 대작전! for 반복문",
    story: "똑같은 행동을 귀찮게 여러 번 적지 않고 자동으로 반복하고 싶을 때는 for 반복 장치 마법을 부려요. 🌀\n\n`for i in range(5):` 구문을 하나씩 쪼개어 해석해 볼게요:\n\n* `for`: '반복하자!'라는 선언이에요.\n* `range(5)`: 컴퓨터가 숫자 0, 1, 2, 3, 4 라는 총 5개의 숫자 대기열(방)을 만들어주는 명령어예요.\n* `i`: 숫자를 하나씩 배달해서 보관할 '임시 배달원 상자(변수)'예요.\n* `for i in range(5):`: 배달원 `i`가 `range(5)`가 만든 숫자 `0, 1, 2, 3, 4`를 한 바퀴 돌 때마다 하나씩 집어넣으며, 아래 들여쓰기된 방의 행동을 총 5번 뱅글뱅글 반복해 실행하라는 주문이에요.\n\n이 톱니바퀴 반복문을 돌려 예쁜 별(★)을 5개 찍어 은하수를 수놓아 볼까요?",
    instructions: [
      "둘째 줄의 `for i in range(5):` 아랫줄 빈칸에 들여쓰기(Tab)를 한 번 넣고 print(\"★\") 을 채워 넣으세요.",
      "실행 버튼을 누르고, 단 한 줄의 print문만으로 별 `★`이 5번 연속 출력되는지 확인해봐요!"
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
    story: "우주선 너머 기상청 서버와 통신하여 정보를 불러오는 마법 API를 써볼 시간이에요! 🌤️\n\n* API(Application Programming Interface): 다른 컴퓨터나 서버에 '날씨 알려줘!', '고양이 보내줘!' 같이 정해진 기능 심부름을 시키는 통신 다리에요.\n* `magic.get_weather()`: 우주선 기상 시스템에 '실시간 우주 날씨 정보 카드'를 배달해달라고 요청하는 API 명령어예요.\n* `today_weather = magic.get_weather()`: 배달되어 돌아온 날씨 카드 정보를 `today_weather` 상자에 담아 보관해요.\n* `print(\"오늘 날씨는: \" + today_weather)`: 상자에서 날씨 내용을 꺼내 안내 문구와 결합하여 스피커로 발표해요.",
    instructions: [
      "첫 줄에 today_weather = magic.get_weather() 라고 작성해 날씨 배달 데이터를 상자에 담아두세요.",
      "두 번째 줄에 print(\"오늘 날씨는: \" + today_weather) 를 작성하여 날씨를 이어붙여 출력해 보세요!"
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
    story: "지안 탐험가님, 정말 장해요! 1부 여정의 마지막 행성에 도착했어요! 🐱🐾\n\n이곳에는 길을 잃어버린 아기 우주 고양이가 애타게 구조를 기다리고 있어요.\n\n* `magic.show_cat()`: 고양이 구조대 위성에 구조 신호 파동을 전송하여, 우리 우주선 화면으로 고양이를 안전하게 워프(Warp) 소환시키는 특수 이미지 구조 API 명령어예요.",
    instructions: [
      "코딩 창에 magic.show_cat() 주문을 입력하여 구조선 통신을 가동하세요.",
      "콘솔 창에 귀여운 아기 고양이 그림이 성공적으로 전송되어 나타나는지 지켜봐요!"
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
    story: "지안 탐험가님, 이번엔 연료와 식량을 여러 배로 증식시키는 사칙연산 계산 마법이에요! 🛸\n\n파이썬 나라는 키보드에 없는 곱셈과 나눗셈 기호를 대체하기 위해 특수한 수학 기호를 써요.\n\n* `*` (곱하기): 키보드의 별표(`*`) 기호가 파이썬의 곱하기 연산자예요. 예: `5 * 3` (5 곱하기 3)\n* `/` (나누기): 키보드의 슬래시(`/`) 기호가 파이썬의 나누기 연산자예요. 예: `10 / 2` (10 나누기 2). 나눗셈을 하면 컴퓨터는 항상 `.0`이 붙은 실수(소수점) 형태로 소수점 몫까지 친절하게 대답해 준답니다.",
    instructions: [
      "첫 번째 줄에 5 곱하기 3을 계산하여 보여주는 print(5 * 3) 을 작성하세요.",
      "두 번째 줄에 10 나누기 2를 계산하여 보여주는 print(10 / 2) 를 작성하세요.",
      "기호들이 슬래시(`/`)와 별표(`*`)로 제대로 사용되었는지 확인해요!"
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
    story: "보물 보석 10개를 3명의 친구들에게 공평하게 한 상자씩 나누어 주면, 각각 3개씩 가질 수 있고 1개의 보석이 남게 돼요! 🍪\n\n파이썬은 나눗셈을 할 때 '몇 번 나누어 담겼는지(몫)'와 '다 나누고 찌꺼기가 얼마나 남았는지(나머지)'를 각각 따로 계산할 수 있어요.\n\n* `//` (몫 연산자): 슬래시를 연속 두 개 쓰면, 나눗셈을 한 뒤 소수점 이하는 버리고 오로지 딱 정수로만 몇 번 들어가는지 몫만 알려줘요. 예: `10 // 3` -> `3`\n* `%` (나머지 연산자): 퍼센트 기호를 쓰면, 나눗셈을 하고 남은 찌꺼기인 나머지만 구해줘요. 짝수와 홀수, 배수를 판정할 때 엄청 유용하답니다! 예: `10 % 3` -> `1`",
    instructions: [
      "첫 번째 줄에 10을 3으로 나눈 몫을 보여주도록 print(10 // 3) 을 작성하세요.",
      "두 번째 줄에 10을 3으로 나눈 나머지를 보여주도록 print(10 % 3) 을 작성하세요."
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
    story: "파이썬에서는 정말 신기하게도 글자에 숫자를 곱하는 장난 같은 마법을 부릴 수 있어요! 🎨\n\n* `\"글자\" * 숫자`: 글자 카드 뒤에 곱하기 기호 `*`를 쓰고 숫자를 적으면, 그 숫자만큼 글자를 도장 찍듯 복사해서 한 줄로 주루룩 길게 늘려줘요.\n* `\"★\" * 5`: 이 식은 별 모양 도장을 5번 연속 찍어서 `★★★★★` 라는 하나의 길쭉한 글자로 증식시켜 준답니다. 일일이 키보드로 별 다섯 번 칠 필요가 없어서 엄청 강력해요!",
    instructions: [
      "코딩 창에 print(\"★\" * 5) 를 적고 실행해 보세요.",
      "글자 `\"★\"`에 곱하기 기호와 숫자 5가 알맞게 결합되었는지 확인해요."
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
    story: "파이썬에서 두 물건이 서로 '같지 않다(다르다)'고 컴퓨터에게 질문하고 판정하고 싶을 땐 어떻게 할까요? ⚖️\n\n* `!=` (같지 않다 연산자): 느낌표(`!`)는 파이썬에서 '부정(아니다)'을 의미해요. 따라서 느낌표와 같다(`!=`)를 연이어 적으면 '두 값이 서로 같지 않니?'라고 묻는 연산자가 돼요.\n* `5 != 3`: 5와 3은 숫자가 다르고 같지 않으므로, 이 식은 사실(진실)이에요! 그래서 파이썬은 맞다며 `True`를 돌려준답니다.\n* 만약 `5 != 5` 라고 물어보면 5와 5는 같은 수니까 거짓말이라 `False`를 내놓아요.",
    instructions: [
      "코딩 창에 print(5 != 3) 을 입력하여 5와 3이 같지 않은지 물어보세요.",
      "결과로 화면에 True가 정상적으로 판정되어 출력되는지 확인하세요!"
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
      type: "dodge-code",
      title: "다른 얼굴 외계인 피하기",
      description: "서로 다르면 [다름 길], 같으면 [같음 길]로 재빨리 이동해 외계인 추격을 피하세요!",
      lanes: ["다름 길", "같음 길"],
      obstacles: [
        { label: "5 != 5", dangerLane: 0, safeLane: 1, hazard: "쌍둥이 외계인", success: "같음 길 성공! 두 값은 같아요." },
        { label: "10 != 3", dangerLane: 1, safeLane: 0, hazard: "비교 외계인", success: "다름 길 성공! 두 값은 달라요." },
        { label: "'A' != 'B'", dangerLane: 1, safeLane: 0, hazard: "문자 외계인", success: "다름 길 성공! 글자도 비교할 수 있어요." }
      ]
    }
  },
  {
    id: 17,
    planet: "Planet Logical And (쌍둥이 관문 행성)",
    title: "쌍둥이 열쇠 구멍! and",
    story: "우주 비밀의 문을 열려면 왼쪽 열쇠 구멍 그리고 오른쪽 열쇠 구멍에 두 개의 열쇠를 둘 다 넣고 돌려야 해요! 🔑🔑\n\n이렇게 여러 조건이 '모두 다 참(True)일 때만' 최종 참으로 판정해주는 논리 마법 단어가 바로 and 예요.\n\n* `and` (논리곱): 양옆의 조건 두 개를 모두 깐깐하게 검사해요.\n* `True and True`: 두 열쇠 조건이 다 맞으므로, 최종 결과가 `True`가 돼요.\n* `True and False`: 하나라도 틀린 거짓(False)이 섞여 있으면, 비밀문은 절대 열리지 않고 최종 `False`가 되어 버린답니다.",
    instructions: [
      "코딩 창에 print(True and True) 라고 적어서 실행해 보세요.",
      "두 조건이 모두 진실이라 전체 판정으로 True가 깔끔하게 노출되는지 확인해봐요!"
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
    story: "초코 젤리와 딸기 젤리 중 '어느 한쪽이라도' 우주선 냉장고에 들어있다면 지안 탐험가는 기뻐요! 🍦\n\n이렇게 양옆의 비교식 중 '단 하나라도 맞으면(True)' 통과시켜 전체를 참(True)으로 인정해주는 논리 마법 단어가 바로 or 이에요.\n\n* `or` (논리합): 비교식 두 개 중 하나라도 진실이면 전체를 진실로 판정해요.\n* `True or False`: 오른쪽이 비록 거짓(False)이어도, 왼쪽 한 군데가 참(True)이므로 최종 결과는 통과되어 `True`가 돼요.\n* 오로지 둘 다 거짓(`False or False`)일 때만 가차 없이 `False` 판정이 난답니다.",
    instructions: [
      "코딩 창에 print(True or False) 를 적고 실행해 보세요.",
      "한쪽만 참이어도 너그러운 판사인 or 덕분에 최종 결과가 True로 인쇄되는지 확인해 보세요!"
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
    story: "만약 비가 오면 장화를 신고, 눈이 오면 패딩을 입고, 해가 쨍쨍하면 모자를 써요! 👒\n\n이렇게 세 가지 이상 다양한 갈래 조건에 맞춰 서로 다른 길을 검사하고 싶을 땐 elif 구문을 사용해요.\n\n* `elif`: 영어 'Else If'를 파이썬스럽게 합쳐 줄여 적은 예약어예요. '그렇지 않고 만약 다른 조건이 ~라면'이라는 징검다리 조건문이에요.\n* 작동 순서: 맨 처음 `if` 조건을 검사해요. 맞으면 `if` 방을 실행하고 끝나요. 만약 `if` 조건이 어긋나면 그 아래에 있는 `elif` 조건을 순서대로 노크해요. 맞으면 그 `elif` 방을 실행해요! 모든 if와 elif 조건이 다 안 맞으면 최하단 `else:` 방으로 골인해요.\n\n점수가 75점일 때, 등급 방을 알맞게 골라 인쇄해 볼까요?",
    instructions: [
      "score가 75로 준비되어 있습니다. 70점 이상인 `elif score >= 70:` 조건 아래 들여쓰기 공간(빈 줄)을 찾으세요.",
      "해당 줄에 print(\"B\") 를 채워 적으세요.",
      "실행 후, 90점보다 낮고 70점보다는 높은 score 값에 맞춰 B가 화면에 출력되는지 확인해봐요!"
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
    story: "장난감 상자 여러 개를 매번 따로 만들기 너무 힘드니, 하나의 긴 기차 칸 같은 '마법 주머니(리스트)'를 사용해 한 번에 보관해요! 🧺\n\n* 리스트(List): 여러 개의 데이터를 일렬로 묶어놓은 자료들의 모임(바구니)이에요.\n* 대괄호(`[ ]`): 파이썬에서 대괄호 `[ ]`는 여러 물건을 담을 마법 리스트 주머니를 짜겠다는 약속 기호예요.\n* 쉼표(`,`): 주머니 속 각각의 보석들을 서로 섞이지 않게 구분해주는 칸막이 기호예요.\n* `fruits = [\"사과\", \"바나나\", \"체리\"]`: 사과, 바나나, 체리 세 문자열 카드를 순서대로 쏙 엮어서 `fruits`라는 이름의 커다란 모둠 상자에 한 방에 집어넣는 주문이랍니다.",
    instructions: [
      "코딩 창에 fruits = [\"사과\", \"바나나\", \"체리\"] 라고 적어서 3개의 과일이 묶인 바구니를 생성하세요.",
      "대괄호 `[ ]`로 과일들을 잘 묶었는지, 과일 이름마다 쉼표(`,`)로 벽을 쳐 줬는지 꼭 점검해 보세요!"
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
    story: "바구니에 담긴 여러 보물들을 딱 하나만 지목해서 꺼내고 싶을 땐 번호를 불러 문을 열어요! 🔑\n\n그런데 파이썬 나라는 아주 신기하게도 첫 번째 방 번호를 1이 아닌 0번 방부터 세기 시작해요!\n\n* 인덱스(Index): 리스트 안에 든 물건의 방 번호(위치 값)예요.\n* `fruits[0]`: `fruits` 바구니에 들어있는 물건 중 가장 첫 번째(0번 인덱스) 물건인 `\"사과\"`를 가리켜요.\n* `fruits[1]`: 두 번째 방에 살고 있는 `\"바나나\"`를 꺼내와요.\n* `fruits[2]`: 세 번째 방에 살고 있는 `\"체리\"`를 열어요.\n\n바구니의 가장 첫 방인 0번 방을 조준해서 사과를 출력해 볼까요?",
    instructions: [
      "이미 `fruits = [\"사과\", \"바나나\", \"체리\"]` 가 준비되어 있습니다.",
      "그 아랫줄에 print(fruits[0]) 을 작성해 첫 번째 보물(사과)을 문 열어 출력하세요.",
      "대괄호 `[ ]` 안에 방 번호 0을 정확히 지정해 적어야 첫 번째 과일 상자가 열린답니다."
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
    story: "바구니 안에 보물이 모두 몇 개 들어있는지 손으로 일일이 세기 귀찮을 때 쓰는 편리한 자가 있어요. 📐\n\n* `len()`: 영어 'Length(길이)'에서 이름을 딴 명령어로, 괄호 `()` 안에 리스트 주머니를 쏙 넣으면 그 안에 아이템이 총 몇 개 들어있는지 개수(길이)를 측정해 숫자로 돌려줘요.\n* `len(fruits)`: `fruits` 바구니 속 과일의 총 개수인 숫자 `3`을 구해와요. 이 구해온 숫자를 print로 출력하면 개수가 딱 콘솔에 찍히겠죠?",
    instructions: [
      "코딩 창 아랫줄에 print(len(fruits)) 라고 적어 fruits 리스트 안에 과일이 총 몇 개 들어있는지 측정해 화면에 출력해 보세요."
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
    story: "이미 만들어진 바구니에 새로운 보물을 뒤늦게 쏙 집어넣어 크기를 늘리고 싶을 땐 덧붙이기 마법을 써요. 🧺✨\n\n* `.append()`: 영어로 '덧붙이다'라는 뜻으로, 리스트 주머니 맨 뒤 꼬리에 새로운 물건을 추가해주는 마법이에요.\n* `fruits.append(\"체리\")`: 주머니 이름 바로 뒤에 마침표(`.`)를 붙여 append 명령을 연결해요. 괄호 안에 추가하고 싶은 선물인 `\"체리\"` 글자 카드를 밀어 넣으면, fruits 리스트 맨 끝 방에 체리가 쏙 들어가 바구니의 크기가 3칸으로 늘어나요.\n\n원래 사과와 바나나만 들어있던 바구니에 '체리'를 추가해 볼까요?",
    instructions: [
      "이미 `fruits = [\"사과\", \"바나나\"]` 가 윗줄에 준비되어 있습니다.",
      "둘째 줄에 fruits.append(\"체리\") 라고 적어 리스트 맨 끝에 체리를 쏙 추가하세요.",
      "셋째 줄에 print(fruits) 를 적어서, 최종 바구니에 세 개의 과일이 정상적으로 다 보관되었는지 확인하세요!"
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
    story: "놀이공원에서 회전목마 탈 티켓 수량이 여전히 남아 있는 동안(`count <= 3`) 멈추지 않고 뱅글뱅글 반복해서 목마를 타는 마법이 바로 while 문이에요! 🎠\n\n* `while`: 영어로 '~하는 동안에'라는 뜻이에요.\n* `while count <= 3:`: 'count 변수 상자 값이 3 이하인 동안에는 계속 아래 방 명령을 멈추지 말고 뱅글뱅글 반복해라!'라는 루프 명령이에요.\n* `count = count + 1`: 회전목마를 한 바퀴 탈 때마다 상자의 숫자를 1씩 증가시키는 룰이에요. 이 장치가 있어야 count가 `1 -> 2 -> 3 -> 4`로 늘어나서 결국 조건이 거짓(False)이 되어 루프 감옥을 탈출해 멈출 수 있어요. (이게 없으면 프로그램이 평생 멈추지 않는 오류에 걸려요!)",
    instructions: [
      "셋째 줄의 `while count <= 3:` 아래 빈 칸 들여쓰기 공간(Tab)에 print(count) 코드를 채우세요.",
      "그 바로 밑줄(같은 들여쓰기 칸)에 카운터를 하나 올려 탈출을 돕는 count = count + 1 식을 채우세요.",
      "실행 후 화면에 숫자가 1, 2, 3까지 순서대로 세 번 출력되고 회전목마가 잘 내리는지 확인하세요!"
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
    story: "반복 회전 열차를 타고 뱅글뱅글 영원히 돌다가 너무 힘들어지면 즉시 강제로 기차를 비상 정지시키고 탈출해야 해요! 🚨\n\n* `break`: 영어로 '부수다, 깨다'라는 뜻을 가져요. 파이썬에서는 반복 톱니바퀴를 강제로 와장창 부수고 탈출하는 '비상 멈춤 버튼'이에요.\n* 작동 방식: 무한 루프인 `while True:` 안에서 숫자를 1씩 늘려 출력하다가, 만약(`if`) 세 번째 바퀴(`count == 3`)가 도달하면 조건방 안의 `break` 명령을 호출해요. 그러면 반복 열차가 강제로 멈추며 밖으로 뿅 탈출합니다.",
    instructions: [
      "다섯째 줄의 `if count == 3:` 바로 아래 들여쓰기 공간(Tab)에 비상 정지 버튼인 break 단어를 적어 넣으세요.",
      "실행 후 숫자가 평생 끝나지 않고 계속 뜨는 것이 아니라, 3까지만 찍히고 비상 정지하여 안전하게 멈추는지 확인하세요!"
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
    story: "매번 긴 동작 코드를 직접 작성하는 것은 비효율적이에요. 요술 믹서기 같은 나만의 '주문 단축키(함수)'를 조립해두면 편하답니다! 📜\n\n* 함수(Function): 특정한 행동을 모아놓은 요술 공장 상자예요.\n* `def`: 영어 'Define(정의하다)'의 약자로, 컴퓨터에게 '이제부터 새로운 나만의 커스텀 단축키 명령어를 알려줄게!'하고 선언하는 마법 시작 표식이에요. 예: `def hello():` (hello라는 단축키를 조립하자)\n* 함수 호출: 정의해둔 단축키 이름 뒤에 괄호를 붙여 `hello()` 라고 코드에 소리쳐 부르면, 아까 def 방에 보관해 두었던 행동이 뿅 실행된답니다.",
    instructions: [
      "첫 번째 줄에 def hello(): 를 입력하여 hello 라는 주문 자판기 뼈대를 짜세요.",
      "두 번째 줄에 들여쓰기(Tab)를 한 칸 넣고 print(\"안녕!\") 을 적어 자판기가 작동할 때 뱉어낼 행동을 등록하세요.",
      "마지막 줄에는 들여쓰기 없이(가장 왼쪽 수직줄에 맞춰) hello() 를 작성하여, 완성된 자판기 버튼을 꾹 눌러 실행시키세요!"
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
      description: "함수를 선언할 때 사용하는 특수 키워드 'def' 스펠링 풍선을 찾아 터트려 주세요!",
      word: "def",
      balloons: ["d", "e", "f"]
    }
  },
  {
    id: 27,
    planet: "Planet Param (매개 변수 행성)",
    title: "믹서기에 딸기 넣기! 매개변수",
    story: "요술 믹서기에 바나나를 던지면 바나나 쥬스가, 딸기를 던지면 딸기 쥬스가 튀어나오죠! 🍓🥤\n\n함수를 만들 때도 괄호 안에 재료를 던져서 매번 다르게 작동시킬 수 있어요.\n\n* 매개변수(Parameter): 함수 자판기가 외부에서 던져주는 재료(과일)를 받아두기 위해 문앞에 뚫어놓은 '투입구 보관 상자'예요.\n* `def greeting(name):`: 이 자판기는 `name`이라는 재료 투입구를 가지고 있어요.\n* `print(\"안녕 \" + name)`: 들어온 재료 `name`에 \"안녕\"을 덧붙여 말하는 로직이에요.\n* `greeting(\"지안\")`: 투입구에 `\"지안\"` 이라는 실제 글자 덩어리를 툭 던져 넣으며 자판기를 작동시켜요! 그러면 `name`에 지안이가 들어가서 \"안녕 지안\"이 튀어나와요.",
    instructions: [
      "둘째 줄의 `def greeting(name):` 바로 아래 빈 줄(들여쓰기 적용 줄)을 찾으세요.",
      "그 줄에 print(\"안녕 \" + name) 코드를 채우세요.",
      "맨 아래에 이미 `greeting(\"지안\")` 호출 코드가 준비되어 있으니, 실행 후 '안녕 지안'이 정상 조립되어 찍히는지 확인하세요!"
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
    story: "믹서기나 자판기 안에 재료를 넣고 작동시키면, 결과물(주스나 과자)을 기계 밖으로 툭 돌려받아야 진짜로 먹을 수 있죠! 🎁\n\n* `return`: 영어로 '돌려주다, 보답하다'라는 뜻이에요. 함수 기계가 계산을 끝낸 최종 가치(결과물)를 자판기 배출구로 나에게 다시 돌려보내 주는(반환) 마법 명령어예요.\n* `return a + b`: `a`와 `b`를 더한 소중한 결과 정답 값을 기계 바깥으로 뱉어서 돌려보내 줘요.\n* `print(add(3, 5))`: 3과 5를 넣은 기계가 `8`을 돌려보내 주면(`return`), 그 받아낸 따끈따끈한 결과값 8을 받아 print가 화면에 예쁘게 인쇄하게 됩니다.",
    instructions: [
      "둘째 줄의 `def add(a, b):` 아래 들여쓰기 공간(빈 칸)에 더한 값을 돌려보내는 return a + b 코드를 완성하세요.",
      "실행 후, 맨 아래 적힌 print(add(3, 5)) 문을 통해 화면에 계산 완료 정답인 8이 예쁘게 찍히는지 확인하세요!"
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
    story: "과일 바구니에 담긴 사과, 바나나, 체리 장난감들을 한 놈씩 차례대로 전부 꺼내서 구경하고 싶을 때가 있죠? 🌀🧺\n\n* `for fruit in fruits:`: 쪼개어 이해하면 아주 상상하기 쉬워요:\n  * `fruits`: 사과, 바나나, 체리가 들어있는 원래의 큰 바구니예요.\n  * `in`: '~ 안에 들어있는 것들을 훑자'라는 지시에요.\n  * `fruit`: 바구니에서 한 개씩 번갈아 꺼낼 때마다 잠시 물건을 얹어둘 '임시 진열대 상자(변수)'예요.\n  * 작동 원리: 첫 바퀴엔 0번 방 사과를 꺼내서 `fruit`에 얹고 방 안의 print 코드를 실행해요. 둘째 바퀴엔 바나나를 `fruit`에 얹고 실행하고, 셋째 바퀴엔 체리를 얹고 실행하여 바구니가 텅 빌 때까지 자동으로 반복해 출력해 준답니다.",
    instructions: [
      "셋째 줄의 `for fruit in fruits:` 아랫줄 빈칸(들여쓰기 적용된 곳)에 꺼낸 과일을 보여주는 print(fruit) 코드를 채우세요.",
      "실행 후 사과, 바나나, 체리가 자동으로 한 줄씩 차례대로 출력되는지 확인해봐요!"
    ],
    starterCode: "fruits = [\"사과\", \"바나나\", \"체리\"]\n# fruits 리스트 of 모든 아이템들을 하나씩 꺼내 출력하는 반복문을 완성하세요.\nfor fruit in fruits:\n    \n",
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
    story: "지안 탐험가님! 정말 위대해요! 드디어 30번째 졸업 시험장에 도달하셨습니다! 🎓🎉🚀\n\n이번 졸업 미션은 지금껏 배운 리스트 바구니, for 반복문, if 조건문, 나머지 연산자(`%`)를 전부 합쳐 사용하는 종합 졸업작품이에요!\n\n* `numbers = [1, 2, ... 10]`: 1부터 10까지 든 리스트 바구니예요.\n* `for number in numbers:`: 바구니에서 숫자를 하나씩 `number` 상자에 꺼내 담는 반복문이에요.\n* `if number % 2 == 0:`: 만약(`if`) 상자 안의 숫자를 2로 나눈 나머지(`%`)가 0과 정확히 같다면(`==`), 그 수식 결과는 참(True)이 되어 짝수라는 뜻이랍니다! 이 조건문 방이 열렸을 때 숫자를 인쇄하는 거예요.",
    instructions: [
      "셋째 줄의 `if number % 2 == 0:` 아랫줄 빈칸을 찾으세요. 이곳은 `for` 방과 `if` 방을 둘 다 통과해야 하므로 들여쓰기(Tab)가 2번(공백 8칸) 들어간 깊은 방이에요!",
      "해당 빈 줄에 짝수로 판정된 숫자를 출력하는 print(number) 코드를 정확하게 채우세요.",
      "실행 후 홀수들은 튕겨 나가고, 오직 짝수(2, 4, 6, 8, 10)들만 밤하늘의 불꽃처럼 찬란하게 출력되는지 확인하세요!"
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
