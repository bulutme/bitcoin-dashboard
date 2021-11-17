import { Button } from "antd";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { MinusOutlined } from "@ant-design/icons";

export const GenericCounter = ({ type, date: _date }) => {
  const [unit, setUnit] = useState(0);
  const [date, setDate] = useState(_date);

  const types = {
    hour: (time) => Math.floor((time / (1000 * 60 * 60)) % 24),
    minute: (time) => Math.floor((time / 1000 / 60) % 60),
    second: (time) => Math.floor((time / 1000) % 60),
  };

  const getTimeDifference = useCallback(
    (date) => {
      const time = Date.parse(date) - Date.parse(new Date());
      const newUnit = types[type](time);
      setUnit(newUnit);
    },
    [types, type]
  );

  const leadingZero = (num) => {
    return num < 10 && num > 0 ? "0" + num : num;
  };

  const timers = useRef([]);

  useEffect(() => {
    getTimeDifference(date);
    const id = setInterval(() => getTimeDifference(date), 1000);
    timers.current.push(id);

    return () => timers.current.map((i) => clearInterval(i));
  }, [date, getTimeDifference]);

  const increaseTime = () => {
    switch (type) {
      case "hour":
        const newDate = date.setHours(date.getHours() + 1);
        setDate(new Date(newDate));
        break;
      case "minute":
        const newDateMinute = date.setMinutes(date.getMinutes() + 1);
        setDate(new Date(newDateMinute));
        break;
      case "second":
        const newDateSecond = date.setSeconds(date.getSeconds() + 1);
        setDate(new Date(newDateSecond));
        break;
      default:
        break;
    }
  };

  const decreaseTime = () => {
    switch (type) {
      case "hour":
        const newDate = date.setHours(date.getHours() - 1);
        setDate(new Date(newDate));
        break;
      case "minute":
        const newDateMinute = date.setMinutes(date.getMinutes() - 1);
        setDate(new Date(newDateMinute));
        break;
      case "second":
        const newDateSecond = date.setSeconds(date.getSeconds() - 1);
        setDate(new Date(newDateSecond));
        break;
      default:
        break;
    }
  };

  return (
    <div className="container">
      <div className="buttons">
        <Button icon={<PlusOutlined />} onClick={increaseTime} />
        <Button icon={<MinusOutlined />} onClick={decreaseTime} />
      </div>
      <div className="indicators">
        <span className="counter-value">{leadingZero(unit)}</span>{" "}
        {unit === 1 ? (
          <span className="counter-types">{type}</span>
        ) : (
          <span className="counter-types">{type}s</span>
        )}
      </div>
      {/* <button onClick={decreaseTime} >-</button>  <button onClick={increaseTime}>+</button> */}
    </div>
  );
};
