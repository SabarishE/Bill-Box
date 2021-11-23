import { useForm } from "react-hook-form";
import { useState } from "react";
import { Popup } from "../popup.js";

import ClipLoader from "react-spinners/ClipLoader";

import { UsernameBadge } from "./account.js";
import { UserAccountHeader } from "./account.js";

export function Newentry() {
  const Type = localStorage.getItem("type");

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
        <Form Type={Type} />
      </div>
    </>
  );
}

export function Form({ Type }) {
  const { register, handleSubmit } = useForm();

  const [Pop, setPop] = useState("none");
  const [Popmsg, setPopmsg] = useState("");
  const [Loading, setLoading] = useState(false);

  let token = localStorage.getItem("token");
  let email = localStorage.getItem("email");

  const handler = (v, e) => {
    console.log("new entry alert");
    setLoading(true);
    e.target.reset();

    function afteraddition(msg) {
      setPop("block");
      setLoading(false);
      setPopmsg(msg);
    }
    // -------fetch call for adding item into the box------

    fetch(
      `https://money-manager-sabarish.herokuapp.com/trackers/newentry/${email}`,
      {
        method: "PATCH",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          "x-auth-token": token
        },
        body: JSON.stringify(v)
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.newaddition) {
          afteraddition("Bill added !");
          console.log(data);
        } else {
          setPopmsg("Error in adding new item to the box");
          setLoading(false);
          console.log(data);
        }
      })
      .catch((err) => {
        setPopmsg("Error in adding new item to the box");
        setLoading(false);
      });
  };

  return (
    <>
      <div className="newentry">
        <form onSubmit={handleSubmit(handler)}>
          <ClipLoader color={"black"} loading={Loading} size={40} />
          <div>
            <label>
              Type<sup>*</sup>
            </label>
            <select {...register("type")} defaultValue={Type} required>
              <option value="Income">Income</option>
              <option value="Expense">Expense</option>
            </select>
          </div>

          <div>
            <label>
              Divison<sup>*</sup>
            </label>
            <select {...register("division")} defaultValue="" required>
              <option value="" disabled>
                -- select division --
              </option>
              <option value="Personal">Personal</option>
              <option value="Official">Official</option>
            </select>
          </div>

          <div>
            <label>
              Category<sup>*</sup>
            </label>
            <select {...register("category")} defaultValue="" required>
              <option value="" disabled>
                -- select category --
              </option>
              <option value="Rent">Rent</option>
              <option value="Electricity">Electricity</option>
              <option value="Taxations">Taxations</option>
              <option value="Internet">Internet</option>
              <option value="Food & Groceries">Food & Groceries</option>
              <option value="Travel">Travel</option>
              <option value="Shopping">Shopping</option>
              <option value="Entertainment">Entertaiment</option>
              <option value="Pay">Pay</option>
              <option value="Miscellaneous">Miscellaneous</option>
            </select>
          </div>

          <div>
            <label>
              Amount<sup>*</sup>
            </label>
            <input type="number" {...register("amount")} min="0" required />
          </div>

          <div>
            <label>
              Description<sup>*</sup> (not more than 25 charaters)
            </label>
            <textarea
              maxLength="30"
              {...register("description")}
              required
            ></textarea>
          </div>

          <div>
            <label>
              Date<sup>*</sup>
            </label>
            <input type="date" {...register("date")} required />
          </div>

          <input type="submit" value="ADD"></input>
        </form>
      </div>
      <Popup Pop={Pop} setPop={setPop} Popmsg={Popmsg} />
    </>
  );
}
