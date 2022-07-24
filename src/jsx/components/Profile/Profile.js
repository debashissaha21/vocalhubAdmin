import { Fragment, useState, useEffect } from "react";
import PageTitle from "../../layouts/PageTitle";
import axios from "axios";
import "react-toggle/style.css";
import { useSelector } from "react-redux";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const Profile = () => {
  const [users, setUsers] = useState({});
  const [userName, setUserName] = useState("");
  const [regemailId, setUserEmail] = useState("");
  const [regPassword, setUserPassword] = useState("");
  const { auth } = useSelector((state) => state.auth);
  useEffect(() => {
    getUsers();
    return () => {
      setUsers({});
    };
  }, []);
  const getUsers = async () => {
    await axios
      .get(`https://api.thevocalhub.com/api/v1/users/${auth.user.userId}`)
      .then((res) => {
        setUsers(res.data.user);
        setUserName(res.data.user[0].userName);
        setUserEmail(res.data.user[0].regemailId);
        setUserPassword(res.data.user[0].regPassword);
      })
      .catch((err) => {});
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      userName,
      regemailId,
      regPassword,
    };
    console.log(formData);
    axios
      .put(
        `https://api.thevocalhub.com/api/v1/users/${auth.user.userId}`,
        formData
      )
      .then((res) => {
        if (res.data.status === 200) {
          swal("Success", "Admin Profile Updated Successfully", "success");
        } else {
          swal("Oops", `${res.data.msg}`, "error");
        }
      })
      .catch((err) => {});
  };
  return (
    <Fragment>
      <PageTitle activeMenu="Profile" motherMenu="Profile" />
      {users && (
        <Form method="POST" onSubmit={handleSubmit}>
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

export default Profile;
