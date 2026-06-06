import React, { useState, useEffect, useRef } from "react";
import { ArrowLeft, Play, RefreshCw, Terminal, HelpCircle, BookOpen } from "lucide-react";
import { runPythonCode, initPyodide } from "../utils/pyodideRunner";
import { audioSynth } from "../utils/audioSynth";
import { lessons } from "../data/lessons";

export default function Workspace({ lessonId, onBack, onCompleteLesson }) {
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
          "예: magic.show_cat()"
        ],
        starterCode: "# 지안이의 자유 파이썬 연습장\nprint(\"안녕 지안! 어떤 마법을 부려볼까요?\")\n",
        hints: { default: "지안이가 적고 싶은 글자를 print() 괄호 안에 넣어서 마음껏 출력해 보세요!" }
      }
    : lessons.find((l) => l.id === lessonId);

  const [code, setCode] = useState(lesson ? lesson.starterCode : "");
  const [stdout, setStdout] = useState("");
  const [error, setError] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [pyodideLoaded, setPyodideLoaded] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [quizSolved, setQuizSolved] = useState(false);
  const [quizError, setQuizError] = useState(false);
  
  // UI & UX States
  const [showHint, setShowHint] = useState(false);
  const [showStoryModal, setShowStoryModal] = useState(true); // 첫 진입시 스토리 팝업 기본 노출
  const [hasBeenFocused, setHasBeenFocused] = useState(false); // 처음 터치할 때 커서 이동을 제어하는 상태
  const [showScratchCompareModal, setShowScratchCompareModal] = useState(false); // 스크래치 비교 사전 모달 표시 여부

  const editorRef = useRef(null);

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

  // Reset states on lesson change
  useEffect(() => {
    if (lesson) {
      setCode(lesson.starterCode);
      setStdout("");
      setError(null);
      setIsSuccess(false);
      setQuizSolved(false);
      setQuizError(false);
      setShowHint(false);
      setShowStoryModal(true); // 레슨 이동 시 마다 스토리를 다시 먼저 보여줌
      setHasBeenFocused(false); // 레슨이 바뀔 때 마다 처음 터치 상태를 리셋해요
      setShowScratchCompareModal(false); // 비교 사전 모달 상태도 초기화해요
    }
  }, [lessonId]);

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
      category: " Basket 장난감 바구니 (리스트)",
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

  // 지안이가 처음 코드창을 탭(터치)했을 때 주석 뒤쪽으로 커서를 자동으로 보내주는 마법 기능이에요!
  const handleEditorFocus = (e) => {
    if (!hasBeenFocused) {
      setHasBeenFocused(true);
      const currentCode = e.target.value;
      const lines = currentCode.split("\n");
      let cursorIndex = 0;
      let i = 0;
      
      // '#'으로 시작하는 주석 설명 글들이나 빈 줄들의 길이를 더해서 다음 줄의 시작 위치를 찾아요
      while (i < lines.length && (lines[i].trim().startsWith("#") || lines[i].trim() === "")) {
        cursorIndex += lines[i].length + 1; // +1은 줄바꿈 문자('\n') 크기예요
        i++;
      }
      
      const targetPos = Math.min(currentCode.length, cursorIndex);
      const textarea = e.target;
      
      // 브라우저의 원래 포커스 커서 지정을 덮어쓸 수 있도록 아주 잠깐(10ms) 기다렸다가 안전하게 커서를 보내줘요
      setTimeout(() => {
        textarea.setSelectionRange(targetPos, targetPos);
      }, 10);
    }
  };

  // 코드창 바깥을 터치했다가 다시 터치할 때도 동작할 수 있도록 포커스가 풀리면 초기화해줘요
  const handleEditorBlur = () => {
    setHasBeenFocused(false);
  };

  // Insert code helper
  const handleInsertCode = (textToInsert, cursorOffset = 0) => {
    audioSynth.playBeep(700, 0.05);
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

  const handleRunCode = async () => {
    if (isRunning) return;
    setIsRunning(true);
    setStdout("");
    setError(null);
    audioSynth.playBeep(523.25, 0.08);

    const result = await runPythonCode(
      code,
      (text) => {
        setStdout((prev) => prev + text + "\n");
      }
    );

    setIsRunning(false);

    if (result.success) {
      if (isSandbox) {
        setIsSuccess(false);
        return;
      }

      // Check validation
      const isCorrect = lesson.validation(code, result.stdout);
      if (isCorrect) {
        if (!isSuccess) {
          audioSynth.playWin(); // Play victory fanfare arpeggio
        }
        setIsSuccess(true);
        setError(null); // 에러 초기화
      } else {
        if (isSuccess) {
          // 이미 성공 상태라면 다른 코드로 자유롭게 연습하더라도 화면에 빨간 에러 메시지를 띄우지 않습니다.
          setError(null);
        } else {
          setError("코드가 정상적으로 실행되었지만, 이 행성의 통과 조건을 만족하지 못했어요. 아래 [임무지침]에 나와있는 글자와 똑같이 나오도록 수정해볼까요?");
          audioSynth.playError();
          setIsSuccess(false);
          setQuizSolved(false);
        }
      }
    } else {
      if (isSuccess) {
        // 이미 한 번 성공했다면, 지안이가 자유롭게 바꾼 코드에 오타(문법 에러)가 나도 에러 팝업창을 띄우지 않습니다.
        // 대신 지안이가 공부할 수 있도록 콘솔 검은 창에 친절하게 에러를 출력해 줍니다.
        setStdout((prev) => prev + "⚠️ 파이디의 마법 에러 알림:\n" + result.error + "\n");
        setError(null);
      } else {
        setError(result.error);
        audioSynth.playError();
        setIsSuccess(false);
        setQuizSolved(false);
      }
    }
  };

  const handleResetCode = () => {
    audioSynth.playBeep(300, 0.1);
    if (window.confirm("코드를 처음 상태로 되돌릴까요?")) {
      setCode(lesson.starterCode);
      setStdout("");
      setError(null);
      setIsSuccess(false);
      setQuizSolved(false);
      setQuizError(false);
    }
  };

  const handleQuizAnswer = (option) => {
    if (option === lesson.quiz.answer) {
      audioSynth.playCoin();
      setQuizSolved(true);
      setQuizError(false);
    } else {
      audioSynth.playError();
      setQuizError(true);
      setTimeout(() => setQuizError(false), 500); // Reset shake
    }
  };

  // Safe hint text parser
  const getHintText = () => {
    if (lesson && lesson.hints) {
      const hintList = Object.values(lesson.hints);
      if (hintList.length > 0) {
        return hintList.join("\n\n"); // 모든 힌트 메시지를 줄바꿈으로 연결하여 노출
      }
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
                LEVEL {lesson.id} • {lesson.planet}
              </span>
              <h2 style={{ fontSize: "2.4rem", color: "white", marginTop: "4px" }}>
                {lesson.title}
              </h2>
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
                audioSynth.playBeep(660, 0.08);
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
                  audioSynth.playBeep(600, 0.08);
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
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <button onClick={onBack} className="btn-cosmic btn-outline" style={{ padding: "10px 20px", fontSize: "1rem" }}>
          <ArrowLeft size={18} /> 지도 화면으로 돌아가기
        </button>

        <div style={{ textAlign: "center" }}>
          <span style={{ color: "#bd00ff", fontSize: "1rem", fontWeight: "bold" }}>
            {isSandbox ? "FREE SPACE" : `LEVEL ${lesson.id} • ${lesson.planet}`}
          </span>
          <h2 style={{ fontSize: "2.2rem", color: "white", marginTop: "2px" }}>{lesson.title}</h2>
        </div>

        {/* Re-read Story Button */}
        {!isSandbox ? (
          <button 
            onClick={() => {
              audioSynth.playBeep(660, 0.08);
              setShowStoryModal(true);
            }} 
            className="btn-cosmic btn-outline" 
            style={{ padding: "10px 20px", fontSize: "1.05rem", color: "#00f0ff", borderColor: "#00f0ff" }}
          >
            <BookOpen size={18} /> 설명 팝업 다시보기
          </button>
        ) : (
          <div style={{ width: "160px" }} />
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
                  코딩 통과! 미니게임으로 출발하기 전, 파이디의 마법 퀴즈를 맞춰보세요!
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
                  오답이에요! 파이디의 이야기를 천천히 떠올려보고 다시 선택해봐요!
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
              <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                <span style={{ fontSize: "2.5rem" }}>🎉⭐</span>
                <div>
                  <strong style={{ fontSize: "1.4rem", color: "#00f0ff" }}>퀴즈와 미션을 모두 해결했어요! (별 연료 +1 확보)</strong>
                  <p style={{ color: "#e2e8f0", fontSize: "1.1rem", marginTop: "4px", lineHeight: "1.6" }}>
                    🤖 <strong>파이디:</strong> "지안 탐험가님 정말 최고예요! 이제 파이썬 코드 창에서 글자나 숫자를 마음대로 바꾸고 다시 실행해보며 **자유롭게 마법 연습**을 즐겨보세요! 준비가 다 되면 우측의 **미니게임 버튼**을 꾹 눌러 다음 행성으로 출발해봐요! 🚀"
                  </p>
                </div>
              </div>

              <button
                onClick={() => onCompleteLesson(lesson.id)}
                className="btn-cosmic btn-pink animate-pulse-cyan"
                style={{ padding: "16px 36px", fontSize: "1.2rem", fontWeight: "900" }}
              >
                🎮 복습 미니게임 하러가기
              </button>
            </div>
          )}
        </div>
      )}

      {/* Main Workspace Layout (50:50 Side-by-Side balanced layout) */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", flexGrow: 1, alignItems: "start" }}>
        
        {/* LEFT COLUMN: Mission Instructions, Toggleable Hint, and Magic Keyboard */}
        <section style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          
          {/* Mission Checklist Panel */}
          <div className="glass-panel" style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "16px", borderColor: "rgba(255, 0, 127, 0.25)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h3 style={{ fontSize: "1.6rem", color: "#ff007f", margin: 0, display: "flex", alignItems: "center", gap: "8px" }}>
                🛸 이번 임무 임무지침
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
            </div>
          )}

          {/* Quick Keyboard Panel */}
          <div className="glass-panel" style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "12px" }}>
            <h4 style={{ fontSize: "1.1rem", color: "#a5b4fc", margin: 0, fontWeight: "bold" }}>
              ⚡ 마법 퀵 키보드 (클릭하면 바로 코드가 적혀요!)
            </h4>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              <button onClick={() => handleInsertCode("print(\"\")", 2)} className="magic-key-btn" style={{ borderColor: "#00f0ff", padding: "8px 14px", fontSize: "1.05rem" }}>print("✍️")</button>
              <button onClick={() => handleInsertCode("\"\"", 1)} className="magic-key-btn" style={{ padding: "8px 14px", fontSize: "1.05rem" }}>"글자 따옴표"</button>
              <button onClick={() => handleInsertCode(" + ", 0)} className="magic-key-btn" style={{ padding: "8px 14px", fontSize: "1.05rem" }}>+</button>
              <button onClick={() => handleInsertCode(" - ", 0)} className="magic-key-btn">-</button>
              <button onClick={() => handleInsertCode(" = ", 0)} className="magic-key-btn">= (상자에 담기)</button>
              <button onClick={() => handleInsertCode(":", 0)} className="magic-key-btn">:</button>
              <button onClick={() => handleInsertCode("if ", 0)} className="magic-key-btn" style={{ color: "#ff007f", padding: "8px 14px", fontSize: "1.05rem" }}>if (만약)</button>
              <button onClick={() => handleInsertCode("else:\n    ", 0)} className="magic-key-btn" style={{ color: "#ff007f", padding: "8px 14px", fontSize: "1.05rem" }}>else (아니면)</button>
              <button onClick={() => handleInsertCode("for i in range(5):\n    ", 0)} className="magic-key-btn" style={{ color: "#bd00ff", padding: "8px 14px", fontSize: "1.05rem" }}>for (반복)</button>
              <button onClick={() => handleInsertCode("magic.get_weather()", 0)} className="magic-key-btn" style={{ borderColor: "#ffd700", color: "#ffd700", padding: "8px 14px", fontSize: "1.05rem" }}>magic.get_weather()</button>
              <button onClick={() => handleInsertCode("magic.show_cat()", 0)} className="magic-key-btn" style={{ borderColor: "#ffd700", color: "#ffd700", padding: "8px 14px", fontSize: "1.05rem" }}>magic.show_cat()</button>
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

            <textarea
              ref={editorRef}
              value={code}
              onChange={(e) => setCode(e.target.value)}
              onFocus={handleEditorFocus}
              onBlur={handleEditorBlur}
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
                {stdout && (
                  <div style={{ whiteSpace: "pre-wrap", fontFamily: "monospace", color: "#10b981", fontSize: "1.25rem", lineHeight: "1.45" }}>
                    {stdout}
                  </div>
                )}

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
                    <div style={{ color: "#fca5a5", fontSize: "1rem", lineHeight: "1.5" }}>
                      {error}
                    </div>
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
