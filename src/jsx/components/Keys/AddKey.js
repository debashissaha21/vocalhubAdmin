import React, { Fragment } from "react";
import PageTitle from "../../layouts/PageTitle";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import axios from "axios";
import swal from "sweetalert";

const AddKeys = () => {
  const [keyName, setKeyName] = React.useState("");
  const onSubmit = (e) => {
    e.preventDefault();
    const formData = {
      keyName,
    };
    console.log(formData);
    axios
      .post("https://api.thevocalhub.com/api/v1/keys/", formData)
      .then((res) => {
        if (res.data.status === 200) {
          swal("Success", "Key Added Successfully", "success");
        } else {
          swal("Oops", `${res.data.msg}`, "error");
        }
      })
      .catch((err) => {});
  };
  return (
    <Fragment>
      <PageTitle activeMenu="Add Key" motherMenu="Keys" />
      <Form method="POST" onSubmit={onSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Key Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            onChange={(e) => setKeyName(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Fragment>
  );
};

export default AddKeys;
