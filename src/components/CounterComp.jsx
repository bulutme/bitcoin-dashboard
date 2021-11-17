import React, { Fragment, useEffect, useRef, useState } from "react";

export const CounterComp = () => {
  const [remaining, setRemaining] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const timer = useRef(null);
  const distance = useRef(null);

  useEffect(() => {
    setDate();
    counter();
  }, []);

  const targetDate = "Oct 25, 2022";
  const targetTime = "18:00:00";

  const increaseHour = () => {
    setRemaining({
      ...remaining,
      hours: remaining.hours + 1,
    });
  };
  const setDate = () => {
    const countDownDate = new Date(targetDate + " " + targetTime).getTime();
    const now = new Date().getTime();

    distance.current = countDownDate - now;

    // target date and time is less than current date and time
    if (distance.current < 0) {
      clearInterval(timer.current);
    } else {
      setRemaining({
        days: Math.floor(distance.current / (1000 * 60 * 60 * 24)),
        hours: Math.floor(
          (distance.current % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        ),
        minutes: Math.floor(
          (distance.current % (1000 * 60 * 60)) / (1000 * 60)
        ),
        seconds: Math.floor((distance.current % (1000 * 60)) / 1000),
      });
    }
  };

  const counter = () => {
    timer.current = setInterval(() => {
      setDate();
    }, 1000);
  };

  return (
    <Fragment>
      <div className="header-text">
        <h5 className="text">BITCOIN DASHBOARD</h5>
      </div>
      <button onClick={() => increaseHour()}>increase</button>
      {targetDate && targetTime ? (
        <div className="counter">
          {Object.entries(remaining).map((el, i) => (
            <div key={i} className="entry">
              <div key={el[1]} className="entry-value">
                <span className="count top curr flipTop">{el[1] + 1}</span>
                <span className="count top next">{el[1]}</span>
                <span className="count bottom next flipBottom">{el[1]}</span>
                <span className="count bottom curr">{el[1] + 1}</span>
              </div>
              <div className="entry-title">{el[0].toUpperCase()}</div>
            </div>
          ))}
        </div>
      ) : (
        <p className="alert-danger">Expired</p>
      )}
    </Fragment>
  );
};
