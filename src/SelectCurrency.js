import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import DetailPage from "./DetailPage";

const listOfCurrency = [
  { id: 0, currency: "USD" },
  { id: 1, currency: "JPY" },
  { id: 2, currency: "EUR" },
  { id: 3, currency: "GBP" },
  { id: 4, currency: "GHS" },
  { id: 5, currency: "NGN" },
];

const SelectCurrency = () => {
  const [currencyList, setcurrencyList] = useState([]);
  const [currency, setcurrency] = useState("USD");
  const [prevTFHourChange, setPrevTFHourChange] = useState(0);

  useEffect(() => {
    //fetch currency list
    const getCurrency = () => {
      fetch(
        `https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=${currency}&api_key=28d03f2cefbdf93e453c34f10ef2f9418a980f627c95279e77fb15973ae59a21`
      )
        .then((res) => res.json())
        .then((data) => {
          setcurrencyList(data.Data);
          console.log("", data.Data);
        });
    };

    getCurrency();

    //make a api call for every 60 seconds
    setInterval(getCurrency, 60000);
  }, [currency]);

  // useEffect(() => {
  //   setInterval(function () {
  //     console.log("hello world printed");
  //   }, 60000);
  // });

  //calculate 24 hour change
  const calculatTwentyFourHourChange = (currentPrice, twentyFourHourChange) => {
    const percentage = Number(100);
    let cPrice = Number(currentPrice);
    let tFHChange = Number(twentyFourHourChange);
    let result = ((cPrice - tFHChange) / cPrice) * percentage;

    return `${result.toFixed(2)}%`;
  };

  const mylist = currencyList.map((s, id) => (
    // {/* for mobile screens */}
    // {/* <div className="table-header">
    //   <div className="header-cell">CRYPTOCURRENCY</div>
    //   <div className="header-cell">PRICE</div>
    //   <div className="header-cell">MARKET CAP</div>
    //   <div className="header-cell">24H CHANGE</div>
    // </div> */}
    <div key={s.CoinInfo.Id.toString()} className="rows">
      <Link
        to={{
          pathname: `/detail/${id}`,
          state: {
            detailId: `${id}`,
            data: currencyList[id],
            selectedCurency: currency,
          },
        }}
      >
        <div className="cell">
          {id}{" "}
          <img
            src={`https://www.cryptocompare.com/${s.CoinInfo.ImageUrl}`}
            alt=""
          />{" "}
          {s.CoinInfo.FullName}
        </div>
        <div className="cell">{s.DISPLAY[currency].PRICE}</div>
        <div className="cell">{s.DISPLAY[currency].MKTCAP}</div>
        <div className="cell">
          {calculatTwentyFourHourChange(
            s.RAW[currency].PRICE,
            s.RAW[currency].CHANGE24HOUR
          )}
        </div>
      </Link>
    </div>
  ));

  return (
    <>
      <div className="header">
        <h1 className="logo">VFCrypto</h1>
        <div className="select-currency">
          <form>
            <select
              onChange={(e) => {
                setcurrencyList([]);
                setcurrency(e.target.value);
              }}
            >
              {listOfCurrency.map((currency, id) => (
                <option value={currency.currency} key={id}>
                  {currency.currency}
                </option>
              ))}
            </select>
          </form>
        </div>
      </div>
      <div className="display-data data-details">
        <Switch>
          <Route path="/detail/:id" component={DetailPage} />
          <Route path="/">
            {/* this table header for desktops and tablets */}

            <div className="table-header">
              <div>CRYPTOCURRENCY</div>
              <div>PRICE</div>
              <div>MARKET CAP</div>
              <div>24H CHANGE</div>
            </div>
            <div className={`table-rows`}>{mylist}</div>
          </Route>
        </Switch>
      </div>
    </>
  );
};

export default SelectCurrency;
