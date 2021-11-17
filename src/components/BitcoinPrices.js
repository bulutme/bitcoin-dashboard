import React, { useContext, useEffect, useRef, useState } from "react";
import { DataContext } from "../context/Context";
import { CaretUpOutlined } from "@ant-design/icons";
import { CaretDownOutlined } from "@ant-design/icons";

const BitcoinPrices = () => {
  const { data } = useContext(DataContext);
  const [color, setColor] = useState("white");

  function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  }

  const prevData = usePrevious(data);

  const isMounted = useRef(false);

  useEffect(() => {
    if (isMounted.current) {
      setColor("#dff000");
      setTimeout(() => {
        if (prevData?.bpi?.USD.rate < data?.bpi?.USD.rate) {
          setColor("#72f072");
        } else {
          setColor("red");
        }
      }, 500);
    }
    isMounted.current = true;
  }, [JSON.stringify(data)]);

  const style = {
    color,
    transition: `color 300ms ease-in-out`,
  };

  return (
    <>
      <div className="cards">
        <div
          className="header target-highlight"
          title={data?.bpi?.USD?.description}
        >
          <span className="header-left">
            <span>BTC</span> <strong>{data?.bpi?.USD.code}</strong>
          </span>
          <span style={style} className="right">
            {data?.bpi?.USD.rate}{" "}
            <span>
              {color === "#72f072" ? (
                <CaretUpOutlined />
              ) : (
                <CaretDownOutlined />
              )}
            </span>
          </span>
        </div>
        <div
          className="header target-highlight"
          title={data?.bpi?.EUR?.description}
        >
          <span className="header-left">
            <span>BTC</span> <strong>{data?.bpi?.EUR.code}</strong>
          </span>
          <span style={style} className="right">
            {data?.bpi?.EUR.rate}{" "}
            <span>
              {color === "#72f072" ? (
                <CaretUpOutlined />
              ) : (
                <CaretDownOutlined />
              )}
            </span>
          </span>
        </div>
        <div
          className="header target-highlight"
          title={data?.bpi?.GBP?.description}
        >
          <span className="header-left">
            <span>BTC</span> <strong>{data?.bpi?.GBP.code}</strong>
          </span>
          <span style={style} className="right">
            {data?.bpi?.GBP.rate}{" "}
            <span>
              {color === "#72f072" ? (
                <CaretUpOutlined />
              ) : (
                <CaretDownOutlined />
              )}
            </span>
          </span>
        </div>
      </div>
      <div className="bottom-update-time">{data?.time?.updated}</div>
    </>
  );
};
export default BitcoinPrices;
