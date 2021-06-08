import React from "react";
import { useParams } from "react-router";

const DetailPage = ({ location }) => {
  const { data } = location.state;
  const { selectedCurency } = location.state;
  // const { VOLUME24HOURTO } = location.state.data.DISPLAY[selectedCurency];
  let { id } = useParams();

  // console.log("test ", VOLUME24HOURTO);

  return (
    <>
      {/* <h1>Detail Page {id}</h1> */}
      <div className="detail-container">
        <div className="rank">
          RANK <span className="circle">1</span>
        </div>
        <div className="box-container">
          <div className="detail-box">
            <div className="market-cap">
              <h5>MARKET CAP</h5>
              <h2>
                <span className="curency">
                  {data.DISPLAY[selectedCurency].TOSYMBOL}
                </span>
                {data.DISPLAY[selectedCurency].MKTCAP.slice(1)}
              </h2>
            </div>
            <div className="market-cap">
              <h5>24H VOLUME</h5>
              <h2>
                <span className="curency">
                  {data.DISPLAY[selectedCurency].TOSYMBOL}
                </span>
                {data.DISPLAY[selectedCurency].VOLUME24HOURTO.slice(1)}
              </h2>
            </div>
          </div>
          <div className="detail-box">
            <div className="market-cap">
              <h5>CIRCULATING SUPPLY</h5>
              <h2>
                8904545445454545<span className="btc">BTC</span>
              </h2>
            </div>
            <div className="market-cap">
              <h5>TOTAL SUPPLY</h5>
              <h2>
                8904545445454545<span className="btc">BTC</span>
              </h2>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailPage;
