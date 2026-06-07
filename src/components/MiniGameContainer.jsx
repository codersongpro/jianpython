import React, { useState, useEffect, useRef } from "react";
import { X, Award, ShieldAlert, Zap } from "lucide-react";
import { lessons } from "../data/lessons";
import { audioSynth } from "../utils/audioSynth";

export default function MiniGameContainer({ lessonId, onClose }) {
  const lesson = lessons.find((l) => l.id === lessonId);
  const miniGame = lesson ? lesson.miniGame : null;
  const spellingLessonIds = [1, 2, 23, 25, 26, 28];
  const isSpellingGame = miniGame?.type === "balloon-pop" && spellingLessonIds.includes(lessonId);
  const defenseOptions = miniGame?.defenseOptions || [
    { type: "string", label: '💬 글자 대포 [ " " ] 발사', className: "btn-cyan" },
    { type: "number", label: "🧮 숫자 대포 [ 123 ] 발사", className: "btn-pink" }
  ];

  // 게임 진행 상태
  const [gameWon, setGameWon] = useState(false);
  const [score, setScore] = useState(0);

  // 시각 효과 상태들
  const [particles, setParticles] = useState([]);
  const [confetti, setConfetti] = useState([]);
  const [isScreenShaking, setIsScreenShaking] = useState(false);

  // 1. 풍선 터트리기 관련 상태들
  const [balloonList, setBalloonList] = useState([]);
  const [targetCharIdx, setTargetCharIdx] = useState(0);
  const [errorBalloonId, setErrorBalloonId] = useState(null);

  // [새로 추가됨] 1-1. 타이머, 패널티 및 역대 최고 기록 관련 상태들
  const [startTime, setStartTime] = useState(null); // 게임 시작 타임스탬프
  const [elapsedTime, setElapsedTime] = useState(0); // 경과 시간 (초 단위)
  const [bestRecord, setBestRecord] = useState(null); // localStorage에서 불러온 역대 최단 시간 기록
  const [isNewRecord, setIsNewRecord] = useState(false); // 이번 시도에서 최고 기록을 달성했는지 여부
  const [isTimerRunning, setIsTimerRunning] = useState(false); // 타이머 작동 상태
  const [penaltyActive, setPenaltyActive] = useState(false); // 오답 풍선 클릭 시 페널티 효과 트리거

  // 2. 디펜스 게임 관련 상태들
  const [enemyX, setEnemyX] = useState(100); // 적의 가로 위치 %
  const [currentEnemyIdx, setCurrentEnemyIdx] = useState(0);
  const [turretType, setTurretType] = useState(""); // 발사할 대포 타입 (string | number)
  const [defenseFeedback, setDefenseFeedback] = useState("바이러스를 요격할 대포를 준비하세요!");
  const [projectiles, setProjectiles] = useState([]);
  const [blasts, setBlasts] = useState([]);
  const [baseRecoil, setBaseRecoil] = useState(false);
  const [muzzleFlash, setMuzzleFlash] = useState(false);
  const [enemyHit, setEnemyHit] = useState(false);

  // 3. 리듬 게임 관련 상태들
  const [noteX, setNoteX] = useState(100); // 노트 가로 위치 %
  const [currentBeatIdx, setCurrentBeatIdx] = useState(0);
  const [hitFeedback, setHitFeedback] = useState(""); // PERFECT! | Miss! 등 판정 피드백
  const [combo, setCombo] = useState(0);
  const [comboActive, setComboActive] = useState(false);
  const [hitPulse, setHitPulse] = useState(false);

  // 4. API 연결 게임 관련 상태들
  const [laserBeamActive, setLaserBeamActive] = useState(false);
  const [apiConnected, setApiConnected] = useState(false);

  // 5. 피하기 게임 관련 상태들
  const [dodgeLane, setDodgeLane] = useState(0);
  const [currentDodgeIdx, setCurrentDodgeIdx] = useState(0);
  const [obstacleY, setObstacleY] = useState(0);
  const [dodgeFeedback, setDodgeFeedback] = useState("");
  const [dodgeHit, setDodgeHit] = useState(false);

  // 레슨이 변경될 때 모든 상태 초기화
  useEffect(() => {
    setGameWon(false);
    setScore(0);
    setParticles([]);
    setConfetti([]);
    setIsScreenShaking(false);
    setTargetCharIdx(0);
    setErrorBalloonId(null);
    setEnemyX(100);
    setCurrentEnemyIdx(0);
    setProjectiles([]);
    setBlasts([]);
    setBaseRecoil(false);
    setMuzzleFlash(false);
    setEnemyHit(false);
    setNoteX(100);
    setCurrentBeatIdx(0);
    setHitFeedback("");
    setCombo(0);
    setComboActive(false);
    setHitPulse(false);
    setLaserBeamActive(false);
    setApiConnected(false);
    setDodgeLane(0);
    setCurrentDodgeIdx(0);
    setObstacleY(0);
    setDodgeFeedback("");
    setDodgeHit(false);
    setDefenseFeedback("바이러스를 요격할 대포를 준비하세요!");

    // [새로 추가됨] 타이머 및 기록 상태 리셋
    setStartTime(null);
    setElapsedTime(0);
    setIsNewRecord(false);
    setIsTimerRunning(false);
    setPenaltyActive(false);

    if (miniGame) {
      if (miniGame.type === "balloon-pop") {
        // localStorage에서 해당 레슨의 기존 최고 기록 불러오기
        const savedBest = localStorage.getItem(`jianpython_lesson_${lessonId}_best_time`);
        if (savedBest) {
          setBestRecord(parseFloat(savedBest));
        } else {
          setBestRecord(null);
        }
        initializeBalloons();
      }
    }
  }, [lessonId, miniGame]);

  // 게임 승리 시 축하 폭죽(Confetti) 효과
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

  // [새로 추가됨] 실시간으로 흐르는 시간 계산 (타이머)
  useEffect(() => {
    if (!isTimerRunning || gameWon || !startTime) return;

    const timerInterval = setInterval(() => {
      // 시작 시간으로부터 경과된 초를 계산하여 업데이트 (50ms 단위)
      const currentElapsed = (Date.now() - startTime) / 1000;
      // 음수 방지 처리
      setElapsedTime(currentElapsed < 0 ? 0 : currentElapsed);
    }, 50);

    return () => clearInterval(timerInterval);
  }, [isTimerRunning, gameWon, startTime]);

  // 풍선 터트리기 초기화 (정답 풍선 + 가짜 방해 풍선 혼합)
  const initializeBalloons = () => {
    const rawBalloons = miniGame.balloons || [];
    
    // 1. 진짜 정답 풍선들 생성
    const correctItems = rawBalloons.map((val, idx) => ({
      id: `correct-${val}-${idx}-${Math.random()}`,
      value: val,
      isFake: false,
      popped: false
    }));

    // 2. 레슨별 맞춤형 방해 풍선(오답) 생성
    let fakeValues = [];
    if (isSpellingGame) {
      // 단어 철자에 포함되지 않은 다른 알파벳 3개 추출
      const alphabet = "abcdefghijklmnopqrstuvwxyz";
      const wordChars = miniGame.word.toLowerCase().split("");
      const candidates = alphabet.split("").filter(c => !wordChars.includes(c));
      for (let i = 0; i < 3; i++) {
        if (candidates.length > 0) {
          const randIdx = Math.floor(Math.random() * candidates.length);
          fakeValues.push(candidates[randIdx]);
          // 한 번 고른 후보는 중복 방지를 위해 삭제
          candidates.splice(randIdx, 1);
        }
      }
    } else if (lessonId === 3) {
      // 수식 더하기/빼기 방해 풍선
      fakeValues = ["4+6", "12-3", "8+1"];
    } else if (lessonId === 10) {
      // 별 그리기 방해 풍선 (터트리면 안 되는 해골이나 폭탄)
      fakeValues = ["💀", "💣", "🚫"];
    } else if (lessonId === 13) {
      // 곱셈 수식 방해 풍선 (15가 아닌 오답들)
      fakeValues = ["5*2", "20/4", "10+4"];
    } else if (lessonId === 15) {
      // 문자열 반복 방해 풍선
      fakeValues = ['"호"*4', '"호호호"*2', '"호"-3'];
    } else if (lessonId === 21) {
      // 리스트 인덱싱 방해 풍선
      fakeValues = ["fruits[3]", "fruits[-1]", "fruits[99]"];
    } else {
      fakeValues = ["x", "z", "q"];
    }

    // 가짜 풍선 데이터 생성
    const fakeItems = fakeValues.map((val, idx) => ({
      id: `fake-${val}-${idx}-${Math.random()}`,
      value: val,
      isFake: true,
      popped: false
    }));

    // 진짜와 가짜를 한 바구니에 넣고 무작위 셔플 (Fisher-Yates 알고리즘)
    const allItems = [...correctItems, ...fakeItems];
    for (let i = allItems.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [allItems[i], allItems[j]] = [allItems[j], allItems[i]];
    }

    // 화면 내에 겹치지 않고 골고루 둥실둥실 떠오르도록 속성과 위치 부여
    const colorPalette = ["#ff007f", "#00f0ff", "#ffd700", "#bd00ff", "#10b981", "#ff7f00", "#a855f7"];
    const finalItems = allItems.map((item, idx) => {
      let color = colorPalette[idx % colorPalette.length];
      // 방해 별 풍선(해골/폭탄 등)은 경고 느낌의 빨간색으로 통일하여 스릴 강조
      if (item.isFake && (item.value === "💀" || item.value === "💣" || item.value === "🚫")) {
        color = "#ef4444";
      }
      return {
        ...item,
        color,
        // 가로 영역에 비례하여 균등 분배 후 바람 효과 추가
        x: 10 + idx * (80 / Math.max(1, allItems.length - 1)),
        y: 15 + Math.random() * 35, // 세로 고도 무작위
        speed: 0.3 + Math.random() * 0.4,
        direction: Math.random() > 0.5 ? 1 : -1,
        windPhase: Math.random() * 100, // 흔들림 고유 위상
        windSpeed: 0.02 + Math.random() * 0.03 // 흔들림 속도
      };
    });

    setBalloonList(finalItems);
    setTargetCharIdx(0);

    // [새로 추가됨] 풍선 띄워짐과 동시에 타이머 개시
    setStartTime(Date.now());
    setElapsedTime(0);
    setIsTimerRunning(true);
    setIsNewRecord(false);
  };

  // 풍선 위아래 흔들림 및 둥실둥실 움직임 루프
  useEffect(() => {
    if (!miniGame || miniGame.type !== "balloon-pop" || gameWon) return;

    const interval = setInterval(() => {
      setBalloonList((prev) =>
        prev.map((b) => {
          let nextY = b.y + b.speed * b.direction;
          let nextDir = b.direction;

          // 경계 닿았을 때 통통 튕기는 애니메이션 구현
          if (nextY > 72) {
            nextY = 72;
            nextDir = -1;
          } else if (nextY < 8) {
            nextY = 8;
            nextDir = 1;
          }

          // 바람에 살랑이는 페이즈 업데이트
          const nextPhase = (b.windPhase || 0) + (b.windSpeed || 0.03);

          return { ...b, y: nextY, direction: nextDir, windPhase: nextPhase };
        })
      );
    }, 50);

    return () => clearInterval(interval);
  }, [miniGame, gameWon]);

  // 디펜스 게임 바이러스 행진 루프 (왼쪽으로 돌진)
  useEffect(() => {
    if (!miniGame || miniGame.type !== "code-defense" || gameWon || enemyHit) return;

    const interval = setInterval(() => {
      setEnemyX((x) => {
        if (x <= 20) {
          audioSynth.playError();
          setDefenseFeedback("🤖 앗! 바이러스가 보호막에 닿았어요. 안전 차단 후 뒤로 재소환합니다!");
          return 100;
        }
        return x - 1.2;
      });
    }, 45);

    return () => clearInterval(interval);
  }, [miniGame, gameWon, currentEnemyIdx, enemyHit]);

  // 리듬 게임 판정 노트 흐름 루프 (왼쪽으로 질주)
  useEffect(() => {
    if (!miniGame || miniGame.type !== "rhythm-beat" || gameWon) return;

    const interval = setInterval(() => {
      setNoteX((x) => {
        if (x <= 5) {
          setHitFeedback("놓쳤어요! 😮");
          setCombo(0);
          setTimeout(() => setHitFeedback(""), 800);
          return 100;
        }
        return x - 2;
      });
    }, 40);

    return () => clearInterval(interval);
  }, [miniGame, gameWon, currentBeatIdx]);

  // 피하기 게임 장애물 낙하 루프
  useEffect(() => {
    if (!miniGame || miniGame.type !== "dodge-code" || gameWon || dodgeHit) return;

    const interval = setInterval(() => {
      setObstacleY((y) => {
        if (y >= 78) {
          const obstacle = miniGame.obstacles[currentDodgeIdx];
          const isSafe = dodgeLane === obstacle.safeLane;

          if (isSafe) {
            audioSynth.playCoin();
            const nextScore = score + 1;
            setScore(nextScore);
            setDodgeFeedback(obstacle.success || "멋지게 피했어요!");

            if (nextScore >= miniGame.obstacles.length) {
              setTimeout(() => {
                audioSynth.playWin();
                setGameWon(true);
              }, 300);
            } else {
              setCurrentDodgeIdx(currentDodgeIdx + 1);
              setTimeout(() => setDodgeFeedback(""), 700);
            }
          } else {
            audioSynth.playError();
            setDodgeHit(true);
            setDodgeFeedback(obstacle.fail || "앗! 조건을 다시 보고 안전한 길로 움직여요.");
            setTimeout(() => {
              setDodgeHit(false);
              setDodgeFeedback("");
            }, 900);
          }

          return 0;
        }
        return y + 3.2;
      });
    }, 55);

    return () => clearInterval(interval);
  }, [miniGame, gameWon, dodgeHit, currentDodgeIdx, dodgeLane, score]);

  // 파티클(풍선 터진 파편) 튀기는 물리 이펙트 생성
  const triggerPopParticles = (x, y, color) => {
    const count = 24; // 풍성한 시각 효과를 위해 파티클 수 24개 유지
    const newParticles = Array.from({ length: count }).map((_, i) => {
      const angle = (i / count) * Math.PI * 2 + Math.random() * 0.4;
      const distance = 55 + Math.random() * 85;
      const tx = Math.cos(angle) * distance;
      const ty = Math.sin(angle) * distance;
      return {
        id: Math.random(),
        x,
        y,
        color,
        tx: `${tx}px`,
        ty: `${ty}px`,
        size: 4 + Math.random() * 8
      };
    });
    setParticles((prev) => [...prev, ...newParticles]);
    setTimeout(() => {
      setParticles((prev) => prev.filter((p) => !newParticles.find((np) => np.id === p.id)));
    }, 600);
  };

  // [새로 추가됨] 미니게임 클리어 성공 처리 헬퍼 함수
  const handleGameSuccess = (finalTargetIdx = targetCharIdx) => {
    setIsTimerRunning(false);
    // 현재 시각 기준 최종 경과된 밀리초를 초 단위로 픽스
    const finalTime = parseFloat(((Date.now() - startTime) / 1000).toFixed(2));
    setElapsedTime(finalTime);

    const recordKey = `jianpython_lesson_${lessonId}_best_time`;
    const savedBest = localStorage.getItem(recordKey);
    
    // 역대 기록이 없거나 이번 기록이 더 빠른 경우 신기록 갱신
    if (!savedBest || finalTime < parseFloat(savedBest)) {
      localStorage.setItem(recordKey, finalTime.toString());
      setBestRecord(finalTime);
      setIsNewRecord(true);
    }

    setTimeout(() => {
      audioSynth.playWin();
      setGameWon(true);
    }, 400);
  };

  // ===================== GAME ACTIONS =====================

  // 1. 풍선 터트리기 클릭 핸들러
  const handleBalloonClick = (balloon) => {
    if (balloon.popped || gameWon || errorBalloonId) return;

    // [방해 풍선 클릭 처리]: 페널티(시간 지연)와 에러 알림
    if (balloon.isFake) {
      audioSynth.playError();
      setErrorBalloonId(balloon.id);
      setTimeout(() => setErrorBalloonId(null), 600);

      // 경과 시간을 3초 손해 보게 함 (시작 시간을 3초 전으로 후퇴시킴)
      setStartTime((prev) => prev - 3000);
      setPenaltyActive(true);
      setTimeout(() => setPenaltyActive(false), 1000);

      // 터지는 시각적인 파티클도 붉은색 경고 느낌으로 연출
      const currentOffset = Math.sin(balloon.windPhase || 0) * 16;
      const actualX = balloon.x + (currentOffset / 8.5);
      triggerPopParticles(actualX, balloon.y, "#ef4444");

      // 가짜 풍선도 화면에서 터져서 사라지도록 상태 변경
      setBalloonList((prev) => prev.map((b) => (b.id === balloon.id ? { ...b, popped: true } : b)));
      return;
    }

    let isCorrect = false;

    if (isSpellingGame) {
      const expectedChar = miniGame.word[targetCharIdx];
      if (balloon.value.toLowerCase() === expectedChar.toLowerCase()) {
        isCorrect = true;
      }
    } 
    // 2. 특정 정답 매칭 게임 (3, 13, 15, 21단계)
    else if (lessonId === 3) {
      if (balloon.value === "5+7") isCorrect = true;
    } else if (lessonId === 13) {
      // 15가 되는 수식은 셋 다 정답 처리
      if (["5*3", "30/2", "10+5"].includes(balloon.value)) isCorrect = true;
    } else if (lessonId === 15) {
      if (balloon.value === '"호"*3' || balloon.value === "'호'*3") isCorrect = true;
    } else if (lessonId === 21) {
      if (balloon.value === "fruits[1]") isCorrect = true;
    }
    // 3. 단순 개수 터트리기 (10단계)
    else if (lessonId === 10) {
      if (balloon.value === "★") isCorrect = true;
    }

    if (isCorrect) {
      // 정답 맞춤: 띵동 음계 상승 효과음
      audioSynth.playBeep(523 + targetCharIdx * 80, 0.05);
      
      const currentOffset = Math.sin(balloon.windPhase || 0) * 16;
      const actualX = balloon.x + (currentOffset / 8.5);

      triggerPopParticles(actualX, balloon.y, balloon.color);
      
      setBalloonList((prev) => prev.map((b) => (b.id === balloon.id ? { ...b, popped: true } : b)));

      if (isSpellingGame) {
        const nextIdx = targetCharIdx + 1;
        setTargetCharIdx(nextIdx);
        if (nextIdx >= miniGame.word.length) {
          handleGameSuccess(nextIdx);
        }
      } else if ([3, 13, 15, 21].includes(lessonId)) {
        handleGameSuccess();
      } else if (lessonId === 10) {
        const nextScore = score + 1;
        setScore(nextScore);
        if (nextScore >= 3) {
          handleGameSuccess();
        }
      }
    } else {
      // 정답이 아니거나 순서가 맞지 않을 때
      audioSynth.playError();
      setErrorBalloonId(balloon.id);
      setTimeout(() => setErrorBalloonId(null), 600);
    }
  };

  // 2. 디펜스 게임 대포 발사 컨트롤러
  const handleDefenseShoot = (type) => {
    if (projectiles.length > 0 || gameWon || enemyHit) return;

    setTurretType(type);
    setBaseRecoil(true);
    setMuzzleFlash(true);
    
    setTimeout(() => setBaseRecoil(false), 400);
    setTimeout(() => setMuzzleFlash(false), 150);

    const enemy = miniGame.enemies[currentEnemyIdx];
    const isCorrect = enemy.type === type;
    const bulletEmoji = type === "string" ? "💬" : "🧮";

    setProjectiles([
      {
        id: Math.random(),
        emoji: bulletEmoji,
        targetX: `${enemyX}%`,
        duration: "0.4s"
      }
    ]);
    audioSynth.playLaser();

    setTimeout(() => {
      setProjectiles([]);
      
      if (isCorrect) {
        audioSynth.playCoin();
        setEnemyHit(true);
        setEnemyX((prev) => Math.min(100, prev + 18));

        setBlasts([{ id: Math.random(), x: `${enemyX}%` }]);
        setDefenseFeedback("피융-💥 대포 발사 성공! 바이러스 넉백 후 폭발시켰습니다!");

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

  // 3. 리듬 게임 키 판단 (O/X 클릭)
  const handleRhythmClick = (input) => {
    if (gameWon) return;

    const beat = miniGame.beats[currentBeatIdx];
    const inZone = noteX >= 10 && noteX <= 25;

    if (!inZone) {
      audioSynth.playBeep(300, 0.08);
      setHitFeedback("박자가 너무 빠르거나 늦어요! ⏰");
      setCombo(0);
      setTimeout(() => setHitFeedback(""), 800);
      return;
    }

    const isCorrect = beat.expect === input;

    if (isCorrect) {
      audioSynth.playCoin();
      setHitFeedback("PERFECT! 🌟");
      
      setHitPulse(true);
      setIsScreenShaking(true);
      setTimeout(() => setHitPulse(false), 400);
      setTimeout(() => setIsScreenShaking(false), 300);

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
      setCombo(0);
      setTimeout(() => setHitFeedback(""), 800);
    }
  };

  // 4. API 연결 주파수 가동
  const handleApiConnect = (option) => {
    if (gameWon || laserBeamActive) return;

    if (option.isCorrect) {
      audioSynth.playLaser();
      setLaserBeamActive(true);
      
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
    onClose(true); // 배지 획득 완료 후 대시보드 복귀
  };

  return (
    <div style={{ maxWidth: "850px", margin: "20px auto", padding: "20px", display: "flex", flexDirection: "column", gap: "20px", position: "relative" }}>
      {/* 승리 축하 폭죽 가루 효과 */}
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

      {/* 헤더 패널 */}
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

      {/* 메인 게임 콘테이너 */}
      <section className={`glass-panel ${isScreenShaking ? "shake-animation" : ""}`} style={{
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
        {/* 풍선 터지는 이펙트 입자 렌더링 */}
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

            {/* ===================== [새로 추가됨] 풍선 게임 실시간 타이머 및 최고 기록 UI ===================== */}
            {miniGame.type === "balloon-pop" && (
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                background: "rgba(5, 6, 20, 0.6)",
                padding: "10px 24px",
                borderRadius: "30px",
                border: "1.5px solid rgba(0, 240, 255, 0.25)",
                boxShadow: "0 0 15px rgba(0, 240, 255, 0.1)",
                transition: "all 0.3s ease",
                position: "relative"
              }}>
                <span style={{ color: "#a5b4fc", fontSize: "1rem", fontWeight: "bold" }}>⏱️ 지안이의 탈출 시간:</span>
                <span style={{
                  color: penaltyActive ? "#ef4444" : "var(--color-neon-cyan)",
                  fontSize: "1.6rem",
                  fontWeight: "900",
                  fontFamily: "monospace",
                  minWidth: "90px",
                  textAlign: "right",
                  textShadow: penaltyActive ? "0 0 10px #ef4444" : "0 0 10px var(--color-neon-cyan)",
                  transition: "color 0.1s ease"
                }}>
                  {elapsedTime.toFixed(2)}초
                </span>
                
                {/* 오답 패널티 트리거 경고 표시 */}
                {penaltyActive && (
                  <span style={{
                    color: "#ef4444",
                    fontSize: "0.95rem",
                    fontWeight: "bold",
                    marginLeft: "8px",
                    animation: "shake-animation 0.3s ease",
                    textShadow: "0 0 8px rgba(239, 68, 68, 0.7)"
                  }}>
                    +3초 ⚠️
                  </span>
                )}

                {bestRecord && (
                  <span style={{
                    color: "#ffd700",
                    fontSize: "0.85rem",
                    borderLeft: "1px solid rgba(255,255,255,0.15)",
                    paddingLeft: "14px",
                    marginLeft: "4px"
                  }}>
                    🏆 최고기록: {bestRecord.toFixed(2)}초
                  </span>
                )}
              </div>
            )}

            {/* ===================== GAME 1: BALLOON POP ===================== */}
            {miniGame.type === "balloon-pop" && (
              <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", gap: "20px" }}>
                {/* 단어 스펠링 빌더 인디케이터 (1, 2, 23, 25, 26, 28단계) */}
                {isSpellingGame && (
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

                {/* 풍선 둥실둥실 필드 영역 */}
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
                    const currentOffset = Math.sin(b.windPhase || 0) * 16;
                    return (
                      <button
                        key={b.id}
                        onClick={() => handleBalloonClick(b)}
                        className={isError ? "balloon-error" : "balloon-wobble"}
                        style={{
                          position: "absolute",
                          left: `calc(${b.x}% + ${currentOffset}px)`,
                          top: `${b.y}%`,
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          outline: "none",
                          transform: "translate(-50%, -50%)",
                          zIndex: 10,
                          transition: isError ? "none" : "top 0.05s linear, left 0.05s linear"
                        }}
                      >
                        {/* 귀여운 우주 비행선 디자인의 풍선 SVG */}
                        <svg width="70" height="95" viewBox="0 0 70 95" style={{ overflow: "visible" }}>
                          <defs>
                            <filter id={`glow-${b.id}`} x="-20%" y="-20%" width="140%" height="140%">
                              <feGaussianBlur stdDeviation="5" result="blur" />
                              <feComposite in="SourceGraphic" in2="blur" operator="over" />
                            </filter>
                          </defs>
                          {/* 풍선 끈 */}
                          <path d="M35,68 Q37,82 33,95" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" fill="none" />
                          {/* 풍선 본체 */}
                          <ellipse cx="35" cy="38" rx="27" ry="30" fill={b.color} style={{ filter: `url(#glow-${b.id})` }} />
                          {/* 하이라이트 광원 효과 */}
                          <ellipse cx="25" cy="26" rx="8" ry="10" fill="rgba(255,255,255,0.45)" transform="rotate(-15 25 26)" />
                          {/* 매듭 */}
                          <polygon points="31,68 39,68 35,63" fill={b.color} />
                          {/* 풍선 내부 글자 */}
                          <text x="35" y="44" fill="white" fontSize="16" fontWeight="bold" textAnchor="middle" style={{ fontFamily: "monospace", textShadow: "1px 1px 3px rgba(0,0,0,0.8)" }}>
                            {b.value}
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
                <div style={{
                  width: "100%",
                  height: "220px",
                  background: "#050614",
                  border: "2px solid rgba(255, 0, 127, 0.2)",
                  borderRadius: "24px",
                  position: "relative",
                  overflow: "hidden"
                }}>
                  <div className="defense-runway" />

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

                  {muzzleFlash && (
                    <div style={{
                      position: "absolute",
                      left: "85px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      width: "55px",
                      height: "55px",
                      borderRadius: "50%",
                      background: "radial-gradient(circle, #ffffff 30%, var(--color-neon-cyan) 70%, transparent)",
                      boxShadow: "0 0 25px var(--color-neon-cyan), 0 0 45px #00f0ff",
                      zIndex: 10,
                      pointerEvents: "none"
                    }} />
                  )}

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

                  {blasts.map((b) => (
                    <div
                      key={b.id}
                      className="defense-blast"
                      style={{ "--blast-x": b.x }}
                    />
                  ))}

                  <div style={{
                    position: "absolute",
                    left: `${enemyX}%`,
                    top: "50%",
                    transform: "translate(-50%, -50%)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    transition: enemyHit 
                      ? "left 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275), filter 0.15s ease" 
                      : "left 0.04s linear",
                    filter: enemyHit ? "brightness(2.5) contrast(1.5) drop-shadow(0 0 15px #ff007f)" : "none",
                    opacity: enemyHit ? 0.85 : 1,
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

                <div style={{
                  background: "rgba(0,0,0,0.3)",
                  padding: "10px 20px",
                  borderRadius: "14px",
                  color: "#cbd5e1",
                  fontSize: "0.95rem"
                }}>
                  {defenseFeedback}
                </div>

                <div style={{ display: "grid", gridTemplateColumns: `repeat(${defenseOptions.length}, 1fr)`, gap: "20px", width: "100%", maxWidth: "520px" }}>
                  {defenseOptions.map((option) => (
                    <button
                      key={option.type}
                      disabled={projectiles.length > 0 || enemyHit}
                      onClick={() => handleDefenseShoot(option.type)}
                      className={`btn-cosmic ${option.className || "btn-cyan"}`}
                      style={{ padding: "16px", fontSize: "1.15rem", borderRadius: "18px" }}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* ===================== GAME 2-1: DODGE CODE ===================== */}
            {miniGame.type === "dodge-code" && (
              <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "20px", alignItems: "center" }}>
                <div style={{
                  background: "rgba(0, 240, 255, 0.08)",
                  border: "1.5px solid rgba(0, 240, 255, 0.35)",
                  borderRadius: "18px",
                  padding: "12px 24px",
                  textAlign: "center"
                }}>
                  <div style={{ fontSize: "0.85rem", color: "#a5b4fc", fontWeight: "bold" }}>다가오는 코드</div>
                  <strong style={{ fontSize: "1.55rem", color: "white", fontFamily: "monospace" }}>
                    {miniGame.obstacles[currentDodgeIdx].label}
                  </strong>
                </div>

                <div style={{
                  width: "100%",
                  height: "300px",
                  background: "#050614",
                  border: "2px solid rgba(0, 240, 255, 0.2)",
                  borderRadius: "24px",
                  position: "relative",
                  overflow: "hidden",
                  display: "grid",
                  gridTemplateColumns: `repeat(${miniGame.lanes.length}, 1fr)`
                }}>
                  {miniGame.lanes.map((lane, idx) => (
                    <div
                      key={lane}
                      style={{
                        borderLeft: idx === 0 ? "none" : "1px dashed rgba(255,255,255,0.12)",
                        background: idx === dodgeLane ? "rgba(0, 240, 255, 0.08)" : "transparent",
                        position: "relative"
                      }}
                    >
                      <div style={{
                        position: "absolute",
                        bottom: "10px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        color: idx === dodgeLane ? "#00f0ff" : "#94a3b8",
                        fontWeight: "900"
                      }}>
                        {lane}
                      </div>
                    </div>
                  ))}

                  <div style={{
                    position: "absolute",
                    left: `${((miniGame.obstacles[currentDodgeIdx].dangerLane + 0.5) / miniGame.lanes.length) * 100}%`,
                    top: `${obstacleY}%`,
                    transform: "translate(-50%, -50%)",
                    background: dodgeHit ? "#ef4444" : "linear-gradient(135deg, #ff007f, #bd00ff)",
                    border: "2px solid white",
                    borderRadius: "16px",
                    padding: "10px 14px",
                    color: "white",
                    fontFamily: "monospace",
                    fontWeight: "900",
                    boxShadow: "0 0 20px rgba(255, 0, 127, 0.45)",
                    maxWidth: "190px",
                    textAlign: "center",
                    transition: "top 0.055s linear"
                  }}>
                    {miniGame.obstacles[currentDodgeIdx].hazard || "코드 운석"}
                  </div>

                  <div style={{
                    position: "absolute",
                    left: `${((dodgeLane + 0.5) / miniGame.lanes.length) * 100}%`,
                    bottom: "44px",
                    transform: "translateX(-50%)",
                    fontSize: "3.2rem",
                    transition: "left 0.16s ease",
                    filter: dodgeHit ? "drop-shadow(0 0 14px #ef4444)" : "drop-shadow(0 0 12px #00f0ff)"
                  }}>
                    🛸
                  </div>
                </div>

                <div style={{
                  minHeight: "28px",
                  color: dodgeFeedback.includes("앗") ? "#ef4444" : "#10b981",
                  fontSize: "1.05rem",
                  fontWeight: "900"
                }}>
                  {dodgeFeedback || `${score} / ${miniGame.obstacles.length} 회피 성공`}
                </div>

                <div style={{ display: "grid", gridTemplateColumns: `repeat(${miniGame.lanes.length}, 1fr)`, gap: "12px", width: "100%", maxWidth: "520px" }}>
                  {miniGame.lanes.map((lane, idx) => (
                    <button
                      key={lane}
                      onClick={() => {
                        audioSynth.playBeep(620, 0.04);
                        setDodgeLane(idx);
                      }}
                      className={`btn-cosmic ${idx === dodgeLane ? "btn-cyan" : "btn-outline"}`}
                      style={{ padding: "14px", fontSize: "1.05rem", borderRadius: "16px", fontWeight: "900" }}
                    >
                      {lane}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* ===================== GAME 3: RHYTHM BEAT ===================== */}
            {miniGame.type === "rhythm-beat" && (
              <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "20px", alignItems: "center" }}>
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

                <div style={{
                  width: "100%",
                  height: "130px",
                  background: "#050614",
                  border: "2px solid var(--color-panel-border)",
                  borderRadius: "20px",
                  position: "relative",
                  overflow: "hidden"
                }}>
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

                  {hitPulse && <div className="judgment-hit-pulse" />}

                  {combo > 0 && comboActive && (
                    <div className="combo-text">
                      {combo} COMBO!
                    </div>
                  )}

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

                <div style={{
                  fontSize: "1.25rem",
                  fontWeight: "bold",
                  color: hitFeedback.includes("PERFECT") ? "#10b981" : "#ef4444",
                  minHeight: "28px"
                }}>
                  {hitFeedback}
                </div>

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
                  position: "relative",
                  overflow: "hidden"
                }}>
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

                  {laserBeamActive && (
                    <>
                      <div className="api-laser-line" />
                      {Array.from({ length: 18 }).map((_, i) => {
                        const randX = 15 + Math.random() * 65;
                        const randY = 35 + Math.random() * 30;
                        const dx = `${Math.random() * 50 - 25}px`;
                        const dy = `${Math.random() * 50 - 25}px`;
                        return (
                          <div
                            key={i}
                            className="neon-spark-particle"
                            style={{
                              position: "absolute",
                              left: `${randX}%`,
                              top: `${randY}%`,
                              width: `${3 + Math.random() * 4}px`,
                              height: `${3 + Math.random() * 4}px`,
                              background: Math.random() > 0.5 ? "var(--color-neon-cyan)" : "var(--color-neon-pink)",
                              borderRadius: "50%",
                              boxShadow: "0 0 8px currentColor",
                              animation: "spark-jump 0.5s ease-out infinite",
                              animationDelay: `${Math.random() * 0.4}s`,
                              "--dx": dx,
                              "--dy": dy
                            }}
                          />
                        );
                      })}
                    </>
                  )}

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
          /* 미니게임 성공 축하 화면 */
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

            {/* ===================== [새로 추가됨] 최종 기록 및 역대 최고 기록 표시판 ===================== */}
            {miniGame.type === "balloon-pop" && (
              <div className="glass-panel" style={{
                padding: "18px 36px",
                borderColor: isNewRecord ? "var(--color-neon-cyan)" : "rgba(255, 255, 255, 0.1)",
                background: "rgba(5, 6, 20, 0.75)",
                borderRadius: "20px",
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                alignItems: "center",
                boxShadow: isNewRecord ? "0 0 25px rgba(0, 240, 255, 0.3)" : "none",
                transform: isNewRecord ? "scale(1.05)" : "none",
                transition: "all 0.3s ease"
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <span style={{ fontSize: "1.1rem", color: "#cbd5e1" }}>⏱️ 지안이의 탈출 시간:</span>
                  <strong style={{ fontSize: "1.9rem", color: "var(--color-neon-cyan)", fontFamily: "monospace" }}>
                    {elapsedTime.toFixed(2)}초
                  </strong>
                </div>
                
                {isNewRecord ? (
                  <div style={{
                    background: "linear-gradient(90deg, #ff007f, #00f0ff)",
                    color: "white",
                    padding: "4px 16px",
                    borderRadius: "12px",
                    fontSize: "0.95rem",
                    fontWeight: "bold",
                    marginTop: "6px",
                    boxShadow: "0 0 10px rgba(0, 240, 255, 0.5)",
                    animation: "pulse-cyan 1.5s infinite"
                  }}>
                    🎉 최고 기록 경신! 대단해요 지안이! 🎉
                  </div>
                ) : (
                  bestRecord && (
                    <div style={{ fontSize: "0.9rem", color: "#94a3b8" }}>
                      🏆 개인 최고 기록: {bestRecord.toFixed(2)}초
                    </div>
                  )
                )}
              </div>
            )}

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
