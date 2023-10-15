import React from "react";
import Fruit from "./Fruit";
import fruitsData from "./fruitStoreData";

const Fruits = ({ fruitsSelected, setFruitsSelected }) => {
  return (
    <section className="fruits-container">
      {fruitsData.map((fruit, index) => {
        return (
          <Fruit
            key={index}
            fruit={fruit}
            fruitsSelected={fruitsSelected}
            setFruitsSelected={setFruitsSelected}
          />
        );
      })}
    </section>
  );
};

export default Fruits;
