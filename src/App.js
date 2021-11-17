import BitcoinPrices from "./components/BitcoinPrices";
import { GenericCounter } from "./components/Counter";
import { CounterComp } from "./components/CounterComp";
import ContextProvider from "./context/Context";

function App() {
  var date = new Date();
  date.setHours(date.getHours() + 10);

  return (
    <div className="App">
      <div className="header-text">
        <h5 className="text">BITCOIN DASHBOARD</h5>
      </div>
      <ContextProvider>
        {/* ilk yaptığımız counter iptal */}
        <div className="container">
          <GenericCounter date={date} type="hour" />
          <GenericCounter date={date} type="minute" />
          <GenericCounter date={date} type="second" />
        </div>
        <BitcoinPrices />
      </ContextProvider>
    </div>
  );
}

export default App;
