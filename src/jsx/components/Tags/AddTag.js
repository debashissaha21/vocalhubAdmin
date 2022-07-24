import React, { Fragment } from "react";
import PageTitle from "../../layouts/PageTitle";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import axios from "axios";
import swal from "sweetalert";

const AddTag = () => {
  const [tagName, setTagName] = React.useState("");
  const onSubmit = (e) => {
    e.preventDefault();
    const formData = {
      tagName,
    };
    console.log(formData);
    axios
      .post("https://api.thevocalhub.com/api/v1/tags/", formData)
      .then((res) => {
        if (res.data.status === 200) {
          swal("Success", "Tag Added Successfully", "success");
        } else {
          swal("Oops", `${res.data.msg}`, "error");
        }
      })
      .catch((err) => {});
  };
  return (
    <Fragment>
      <PageTitle activeMenu="Add Tag" motherMenu="Tags" />
      <Form method="POST" onSubmit={onSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Tag Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            onChange={(e) => setTagName(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Fragment>
  );
};

export default AddTag;
