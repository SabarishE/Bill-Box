import { useEffect } from "react";

import { UserAccountHeader } from "./account.js";
import { UsernameBadge } from "./account.js";

export function YourBox(props) {
  let box = props.data.user.box;

  useEffect(() => {
    props.refresh();
  }, [props]);

  return (
    <>
      <div
        className="account-page"
        style={{
          backgroundImage: `url(${require("../../media/bgi.png").default})`
        }}
      >
        <UserAccountHeader />
        <UsernameBadge />

        <div className="history">
          <Mapping data={box} />
        </div>
      </div>
    </>
  );
}

export function Mapping({ data }) {
  return (
    <>
      <div className="data-mapping">
        {data
          .sort((a, b) => {
            return new Date(b.date) - new Date(a.date);
          })
          .map((v, i) => {
            let d = new Date(v.date).toDateString().split(" ");
            let weekday = d[0];
            let month = d[1];
            let day = d[2];
            let year = d[3];

            return (
              <div className="card" key={v._id}>
                <div className="card-1">
                  <span className="month">{month}</span>
                  <span className="day">{day}</span>
                  <span className="weekday">{weekday}</span>
                  <span className="year">{year}</span>
                </div>
                <div className="card-2">
                  <div className="card-2-1">
                    <span>
                      {v.type === "Income" ? (
                        <>
                          <img
                            src={require("../../media/income.png").default}
                            alt="income"
                          ></img>
                          <span>Income</span>
                        </>
                      ) : (
                        <>
                          <img
                            src={require("../../media/expense.png").default}
                            alt="expense"
                          ></img>
                          <span>Expense</span>
                        </>
                      )}
                    </span>
                    <span>
                      {v.division === "Personal" ? (
                        <>
                          <img
                            src={require("../../media/personal.png").default}
                            alt=""
                          ></img>
                          <span>Personal</span>
                        </>
                      ) : (
                        <>
                          <img
                            src={require("../../media/official.png").default}
                            alt=""
                          ></img>
                          <span>Official</span>
                        </>
                      )}
                    </span>
                  </div>
                </div>
                <div className="card-3">
                  <div className="card-3-1">
                    {(() => {
                      switch (v.category) {
                        case "Rent":
                          return (
                            <img
                              src={require("../../media/rent.png").default}
                              alt=""
                            ></img>
                          );
                        case "Electricity":
                          return (
                            <img
                              src={require("../../media/electricity.png").default}
                              alt=""
                            ></img>
                          );
                        case "Taxations":
                          return (
                            <>
                              <img
                                src={require("../../media/tax.png").default}
                                alt=""
                              ></img>
                            </>
                          );
                        case "Internet":
                          return (
                            <>
                              <img
                                src={require("../../media/internet.png").default}
                                alt=""
                              ></img>
                            </>
                          );
                        case "Food & Groceries":
                          return (
                            <>
                              <img
                                src={require("../../media/food.png").default}
                                alt=""
                              ></img>
                            </>
                          );
                        case "Travel":
                          return (
                            <>
                              <img
                                src={require("../../media/travel.png").default}
                                alt=""
                              ></img>
                            </>
                          );
                        case "Shopping":
                          return (
                            <>
                              <img
                                src={require("../../media/shopping.png").default}
                                alt=""
                              ></img>
                            </>
                          );
                        case "Entertainment":
                          return (
                            <>
                              <img
                                src={require("../../media/entertainment.png").default}
                                alt=""
                              ></img>
                            </>
                          );
                        case "Pay":
                          return (
                            <>
                              <img
                                src={require("../../media/dollar.png").default}
                                alt=""
                              ></img>
                            </>
                          );
                        case "Miscellaneous":
                          return (
                            <>
                              <img
                                src={require("../../media/misc.png").default}
                                alt=""
                              ></img>
                            </>
                          );

                        default:
                          return (
                            <>
                              <img
                                src={require("../../media/misc.png").default}
                                alt=""
                              ></img>
                            </>
                          );
                      }
                    })()}
                  </div>
                  <div className="card-3-2">
                    <div className="card-3-2-1">{v.category}</div>
                    <div className="card-3-2-2">{v.description}</div>
                  </div>
                </div>
                <div className="card-4">
                  <span>$</span>
                  {v.amount}
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
}
