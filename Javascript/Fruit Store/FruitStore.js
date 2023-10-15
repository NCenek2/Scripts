import React, { useState } from "react";
import Header from "./Header";
import Fruits from "./Fruits";
import CheckoutItems from "./CheckoutItems";
import { Container } from "react-bootstrap";
import "./FruitStore.css";

const FruitStore = () => {
  const [inCheckout, setInCheckout] = useState(false);
  const [fruitsSelected, setFruitsSelected] = useState([]);

  return (
    <React.Fragment>
      <Header inCheckout={inCheckout} setInCheckout={setInCheckout} />
      {inCheckout ? (
        <Container>
          <CheckoutItems
            fruitsSelected={fruitsSelected}
            setFruitsSelected={setFruitsSelected}
          />
        </Container>
      ) : (
        <Fruits
          fruitsSelected={fruitsSelected}
          setFruitsSelected={setFruitsSelected}
        />
      )}
    </React.Fragment>
  );
};

export default FruitStore;
