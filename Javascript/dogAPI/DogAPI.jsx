import React from "react";
import "./DogAPI.css";

const DogAPI = () => {
  const [list, setList] = React.useState([]);
  const [apiTiming, setApiTiming] = React.useState(false);
  const [startSelect, setStartSelect] = React.useState(false);
  const [finishSelect, setFinishSelect] = React.useState(false);
  const [leftList, setLeftList] = React.useState([]);

  const updatingUrlList = async () => {
    const response = await fetch("https://dog.ceo/api/breeds/image/random");
    const data = await response.json();
    setList((prevList) => [...prevList, data]);
  };

  React.useEffect(() => {
    for (let i = 0; i < 6; i++) {
      updatingUrlList();
    }
    setApiTiming(true);
    return undefined;
  }, []);

  const handleStart = () => {
    setList((prevList) =>
      prevList.map((item, index) => {
        return { ...item, id: index, border: false };
      })
    );
    setStartSelect(true);
  };

  const handleClick = (event) => {
    const { id } = event.target;
    setList((prevList) =>
      prevList.map((item) => {
        if (item.id == id) {
          return { ...item, border: !item.border };
        }
        return { ...item };
      })
    );
  };
  const handleFinish = () => {
    setFinishSelect(true);
    setLeftList(list.filter((item) => item.border === true));
  };
  const handleBack = () => {
    setFinishSelect(false);
  };

  return (
    <div className="dog-app">
      <main className="dog-api-container">
        <h2 className="dog-api-title">
          {startSelect && !finishSelect && "List of Dogs"}
          {leftList.length == 1 && finishSelect
            ? "Selected Dog"
            : leftList.length > 1 && finishSelect
            ? "Selected Dogs"
            : leftList.length < 1 && finishSelect
            ? "No Dogs Selected"
            : null}
        </h2>
        {startSelect && (
          <section className="starting-dogs-container">
            {startSelect &&
              !finishSelect &&
              list.map((item) => (
                <article
                  key={item.id}
                  id={item.id}
                  onClick={(event) => handleClick(event)}
                  className={`starting-image-container ${
                    item.border && "show-border"
                  }`}
                >
                  <img
                    src={`${item.message}`}
                    alt=""
                    className="starting-image"
                  ></img>
                </article>
              ))}
          </section>
        )}

        {apiTiming && !startSelect && (
          <button
            onClick={() => handleStart()}
            className="btn btn-dark dog-btn"
          >
            Start
          </button>
        )}
        {startSelect && !finishSelect && (
          <button
            onClick={() => handleFinish()}
            className="btn btn-dark dog-btn"
          >
            Finished
          </button>
        )}
        {finishSelect && leftList.length < 1 && (
          <button onClick={() => handleBack()} className="btn btn-dark dog-btn">
            Back
          </button>
        )}

        {finishSelect && (
          <section className="left-container">
            {leftList.map((item) => (
              <article
                className={`finishing-image-container 
                ${
                  leftList.length === 1
                    ? "one-card"
                    : leftList.length === 2
                    ? "two-cards"
                    : leftList.length === 3
                    ? "three-cards"
                    : leftList.length === 4
                    ? "four-cards"
                    : leftList.length === 5
                    ? "five-cards"
                    : "all-cards"
                } 
                `}
              >
                <img
                  key={item.id}
                  id={item.id}
                  src={`${item.message}`}
                  className="finishing-image"
                ></img>
              </article>
            ))}
          </section>
        )}
      </main>
    </div>
  );
};

export default DogAPI;
