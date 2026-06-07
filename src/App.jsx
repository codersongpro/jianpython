import React, { useState, useEffect } from "react";
import StarfieldBackground from "./components/StarfieldBackground";
import Dashboard from "./components/Dashboard";
import Workspace from "./components/Workspace";
import MiniGameContainer from "./components/MiniGameContainer";
import { audioSynth } from "./utils/audioSynth";
import { lessons } from "./data/lessons";

export default function App() {
  const [view, setView] = useState("dashboard"); // dashboard | workspace | minigame
  const [selectedLessonId, setSelectedLessonId] = useState(null);

  // Persistence States (Local Storage)
  const [currentLesson, setCurrentLesson] = useState(1);
  const [completedLessons, setCompletedLessons] = useState([]);
  const [totalStars, setTotalStars] = useState(0);
  const [badges, setBadges] = useState([]);
  const [isMuted, setIsMuted] = useState(false);

  // Load progress on mount
  useEffect(() => {
    try {
      const savedCurrent = localStorage.getItem("jian_current_lesson");
      const savedCompleted = localStorage.getItem("jian_completed_lessons");
      const savedStars = localStorage.getItem("jian_stars");
      const savedBadges = localStorage.getItem("jian_badges");
      const savedMute = localStorage.getItem("jian_mute");

      if (savedCurrent) setCurrentLesson(parseInt(savedCurrent, 10));
      if (savedCompleted) setCompletedLessons(JSON.parse(savedCompleted));
      if (savedStars) setTotalStars(parseInt(savedStars, 10));
      if (savedBadges) setBadges(JSON.parse(savedBadges));
      if (savedMute) {
        const muteVal = savedMute === "true";
        setIsMuted(muteVal);
        audioSynth.setMuteState(muteVal);
      }
    } catch (err) {
      console.error("로컬 저장소 로딩 에러:", err);
    }
  }, []);

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
