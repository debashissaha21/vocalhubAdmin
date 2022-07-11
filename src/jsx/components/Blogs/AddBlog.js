import React, { Fragment, useState } from "react";
import PageTitle from "../../layouts/PageTitle";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import axios from "axios";
import swal from "sweetalert";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const AddBlog = () => {
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [featuredImage, setFeaturedImage] = React.useState("");
  const [image, setImage] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  console.log(description);
  const onSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("ficharImage", featuredImage);
    formData.append("enarImage", image);
    console.log(formData);
    if (isLoading) {
      swal("Loading...", "Please wait", "info");
    }
    axios
      .post("https://api.thevocalhub.com/api/v1/blogs/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (res.data.status === 200) {
          setIsLoading(false);
          swal("Success", "Post Added Successfully", "success");
        } else {
          setIsLoading(false);
          swal("Oops", `${res.data.msg}`, "error");
        }
      })
      .catch((err) => {});
  };
  return (
    <Fragment>
      <PageTitle activeMenu="Add Post" motherMenu="Blogs" />
      <Form method="POST" onSubmit={onSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Post title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter post title"
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Post description</Form.Label>
          <ReactQuill
            theme="snow"
            value={description}
            onChange={setDescription}
            style={{ minHeight: "300px" }}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Post featuredImage</Form.Label>
          <Form.Control
            type="file"
            className="form-control"
            onChange={(e) => setFeaturedImage(e.target.files[0])}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Post Image</Form.Label>
          <Form.Control
            type="file"
            className="form-control"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Fragment>
  );
};

export default AddBlog;
