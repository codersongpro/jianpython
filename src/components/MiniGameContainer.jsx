import React, { useState, useEffect, useRef } from "react";
import { X, Award, ShieldAlert, Zap } from "lucide-react";
import { lessons } from "../data/lessons";
import { audioSynth } from "../utils/audioSynth";

export default function MiniGameContainer({ lessonId, onClose }) {
  const lesson = lessons.find((l) => l.id === lessonId);
  const miniGame = lesson ? lesson.miniGame : null;

  // Game Progress States
  const [gameWon, setGameWon] = useState(false);
  const [score, setScore] = useState(0);

  // FX States
  const [particles, setParticles] = useState([]);
  const [confetti, setConfetti] = useState([]);

  // 1. BALLOON POP STATES
  const [balloonList, setBalloonList] = useState([]);
  const [targetCharIdx, setTargetCharIdx] = useState(0);
  const [errorBalloonId, setErrorBalloonId] = useState(null);

  // 2. DEFENSE STATES
  const [enemyX, setEnemyX] = useState(100); // enemy left %
  const [currentEnemyIdx, setCurrentEnemyIdx] = useState(0);
  const [turretType, setTurretType] = useState(""); // string | number
  const [defenseFeedback, setDefenseFeedback] = useState("바이러스를 요격할 대포를 준비하세요!");
  const [projectiles, setProjectiles] = useState([]);
  const [blasts, setBlasts] = useState([]);
  const [baseRecoil, setBaseRecoil] = useState(false);
  const [enemyHit, setEnemyHit] = useState(false);

  // 3. RHYTHM STATES
  const [noteX, setNoteX] = useState(100); // note left %
  const [currentBeatIdx, setCurrentBeatIdx] = useState(0);
  const [hitFeedback, setHitFeedback] = useState(""); // PERFECT! | Miss!
  const [combo, setCombo] = useState(0);
  const [comboActive, setComboActive] = useState(false);
  const [hitPulse, setHitPulse] = useState(false);

  // 4. API CONNECT STATES
  const [laserBeamActive, setLaserBeamActive] = useState(false);
  const [apiConnected, setApiConnected] = useState(false);

  // Reset all states when lesson changes
  useEffect(() => {
    setGameWon(false);
    setScore(0);
    setParticles([]);
    setConfetti([]);
    setTargetCharIdx(0);
    setErrorBalloonId(null);
    setEnemyX(100);
    setCurrentEnemyIdx(0);
    setProjectiles([]);
    setBlasts([]);
    setBaseRecoil(false);
    setEnemyHit(false);
    setNoteX(100);
    setCurrentBeatIdx(0);
    setHitFeedback("");
    setCombo(0);
    setComboActive(false);
    setHitPulse(false);
    setLaserBeamActive(false);
    setApiConnected(false);
    setDefenseFeedback("바이러스를 요격할 대포를 준비하세요!");

    if (miniGame) {
      if (miniGame.type === "balloon-pop") {
        initializeBalloons();
      }
    }
  }, [lessonId, miniGame]);

  // Handle Confetti Celebration on Game Won
  useEffect(() => {
    if (gameWon) {
      const colors = ["#ff007f", "#00f0ff", "#ffd700", "#bd00ff", "#10b981", "#ff4500"];
      const newConfetti = Array.from({ length: 60 }).map(() => ({
        id: Math.random(),
        left: `${Math.random() * 100}%`,
        color: colors[Math.floor(Math.random() * colors.length)],
        delay: `${Math.random() * 1.5}s`,
        duration: `${2 + Math.random() * 2}s`
      }));
      setConfetti(newConfetti);
    } else {
      setConfetti([]);
    }
  }, [gameWon]);

  // INITIALIZE BALLOON POP
  const initializeBalloons = () => {
    const rawBalloons = miniGame.balloons || [];
    const colorPalette = ["#ff007f", "#00f0ff", "#ffd700", "#bd00ff", "#10b981"];
    const items = rawBalloons.map((val, idx) => ({
      id: `${val}-${idx}-${Math.random()}`,
      value: val,
      color: colorPalette[idx % colorPalette.length],
      x: 15 + idx * (70 / Math.max(1, rawBalloons.length - 1)), // space horizontally
      y: 20 + Math.random() * 30, // random height
      popped: false,
      speed: 0.4 + Math.random() * 0.4,
      direction: Math.random() > 0.5 ? 1 : -1
    }));
    setBalloonList(items);
    setTargetCharIdx(0);
  };

  // BALLOON MOVEMENT LOOP
  useEffect(() => {
    if (!miniGame || miniGame.type !== "balloon-pop" || gameWon) return;

    const interval = setInterval(() => {
      setBalloonList((prev) =>
        prev.map((b) => {
          let nextY = b.y + b.speed * b.direction;
          let nextDir = b.direction;

          // bounce boundaries
          if (nextY > 70) {
            nextY = 70;
            nextDir = -1;
          } else if (nextY < 10) {
            nextY = 10;
            nextDir = 1;
          }

          return { ...b, y: nextY, direction: nextDir };
        })
      );
    }, 50);

    return () => clearInterval(interval);
  }, [miniGame, gameWon]);

  // CODE DEFENSE LOOP (Move enemy left)
  useEffect(() => {
    if (!miniGame || miniGame.type !== "code-defense" || gameWon || enemyHit) return;

    const interval = setInterval(() => {
      setEnemyX((x) => {
        if (x <= 20) {
          // Reached Pydi's base!
          audioSynth.playError();
          setDefenseFeedback("🤖 앗! 바이러스가 보호막에 닿았어요. 안전 차단 후 뒤로 재소환합니다!");
          return 100;
        }
        return x - 1.2; // slow march left
      });
    }, 45);

    return () => clearInterval(interval);
  }, [miniGame, gameWon, currentEnemyIdx, enemyHit]);

  // RHYTHM NOTE LOOP (Move note left)
  useEffect(() => {
    if (!miniGame || miniGame.type !== "rhythm-beat" || gameWon) return;

    const interval = setInterval(() => {
      setNoteX((x) => {
        if (x <= 5) {
          // Missed note goes off screen
          setHitFeedback("놓쳤어요! 😮");
          setCombo(0); // combo breaks
          setTimeout(() => setHitFeedback(""), 800);
          return 100;
        }
        return x - 2; // steady rhythm speed
      });
    }, 40);

    return () => clearInterval(interval);
  }, [miniGame, gameWon, currentBeatIdx]);

  // Trigger popping particles
  const triggerPopParticles = (x, y, color) => {
    const count = 12;
    const newParticles = Array.from({ length: count }).map((_, i) => {
      const angle = (i / count) * Math.PI * 2 + Math.random() * 0.4;
      const distance = 45 + Math.random() * 70;
      const tx = Math.cos(angle) * distance;
      const ty = Math.sin(angle) * distance;
      return {
        id: Math.random(),
        x,
        y,
        color,
        tx: `${tx}px`,
        ty: `${ty}px`,
        size: 5 + Math.random() * 7
      };
    });
    setParticles((prev) => [...prev, ...newParticles]);
    setTimeout(() => {
      setParticles((prev) => prev.filter((p) => !newParticles.find((np) => np.id === p.id)));
    }, 600);
  };

  // ===================== GAME ACTIONS =====================

  // 1. Balloon Click
  const handleBalloonClick = (balloon) => {
    if (balloon.popped || gameWon || errorBalloonId) return;

    let isCorrect = false;

    if (lessonId === 1 || lessonId === 2) {
      // Must pop letters in spelling order
      const expectedChar = miniGame.word[targetCharIdx];
      if (balloon.value === expectedChar) {
        isCorrect = true;
      }
    } else if (lessonId === 3) {
      // Math: pop expression that equals 12
      if (balloon.value === "5+7") {
        isCorrect = true;
      }
    } else if (lessonId === 10) {
      // Loop: pop any star balloon
      isCorrect = true;
    }

    if (isCorrect) {
      // Correct Pop!
      audioSynth.playBeep(523 + targetCharIdx * 80, 0.05);
      triggerPopParticles(balloon.x, balloon.y, balloon.color);
      
      setBalloonList((prev) => prev.map((b) => (b.id === balloon.id ? { ...b, popped: true } : b)));

      if (lessonId === 1 || lessonId === 2) {
        const nextIdx = targetCharIdx + 1;
        setTargetCharIdx(nextIdx);
        if (nextIdx >= miniGame.word.length) {
          setTimeout(() => {
            audioSynth.playWin();
            setGameWon(true);
          }, 400);
        }
      } else if (lessonId === 3) {
        setTimeout(() => {
          audioSynth.playWin();
          setGameWon(true);
        }, 400);
      } else if (lessonId === 10) {
        const nextScore = score + 1;
        setScore(nextScore);
        if (nextScore >= 3) {
          setTimeout(() => {
            audioSynth.playWin();
            setGameWon(true);
          }, 400);
        }
      }
    } else {
      // Incorrect Pop - elastic shake
      audioSynth.playError();
      setErrorBalloonId(balloon.id);
      setTimeout(() => setErrorBalloonId(null), 600);
    }
  };

  // 2. Defense Cannon Shoot
  const handleDefenseShoot = (type) => {
    if (projectiles.length > 0 || gameWon || enemyHit) return;

    setTurretType(type);
    setBaseRecoil(true);
    setTimeout(() => setBaseRecoil(false), 400);

    const enemy = miniGame.enemies[currentEnemyIdx];
    const isCorrect = enemy.type === type;
    const bulletEmoji = type === "string" ? "💬" : "🧮";

    // Launch Projectile
    setProjectiles([
      {
        id: Math.random(),
        emoji: bulletEmoji,
        targetX: `${enemyX}%`,
        duration: "0.4s"
      }
    ]);
    audioSynth.playLaser();

    // On Impact (0.4s travel time)
    setTimeout(() => {
      setProjectiles([]); // remove projectile
      
      if (isCorrect) {
        audioSynth.playCoin();
        setEnemyHit(true); // freeze enemy movement
        
        // Spawn Blast explosion
        setBlasts([{ id: Math.random(), x: `${enemyX}%` }]);
        setDefenseFeedback("피융-💥 바이러스를 멋지게 파괴했습니다! 다음 적을 요격하세요!");

        setTimeout(() => {
          setBlasts([]);
          setEnemyHit(false);
          const nextIdx = currentEnemyIdx + 1;
          if (nextIdx >= miniGame.enemies.length) {
            audioSynth.playWin();
            setGameWon(true);
          } else {
            setCurrentEnemyIdx(nextIdx);
            setEnemyX(100);
          }
        }, 500);
      } else {
        audioSynth.playError();
        setDefenseFeedback("앗! 대포 속성이 바이러스와 맞지 않아요. 다른 대포를 조준해봐요!");
      }
    }, 400);
  };

  // 3. Rhythm Key Click (O or X)
  const handleRhythmClick = (input) => {
    if (gameWon) return;

    const beat = miniGame.beats[currentBeatIdx];
    
    // Target zone coordinates (10% to 25%)
    const inZone = noteX >= 10 && noteX <= 25;

    if (!inZone) {
      audioSynth.playBeep(300, 0.08);
      setHitFeedback("박자가 너무 빠르거나 늦어요! ⏰");
      setCombo(0); // break combo
      setTimeout(() => setHitFeedback(""), 800);
      return;
    }

    const isCorrect = beat.expect === input;

    if (isCorrect) {
      audioSynth.playCoin();
      setHitFeedback("PERFECT! 🌟");
      
      // Trigger Hit Pulse & Combo
      setHitPulse(true);
      setTimeout(() => setHitPulse(false), 400);

      const nextCombo = combo + 1;
      setCombo(nextCombo);
      setComboActive(true);
      setTimeout(() => setComboActive(false), 700);

      const nextScore = score + 1;
      setScore(nextScore);

      if (nextScore >= 3) {
        audioSynth.playWin();
        setGameWon(true);
      } else {
        const nextIdx = (currentBeatIdx + 1) % miniGame.beats.length;
        setCurrentBeatIdx(nextIdx);
        setNoteX(100);
        setTimeout(() => setHitFeedback(""), 800);
      }
    } else {
      audioSynth.playError();
      setHitFeedback("앗! 참/거짓 판단이 틀렸어요. ❌");
      setCombo(0); // break combo
      setTimeout(() => setHitFeedback(""), 800);
    }
  };

  // 4. API Connect Option click
  const handleApiConnect = (option) => {
    if (gameWon || laserBeamActive) return;

    if (option.isCorrect) {
      audioSynth.playLaser();
      setLaserBeamActive(true); // activate laser beam animation
      
      setTimeout(() => {
        audioSynth.playWin();
        setLaserBeamActive(false);
        setApiConnected(true);
        setGameWon(true);
      }, 1500);
    } else {
      audioSynth.playError();
      alert("앗! 주파수가 다릅니다. 올바른 주파수를 연결해주세요!");
    }
  };

  const handleClaimBadge = () => {
    onClose(true); // Claim badge and go back to dashboard
  };

  return (
    <div style={{ maxWidth: "850px", margin: "20px auto", padding: "20px", display: "flex", flexDirection: "column", gap: "20px", position: "relative" }}>
      {/* Confetti Celebration */}
      {confetti.map((c) => (
        <div
          key={c.id}
          className="confetti-piece"
          style={{
            left: c.left,
            background: c.color,
            animationDelay: c.delay,
            top: "-10px",
            "--fall-duration": c.duration
          }}
        />
      ))}

      {/* Header */}
      <header className="glass-panel" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 24px", borderColor: "rgba(255, 0, 127, 0.3)" }}>
        <div>
          <span style={{ fontSize: "0.9rem", color: "#ff007f", fontWeight: "bold" }}>
            LEVEL {lesson.id} • 복습 우주 미니게임
          </span>
          <h2 style={{ fontSize: "1.8rem", color: "white" }}>{miniGame.title}</h2>
        </div>
        <button onClick={() => onClose(false)} className="btn-cosmic btn-outline" style={{ padding: "8px", borderRadius: "50%" }}>
          <X size={20} />
        </button>
      </header>

      {/* Game Area */}
      <section className="glass-panel" style={{
        padding: "32px",
        background: "rgba(10, 11, 27, 0.85)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "450px",
        boxShadow: "0 0 35px rgba(255, 0, 127, 0.15)",
        position: "relative",
        overflow: "hidden"
      }}>
        {/* Render Popping Particles */}
        {particles.map((p) => (
          <div
            key={p.id}
            className="pop-particle"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              background: p.color,
              width: `${p.size}px`,
              height: `${p.size}px`,
              boxShadow: `0 0 10px ${p.color}`,
              "--p-tx": p.tx,
              "--p-ty": p.ty
            }}
          />
        ))}

        {!gameWon ? (
          <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "24px", alignItems: "center" }}>
            <p style={{ color: "#a5b4fc", fontSize: "1.1rem", textAlign: "center", fontWeight: "bold" }}>
              {miniGame.description}
            </p>

            {/* ===================== GAME 1: BALLOON POP ===================== */}
            {miniGame.type === "balloon-pop" && (
              <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", gap: "20px" }}>
                {/* Target words builder indicators */}
                {(lessonId === 1 || lessonId === 2) && (
                  <div style={{ display: "flex", gap: "8px", background: "rgba(0,0,0,0.3)", padding: "12px 30px", borderRadius: "16px" }}>
                    {miniGame.word.split("").map((c, i) => (
                      <span key={i} style={{
                        fontSize: "1.6rem",
                        fontFamily: "monospace",
                        color: i < targetCharIdx ? "var(--color-neon-cyan)" : "rgba(255,255,255,0.15)",
                        fontWeight: "900",
                        textTransform: "uppercase",
                        borderBottom: `2.5px solid ${i < targetCharIdx ? "var(--color-neon-cyan)" : "rgba(255,255,255,0.2)"}`,
                        padding: "2px 6px"
                      }}>
                        {c}
                      </span>
                    ))}
                  </div>
                )}

                {lessonId === 3 && (
                  <div style={{ fontSize: "1.25rem", color: "#ffd700", fontWeight: "bold" }}>
                    목표 수치: <span style={{ fontSize: "1.6rem", borderBottom: "2px solid #ffd700" }}>{miniGame.word}</span>
                  </div>
                )}

                {lessonId === 10 && (
                  <div style={{ fontSize: "1.25rem", color: "#00f0ff", fontWeight: "bold" }}>
                    터트린 별 풍선: <span style={{ fontSize: "1.6rem" }}>{score} / 3 개</span> 🎈
                  </div>
                )}

                {/* Floating field container */}
                <div style={{
                  width: "100%",
                  height: "280px",
                  background: "#050614",
                  border: "2px dashed rgba(0, 240, 255, 0.2)",
                  borderRadius: "24px",
                  position: "relative",
                  overflow: "hidden"
                }}>
                  {balloonList.map((b) => {
                    if (b.popped) return null;
                    const isError = b.id === errorBalloonId;
                    return (
                      <button
                        key={b.id}
                        onClick={() => handleBalloonClick(b)}
                        className={isError ? "balloon-error" : "balloon-wobble"}
                        style={{
                          position: "absolute",
                          left: `${b.x}%`,
                          top: `${b.y}%`,
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          outline: "none",
                          transform: "translate(-50%, -50%)",
                          zIndex: 10,
                          transition: isError ? "none" : "top 0.05s linear"
                        }}
                      >
                        {/* Cutest SVG Balloon */}
                        <svg width="70" height="95" viewBox="0 0 70 95" style={{ overflow: "visible" }}>
                          <defs>
                            <filter id={`glow-${b.id}`} x="-20%" y="-20%" width="140%" height="140%">
                              <feGaussianBlur stdDeviation="5" result="blur" />
                              <feComposite in="SourceGraphic" in2="blur" operator="over" />
                            </filter>
                          </defs>
                          {/* Balloon String */}
                          <path d="M35,68 Q37,82 33,95" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" fill="none" />
                          {/* Balloon Body */}
                          <ellipse cx="35" cy="38" rx="27" ry="30" fill={b.color} style={{ filter: `url(#glow-${b.id})` }} />
                          {/* Light Highlight */}
                          <ellipse cx="25" cy="26" rx="8" ry="10" fill="rgba(255,255,255,0.45)" transform="rotate(-15 25 26)" />
                          {/* Balloon Knot */}
                          <polygon points="31,68 39,68 35,63" fill={b.color} />
                          {/* Label Text */}
                          <text x="35" y="44" fill="white" fontSize="18" fontWeight="bold" textAnchor="middle" style={{ fontFamily: "monospace", textShadow: "1px 1px 3px rgba(0,0,0,0.8)" }}>
                            {b.value.toUpperCase()}
                          </text>
                        </svg>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ===================== GAME 2: CODE DEFENSE ===================== */}
            {miniGame.type === "code-defense" && (
              <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "20px", alignItems: "center" }}>
                {/* 2D Defense Lane */}
                <div style={{
                  width: "100%",
                  height: "220px",
                  background: "#050614",
                  border: "2px solid rgba(255, 0, 127, 0.2)",
                  borderRadius: "24px",
                  position: "relative",
                  overflow: "hidden"
                }}>
                  {/* Laser runway line */}
                  <div className="defense-runway" />

                  {/* Left Player Space Base */}
                  <div className={`defense-base-recoil`} style={{
                    position: "absolute",
                    left: "20px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "6px",
                    zIndex: 2,
                    animation: baseRecoil ? "base-recoil-anim 0.4s cubic-bezier(0.15, 0.85, 0.3, 1)" : "none"
                  }}>
                    <div style={{ fontSize: "3.5rem" }} className="animate-float">🛸🤖</div>
                    <span style={{ fontSize: "0.8rem", color: "#00f0ff", background: "rgba(0,240,255,0.1)", padding: "2px 8px", borderRadius: "10px" }}>방어 기지</span>
                  </div>

                  {/* Live Turret Projectiles */}
                  {projectiles.map((p) => (
                    <div
                      key={p.id}
                      className="defense-projectile"
                      style={{
                        "--target-x": p.targetX,
                        "--fly-duration": p.duration
                      }}
                    >
                      {p.emoji}
                    </div>
                  ))}

                  {/* Explosion Blast effects */}
                  {blasts.map((b) => (
                    <div
                      key={b.id}
                      className="defense-blast"
                      style={{ "--blast-x": b.x }}
                    />
                  ))}

                  {/* Marching Virus Monster */}
                  <div style={{
                    position: "absolute",
                    left: `${enemyX}%`,
                    top: "50%",
                    transform: "translate(-50%, -50%)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    transition: enemyHit ? "none" : "left 0.04s linear",
                    filter: enemyHit ? "brightness(2) contrast(1.5)" : "none",
                    opacity: enemyHit ? 0.8 : 1,
                    zIndex: 3
                  }}>
                    <div style={{ fontSize: "3.2rem" }} className={enemyHit ? "none" : "shake-animation"}>
                      {enemyHit ? "💥" : "👾"}
                    </div>
                    <span style={{
                      background: "rgba(255,255,255,0.08)",
                      border: "1px solid white",
                      color: "white",
                      padding: "4px 10px",
                      borderRadius: "10px",
                      fontSize: "1rem",
                      fontWeight: "bold",
                      fontFamily: "monospace",
                      marginTop: "4px"
                    }}>
                      {miniGame.enemies[currentEnemyIdx].label}
                    </span>
                  </div>
                </div>

                {/* Status message */}
                <div style={{
                  background: "rgba(0,0,0,0.3)",
                  padding: "10px 20px",
                  borderRadius: "14px",
                  color: "#cbd5e1",
                  fontSize: "0.95rem"
                }}>
                  {defenseFeedback}
                </div>

                {/* Turret Button Controls */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", width: "100%", maxWidth: "440px" }}>
                  <button
                    disabled={projectiles.length > 0 || enemyHit}
                    onClick={() => handleDefenseShoot("string")}
                    className="btn-cosmic btn-cyan"
                    style={{ padding: "16px", fontSize: "1.25rem", borderRadius: "18px" }}
                  >
                    💬 글자 대포 [ " " ] 발사
                  </button>
                  <button
                    disabled={projectiles.length > 0 || enemyHit}
                    onClick={() => handleDefenseShoot("number")}
                    className="btn-cosmic btn-pink"
                    style={{ padding: "16px", fontSize: "1.25rem", borderRadius: "18px" }}
                  >
                    🧮 숫자 대포 [ 123 ] 발사
                  </button>
                </div>
              </div>
            )}

            {/* ===================== GAME 3: RHYTHM BEAT ===================== */}
            {miniGame.type === "rhythm-beat" && (
              <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "20px", alignItems: "center" }}>
                {/* Condition Board */}
                <div style={{
                  background: "rgba(189, 0, 255, 0.1)",
                  border: "2px solid #bd00ff",
                  borderRadius: "20px",
                  padding: "12px 30px",
                  textAlign: "center",
                  boxShadow: "0 0 15px rgba(189,0,255,0.3)"
                }}>
                  <div style={{ fontSize: "0.8rem", color: "#a5b4fc" }}>목표 조건 판별식</div>
                  <strong style={{ fontSize: "1.8rem", color: "white", fontFamily: "monospace" }}>
                    {miniGame.beats[currentBeatIdx].expr}
                  </strong>
                </div>

                {/* Judgment Beat Track */}
                <div style={{
                  width: "100%",
                  height: "130px",
                  background: "#050614",
                  border: "2px solid var(--color-panel-border)",
                  borderRadius: "20px",
                  position: "relative",
                  overflow: "hidden"
                }}>
                  {/* Neon Cyber Track Tubes */}
                  <div style={{
                    position: "absolute",
                    top: "50%",
                    left: 0,
                    right: 0,
                    height: "6px",
                    background: "linear-gradient(90deg, #bd00ff, #00f0ff)",
                    boxShadow: "0 0 10px #bd00ff",
                    transform: "translateY(-50%)"
                  }} />

                  {/* Target Zone Ring (Neoner layout) */}
                  <div style={{
                    position: "absolute",
                    left: "16.6%",
                    top: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "65px",
                    height: "65px",
                    borderRadius: "50%",
                    border: "3.5px dashed var(--color-neon-cyan)",
                    boxShadow: "0 0 15px rgba(0,240,255,0.6)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "0.75rem",
                    color: "var(--color-neon-cyan)",
                    fontWeight: "bold",
                    background: "rgba(0,240,255,0.06)",
                    zIndex: 2
                  }}>
                    HIT!
                  </div>

                  {/* Pulsing ring on correct hit */}
                  {hitPulse && <div className="judgment-hit-pulse" />}

                  {/* Floating combo word info */}
                  {combo > 0 && comboActive && (
                    <div className="combo-text">
                      {combo} COMBO!
                    </div>
                  )}

                  {/* Incoming Rhythm Note */}
                  <div style={{
                    position: "absolute",
                    left: `${noteX}%`,
                    top: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "52px",
                    height: "52px",
                    borderRadius: "50%",
                    background: "radial-gradient(circle, #ff007f, #050614)",
                    border: "2.5px solid white",
                    boxShadow: "0 0 15px #ff007f",
                    color: "white",
                    fontSize: "1.45rem",
                    fontWeight: "bold",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "left 0.04s linear",
                    zIndex: 3
                  }}>
                    {miniGame.beats[currentBeatIdx].expect}
                  </div>
                </div>

                {/* Hit feedback words */}
                <div style={{
                  fontSize: "1.25rem",
                  fontWeight: "bold",
                  color: hitFeedback.includes("PERFECT") ? "#10b981" : "#ef4444",
                  minHeight: "28px"
                }}>
                  {hitFeedback}
                </div>

                {/* Beat buttons */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", width: "100%", maxWidth: "400px" }}>
                  <button
                    onClick={() => handleRhythmClick("O")}
                    className="btn-cosmic btn-cyan"
                    style={{ padding: "16px", fontSize: "2rem", borderRadius: "18px", fontWeight: "900" }}
                  >
                    O (참 - True)
                  </button>
                  <button
                    onClick={() => handleRhythmClick("X")}
                    className="btn-cosmic btn-pink"
                    style={{ padding: "16px", fontSize: "2rem", borderRadius: "18px", fontWeight: "900" }}
                  >
                    X (거짓 - False)
                  </button>
                </div>
              </div>
            )}

            {/* ===================== GAME 4: API CONNECT ===================== */}
            {miniGame.type === "api-connect" && (
              <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "24px", alignItems: "center" }}>
                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                  maxWidth: "460px",
                  padding: "30px",
                  background: "rgba(5, 6, 20, 0.4)",
                  border: "1.5px solid rgba(255, 255, 255, 0.05)",
                  borderRadius: "24px",
                  position: "relative"
                }}>
                  {/* Dish */}
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", zIndex: 3 }}>
                    <div style={{
                      fontSize: "4.5rem",
                      transform: laserBeamActive ? "rotate(12deg) scale(1.1)" : "none",
                      transition: "transform 0.3s ease"
                    }}>
                      📡
                    </div>
                    <span style={{ fontSize: "0.85rem", color: "#a5b4fc", marginTop: "4px" }}>송신 안테나</span>
                  </div>

                  {/* Pulsing lightning laser beam */}
                  {laserBeamActive && <div className="api-laser-line" />}

                  {/* Destination screen with Hologram glow */}
                  <div className="hologram-screen" style={{
                    width: "120px",
                    height: "120px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 3
                  }}>
                    <div style={{ fontSize: "3.8rem" }}>
                      {apiConnected 
                        ? (miniGame.targetRequest.includes("고양이") ? "🐱🐾" : "🌤️🌈") 
                        : "❓"}
                    </div>
                    <span style={{ fontSize: "0.8rem", color: "var(--color-neon-cyan)", fontWeight: "bold" }}>
                      {apiConnected ? "연결 완료!" : miniGame.targetRequest}
                    </span>
                  </div>
                </div>

                {/* API options */}
                <div style={{ display: "flex", flexDirection: "column", gap: "12px", width: "100%", maxWidth: "500px" }}>
                  {miniGame.options.map((opt, idx) => (
                    <button
                      key={idx}
                      disabled={laserBeamActive}
                      onClick={() => handleApiConnect(opt)}
                      className="btn-cosmic btn-outline"
                      style={{
                        padding: "16px 20px",
                        fontSize: "1.15rem",
                        fontFamily: "monospace",
                        borderRadius: "18px",
                        borderColor: laserBeamActive ? "rgba(255, 255, 255, 0.05)" : "var(--color-panel-border)"
                      }}
                    >
                      {opt.code}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Winning Badge Reward Display */
          <div style={{
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "24px",
            zIndex: 10
          }}>
            <div 
              style={{
                fontSize: "7rem",
                width: "160px",
                height: "160px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #ffd700, #ff007f)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 0 40px rgba(255, 215, 0, 0.5)",
                border: "4px solid white"
              }}
              className="animate-float"
            >
              🏅
            </div>

            <div>
              <h3 style={{ fontSize: "2.8rem", color: "#ffd700", lineHeight: "1.1" }}>
                미니게임 클리어!
              </h3>
              <p style={{ color: "#a5b4fc", fontSize: "1.15rem", marginTop: "8px" }}>
                <strong>{lesson.planet} 배지</strong>를 획득하셨습니다!
              </p>
            </div>

            <div style={{
              background: "rgba(0, 240, 255, 0.05)",
              padding: "16px 20px",
              borderRadius: "20px",
              border: "1px solid rgba(0, 240, 255, 0.2)",
              maxWidth: "400px",
              color: "#e2e8f0",
              fontSize: "1.05rem",
              lineHeight: "1.5"
            }}>
              🤖 "삐-빅! 지안 탐험가님이 기계를 완벽하게 지켜내고 조종했어요!<br />
              배지 장식장에 이쁜 훈장이 생겼으니, 어서 지도로 가볼까요?"
            </div>

            <button 
              onClick={handleClaimBadge}
              className="btn-cosmic btn-star animate-pulse-cyan"
              style={{
                padding: "16px 40px",
                fontSize: "1.3rem",
                fontWeight: "900",
                width: "100%",
                maxWidth: "320px"
              }}
            >
              🎖️ 배지 획득하고 지도로 가기
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
