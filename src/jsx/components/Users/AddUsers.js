import React, { Fragment } from "react";
import PageTitle from "../../layouts/PageTitle";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import axios from "axios";
import swal from "sweetalert";

const AddUsers = () => {
  const [userName, setUserName] = React.useState("");
  const [regemailId, setUserEmail] = React.useState("");
  const [regPassword, setUserPassword] = React.useState("");
  const [confirmPassword, setUserConfirmPassword] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const onSubmit = (e) => {
    e.preventDefault();
    let userData = {};
    setIsLoading(true);
    userData = {
      userName,
      regemailId,
      regPassword,
      confirmPassword,
      groupId: 3
    };
    if(isLoading){
        swal("Please wait", "Your request is being processed", "info");
    }
    axios
      .post("https://api.thevocalhub.com/api/v1/users/", userData)
      .then((res) => {
        if (res.data.status === 200) {
          setIsLoading(false);
          swal("Success", "User Added Successfully", "success");
        } else {
          setIsLoading(false);
          swal("Oops", `${res.data.msg}`, "error");
        }
      })
      .catch((err) => {});
     
  };
  return (
    <Fragment>
      <PageTitle activeMenu="Add Users" motherMenu="Users" />
      <Form method="POST" onSubmit={onSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>UserName</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            onChange={(e) => setUserName(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={(e) => setUserEmail(e.target.value)}
            required
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={(e) => setUserPassword(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            onChange={(e) => setUserConfirmPassword(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox"></Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Fragment>
  );
};

export default AddUsers;
