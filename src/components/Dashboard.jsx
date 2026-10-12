import { useState } from "react";
import { Award, Volume2, VolumeX, X, Gamepad2, CheckCircle, Play, RotateCcw } from "lucide-react";
import { lessons } from "../data/lessons";
import { chapters, getLesson, getLessonNumber, getRecommendedLessonId, orderedLessonIds } from "../data/curriculum";
import { audioSynth } from "../utils/audioSynth";

const glossary = [
  { icon: "🪐", term: "파이썬 (Python)", color: "#00f0ff", text: "컴퓨터와 대화할 때 쓰는 말(프로그래밍 언어)이에요. 영어 단어와 기호로 컴퓨터에게 할 일을 알려줘요." },
  { icon: "📝", term: "코딩 (Coding)", color: "#ff007f", text: "컴퓨터가 알아들을 수 있는 명령을 차례대로 적는 일이에요. 요리 순서표를 쓰는 것과 비슷해요." },
  { icon: "⚡", term: "실행 (Run)", color: "#ffd700", text: "적어 둔 코드를 컴퓨터가 실제로 해 보게 하는 거예요. 우리 앱에서는 [주문 외우기] 버튼이 실행 버튼이에요." },
  { icon: "🐛", term: "버그와 에러 (Bug / Error)", color: "#bd00ff", text: "코드에 오타나 빠진 기호가 있어서 컴퓨터가 헷갈린 상태예요. 에러는 실패가 아니라 '여기를 고쳐 줘!'라는 힌트예요." },
  { icon: "📦", term: "변수 (Variable)", color: "#10b981", text: "값을 담아 두는 이름표 상자예요. stars = 10 처럼 적으면 stars 상자에 10이 들어가요." },
  { icon: "↪️", term: "들여쓰기 (Indent)", color: "#f97316", text: "줄 앞을 Tab 키로 밀어 쓰는 거예요. if, for 같은 줄 아래에서 '이 안에 들어 있는 코드'라는 표시예요." },
  { icon: "🧺", term: "리스트 (List)", color: "#ff6680", text: "여러 값을 한 바구니에 담는 거예요. [ ] 안에 쉼표로 나눠 적고, 방 번호는 0번부터 세요." },
  { icon: "🛠️", term: "함수 (Function)", color: "#9966ff", text: "여러 줄의 코드를 묶어 이름을 붙인 나만의 명령이에요. def 로 만들고 이름( ) 으로 불러요." },
  { icon: "📡", term: "API", color: "#06b6d4", text: "다른 곳(날씨 기상청 같은)에 정보를 부탁하고 받아오는 통로예요. magic.get_weather() 가 그 예예요." }
];

// 보호자 확인용 문제: 초2가 바로 풀기 어려운 두 자리 × 한 자리 곱셈
const makeParentQuestion = () => {
  const a = 12 + Math.floor(Math.random() * 8);
  const b = 6 + Math.floor(Math.random() * 4);
  return { text: `${a} × ${b}`, answer: String(a * b) };
};

