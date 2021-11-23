import { Link } from "react-router-dom";
import { UsernameBadge } from "./user-account/account.js";

export function Homepage() {
  return (
    <>
      <About />
      <Classification />
      <Screenshots />
      <UsernameBadge />
    </>
  );
}

function About() {
  let background = {
    backgroundImage: `url(https://res.cloudinary.com/cloudyimg/image/upload/v1632826289/homebg_bj4cxx.gif)`
  };

  return (
    <>
      <div className="about" style={background}>
        <div className="heading">BILLBOX</div>
        <div className="tag">Your Personal Accoutant</div>
        <div className="moto">
          Track your Finance with Billbox. Book a box for free
          <Link to="/signup">
            <button>SIGN UP</button>
          </Link>
          <hr />
          <span>
            Open Your box
            <Link to="/login">
              <button>LOG IN</button>
            </Link>
          </span>
        </div>
      </div>
    </>
  );
}

function Classification() {
  const flowchart = require("../media/classification-flow.PNG").default;

  return (
    <>
      <div className="classification">
        <h2>CLASSIFICATION</h2>
        <div>
          <img src={flowchart} alt="flowchart" className="flowchart-img"></img>
          <div className="summary">
            <ul>
              <li>
                <img src={require("../media/income.png").default} alt="income"></img>
                <span>Income</span>
              </li>
              <li>
                <img
                  src={require("../media/expense.png").default}
                  alt="Expenditure"
                ></img>
                <span>Expenditure</span>
              </li>
              <br></br>

              <li>
                <img
                  src={require("../media/personal.png").default}
                  alt="personal"
                ></img>
                <span>Personal</span>
              </li>
              <li>
                <img
                  src={require("../media/official.png").default}
                  alt="official"
                ></img>
                <span>Official</span>
              </li>
              <br></br>
              <li>
                <img src={require("../media/rent.png").default} alt="Rent"></img>
                <span>Rent</span>
              </li>
              <li>
                <img
                  src={require("../media/electricity.png").default}
                  alt="Electricity"
                ></img>
                <span>Electricity</span>
              </li>
              <li>
                <img src={require("../media/tax.png").default} alt="Taxations"></img>
                <span>Taxations</span>
              </li>
              <li>
                <img
                  src={require("../media/internet.png").default}
                  alt="Internet"
                ></img>
                <span>Internet</span>
              </li>
              <li>
                <img src={require("../media/food.png").default} alt="Food"></img>
                <span>Food</span>
              </li>
              <li>
                <img src={require("../media/travel.png").default} alt="Travel"></img>
                <span>Travel</span>
              </li>
              <li>
                <img
                  src={require("../media/shopping.png").default}
                  alt="Shopping"
                ></img>
                <span>Shopping</span>
              </li>
              <li>
                <img
                  src={require("../media/entertainment.png").default}
                  alt="Entertainment"
                ></img>
                <span>Entertainment</span>
              </li>
              <li>
                <img
                  src={require("../media/misc.png").default}
                  alt="Miscellaneous"
                ></img>
                <span>Miscellaneous</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

// screen shots

function Screenshots() {
  return (
    <>
      <div className="screenshots">
        <h2>SCREENSHOTS</h2>

        <div className="flex-container">
          <img
            src={require("../media/screenshots/ss1.PNG").default}
            alt="screenshot1"
          ></img>
          <img
            src={require("../media/screenshots/ss2.PNG").default}
            alt="screenshot2"
          ></img>
          <img
            src={require("../media/screenshots/ss3.PNG").default}
            alt="screenshot3"
          ></img>
          <img
            src={require("../media/screenshots/ss4.PNG").default}
            alt="screenshot4"
          ></img>
        </div>
      </div>
    </>
  );
}
