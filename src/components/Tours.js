import React, { useState } from "react";
import toursData from "../Data/toursData";

const Tours = () => {
  const [isBtnClick, setIsBtnClick] = useState(false);
  const [dataArr, setDataArr] = useState(toursData);
  const [buttons, setButtons] = useState(toursData.map(() => 0));
  const [texts, setTexts] = useState(
    toursData.map((data) => setInfo(data.info))
  );

  function setInfo(str, qty = 0) {
    if (qty === 200) return str;

    let newStr = "";
    for (let i = 0; i < 200; i++) newStr += str[i];
    return newStr;
  }

  function handle(info, index, qty) {
    const newButtons = [...buttons];
    newButtons[index] = qty;
    setButtons(newButtons);
    texts[index] = setInfo(info, qty);
  }

  function handleDelete(idx) {
    setDataArr(dataArr.filter((item, index) => idx !== index));
    setButtons(buttons.filter((item, index) => index !== idx));
    setTexts(texts.filter((item, index) => index !== idx));
  }

  return (
    <div>
      {isBtnClick ? (
        ""
      ) : (
        <button onClick={() => setIsBtnClick(true)}> Show All Tours </button>
      )}
      <div className="tours">
        {isBtnClick &&
          (dataArr.length !== 0 ? (
            dataArr.map((data, index) => (
              <div className="single-tour">
                <img src={data.image} alt="Image" />
                <p> Id: {data.id} </p>
                <p> Name: {data.name} </p>
                <p className="tour-price"> Price: {data.price} </p>
                <p className="tour-info"> Info: {texts[index]} </p>
                {buttons[index] === 0 ? (
                  <button onClick={() => handle(data.info, index, 200)}>
                    {" "}
                    Show More{" "}
                  </button>
                ) : (
                  <button onClick={() => handle(data.info, index, 0)}>
                    {" "}
                    See Less{" "}
                  </button>
                )}
                <button
                  className="delete-btn"
                  cl
                  onClick={() => handleDelete(index)}
                >
                  {" "}
                  Delete{" "}
                </button>
              </div>
            ))
          ) : (
            <div className="empty-data">
              <h2> No More Tours </h2>
              <button className="btn" onClick={() => window.location.reload()}>
                {" "}
                Refresh{" "}
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Tours;
