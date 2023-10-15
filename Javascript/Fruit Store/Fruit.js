import React, { useState } from "react";
import { Card } from "react-bootstrap";

const Fruit = ({ fruit, fruitsSelected, setFruitsSelected }) => {
  const [selectedFruit, setSelectedFruit] = useState(() => {
    let selected = false;

    for (let prevSelectedFruits of fruitsSelected) {
      if (prevSelectedFruits.fruit == fruit.fruit) {
        selected = true;
        break;
      }
    }

    return selected;
  });

  const toggleSelected = () => {
    setSelectedFruit((prevStatus) => {
      const newStatus = !prevStatus;
      if (newStatus) {
        setFruitsSelected((prevFruitsSelected) => {
          return [...prevFruitsSelected, fruit];
        });
      } else {
        setFruitsSelected((prevFruitsSelected) =>
          prevFruitsSelected.filter((prevFruit) => {
            return prevFruit.fruit !== fruit.fruit;
          })
        );
      }
      return newStatus;
    });
  };

  return (
    <Card
      className={`fruit-border ${selectedFruit && "fruit-blue-border"}`}
      onClick={toggleSelected}
    >
      <Card.Img src={fruit.url} className="mb-1 p-1"></Card.Img>
      <Card.Title className="fruit-size">{fruit.fruit}</Card.Title>
    </Card>
  );
};

export default Fruit;
