import React, { useRef } from "react";
import CheckoutItem from "./CheckoutItem";
import { Form, Button, Row, Col } from "react-bootstrap";

const CheckoutItems = ({ fruitsSelected, setFruitsSelected }) => {
  const emailRef = useRef();

  const total = fruitsSelected
    .map((fruit) => fruit.total)
    .reduce((price, adder) => price + adder, 0)
    .toFixed(2);

  const handleSubmit = (e) => {
    const email = emailRef.current.value;
    const totalPrice = parseFloat(total);
    const isEmail = /.+@.+\..+/.test(email);
    if (!email || totalPrice <= 0.0 || !isEmail) {
      e.preventDefault();
    } else {
      alert(
        `Thank you for your order!\nWe will send receipt of $${total} to ${email}.`
      );
    }
  };

  return (
    <React.Fragment>
      {fruitsSelected.map((fruit, index) => (
        <CheckoutItem
          key={index}
          fruit={fruit}
          setFruitsSelected={setFruitsSelected}
        />
      ))}
      <Row className="d-flex align-items-center text-center mb-1">
        <Col className="col-3 justify-self-start fruit-checkout-size">
          Total
        </Col>
        <Col className="col-3 fruit-number">{total}</Col>
      </Row>
      <Form className="mt-5 fruits-email" onClick={handleSubmit}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="name@example.com"
            ref={emailRef}
          />
        </Form.Group>
        <Button type="submit" variant="dark">
          Buy Items
        </Button>
      </Form>
    </React.Fragment>
  );
};

export default CheckoutItems;
