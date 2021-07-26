import React, { useState } from "react";
import "./styles.css";

const notes = [2000, 500, 200, 100, 50, 20, 10, 5, 2, 1];
let notesCount = Array(8).fill(null);

export default function App() {
  const [billAmt, setBillAmt] = useState("");
  const [cashGiven, setCashGiven] = useState("");
  const [errMsg, setErrMsg] = useState(" ");
  const [output, showOutput] = useState("");
  const [nextBtn, setNextBtn] = useState("");
  const [cssVariable, setCssVariable] = useState({ display: "none" });

  function calCash() {
    var diff = cashGiven - billAmt;
    for (let i = 0; i < 10; i++) {
      notesCount[i] = Math.floor(diff / notes[i]);
      diff = diff - notesCount[i] * notes[i];
      console.log(notes[i] + " " + notesCount[i]);
      if (notesCount[i] === 0) {
        notesCount[i] = null;
      }
    }
  }

  function nxtClickHandler() {
    if (Number.isInteger(billAmt) === false || billAmt <= 0) {
      setErrMsg("Please Enter Valid non-zero Amount");
    } else {
      setErrMsg(" ");
      setNextBtn("none");
      setCssVariable({
        display: "block"
      });
    }
  }

  function onClickCalculate() {
    if (Number.isInteger(billAmt) === false || billAmt < 0) {
      setErrMsg("Please Enter Valid non-zero Amount");
      showOutput();
    } else {
      setErrMsg(" ");
      if (Number.isInteger(cashGiven) === false || cashGiven < billAmt) {
        showOutput(<div className="error">Insufficent Cash !!</div>);
      } else {
        calCash();
        showOutput(
          <>
            {/* OUTPUT */}
            <div className="box">Balance Cash : ₹{cashGiven - billAmt}</div>
            <table>
              <tbody>
                <tr>
                  <th>No. of Notes</th>
                  {notesCount.map((note) => {
                    return <td>{note}</td>;
                  })}
                </tr>
                <tr>
                  <th>Note</th>
                  {notes.map((i) => {
                    return <td style={{ fontWeight: "bolder" }}>{i}</td>;
                  })}
                </tr>
              </tbody>
            </table>
          </>
        );
      }
    }
  }

  return (
    <div className="App">
      <div className="Container">
        <h1>Cash Register Manager</h1>
        <p>
          Enter "Bill Amount" and "Cash Given" to know the change to be returned
        </p>

        <h2>Bill Amount 🧾: </h2>

        <input
          type="Number"
          onChange={(event) => {
            var bill = Number(event.target.value);
            setBillAmt(bill);
          }}
        ></input>
        <br />
        <button style={{ display: `${nextBtn}` }} onClick={nxtClickHandler}>
          Next
        </button>
        <div className="error">{errMsg}</div>
        <div style={cssVariable}>
          <h2>Cash Given :</h2>

          <input
            type="Number"
            onChange={(event) => {
              var cash = Number(event.target.value);
              setCashGiven(cash);
            }}
          ></input>

          <br />

          <button onClick={onClickCalculate}>Calculate</button>

          <div>{output}</div>
        </div>
        <hr />
        <footer>
          <a class="link"href="https://github.com/rkapoor10/cash-manager" target="_blank">
            <img src="https://img.icons8.com/fluent/60/000000/github.png" />
          </a>
        </footer>
      </div>
    </div>
  );
}
