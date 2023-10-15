import React, { useState } from "react";
import { Row, Col, Button } from "react-bootstrap";

const CheckoutItem = ({ fruit, setFruitsSelected }) => {
  const increaseCount = () => {
    setFruitsSelected((prevFruitsSelect) =>
      prevFruitsSelect.map((prevFruit) => {
        if (prevFruit.fruit == fruit.fruit) {
          const newPrice = parseFloat((fruit.total + fruit.price).toFixed(2));
          return {
            ...prevFruit,
            amount: prevFruit.amount + 1,
            total: newPrice,
          };
        }
        return prevFruit;
      })
    );
  };
  const decreaseCount = () => {
    setFruitsSelected((prevFruitsSelect) =>
      prevFruitsSelect.map((prevFruit) => {
        const nextCount = prevFruit.amount - 1;
        if (prevFruit.fruit == fruit.fruit && nextCount >= 0) {
          const newPrice = parseFloat((fruit.total - fruit.price).toFixed(2));
          return {
            ...prevFruit,
            amount: prevFruit.amount - 1,
            total: newPrice,
          };
        }
        return prevFruit;
      })
    );
  };

  const removeItem = () => {
    setFruitsSelected((prevSelectedFruits) =>
      prevSelectedFruits.filter((prevFruit) => prevFruit.fruit !== fruit.fruit)
    );
  };

  return (
    <Row className="d-flex align-items-center text-center mb-1">
      <Col className="col-3 justify-self-start fruit-checkout-size">
        {fruit.fruit}
      </Col>
      <Col className="col-3 fruit-number">{fruit.total.toFixed(2)}</Col>
      <Col className="col-4">
        <Row className="d-flex align-items-center justify-content-center">
          <Col
            className="col-4 col-sm-2 col-lg-1 btn btn-primary btn-sm"
            onClick={increaseCount}
          >
            +
          </Col>
          <Col className="col-4 text-center fruit-number">
            {fruit.amount.toString()}
          </Col>
          <Col
            className="col-4 col-sm-2 col-lg-1 btn btn-primary btn-sm"
            onClick={decreaseCount}
          >
            -
          </Col>
        </Row>
      </Col>
      <Col className="col-2">
        <Button className="btn-danger btn-sm" onClick={removeItem}>
          X
        </Button>
      </Col>
    </Row>
  );
};

export default CheckoutItem;
