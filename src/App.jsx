import { useState } from "react";
import StarfieldBackground from "./components/StarfieldBackground";
import Dashboard from "./components/Dashboard";
import Workspace from "./components/Workspace";
import MiniGameContainer from "./components/MiniGameContainer";
import { audioSynth } from "./utils/audioSynth";
import { lessons } from "./data/lessons";

const readJsonArray = (key) => {
  try {
    const value = JSON.parse(localStorage.getItem(key) || "[]");
    return Array.isArray(value) ? value : [];
  } catch {
    return [];
  }
};

const readStoredNumber = (key, fallback, min, max) => {
  const value = Number.parseInt(localStorage.getItem(key) || "", 10);
  if (!Number.isFinite(value)) return fallback;
  return Math.min(Math.max(value, min), max);
};

export default function App() {
  const [view, setView] = useState("dashboard"); // dashboard | workspace | minigame
  const [selectedLessonId, setSelectedLessonId] = useState(null);

  // Persistence States (Local Storage)
  const [currentLesson, setCurrentLesson] = useState(() =>
    readStoredNumber("jian_current_lesson", 1, 1, lessons.length + 1)
  );
  const [completedLessons, setCompletedLessons] = useState(() =>
    readJsonArray("jian_completed_lessons").filter((id) => Number.isInteger(id) && id >= 1 && id <= lessons.length)
  );
  const [totalStars, setTotalStars] = useState(() =>
    readStoredNumber("jian_stars", 0, 0, lessons.length)
  );
  const [badges, setBadges] = useState(() =>
    readJsonArray("jian_badges").filter((id) => Number.isInteger(id) && id >= 1 && id <= lessons.length)
  );
  const [isMuted, setIsMuted] = useState(() => {
    const muteVal = localStorage.getItem("jian_mute") === "true";
    audioSynth.setMuteState(muteVal);
    return muteVal;
  });

  // Save progress changes
  const saveProgress = (updatedCurrent, updatedCompleted, updatedStars, updatedBadges) => {
    try {
      localStorage.setItem("jian_current_lesson", updatedCurrent.toString());
      localStorage.setItem("jian_completed_lessons", JSON.stringify(updatedCompleted));
      localStorage.setItem("jian_stars", updatedStars.toString());
      localStorage.setItem("jian_badges", JSON.stringify(updatedBadges));
    } catch (err) {
      console.error("로컬 저장소 저장 에러:", err);
    }
  };

  const handleStartLesson = (lessonId) => {
    setSelectedLessonId(lessonId);
    setView("workspace");
  };

  const handleCompleteLesson = (lessonId) => {
    const isNewCompletion = !completedLessons.includes(lessonId);
    let nextCompleted = [...completedLessons];
    let nextStars = totalStars;

    if (isNewCompletion) {
      nextCompleted.push(lessonId);
      nextStars += 1;
      setCompletedLessons(nextCompleted);
      setTotalStars(nextStars);
    }

    saveProgress(currentLesson, nextCompleted, nextStars, badges);
    setView("minigame"); // Go directly to mini game
  };

  const handleCloseGame = (earnedBadge) => {
    let nextBadges = [...badges];
    let nextCurrent = currentLesson;
    let nextCompleted = [...completedLessons];
    let nextStars = totalStars;

    if (earnedBadge && selectedLessonId) {
      if (!nextCompleted.includes(selectedLessonId)) {
        nextCompleted.push(selectedLessonId);
        nextStars += 1;
        setCompletedLessons(nextCompleted);
        setTotalStars(nextStars);
      }

      // Award badge if not already unlocked
      if (!nextBadges.includes(selectedLessonId)) {
        nextBadges.push(selectedLessonId);
        setBadges(nextBadges);
      }

      // If they finished the highest unlocked lesson, unlock the next one!
      if (selectedLessonId === currentLesson) {
        nextCurrent = Math.min(currentLesson + 1, lessons.length + 1);
        setCurrentLesson(nextCurrent);
      }
    }

    saveProgress(nextCurrent, nextCompleted, nextStars, nextBadges);
    setView("dashboard");
    setSelectedLessonId(null);
  };

  const handleResetProgress = () => {
    setCurrentLesson(1);
    setCompletedLessons([]);
    setTotalStars(0);
    setBadges([]);
    saveProgress(1, [], 0, []);
  };

  const handleToggleMute = () => {
    const nextMute = audioSynth.toggleMute();
    setIsMuted(nextMute);
    localStorage.setItem("jian_mute", nextMute.toString());
  };

  return (
    <>
      {/* Background stars */}
      <StarfieldBackground />

      {/* Main Views Routing */}
      {view === "dashboard" && (
        <Dashboard
          currentLesson={currentLesson}
          completedLessons={completedLessons}
          totalStars={totalStars}
          badges={badges}
          onStartLesson={handleStartLesson}
          isMuted={isMuted}
          onToggleMute={handleToggleMute}
          onResetProgress={handleResetProgress}
        />
      )}

      {view === "workspace" && (
        <Workspace
          lessonId={selectedLessonId}
          onBack={() => {
            audioSynth.playBeep(440, 0.08);
            setView("dashboard");
            setSelectedLessonId(null);
          }}
          onCompleteLesson={handleCompleteLesson}
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