export default function Dashboard({
  completedLessons,
  totalStars,
  badges,
  lastLessonId,
  onStartLesson,
  onPlayGame,
  isMuted,
  onToggleMute,
  onResetProgress,
}) {
  const [showGlossary, setShowGlossary] = useState(false);
  const [resetQuestion, setResetQuestion] = useState(null);
  const [answerInput, setAnswerInput] = useState("");
  const [resetError, setResetError] = useState("");

  const recommendedId = getRecommendedLessonId(completedLessons);
  const recommendedLesson = recommendedId ? getLesson(recommendedId) : null;
  const lastLesson = lastLessonId && lastLessonId !== recommendedId ? getLesson(lastLessonId) : null;
  const progressPercent = Math.round((completedLessons.length / lessons.length) * 100);

  const handleOpenLesson = (lessonId) => {
    audioSynth.playBeep(440, 0.1);
    onStartLesson(lessonId);
  };

  const handlePlayGame = (lessonId) => {
    audioSynth.playBeep(660, 0.08);
    onPlayGame(lessonId);
  };

  const scrollToChapter = (chapterId) => {
    audioSynth.playSelect();
    document.getElementById(`chapter-${chapterId}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const openResetModal = () => {
    audioSynth.playBeep(330, 0.08);
    setResetQuestion(makeParentQuestion());
    setAnswerInput("");
    setResetError("");
  };

  const handleConfirmReset = () => {
    if (answerInput.trim() === resetQuestion.answer) {
      audioSynth.playBeep(660, 0.05);
      onResetProgress();
      setResetQuestion(null);
    } else {
      audioSynth.playError();
      setResetError("❌ 답이 달라요. 보호자님이 다시 확인해 주세요.");
    }
  };

  return (
    <div className="dashboard-page">
      {/* Top Header Panel */}
      <header className="glass-panel dashboard-header">
        <div>
          <h1 className="dashboard-title">지안이의 우주 파이썬 탐험대 🚀</h1>
          <p style={{ color: "#a5b4fc", fontSize: "1.1rem" }}>
            로봇 친구 <strong>파이디(Pydi)</strong>와 함께 파이썬 행성들을 탐험해요! 어느 행성이든 마음대로 골라 갈 수 있어요.
          </p>
        </div>

        <div className="dashboard-header-actions">
          <button
            onClick={() => {
              audioSynth.playBeep(880, 0.05);
              setShowGlossary(true);
            }}
            className="btn-cosmic btn-outline"
            style={{ padding: "12px 20px", fontSize: "0.95rem", borderColor: "#ffd700", color: "#ffd700" }}
          >
            💡 마법 용어 사전
          </button>

          <button
            onClick={() => handleOpenLesson(0)}
            className="btn-cosmic btn-star"
            style={{ padding: "12px 20px", fontSize: "0.95rem" }}
          >
            🚀 자유 코딩 방
          </button>

          <div className="glass-panel star-fuel">
            <span style={{ fontSize: "1.6rem" }}>⭐</span>
            <div>
              <div style={{ fontSize: "0.75rem", color: "rgba(255,215,0,0.8)" }}>별 연료</div>
              <div style={{ fontSize: "1.2rem", fontWeight: "900", color: "#ffd700" }}>{totalStars} / {lessons.length}</div>
            </div>
          </div>

          <button
            onClick={() => {
              onToggleMute();
              setTimeout(() => audioSynth.playBeep(800, 0.05), 50);
            }}
            className="btn-cosmic btn-outline icon-btn"
            style={{ padding: "12px", borderRadius: "50%" }}
            title={isMuted ? "소리 켜기" : "소리 끄기"}
            aria-label={isMuted ? "소리 켜기" : "소리 끄기"}
          >
            {isMuted ? <VolumeX size={24} style={{ color: "#ef4444" }} /> : <Volume2 size={24} style={{ color: "#00f0ff" }} />}
          </button>
        </div>
      </header>

      <div className="dashboard-layout">
        {/* Left Column: continue + chapter map */}
        <main style={{ display: "flex", flexDirection: "column", gap: "24px", minWidth: 0 }}>
          {/* Continue Card */}
          <section className="glass-panel neon-cyan-glow continue-card">
            <div style={{ display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap" }}>
              <div style={{ fontSize: "3rem" }} className="animate-float">🤖</div>
              <div style={{ flex: 1, minWidth: "220px" }}>
                <div style={{ color: "#00f0ff", fontWeight: 800, fontSize: "1rem" }}>파이디의 추천</div>
                <div style={{ color: "#e0e7ff", fontSize: "1.15rem", lineHeight: 1.5 }}>
                  {recommendedLesson ? (
                    <>
                      다음 추천 행성은 <strong>{getLessonNumber(recommendedLesson.id)}단계 {recommendedLesson.emoji} {recommendedLesson.title}</strong> 예요!
                    </>
                  ) : (
                    <>모든 행성을 탐험했어요! 이제 진짜 파이썬 주니어 탐험가예요! 🏆 좋아하는 행성을 다시 방문해 봐요.</>
                  )}
                </div>
              </div>
            </div>

            <div className="progress-track" aria-label={`전체 진행률 ${progressPercent}%`}>
              <div className="progress-fill" style={{ width: `${progressPercent}%` }} />
            </div>
            <div style={{ color: "#a5b4fc", fontSize: "0.95rem" }}>
              전체 {lessons.length}단계 중 <strong style={{ color: "#ffd700" }}>{completedLessons.length}단계</strong> 완료 ({progressPercent}%)
            </div>

            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              {recommendedLesson && (
                <button onClick={() => handleOpenLesson(recommendedLesson.id)} className="btn-cosmic btn-cyan animate-pulse-cyan" style={{ padding: "14px 26px" }}>
                  <Play size={18} fill="white" /> 추천 단계 시작하기
                </button>
              )}
              {lastLesson && (
                <button onClick={() => handleOpenLesson(lastLesson.id)} className="btn-cosmic btn-outline" style={{ padding: "14px 22px" }}>
                  <RotateCcw size={18} /> 마지막에 본 {getLessonNumber(lastLesson.id)}단계 이어하기
                </button>
              )}
            </div>
          </section>

          {/* Chapter quick jump */}
          <nav className="chapter-chips" aria-label="행성계 바로가기">
            {chapters.map((chapter) => {
              const done = chapter.lessonIds.filter((id) => completedLessons.includes(id)).length;
              return (
                <button
                  key={chapter.id}
                  onClick={() => scrollToChapter(chapter.id)}
                  className="chapter-chip"
                  style={{ borderColor: chapter.color }}
                >
                  {chapter.emoji} {chapter.title.replace(" 행성계", "").replace(" 행성", "")}
                  <span style={{ color: done === chapter.lessonIds.length ? "#10b981" : "#9ca3af" }}>
                    {done}/{chapter.lessonIds.length}
                  </span>
                </button>
              );
            })}
          </nav>

          {/* Chapters */}
          {chapters.map((chapter, chapterIndex) => {
            const done = chapter.lessonIds.filter((id) => completedLessons.includes(id)).length;
            return (
              <section
                key={chapter.id}
                id={`chapter-${chapter.id}`}
                className="glass-panel chapter-section"
                style={{ borderLeft: `6px solid ${chapter.color}` }}
              >
                <div className="chapter-header">
                  <div>
                    <div style={{ color: chapter.color, fontWeight: 800, fontSize: "0.95rem" }}>
                      행성계 {chapterIndex + 1}
                    </div>
                    <h2 style={{ fontSize: "2.2rem", color: "white", lineHeight: 1.3, marginTop: "4px" }}>
                      {chapter.emoji} {chapter.title}
                    </h2>
                    <p style={{ color: "#cbd5e1", fontSize: "1rem" }}>{chapter.goal}</p>
                  </div>
                  <div className="chapter-progress" style={{ color: done === chapter.lessonIds.length ? "#10b981" : "#a5b4fc" }}>
                    {done === chapter.lessonIds.length ? "🏁 완료!" : `${done} / ${chapter.lessonIds.length}`}
                  </div>
                </div>

                <div className="lesson-grid">
                  {chapter.lessonIds.map((lessonId) => {
                    const lesson = getLesson(lessonId);
                    const isCompleted = completedLessons.includes(lessonId);
                    const hasBadge = badges.includes(lessonId);
                    const isRecommended = lessonId === recommendedId;
                    return (
                      <div
                        key={lessonId}
                        className={`lesson-card ${isCompleted ? "is-completed" : ""} ${isRecommended ? "is-recommended" : ""}`}
                        style={{ "--chapter-color": chapter.color }}
                      >
                        <button className="lesson-card-main" onClick={() => handleOpenLesson(lessonId)}>
                          <div className="lesson-card-top">
                            <span className="lesson-emoji" style={{ background: `${chapter.color}33`, borderColor: chapter.color }}>
                              {lesson.emoji}
                            </span>
                            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "4px" }}>
                              <span className="lesson-number">{getLessonNumber(lessonId)}단계</span>
                              {lesson.level === "도전" && <span className="level-tag">🔥 도전</span>}
                            </div>
                          </div>
                          <div className="lesson-card-title">{lesson.title}</div>
                          <div className="lesson-card-goal">{lesson.goal}</div>
                          <div className="lesson-card-status">
                            {isCompleted ? (
                              <span style={{ color: "#10b981" }}><CheckCircle size={16} /> 완료 {hasBadge ? "· 🏅" : ""}</span>
                            ) : isRecommended ? (
                              <span style={{ color: "#00f0ff" }}>⭐ 추천! 여기부터 해 봐요</span>
                            ) : (
                              <span style={{ color: "#9ca3af" }}>언제든 도전 가능</span>
                            )}
                          </div>
                        </button>
                        <button
                          className="lesson-card-game"
                          onClick={() => handlePlayGame(lessonId)}
                          title="복습 미니게임 바로 하기"
                          aria-label={`${getLessonNumber(lessonId)}단계 미니게임 하기`}
                        >
                          <Gamepad2 size={16} /> 게임
                        </button>
                      </div>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </main>

        {/* Right Column: badges + parent */}
        <aside className="dashboard-sidebar">
          <div className="glass-panel neon-pink-glow" style={{ padding: "24px" }}>
            <h3 style={{ fontSize: "1.8rem", color: "#ff007f", display: "flex", alignItems: "center", gap: "8px", borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: "10px", marginBottom: "16px" }}>
              <Award size={24} /> 우주 배지 장식장
            </h3>
            <p style={{ color: "#9ca3af", fontSize: "0.85rem", marginBottom: "12px" }}>
              미니게임을 클리어하면 배지를 받아요. ({badges.length} / {lessons.length})
            </p>

            <div className="badge-grid">
              {orderedLessonIds.map((lessonId) => {
                const lesson = getLesson(lessonId);
                const hasBadge = badges.includes(lessonId);
                return (
                  <div
                    key={lessonId}
                    className={`badge-slot ${hasBadge ? "has-badge" : ""}`}
                    title={hasBadge ? `${getLessonNumber(lessonId)}단계 ${lesson.title} 배지` : `${getLessonNumber(lessonId)}단계 배지 (아직 없음)`}
                  >
                    {hasBadge ? lesson.emoji : "❓"}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="glass-panel" style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "12px", border: "1px dashed rgba(239, 68, 68, 0.3)" }}>
            <h4 style={{ fontSize: "1.1rem", color: "#fca5a5", margin: 0 }}>👨‍👩‍👧 보호자 메뉴</h4>
            <p style={{ fontSize: "0.85rem", color: "#9ca3af", lineHeight: "1.5" }}>
              학습 기록은 이 브라우저에만 저장돼요. 처음부터 다시 시작하려면 초기화할 수 있어요.
            </p>
            <button
              onClick={openResetModal}
              className="btn-cosmic btn-outline"
              style={{ padding: "10px 16px", fontSize: "0.9rem", borderColor: "#ef4444", color: "#ef4444", width: "100%", borderRadius: "14px" }}
            >
              🧹 학습 기록 초기화
            </button>
          </div>
        </aside>
      </div>

      {/* POPUP MODAL: Python Magic Dictionary */}
      {showGlossary && (
        <div className="modal-backdrop" style={{ zIndex: 100 }}>
          <div className="glass-panel neon-cyan-glow modal-card" style={{ maxWidth: "650px" }}>
            <button
              onClick={() => {
                audioSynth.playBeep(440, 0.05);
                setShowGlossary(false);
              }}
              className="btn-cosmic btn-outline modal-close icon-btn"
              aria-label="사전 닫기"
            >
              <X size={18} />
            </button>

            <h2 style={{ fontSize: "2.5rem", color: "#00f0ff", textAlign: "center" }}>💡 파이디의 마법 용어 사전</h2>

            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              {glossary.map((item) => (
                <div key={item.term} style={{ background: "rgba(255,255,255,0.03)", padding: "14px 16px", borderRadius: "18px", borderLeft: `5px solid ${item.color}` }}>
                  <strong style={{ fontSize: "1.15rem", color: item.color }}>{item.icon} {item.term}</strong>
                  <p style={{ fontSize: "1rem", color: "#e2e8f0", marginTop: "6px", lineHeight: "1.55" }}>{item.text}</p>
                </div>
              ))}
            </div>

            <button
              onClick={() => {
                audioSynth.playBeep(440, 0.05);
                setShowGlossary(false);
              }}
              className="btn-cosmic btn-cyan"
              style={{ padding: "12px 28px", fontSize: "1.1rem", width: "100%" }}
            >
              사전 닫고 탐험 계속하기 🚀
            </button>
          </div>
        </div>
      )}

      {/* POPUP MODAL: Guardian Reset Check */}
      {resetQuestion && (
        <div className="modal-backdrop" style={{ zIndex: 110 }}>
          <div className="glass-panel modal-card" style={{ maxWidth: "400px", borderColor: "rgba(239, 68, 68, 0.4)" }}>
            <h3 style={{ fontSize: "1.8rem", color: "#ef4444", textAlign: "center", margin: 0 }}>⚠️ 학습 기록 초기화</h3>

            <div style={{ background: "rgba(239, 68, 68, 0.05)", padding: "14px", borderRadius: "16px", border: "1px solid rgba(239, 68, 68, 0.2)", fontSize: "0.95rem", color: "#fca5a5", lineHeight: "1.5" }}>
              보호자님이 확인해 주세요! 초기화하면 완료 기록, 별 연료, 배지, 저장된 코드, 미니게임 기록이 모두 지워져요.
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <label htmlFor="parent-answer" style={{ fontSize: "1rem", color: "#a5b4fc", fontWeight: "bold" }}>
                보호자 확인 문제: {resetQuestion.text} = ?
              </label>
              <input
                id="parent-answer"
                type="text"
                inputMode="numeric"
                value={answerInput}
                onChange={(e) => setAnswerInput(e.target.value)}
                placeholder="정답 입력"
                className="parent-input"
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleConfirmReset();
                }}
                autoFocus
              />
              {resetError && (
                <span style={{ fontSize: "0.85rem", color: "#ef4444", textAlign: "center", fontWeight: "bold" }}>{resetError}</span>
              )}
            </div>

            <div style={{ display: "flex", gap: "12px" }}>
              <button
                onClick={() => {
                  audioSynth.playBeep(440, 0.05);
                  setResetQuestion(null);
                }}
                className="btn-cosmic btn-outline"
                style={{ flex: 1, padding: "12px", borderRadius: "14px" }}
              >
                취소
              </button>
              <button
                onClick={handleConfirmReset}
                className="btn-cosmic"
                style={{ flex: 1, padding: "12px", background: "linear-gradient(135deg, #ef4444, #b91c1c)", color: "white", borderRadius: "14px" }}
              >
                초기화
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
