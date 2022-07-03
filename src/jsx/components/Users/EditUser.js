import React, { Fragment, useEffect } from "react";
import PageTitle from "../../layouts/PageTitle";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import axios from "axios";
import swal from "sweetalert";
import { useParams } from "react-router-dom";

const EditUser = () => {
  const { id } = useParams();
  const [user, setUser] = React.useState({});
  const [userName, setUserName] = React.useState("");
  const [regemailId, setUserEmail] = React.useState("");
  const [regPassword, setUserPassword] = React.useState("");
  useEffect(() => {
    getUser();
    return () => {
      setUser({});
    };
  }, []);

  const getUser = async () => {
    await axios
      .get(`http://api.thevocalhub.com/api/v1/users/${id}`)
      .then((res) => {
        setUser(res.data.user);
        setUserName(res.data.user.userName);
        setUserEmail(res.data.user.regemailId);
        setUserPassword(res.data.user.regPassword);
      })
      .catch((err) => {});
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const formData = {
      userName,
      regemailId,
      regPassword,
    };
    console.log(formData);
    axios
      .put(`https://api.thevocalhub.com/api/v1/users/${id}`, formData)
      .then((res) => {
        if (res.data.status === 200) {
          swal("Success", "User Updated Successfully", "success");
        } else {
          swal("Oops", `${res.data.msg}`, "error");
        }
      })
      .catch((err) => {});
  };
  return (
    <Fragment>
      <PageTitle activeMenu="Edit Users" motherMenu="Users" />
      {user && (
        <Form method="POST" onSubmit={onSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>UserName</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              defaultValue={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              defaultValue={regemailId}
              onChange={(e) => setUserEmail(e.target.value)}
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
              defaultValue={regPassword}
              onChange={(e) => setUserPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group
            className="mb-3"
            controlId="formBasicCheckbox"
          ></Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      )}
    </Fragment>
  );
};

export default EditUser;
