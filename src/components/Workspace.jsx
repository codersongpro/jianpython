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
    }
  }, [lessonId]);

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
      } else {
        setError("코드가 정상적으로 실행되었지만, 이 행성의 통과 조건을 만족하지 못했어요. 아래 [임무지침]에 나와있는 글자와 똑같이 나오도록 수정해볼까요?");
        audioSynth.playError();
        setIsSuccess(false);
        setQuizSolved(false);
      }
    } else {
      setError(result.error);
      audioSynth.playError();
      setIsSuccess(false);
      setQuizSolved(false);
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
                  <p style={{ color: "#e2e8f0", fontSize: "1.05rem", marginTop: "4px", lineHeight: "1.5" }}>
                    아래 파이썬 코드를 다른 글자나 숫자로 더 고쳐보며 놀거나,<br />
                    준비가 되면 우측의 **미니게임 버튼**을 눌러 복습 비행을 시작하세요!
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
