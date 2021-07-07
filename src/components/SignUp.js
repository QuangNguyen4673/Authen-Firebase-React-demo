import React, { useEffect, useState } from "react";
import { Button, Card, Form, Alert } from "react-bootstrap";
import app, { auth } from "../firebase";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState({ text: "", variant: "" });
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    return () => console.log("cleanup");
  }, []);
  const handleSubmit = async () => {
    setLoading(true);
    await auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        let user = userCredential.user;
        if (user) {
          setMessage({
            text: "Your email has been registered successfully!",
            variant: "success",
          });
        }
      })
      .catch((error) => {
        setMessage({ text: error.message, variant: "danger" });
      });
    setLoading(false);
  };

  return (
    <>
      <Card className="w-100 mx-auto mt-5" style={{ maxWidth: "400px" }}>
        <Card.Body>
          <h2 className="text-center mb-4">Sign up</h2>
          {message.text && (
            <Alert variant={message.variant}>{message.text}</Alert>
          )}
          <Form>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Button
              disabled={loading}
              onClick={() => handleSubmit()}
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
