import React, { useContext, useEffect, useState } from "react";
import { useTimer } from "use-timer";
import { GlobalContext } from "@/context/GlobalContext";

// ! if this is set request payment completion first, only then can you move onto the next payment (subject to change)
const Timer = () => {
  const { handleSetIsStarted } = useContext(GlobalContext);
  const initialTime =
    typeof localStorage !== "undefined"
      ? Number(localStorage.getItem("time")) || 0
      : 0;
  const [show, setShow] = useState(false);

  const { time, start, pause, reset, status } = useTimer({ initialTime });
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  useEffect(() => {
    if (typeof localStorage !== "undefined") {
      localStorage.setItem("time", time);
    }
  }, [time]);

  const handleReset = () => {
    // * used after transaction completion
    reset();
    if (typeof localStorage !== "undefined") {
      localStorage.removeItem("time");
      handleSetIsStarted(false);
    }
  };

  const formatTime = (timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;

    const formattedTime = [hours, minutes, seconds]
      .map((timeValue) => String(timeValue).padStart(2, "0"))
      .join(":");

    return formattedTime;
  };
  const handleStart = () => {
    localStorage.setItem("isStarted", true);
    handleSetIsStarted(true);
    start();
  };
  const handlePause = () => {
    localStorage.setItem("isStarted", false);
    handleSetIsStarted(false);
    pause();
  };

  return (
    <>
      <div className="flex space-x-2">
        <button onClick={handleStart}>Start</button>
        <button onClick={handlePause}>Pause</button>
        <button onClick={handleReset}>Reset</button>
      </div>
      {time !== 0 && mounted ? (
        <>Elapsed time: {formatTime(time)}</>
      ) : (
        <>Elapsed time:</>
      )}
      {/* {status === "RUNNING" && <p>Running...</p>} */}
    </>
  );
};

export default Timer;
