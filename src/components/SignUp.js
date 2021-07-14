import React, { useRef, useState } from "react";
import { Button, Card, Form, Alert } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import * as faker from "faker/locale/en";

const SignUp = () => {
  const userNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();

  const [loading, setLoading] = useState(false);
  const [dumpBtn, setDumpBtn] = useState(false);
  const history = useHistory();
  const { signUp, currentUser } = useAuth();

  const handleClick = async () => {
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return;
    }
    setLoading(true);
    await signUp(
      userNameRef.current.value,
      emailRef.current.value,
      passwordRef.current.value
    );
    setLoading(false);
    history.push("/login");
  };

  const passwordAutoFill = () => {
    passwordRef.current.value = "123456";
    passwordConfirmRef.current.value = "123456";
  };
  const wholeFormAutoFill = () => {
    userNameRef.current.value = faker.name.findName();
    emailRef.current.value = faker.internet.email();
    passwordRef.current.value = "123456";
    passwordConfirmRef.current.value = "123456";
  };

  return (
    <>
      <button type="button" onClick={() => setDumpBtn(!dumpBtn)}>
        Click to re-render
      </button>
      <button type="button" onClick={passwordAutoFill}>
        Fill password
      </button>
      <button type="button" onClick={wholeFormAutoFill}>
        Fill all
      </button>
      <Card className="w-100 mx-auto mt-5" style={{ maxWidth: "400px" }}>
        <Card.Body>
          <h2 className="text-center mb-4">Sign up</h2>
          {currentUser && currentUser.email}
          <Form>
            <Form.Group id="username">
              <Form.Label>Your Name</Form.Label>
              <Form.Control type="text" ref={userNameRef} />
            </Form.Group>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} />
            </Form.Group>
            <Form.Group id="passwordConfirm">
              <Form.Label>Password Confirm</Form.Label>
              <Form.Control type="password" ref={passwordConfirmRef} />
            </Form.Group>
            <Button
              disabled={loading}
              onClick={handleClick}
              type="button"
              className="w-100 text-center mt-2"
            >
              Sign Up
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Already have an account? <Link to="/login">Log In</Link>
      </div>
    </>
  );
};

export default SignUp;
