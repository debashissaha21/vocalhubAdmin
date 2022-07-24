import React, { Fragment, useEffect } from "react";
import PageTitle from "../../layouts/PageTitle";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import axios from "axios";
import swal from "sweetalert";
import { useParams } from "react-router-dom";

const EditTestimonial = () => {
  const { id } = useParams();
  const [testimonial, setTestimonial] = React.useState({});
  const [image, setImage] = React.useState(null);
  const [name, setName] = React.useState("");
  const [reviews, setReviews] = React.useState("");
  const [rating, setRating] = React.useState("");
  const [title, setTitle] = React.useState("");

  useEffect(() => {
    getReview();
  }, []);
  const getReview = async () => {
    await axios
      .get(`https://api.thevocalhub.com/api/v1/reviews/${id}`)
      .then((res) => {
        if (res.data.status === 200) {
          setTestimonial(res.data.data);
          setName(res.data.data.name);
          setReviews(res.data.data.reviews);
          setRating(res.data.data.Rating);
          setTitle(res.data.data.title);
        } else {
          swal("Oops", `${res.data.msg}`, "error");
        }
      })
      .catch((err) => {});
  };
  console.log(title);
  console.log(image);
  const onSubmit = async (e) => {
    e.preventDefault();
    let formData = {};
    const imageData = new FormData();
    if (image !== null) {
      imageData.append("image", image);
      imageData.append("reviews", reviews);
      imageData.append("title", title);
      imageData.append("Rating", rating);
      imageData.append("name", name);
    } else {
      formData = {
        reviews,
        title,
        rating,
        name,
      };
    }
    if (image != null) {
      await axios
        .put(`https://api.thevocalhub.com/api/v1/reviews/${id}`, imageData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })

        .then((res) => {
          console.log(res.data);
          if (res.data.status === 200) {
            swal("Success", "Review Edited Successfully", "success");
          } else {
            swal("Oops", `${res.data.msg}`, "error");
          }
        })
        .catch((err) => {});
    } else {
      await axios
        .put(`https://api.thevocalhub.com/api/v1/reviews/${id}`, formData, {})

        .then((res) => {
          console.log(res.data);
          if (res.data.status === 200) {
            swal("Success", "Review Edited Successfully", "success");
          } else {
            swal("Oops", `${res.data.msg}`, "error");
          }
        })
        .catch((err) => {});
    }
  };
  return (
    <Fragment>
      <PageTitle activeMenu="Edit Review" motherMenu="Reviews" />
      {testimonial && (
        <Form onSubmit={onSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Reviewer Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter reviewer name"
              onChange={(e) => setName(e.target.value)}
              defaultValue={name}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Reviewer Image</Form.Label>
            <Form.Control
              type="file"
              className="form-file-input form-control"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Reviewer Review</Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => setReviews(e.target.value)}
              defaultValue={reviews}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Reviewer Job Title</Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => setTitle(e.target.value)}
              defaultValue={title}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Reviewer Rating</Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => setRating(e.target.value)}
              defaultValue={rating}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form.Group>
        </Form>
      )}
    </Fragment>
  );
};

export default EditTestimonial;
