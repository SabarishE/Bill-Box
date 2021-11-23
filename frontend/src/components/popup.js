import { createContext } from "react";
export const popctx = createContext();

export function Popup({ Pop, setPop, Popmsg }) {
  return (
    <>
      <div className="popup-card" style={{ display: Pop }}>
        <button onClick={() => setPop("none")}>X</button>
        <p>{Popmsg}</p>
      </div>
    </>
  );
}
