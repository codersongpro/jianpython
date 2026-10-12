let pyodideInstance = null;
let pyodideLoadingPromise = null;
// 지금 실행 중인 코드의 출력 함수 (magic 모듈은 한 번만 등록되므로 여기로 연결해요)
let activeEmit = null;

const PYODIDE_URL = "https://cdn.jsdelivr.net/pyodide/v0.26.1/full/";

// 한 번 실행할 때 허용하는 최대 코드 줄 실행 횟수 / 화면 출력 줄 수
// (무한 루프가 브라우저를 멈추게 하지 않도록 지켜주는 안전장치)
const MAX_LINE_EVENTS = 20000;
const MAX_OUTPUT_LINES = 300;

// Dynamically load the Pyodide script
function loadPyodideScript() {
  return new Promise((resolve, reject) => {
    if (window.loadPyodide) {
      resolve();
      return;
    }
    const script = document.createElement("script");
    script.src = `${PYODIDE_URL}pyodide.js`;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Pyodide CDN 로딩 실패: 인터넷 연결을 확인해주세요."));
    document.head.appendChild(script);
  });
}

// 무한 루프 감시용 파이썬 도우미 (한 번만 정의)
const GUARD_SETUP = `
import sys as _jian_sys

class JianLoopGuard(Exception):
    pass

def _jian_make_tracer(limit):
    count = [0]
    def tracer(frame, event, arg):
        if event == "line":
            count[0] += 1
            if count[0] > limit:
                raise JianLoopGuard("too many steps")
        return tracer
    return tracer

def _jian_guard_on(limit):
    _jian_sys.settrace(_jian_make_tracer(limit))

def _jian_guard_off():
    _jian_sys.settrace(None)
`;

// Initialize Pyodide once
export async function initPyodide() {
  if (pyodideInstance) return pyodideInstance;

  if (pyodideLoadingPromise) return pyodideLoadingPromise;

  pyodideLoadingPromise = (async () => {
    await loadPyodideScript();
    const pyodide = await window.loadPyodide({ indexURL: PYODIDE_URL });
    pyodide.runPython(GUARD_SETUP, { filename: "<jian-guard>" });
    // 지안이만의 magic 마법 상자 (import 없이도 쓸 수 있게 실행할 때 미리 넣어줘요)
    pyodide.registerJsModule("magic", {
      get_weather: () => {
        const weathers = ["맑음 ☀️", "비 🌧️", "눈 ❄️", "구름 많음 ☁️"];
        return weathers[Math.floor(Math.random() * weathers.length)];
      },
      show_cat: () => {
        activeEmit?.(["  /\\_/\\", " ( o.o )", "  > ^ <   야옹! 우주 아기 고양이를 무사히 구조했어요!"].join("\n"));
      },
    });
    pyodideInstance = pyodide;
    return pyodideInstance;
  })().catch((err) => {
    // 실패하면 다음 시도에서 다시 불러올 수 있게 비워둬요.
    pyodideLoadingPromise = null;
    throw err;
  });

  return pyodideLoadingPromise;
}

// 파이썬 에러 메시지에서 몇 번째 줄인지 찾아요.
function findErrorLine(errStr) {
  const matches = [...errStr.matchAll(/File "<exec>", line (\d+)/g)];
  if (matches.length === 0) return null;
  return Number(matches[matches.length - 1][1]);
}

// 파이썬 에러 이름(NameError 등)을 찾아요.
export function getErrorType(errorMsg) {
  const errStr = String(errorMsg);
  if (errStr.includes("JianLoopGuard")) return "InfiniteLoop";
  const match = errStr.match(/(\w+Error)\b[^\n]*\n?\s*$/) || errStr.match(/\b(\w+Error)\b/);
  return match ? match[1] : null;
}

