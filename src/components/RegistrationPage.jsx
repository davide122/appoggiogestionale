import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col} from "react-bootstrap";

const RegistrationPage = () => {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");

  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registrationCompleted, setRegistrationCompleted] = useState(false);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handleUserNameChange = (event) => {
    setUserName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newUser = {
      name: name,
      lastName: lastName,
      username: username,
      email: email,
      password: password,
    };

    try {
      const response = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newUser),
      });

      if (response.ok) {
        const data = await response;
        console.log(data);
        alert("Registered with success!");
        setName("");
        setEmail("");
        setPassword("");
        setUserName("");
        setLastName("");
        setRegistrationCompleted(true);
      } else {
        console.log("Error occurred with the request");
        alert("All rows are required!");
      }
    } catch (error) {
      console.log("Generic error occurred", error);
      alert(error);
    }
  };

  return (
    <Container className="py-5">
      <Row>
        <Col xs={8} md={6} lg={5} xl={4} xxl={3} className="mb-4 login-box">
          <h1 className="my-3 text-white">Registration Page</h1>
          <form>
            <div className="user-box">
              <input
                type="text"
                name=""
                value={name}
                onChange={handleNameChange}
                required
              />
              <label>Name</label>
            </div>
            <div className="user-box">
              <input
                type="text"
                name=""
                value={lastName}
                onChange={handleLastNameChange}
                required
              />
              <label>Lastname</label>
            </div>
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
                type="email"
                name=""
                value={email}
                onChange={handleEmailChange}
                required
              />
              <label>@Email</label>
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

            {/*  <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="name" required>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={handleNameChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="lastName" required>
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter last name"
                value={lastName}
                onChange={handleLastNameChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="userName" required>
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={handleUserNameChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="email" required>
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={handleEmailChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="password" required>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
              />
                </Form.Group>*/}
            {registrationCompleted ? (
              <Link to="/login-page" className="nav-link">
                <center>
                  <a className="text-white">
                    Go to login page
                    <span></span>
                  </a>
                </center>
              </Link>
            ) : (
              <center>
                <a className="text-white" onClick={handleSubmit}>
                  REGISTER
                  <span></span>
                </a>
              </center>
            )}
          </form>
          <Link to="/login-page" className="nav-link">
            <div className="text-secondary">Already registered? Login!</div>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default RegistrationPage;
