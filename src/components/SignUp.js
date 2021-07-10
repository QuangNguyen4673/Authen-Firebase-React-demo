import React, { useRef, useState } from "react";
import { Button, Card, Form, Alert } from "react-bootstrap";
import { useAuth } from "../AuthProvider";

const SignUp = () => {
  const userNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const [loading, setLoading] = useState(false);
  const { signup, currentUser } = useAuth();
  const [dumpBtn, setDumpBtn] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    await signup(
      userNameRef.current.value,
      emailRef.current.value,
      passwordRef.current.value
    );
    setLoading(false);
  };

  return (
    <>
      <button type="button" onClick={() => setDumpBtn(!dumpBtn)}>
        Click to re-render
      </button>
      <Card className="w-100 mx-auto mt-5" style={{ maxWidth: "400px" }}>
        <Card.Body>
          <h2 className="text-center mb-4">Sign up</h2>
          {currentUser.email}
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
        Already have an account? Log In
      </div>
    </>
  );
};

export default SignUp;
