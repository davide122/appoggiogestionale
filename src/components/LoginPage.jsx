import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Button,
  Spinner,
  ListGroup,
} from "react-bootstrap";
import MyHomePage from "./MyNav";
import Homepage from "./Homepage";

const LoginPage = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [responseText, setResponseText] = useState("");

  const handleUserNameChange = (event) => {
    setUserName(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const User = {
      username: username,
      password: password,
    };

    setLoading(true);

    try {
      const response = await fetch("http://localhost:8080/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(User),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setResponseText(data);
      } else {
        console.log("Error occurred with the request");
        alert("Username or password wrong!");
      }
    } catch (error) {
      console.log("Generic error occurred", error);
      alert(error);
    }

    setLoading(false);
  };

  return (
    <>
      {loading ? (
        
        <Row>
          <Col className="mx-auto mb-4">
            <Spinner animation="border" variant="primary" size="lg" />
          </Col>
        </Row>
      ) : responseText ? (
       
       <Homepage></Homepage>
      ) : (
        <Row>
          <Col xs={8} md={6} lg={5} xl={4} xxl={4} className="mb-4 login-box">
            <h1 className="my-3 text-white">Login Page</h1>
            <form>
              <div className="user-box">
                <input
                  type="text"
                  name=""
                  value={username}
                  onChange={handleUserNameChange}
                  required
                               />
                <label>Username</label>
              </div>
              <div className="user-box">
                <input
                  type="password"
                  name=""
                  value={password}
                  onChange={handlePasswordChange}
                  required
                />
                <label>Password</label>
              </div>
              <center>
                <a className="color-white" onClick={handleSubmit}>
                  LOGIN
                  <span></span>
                </a>
              </center>
            </form>
          </Col>
        </Row>
      )}
  </>
  );
};

export default LoginPage;
