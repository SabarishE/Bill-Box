import { useState } from "react";
import { useForm } from "react-hook-form";
import { Mapping } from "./history.js";

import { UserAccountHeader } from "./account.js";
import { UsernameBadge } from "./account.js";
export function Filters(props) {
  let [Filter, setFilter] = useState(1);
  let [Filterdata, setFilterdata] = useState([]);
  let data = props.data.user.box;

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
        <div className="filter">
          <div className="filter-options">
            <button onClick={() => setFilter(1)}>year</button>
            <button onClick={() => setFilter(2)}>month</button>
            <button onClick={() => setFilter(3)}>between two dates</button>
            <button onClick={() => setFilter(4)}>type</button>
            <button onClick={() => setFilter(5)}>division</button>
            <button onClick={() => setFilter(6)}>category</button>
          </div>
          <div className="filter-form">
            {(() => {
              switch (Filter) {
                case 1:
                  return <Filter1 box={data} setFilterdata={setFilterdata} />;
                case 2:
                  return <Filter2 box={data} setFilterdata={setFilterdata} />;
                case 3:
                  return <Filter3 box={data} setFilterdata={setFilterdata} />;
                case 4:
                  return <Filter4 box={data} setFilterdata={setFilterdata} />;
                case 5:
                  return <Filter5 box={data} setFilterdata={setFilterdata} />;
                case 6:
                  return <Filter6 box={data} setFilterdata={setFilterdata} />;

                default:
                  return <Filter1 box={data} setFilterdata={setFilterdata} />;
              }
            })()}
          </div>
        </div>
        <FilteredData data={Filterdata} />
      </div>
    </>
  );
}

function Filter1({ box, setFilterdata }) {
  const { register, handleSubmit } = useForm();
  const handler = (v, e) => {
    setFilterdata([
      ...box.filter((b) => +v.year === new Date(b.date).getFullYear())
    ]);
  };

  return (
    <>
      <form onSubmit={handleSubmit(handler)} className="filter-form-flex">
        <label>Enter Year</label>
        <input
          type="number"
          min="1900"
          max="2099"
          step="1"
          {...register("year")}
          required
        />
        <input type="submit" value="Filter" />
      </form>
    </>
  );
}
function Filter2({ box, setFilterdata }) {
  const { register, handleSubmit } = useForm();
  const handler = (v, e) => {
    setFilterdata([
      ...box.filter(
        (b) =>
          +v.year === new Date(b.date).getFullYear() &&
          +v.month - 1 === new Date(b.date).getMonth()
      )
    ]);
  };
  return (
    <>
      <form onSubmit={handleSubmit(handler)} className="filter-form-flex">
        <label>Enter Month</label>
        <input
          type="number"
          min="0"
          max="11"
          step="1"
          {...register("month")}
          required
        />
        <label>Enter Year</label>
        <input
          type="number"
          min="1900"
          max="2099"
          step="1"
          {...register("year")}
          required
        />
        <input type="submit" value="Filter" />
      </form>
    </>
  );
}
function Filter3({ box, setFilterdata }) {
  const { register, handleSubmit } = useForm();
  const handler = (v, e) => {
    setFilterdata([
      ...box.filter(
        (b) =>
          new Date(b.date) > new Date(v.from) &&
          new Date(b.date) < new Date(v.to)
      )
    ]);
  };
  return (
    <>
      <form onSubmit={handleSubmit(handler)} className="filter-form-flex">
        <label>from</label>
        <input type="date" {...register("from")} required />
        <label>to</label>
        <input type="date" {...register("to")} required />
        <input type="submit" value="Filter" />
      </form>
    </>
  );
}
function Filter4({ box, setFilterdata }) {
  const { register, handleSubmit } = useForm();
  const handler = (v, e) => {
    setFilterdata([...box.filter((b) => b.type === v.type)]);
  };
  return (
    <>
      <form onSubmit={handleSubmit(handler)} className="filter-form-flex">
        <label>Enter Type</label>
        <select {...register("type")} defaultValue="" required>
          <option value="" disabled>
            -- select division --
          </option>
          <option value="Income">Income</option>
          <option value="Expense">Expense</option>
        </select>
        <input type="submit" value="Filter" />
      </form>
    </>
  );
}
function Filter5({ box, setFilterdata }) {
  const { register, handleSubmit } = useForm();
  const handler = (v, e) => {
    setFilterdata([...box.filter((b) => b.division === v.division)]);
  };
  return (
    <>
      <form onSubmit={handleSubmit(handler)} className="filter-form-flex">
        <label>Enter Division</label>
        <select {...register("division")} defaultValue="" required>
          <option value="" disabled>
            -- select division --
          </option>
          <option value="Personal">Personal</option>
          <option value="Official">Official</option>
        </select>
        <input type="submit" value="Filter" />
      </form>
    </>
  );
}
function Filter6({ box, setFilterdata }) {
  const { register, handleSubmit } = useForm();
  const handler = (v, e) => {
    setFilterdata([...box.filter((b) => b.category === v.category)]);
  };
  return (
    <>
      <form onSubmit={handleSubmit(handler)} className="filter-form-flex">
        <label>Enter Category</label>
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
          <option value="Entertaiment">Entertaiment</option>
          <option value="Pay">Pay</option>
          <option value="Miscellaneous">Miscellaneous</option>
        </select>
        <input type="submit" value="Filter" />
      </form>
    </>
  );
}

function FilteredData({ data }) {
  return (
    <>
      <div className="filtered-data">
        <Mapping data={data} />
      </div>
    </>
  );
}
