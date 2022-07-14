import React, { Fragment, useEffect } from "react";
import PageTitle from "../../layouts/PageTitle";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import axios from "axios";
import swal from "sweetalert";

const AddTestimonial = () => {
  const [image, setImage] = React.useState(null);
  const [name, setName] = React.useState("");
  const [reviews, setReviews] = React.useState("");
  const [rating, setRating] = React.useState(0);
  const [title, setTitle] = React.useState("");
  const [artistData, setArtistData] = React.useState([]);
  const [userId, setUserId] = React.useState();
  useEffect(() => {
    getArtistData();
    return () => {
      setArtistData([]);
    };
  }, []);
  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(image);
    const formData = new FormData();
    formData.append("image", image);
    formData.append("reviews", reviews);
    formData.append("title", title);
    formData.append("Rating", rating);
    formData.append("name", name);
    formData.append("userId", userId);

    await axios
      .post("https://api.thevocalhub.com/api/v1/reviews/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        if (res.data.status === 200) {
          swal("Success", "Review Added Successfully", "success");
        } else {
          swal("Oops", `${res.data.msg}`, "error");
        }
      })
      .catch((err) => {});
  };
  const getArtistData = async () => {
    await axios
      .get(`https://api.thevocalhub.com/api/v1/users/group/2`)
      .then((res) => {
        setArtistData(res.data.data);
      })
      .catch((err) => {});
  };
  return (
    <Fragment>
      <PageTitle activeMenu="Add Review" motherMenu="Reviews" />
      <Form method="POST" onSubmit={onSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Reviewer Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter reviewer name"
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Reviewer Image</Form.Label>
          <Form.Control
            type="file"
            className="form-file-input form-control"
            onChange={(e) => setImage(e.target.files[0])}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Reviewer Review</Form.Label>
          <Form.Control
            type="text"
            onChange={(e) => setReviews(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Reviewer Job Title</Form.Label>
          <Form.Control
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Reviewer Rating</Form.Label>
          <Form.Control
            type="number"
            onChange={(e) => setRating(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Artist (optional)</Form.Label>
          <select
            className="form-control form-control-lg"
            onChange={(e) => setUserId(e.target.value)}
          >
            <option value="">Select Artist</option>
            {artistData &&
              artistData.map((artist) => {
                return <option value={artist.userId}>{artist.userName}</option>;
              })}
          </select>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form.Group>
      </Form>
    </Fragment>
  );
};

export default AddTestimonial;
