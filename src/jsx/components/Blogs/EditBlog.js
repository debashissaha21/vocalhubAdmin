import React, { Fragment, useEffect } from "react";
import PageTitle from "../../layouts/PageTitle";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import axios from "axios";
import swal from "sweetalert";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useParams } from "react-router-dom";

const EditBlog = () => {
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [featuredImage, setFeaturedImage] = React.useState(null);
  const [image, setImage] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const { id } = useParams();
  useEffect(() => {
    axios
      .get(`https://api.thevocalhub.com/api/v1/blogs/${id}`)
      .then((res) => {
        console.log(res);
        setDescription(res.data.data.description);
        setTitle(res.data.data.title);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const formData = new FormData();

  const onSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    console.log(featuredImage);
    if (featuredImage != null && image === null) {
      formData.append("title", title);
      formData.append("description", description);
      formData.append("ficharImage", featuredImage);
    } else if (featuredImage === null && image != null) {
      formData.append("title", title);
      formData.append("description", description);
      formData.append("enarImage", image);
    } else if (featuredImage != null && image != null) {
      formData.append("title", title);
      formData.append("description", description);
      formData.append("ficharImage", featuredImage);
      formData.append("enarImage", image);
    }
    let postData = {};
    postData = {
      title,
      description,
    };
    if (isLoading) {
      swal("Loading...", "Please wait", "info");
    }
    console.log(postData);
    if (featuredImage === null && image === null) {
      axios
        .put(`https://api.thevocalhub.com/api/v1/blogs/${id}`, postData)
        .then((res) => {
          if (res.data.status === 200) {
            setIsLoading(false);
            swal("Success", "Post Updated Successfully", "success");
          } else {
            setIsLoading(false);
            swal("Oops", `${res.data.msg}`, "error");
          }
        })
        .catch((err) => {});
    } else {
      axios
        .put(`https://api.thevocalhub.com/api/v1/blogs/${id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          if (res.data.status === 200) {
            setIsLoading(false);
            swal("Success", "Post Updated Successfully", "success");
          } else {
            setIsLoading(false);
            swal("Oops", `${res.data.msg}`, "error");
          }
        })
        .catch((err) => {});
    }
  };
  return (
    <Fragment>
      <PageTitle activeMenu="Edit Post" motherMenu="Blogs" />
      <Form method="POST" onSubmit={onSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Post title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter post title"
            onChange={(e) => setTitle(e.target.value)}
            defaultValue={title}
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

export default EditBlog;
