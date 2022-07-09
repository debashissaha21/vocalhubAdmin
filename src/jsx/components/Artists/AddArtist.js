import React, { Fragment } from "react";
import PageTitle from "../../layouts/PageTitle";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import axios from "axios";
import swal from "sweetalert";

const AddArtist = () => {
  const [userName, setUserName] = React.useState("");
  const [regemailId, setUserEmail] = React.useState("");
  const [regPassword, setUserPassword] = React.useState("");
  const [confirmPassword, setUserConfirmPassword] = React.useState("");
  const [userImage, setUserImage] = React.useState(null);
  const [gender, setGender] = React.useState("");
  const [rating, setRating] = React.useState(0);
  const [country, setCountry] = React.useState("");
  const [achievment, setAchivement] = React.useState("");
  const [specialist, setSpecialist] = React.useState("");
  const [musicNotes, setMusicNotes] = React.useState("");
  const [hireMessage, setHireMessage] = React.useState("");
  const [hirePrice, setHirePrice] = React.useState(0);
  const [about, setAbout] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const onSubmit = (e) => {
    e.preventDefault();
    let userData = {};
    setIsLoading(true);
    console.log(userImage);
    const formData = new FormData();
    formData.append("userName", userName);
    formData.append("regemailId", regemailId);
    formData.append("regPassword", regPassword);
    formData.append("confirmPassword", confirmPassword);
    formData.append("image", userImage);
    formData.append("gender", gender);
    formData.append("rating", parseInt(rating));
    formData.append("country", country);
    formData.append("achievement", achievment);
    formData.append("specialist", specialist);
    formData.append("musicNote", musicNotes);
    formData.append("hireMsg", hireMessage);
    formData.append("hirePrice", hirePrice);
    formData.append("about", about);
    formData.append("groupId", 2);
    if (userImage !== null) {
    } else {
      userData = {
        userName,
        regemailId,
        regPassword,
        confirmPassword,
        gender: gender,
        rating: parseInt(rating),
        country: country,
        achievement: achievment,
        specialist: specialist,
        musicNote: musicNotes,
        hireMsg: hireMessage,
        hirePrice: hirePrice,
        about: about,
        groupId: 2
      };
    }
    if (isLoading) {
      swal("Please wait", "Your request is being processed", "info");
    }
    if (userImage !== null) {
      axios
        .post("https://api.thevocalhub.com/api/v1/users/", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          if (res.data.status === 200) {
            setIsLoading(false);
            swal("Success", "Artist Added Successfully", "success");
          } else {
            setIsLoading(false);
            swal("Oops", `${res.data.msg}`, "error");
          }
        })
        .catch((err) => {});
    } else {
      axios
        .post("https://api.thevocalhub.com/api/v1/users/", userData)
        .then((res) => {
          if (res.data.status === 200) {
            swal("Success", "Artist Added Successfully", "success");
          } else {
            swal("Oops", `${res.data.msg}`, "error");
          }
        })
        .catch((err) => {});
    }
  };
  return (
    <Fragment>
      <PageTitle activeMenu="Add Artist" motherMenu="Artists" />
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
        <Form.Group className="mb-3">
          <Form.Label>User Image</Form.Label>
          <Form.Control
            type="file"
            className="form-file-input form-control"
            onChange={(e) => setUserImage(e.target.files[0])}
          ></Form.Control>
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
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Gender</Form.Label>
          <Form.Control
            type="text"
            placeholder="Gender"
            onChange={(e) => setGender(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Rating</Form.Label>
          <Form.Control
            type="number"
            placeholder="Set Rating"
            onChange={(e) => setRating(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Country</Form.Label>
          <Form.Control
            type="text"
            placeholder="Set Country"
            onChange={(e) => setCountry(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Achievment</Form.Label>
          <Form.Control
            type="text"
            placeholder="Set Achievement"
            onChange={(e) => setAchivement(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Special At</Form.Label>
          <Form.Control
            type="text"
            placeholder="Set Special At"
            onChange={(e) => setSpecialist(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Music Genre</Form.Label>
          <Form.Control
            type="text"
            placeholder="Set Music Genre"
            onChange={(e) => setMusicNotes(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Hire Message</Form.Label>
          <Form.Control
            type="text"
            placeholder="Set Hire Message"
            onChange={(e) => setHireMessage(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Hire Price</Form.Label>
          <Form.Control
            type="number"
            placeholder="Set Hire Price"
            onChange={(e) => setHirePrice(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>About the User</Form.Label>
          <Form.Control
            type="text"
            placeholder="About the User"
            onChange={(e) => setAbout(e.target.value)}
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

export default AddArtist;
