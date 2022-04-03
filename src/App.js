import { useState, useEffect } from "react";

function App() {
  const [timerType, setTimerType] = useState(true);
  const [pomodoroCounter, setPomodoroCounter] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(25);
  const [active, setActive] = useState(false);

  const toggleTimerType = () => {
    setTimerType(!timerType);
    if (!timerType) {
      setMinutes(25);
      setSeconds(0);
    } else {
      setMinutes(5);
      setSeconds(0);
      if (pomodoroCounter < 4) {
        setPomodoroCounter(pomodoroCounter + 1);
      } else {
        setPomodoroCounter(0);
        setMinutes(10);
        seconds(0);
      }
    }
  };

  const toggleActive = () => {
    setActive(!active);
  };

  const reset = () => {
    setPomodoroCounter(0);
    setSeconds(0);
    if (timerType) {
      setMinutes(25);
    } else {
      setMinutes(5);
    }
    setActive(false);
  };

  useEffect(() => {
    let interval = null;
    if (active) {
      interval = setInterval(() => {
        if (minutes > 0) {
          setSeconds((seconds) => seconds - 1);
          if (seconds === 0) {
            setMinutes((minutes) => minutes - 1);
            setSeconds(59);
          }
        } else if (minutes === 0 && seconds > 0) {
          setSeconds((seconds) => seconds - 1);
        }
      }, 1000);
    } else if (!active && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  });

  return (
    <>
      <div className={timerType ? "red-background" : "blue-background"}>
        <h1 className="lg:text-6xl md:text-6xl text-4xl text-white text-center font-bold mb-4">
          POMODORO TIMER
        </h1>
        <div className="bg-white/20 flex flex-col justify-center items-center border-8 border-white/10 shadow-md rounded-full lg:w-120 lg:h-120 md:w-120 md:h-120 w-80 h-80">
          <h1 className="lg:text-8xl md:text-8xl text-6xl text-white/80 text-center font-bold my-6 py-2 px-4 rounded-md">
            {minutes < 10 ? `0${minutes}` : minutes}:
            {seconds < 10 ? `0${seconds}` : seconds}
          </h1>
          <div className="flex gap-2">
            <button
              className={active ? "white-button" : "start-button"}
              onClick={toggleActive}
            >
              {active ? "Pause" : "Start"}
            </button>
            <button className="white-button" onClick={reset}>
              Reset
            </button>
            <button
              className={timerType ? "break-button" : "pomodoro-button"}
              onClick={toggleTimerType}
            >
              {timerType ? "Break" : "Pomodoro"}
            </button>
          </div>
          <h1 className="text-2xl text-white text-center font-bold italic mt-4">{`#${pomodoroCounter}`}</h1>
        </div>
        <h1 className="text-2xl text-white text-center font-bold mt-4">
          {timerType
            ? "Focus time!"
            : pomodoroCounter === 0
            ? "Long break time!"
            : "Short break time!"}
        </h1>
      </div>
    </>
  );
}

export default App;
