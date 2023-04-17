import React, { useEffect, useState } from "react";
import { useTimer } from "use-timer";

// ! if this is set request payment completion first, only then can you move onto the next payment (subject to change)
const Timer = () => {
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

  return (
    <>
      <div className="flex space-x-2">
        <button onClick={start}>Start</button>
        <button onClick={pause}>Pause</button>
        {/* <button onClick={handleReset}>Reset</button> */}
      </div>
      {time !== 0 && mounted ? <>Elapsed time: {formatTime(time)}</> : <></>}
      {/* {status === "RUNNING" && <p>Running...</p>} */}
    </>
  );
};

export default Timer;
