import { useState } from "react";
import StarfieldBackground from "./components/StarfieldBackground";
import Dashboard from "./components/Dashboard";
import Workspace from "./components/Workspace";
import MiniGameContainer from "./components/MiniGameContainer";
import { audioSynth } from "./utils/audioSynth";
import { lessons } from "./data/lessons";
import { getNextLessonId } from "./data/curriculum";

const isLessonId = (id) => Number.isInteger(id) && id >= 1 && id <= lessons.length;

const readJsonArray = (key) => {
  try {
    const value = JSON.parse(localStorage.getItem(key) || "[]");
    return Array.isArray(value) ? value : [];
  } catch {
    return [];
  }
};

const readLessonIds = (key) => [...new Set(readJsonArray(key).filter(isLessonId))];

const readLastLesson = () => {
  try {
    const value = Number.parseInt(localStorage.getItem("jian_last_lesson") || "", 10);
    return isLessonId(value) ? value : null;
  } catch {
    return null;
  }
};

const safeSetItem = (key, value) => {
  try {
    localStorage.setItem(key, value);
  } catch (err) {
    console.error("로컬 저장소 저장 에러:", err);
  }
};

export default function App() {
  const [view, setView] = useState("dashboard"); // dashboard | workspace | minigame
  const [selectedLessonId, setSelectedLessonId] = useState(null);

  // 학습 기록 (브라우저 localStorage에 저장)
  // 모든 단계는 언제든 자유롭게 열 수 있고, 기록은 '어디까지 했는지' 보여주는 용도예요.
  const [completedLessons, setCompletedLessons] = useState(() => readLessonIds("jian_completed_lessons"));
  const [badges, setBadges] = useState(() => readLessonIds("jian_badges"));
  const [lastLessonId, setLastLessonId] = useState(readLastLesson);
  const [isMuted, setIsMuted] = useState(() => {
    const muteVal = localStorage.getItem("jian_mute") === "true";
    audioSynth.setMuteState(muteVal);
    return muteVal;
  });

  // 별 연료 = 코딩 미션 + 퀴즈를 끝낸 단계 수
  const totalStars = completedLessons.length;

  const openLesson = (lessonId) => {
    setSelectedLessonId(lessonId);
    setView("workspace");
    window.scrollTo(0, 0);
    if (isLessonId(lessonId)) {
      setLastLessonId(lessonId);
      safeSetItem("jian_last_lesson", String(lessonId));
    }
  };

  const goToDashboard = () => {
    setView("dashboard");
    setSelectedLessonId(null);
  };

  // 코딩 미션과 퀴즈를 모두 해결하면 바로 완료로 기록해요. (미니게임은 선택)
  const handleLessonSolved = (lessonId) => {
    if (!isLessonId(lessonId) || completedLessons.includes(lessonId)) return;
    const nextCompleted = [...completedLessons, lessonId];
    setCompletedLessons(nextCompleted);
    safeSetItem("jian_completed_lessons", JSON.stringify(nextCompleted));
    safeSetItem("jian_stars", String(nextCompleted.length));
  };

  const handlePlayGame = (lessonId) => {
    setSelectedLessonId(lessonId);
    setView("minigame");
    window.scrollTo(0, 0);
  };

  const handleCloseGame = (earnedBadge, goNext = false) => {
    const lessonId = selectedLessonId;
    if (earnedBadge && isLessonId(lessonId) && !badges.includes(lessonId)) {
      const nextBadges = [...badges, lessonId];
      setBadges(nextBadges);
      safeSetItem("jian_badges", JSON.stringify(nextBadges));
    }

    const nextLessonId = goNext ? getNextLessonId(lessonId) : null;
    if (nextLessonId) {
      openLesson(nextLessonId);
    } else {
      goToDashboard();
    }
  };

  const handleResetProgress = () => {
    setCompletedLessons([]);
    setBadges([]);
    setLastLessonId(null);
    try {
      ["jian_completed_lessons", "jian_badges", "jian_stars", "jian_last_lesson", "jian_current_lesson"].forEach((key) =>
        localStorage.removeItem(key)
      );
      Object.keys(localStorage)
        .filter((key) => key.startsWith("jian_code_") || key.startsWith("jianpython_lesson_"))
        .forEach((key) => localStorage.removeItem(key));
    } catch (err) {
      console.error("로컬 저장소 초기화 에러:", err);
    }
  };

  const handleToggleMute = () => {
    const nextMute = audioSynth.toggleMute();
    setIsMuted(nextMute);
    safeSetItem("jian_mute", nextMute.toString());
  };

  return (
    <>
      {/* Background stars */}
      <StarfieldBackground />

      {view === "dashboard" && (
        <Dashboard
          completedLessons={completedLessons}
          totalStars={totalStars}
          badges={badges}
          lastLessonId={lastLessonId}
          onStartLesson={openLesson}
          onPlayGame={handlePlayGame}
          isMuted={isMuted}
          onToggleMute={handleToggleMute}
          onResetProgress={handleResetProgress}
        />
      )}

      {view === "workspace" && (
        <Workspace
          lessonId={selectedLessonId}
          isCompleted={completedLessons.includes(selectedLessonId)}
          onBack={() => {
            audioSynth.playBeep(440, 0.08);
            goToDashboard();
          }}
          onOpenLesson={openLesson}
          onLessonSolved={handleLessonSolved}
          onPlayGame={handlePlayGame}
        />
      )}

      {view === "minigame" && (
        <MiniGameContainer
          lessonId={selectedLessonId}
          onClose={handleCloseGame}
        />
      )}
    </>
  );
}