// Translate complex Python exceptions into kid-friendly tips
export function translateError(errorMsg) {
  const errStr = String(errorMsg);

  if (errStr.includes("JianLoopGuard")) {
    return `뱅글뱅글~ 반복이 끝나지 않아서 파이디가 우주선을 잠깐 멈췄어요! (무한 루프) 반복을 멈추게 하는 코드(count = count + 1 이나 break)가 들어있는지 확인해 봐요.`;
  }

  if (errStr.includes("NameError")) {
    const match = errStr.match(/name '([^']+)' is not defined/);
    const varName = match ? match[1] : "";
    if (/^(printt|prnt|pirnt|Print|PRINT)$/.test(varName)) {
      return `앗! 'print' 명령어의 철자가 달라요. 모두 소문자로 print( ) 라고 적어봐요!`;
    }
    if (/^(true|false|TRUE|FALSE)$/.test(varName)) {
      return `참과 거짓은 첫 글자만 대문자로 True, False 라고 적어야 해요!`;
    }
    if (varName && /[가-힣]/.test(varName)) {
      return `'${varName}' 글자가 따옴표 옷을 안 입었어요! "${varName}" 처럼 큰따옴표로 감싸 주세요.`;
    }
    return `파이디가 '${varName}' 이라는 이름을 몰라요. 철자가 맞는지, 또는 '${varName} = ...' 처럼 상자를 먼저 만들었는지 확인해 봐요!`;
  }

  if (errStr.includes("IndentationError")) {
    if (errStr.includes("unexpected indent")) {
      return `들여쓰기가 필요 없는 줄이 안쪽으로 밀려 있어요. 그 줄 맨 앞의 빈칸을 지워서 왼쪽 끝에 붙여 주세요.`;
    }
    return `들여쓰기(줄 맞춤)가 빠졌어요! if, for, while, def 바로 아랫줄은 Tab 키를 한 번 눌러서 안쪽으로 밀어 써 주세요.`;
  }

  if (errStr.includes("SyntaxError")) {
    if (errStr.includes("unterminated string literal") || errStr.includes("EOL while scanning string literal")) {
      return `글자 양쪽의 큰따옴표("")가 짝이 안 맞아요! 글자는 앞뒤 모두 따옴표로 감싸 주세요.`;
    }
    if (errStr.includes("expected ':'")) {
      return `줄 끝에 쌍점 ':' 이 빠졌어요! if, else, for, while, def 줄 끝에는 꼭 ':' 을 붙여요.`;
    }
    if (errStr.includes("was never closed") || errStr.includes("unmatched")) {
      return `괄호 ( ) 나 [ ] 의 짝이 안 맞아요. 여는 괄호와 닫는 괄호 개수가 같은지 세어 봐요!`;
    }
    if (errStr.includes("invalid character")) {
      return `코드에 쓸 수 없는 기호가 섞여 있어요. 따옴표나 괄호를 한글 자판 기호(“ ” 나 （ ）)로 쓰지 않았는지 확인해 봐요.`;
    }
    if (errStr.includes("Maybe you meant '==' or ':=' instead of '='")) {
      return `'같은지 물어볼 때'는 = 하나가 아니라 == 두 개를 써요!`;
    }
    return `코드 모양이 조금 어긋났어요. 괄호 ( ) 와 따옴표 " " 가 짝이 맞는지, 쉼표나 쌍점이 빠지지 않았는지 꼼꼼히 봐요!`;
  }

  if (errStr.includes("TypeError")) {
    if (errStr.includes("can only concatenate str")) {
      return `글자와 숫자는 + 로 바로 붙일 수 없어요! 숫자를 "10" 처럼 따옴표로 감싸서 글자로 바꿔 보세요.`;
    }
    if (errStr.includes("missing") && errStr.includes("required positional argument")) {
      return `함수에 넣어야 할 재료(값)가 모자라요! 괄호 안에 재료를 넣었는지 확인해 봐요.`;
    }
    if (errStr.includes("takes") && errStr.includes("given")) {
      return `함수에 재료(값)를 너무 많이 넣었어요! 괄호 안 재료 개수를 확인해 봐요.`;
    }
    return `글자와 숫자를 섞어서 계산하려고 했어요. 숫자는 숫자끼리, 글자는 글자끼리 계산해 주세요.`;
  }

  if (errStr.includes("ZeroDivisionError")) {
    return `0으로는 나눌 수 없어요! 나누는 수를 0이 아닌 숫자로 바꿔 주세요.`;
  }

  if (errStr.includes("IndexError")) {
    return `바구니(리스트)에 없는 방 번호를 열려고 했어요. 방 번호는 0번부터 시작한다는 걸 기억해요!`;
  }

  if (errStr.includes("AttributeError")) {
    if (errStr.includes("magic")) {
      return `마법 명령 이름이 달라요. magic.get_weather() 또는 magic.show_cat() 처럼 정확히 적었는지 봐 주세요!`;
    }
    return `점(.) 뒤에 적은 명령 이름의 철자가 틀린 것 같아요. 예: fruits.append("체리")`;
  }

  return `주문에 작은 오타가 있는 것 같아요. 천천히 한 글자씩 확인해 봐요! 🚀`;
}

// 에러가 난 줄 번호를 사람이 읽기 쉬운 형태로 붙여줘요.
export function describeError(errorMsg) {
  if (getErrorType(errorMsg) === "InfiniteLoop") return translateError(errorMsg);
  const line = findErrorLine(String(errorMsg));
  const message = translateError(errorMsg);
  return line ? `📍 ${line}번째 줄을 살펴보세요!\n${message}` : message;
}

// Run python code and intercept results
export async function runPythonCode(code, onStdout) {
  const pyodide = await initPyodide();

  let stdoutContent = "";
  let outputLines = 0;
  let truncated = false;
  const emit = (text) => {
    stdoutContent += text + "\n";
    outputLines += 1;
    if (outputLines <= MAX_OUTPUT_LINES) {
      if (onStdout) onStdout(text);
    } else if (!truncated) {
      truncated = true;
      if (onStdout) onStdout("... (출력이 너무 많아서 여기까지만 보여줄게요)");
    }
  };

  pyodide.setStdout({ batched: emit });

  activeEmit = emit;

  // 실행할 때마다 새 공책(globals)을 써서 이전 단계의 변수가 섞이지 않게 해요.
  const globals = pyodide.globals.get("dict")();
  let guardOn = null;
  let guardOff = null;
  try {
    pyodide.runPython("import magic", { globals });
    guardOn = pyodide.globals.get("_jian_guard_on");
    guardOff = pyodide.globals.get("_jian_guard_off");
    guardOn(MAX_LINE_EVENTS);
    await pyodide.runPythonAsync(code, { globals, filename: "<exec>" });
    return { success: true, stdout: stdoutContent, error: null };
  } catch (err) {
    return {
      success: false,
      stdout: stdoutContent,
      error: describeError(err.message),
      errorType: getErrorType(err.message),
      rawError: err.message,
    };
  } finally {
    activeEmit = null;
    if (guardOff) guardOff();
    guardOn?.destroy();
    guardOff?.destroy();
    globals.destroy();
  }
}
