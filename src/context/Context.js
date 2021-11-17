import { createContext, useEffect, useState } from "react";

export const DataContext = createContext();

const ContextProvider = (props) => {
  const [data, setData] = useState(null);
  const fetchData = () => {
    fetch("https://api.coindesk.com/v1/bpi/currentprice.json")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchData();
    try {
      setInterval(() => {
        fetchData();
      }, 5000);
    } catch (error) {
      console.log(error);
    }
  }, []);

  console.log(data);

  return (
    <DataContext.Provider value={{ data }}>
      {props.children}
    </DataContext.Provider>
  );
};

export default ContextProvider;
