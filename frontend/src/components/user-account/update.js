import { UsernameBadge } from "./account.js";
import { UserAccountHeader } from "./account.js";

import { useForm } from "react-hook-form";
import { useState } from "react";

import { Popup } from "../popup.js";

import ClipLoader from "react-spinners/ClipLoader";

export function Update(props) {
  const [entryId, setentryId] = useState("");

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

        <UpdateForm entryId={entryId} props={props} />
        <UpdateList setentryId={setentryId} Id={entryId} props={props} />
      </div>
    </>
  );
}

function UpdateForm({ entryId, props }) {
  const { register, handleSubmit } = useForm();
  const [Pop, setPop] = useState("none");
  const [Popmsg, setPopmsg] = useState("");
  const [Loading, setLoading] = useState(false);

  let token = localStorage.getItem("token");
  let email = localStorage.getItem("email");

  function afterupdate(msg) {
    setPop("block");
    setLoading(false);
    setPopmsg(msg);
    props.refresh();
  }

  const handler = (v, e) => {
    console.log("update alert", entryId);
    setLoading(true);
    e.target.reset();
    fetch(
      `https://money-manager-sabarish.herokuapp.com/trackers/edit/${email}/${entryId}`,
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
        if (data.newaddition) {
          afterupdate("Bill updated successfully!");
        } else {
          afterupdate("Error in adding new item to the box");
        }
      })
      .catch((err) => {
        afterupdate("Error in updating bill");
      });

    // --------fetch request for updating an entry in the box;
  };
  return (
    <>
      <div className="newentry updateentry">
        <div className="selected-id">
          <h4>ID selected for updation</h4>
          <input value={entryId} readOnly className="entryId" />
        </div>

        <form onSubmit={handleSubmit(handler)}>
          <ClipLoader color={"white"} loading={Loading} size={40} />
          <div>
            <label>
              Type<sup>*</sup>
            </label>
            <select {...register("type")} defaultValue={""} required>
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
              Description<sup>*</sup> (not more than 60 charaters)
            </label>
            <textarea
              maxLength="60"
              {...register("description")}
              required
            ></textarea>
          </div>

          <div>
            <label>Date</label>
            <input type="date" {...register("date")} />
          </div>

          <input type="submit" value="UPDATE"></input>
        </form>
      </div>
      <Popup Pop={Pop} setPop={setPop} Popmsg={Popmsg} />
    </>
  );
}

function UpdateList({ setentryId, Id, props }) {
  let token = localStorage.getItem("token");
  let email = localStorage.getItem("email");

  let box = props.data.user.box;

  const [Pop, setPop] = useState("none");
  const [Popmsg, setPopmsg] = useState("");
  const [Loading, setLoading] = useState(false);
  const [deleteflag, setdeleteflag] = useState(true);

  function afterdelete(msg) {
    setPop("block");
    setLoading(false);
    setPopmsg(msg);
    props.refresh();
  }

  function deletebill() {
    console.log("delete alert");
    setLoading(true);

    // -------fetch call to remove bill from the box----

    fetch(
      `https://money-manager-sabarish.herokuapp.com/trackers/delete/${email}/${Id}`,
      {
        method: "PATCH",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          "x-auth-token": token
        }
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.newaddition) {
          afterdelete("Bill removed from box");
        } else {
          afterdelete("Error in removing bill from the box");
        }
      })
      .catch((err) => {
        afterdelete("Error in removing bill from the box");
      });
  }

  return (
    <>
      {deleteflag === true ? (
        <div className="delete-block">
          <button
            onClick={() => {
              setdeleteflag(false);
            }}
          >
            X
          </button>
          <h3>ID selected for deletion</h3>
          <h4>{Id}</h4>
          <button onClick={deletebill} className="del">
            Delete
          </button>
          <div>
            <ClipLoader color={"white"} loading={Loading} size={35} />
          </div>
        </div>
      ) : (
        ""
      )}
      <div className="update-mapping">
        {box.map((v) => {
          return (
            <div className="update-mapping-item" key={v._id}>
              <span>{new Date(v.date).toDateString()}</span>
              <span>{v.type}</span>
              <span>{v.division}</span>
              <span>{v.category}</span>
              <span>$ {v.amount}</span>
              <span>
                <button
                  className="edit-btn"
                  value={v._id}
                  onClick={(e) => {
                    setentryId(e.target.value);
                    window.scrollTo(0, 80);
                  }}
                >
                  Update
                </button>
              </span>
              <span>
                <button
                  className="delete-btn"
                  value={v._id}
                  onClick={() => {
                    setentryId(v._id);
                    setdeleteflag(true);
                    window.scrollTo(0, 600);
                  }}
                >
                  Delete
                </button>
              </span>
              <span>
                <input type="text" value={v._id} readOnly />
              </span>
            </div>
          );
        })}
      </div>
      <Popup Pop={Pop} setPop={setPop} Popmsg={Popmsg} />
    </>
  );
}
