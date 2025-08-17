import { useEffect, useRef, useState } from "react";

interface StateType {
  hour: number;
  minute: number;
  second: number;
}

const initialState: StateType = {
  hour: 0,
  minute: 0,
  second: 0,
};

const StopWatch = () => {
  const [time, setTime] = useState<StateType>(initialState);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const intervalId = useRef<number | undefined>(undefined);
  useEffect(() => {
    if (isRunning) {
      intervalId.current = setInterval(() => {
        setTime(prevTime => {
          let { hour, minute, second } = prevTime;

          if (second === 0) {
            if (minute === 0) {
              if (hour === 0) {
                return prevTime;
              } else {
                hour--;
                minute = 59;
                second = 59;
              }
            } else {
              minute--;
              second = 59;
            }
          } else {
            second--;
          }

          return { hour, minute, second };
        });
      }, 1000);

      return () => clearInterval(intervalId.current);
    }
  }, [isRunning]);

  const handleStart = () => {
    if (time.hour === 0 && time.minute === 0 && time.second) {
      return;
    }
    setIsRunning(prevState => !prevState);
  };

  const handleReset = () => {
    clearInterval(intervalId.current);
    setIsRunning(false);
    setTime(initialState);
  };

  const handleOnChange = (field: keyof StateType, value: number) => {
    const newTime = { ...time };
    newTime[field] = value;
    newTime.minute += Math.floor(newTime.second / 60);
    newTime.second = newTime.second % 60;
    newTime.hour += Math.floor(newTime.minute / 60);
    newTime.minute = newTime.minute % 60;
    setTime(newTime);
  };

  return (
    <div className="container">
      <div className="timer-container">
        <input
          type="text"
          onChange={e => handleOnChange("hour", +e.target.value)}
          value={time.hour}
          id="hour"
        />
        <span>:</span>
        <input
          type="text"
          onChange={e => handleOnChange("minute", +e.target.value)}
          value={time.minute}
          id="minute"
        />
        <span>:</span>
        <input
          type="text"
          onChange={e => handleOnChange("second", +e.target.value)}
          value={time.second}
          id="second"
        />
      </div>
      <div className="btns-container">
        <button onClick={handleStart}>{isRunning ? "Pause" : "Start"}</button>
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
};

export default StopWatch;
