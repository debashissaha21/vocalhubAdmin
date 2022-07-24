import React, { Fragment, useEffect } from "react";
import PageTitle from "../../layouts/PageTitle";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import axios from "axios";
import swal from "sweetalert";
import { useParams } from "react-router-dom";

const EditArtist = () => {
  const [userName, setUserName] = React.useState("");
  const [regemailId, setUserEmail] = React.useState("");
  const [regPassword, setUserPassword] = React.useState("");
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
  const { id } = useParams();
  console.log(userName);
  useEffect(() => {
    getArtists();
  },[]);
  const getArtists = async () => {
    await axios
      .get(`http://api.thevocalhub.com/api/v1/users/${id}`)
      .then((res) => {
        console.log(res.data);
        setUserName(res.data.user.userName);
        setUserEmail(res.data.user.regemailId);
        setUserPassword(res.data.user.regPassword);
        setGender(res.data.user.gender);
        setRating(res.data.user.rating);
        setCountry(res.data.user.country);
        setAchivement(res.data.user.achievement);
        setSpecialist(res.data.user.specialist);
        setMusicNotes(res.data.user.musicNote);
        setHireMessage(res.data.user.hireMsg);
        setHirePrice(res.data.user.hirePrice);
        setAbout(res.data.user.about);
      })
      .catch((err) => {});
  };
  const onSubmit = (e) => {
    e.preventDefault();
    let userData = {};
    setIsLoading(true);
    console.log(userImage);
    const formData = new FormData();
    formData.append("userName", userName);
    formData.append("regemailId", regemailId);
    formData.append("regPassword", regPassword);
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
    if (userImage !== null) {
    } else {
      userData = {
        userName,
        regemailId,
        regPassword,
        gender: gender,
        rating: parseInt(rating),
        country: country,
        achievement: achievment,
        specialist: specialist,
        musicNote: musicNotes,
        hireMsg: hireMessage,
        hirePrice: hirePrice,
        about: about,
      };
    }
    console.log(userData);
    if (isLoading) {
      swal("Please wait", "Your request is being processed", "info");
    }
    if (userImage !== null) {
      axios
        .put(`https://api.thevocalhub.com/api/v1/users/${id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          if (res.data.status === 200) {
            setIsLoading(false);
            swal("Success", "Artist Updated Successfully", "success");
          } else {
            setIsLoading(false);
            swal("Oops", `${res.data.msg}`, "error");
          }
        })
        .catch((err) => {});
    } else {
      axios
        .put(`https://api.thevocalhub.com/api/v1/users/${id}`, userData)
        .then((res) => {
          if (res.data.status === 200) {
            swal("Success", "Artist Updated Successfully", "success");
          } else {
            swal("Oops", `${res.data.msg}`, "error");
          }
        })
        .catch((err) => {});
    }
  };
  return (
    <Fragment>
      <PageTitle activeMenu="Edit Artist" motherMenu="Artists" />
      <Form method="POST" onSubmit={onSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>UserName</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            defaultValue={userName}
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
            defaultValue={regemailId}
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
            defaultValue={regPassword}
            onChange={(e) => setUserPassword(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Gender</Form.Label>
          <Form.Control
            type="text"
            placeholder="Gender"
            onChange={(e) => setGender(e.target.value)}
            defaultValue={gender}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Rating</Form.Label>
          <Form.Control
            type="text"
            placeholder="Set Rating"
            onChange={(e) => setRating(e.target.value)}
            defaultValue={rating}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Country</Form.Label>
          <Form.Control
            type="text"
            placeholder="Set Country"
            onChange={(e) => setCountry(e.target.value)}
            defaultValue={country}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Achievment</Form.Label>
          <Form.Control
            type="text"
            placeholder="Set Achievement"
            onChange={(e) => setAchivement(e.target.value)}
            defaultValue={achievment}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Special At</Form.Label>
          <Form.Control
            type="text"
            placeholder="Set Special At"
            onChange={(e) => setSpecialist(e.target.value)}
            defaultValue={specialist}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Music Genre</Form.Label>
          <Form.Control
            type="text"
            placeholder="Set Music Genre"
            onChange={(e) => setMusicNotes(e.target.value)}
            defaultValue={musicNotes}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Hire Message</Form.Label>
          <Form.Control
            type="text"
            placeholder="Set Hire Message"
            onChange={(e) => setHireMessage(e.target.value)}
            defaultValue={hireMessage}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Hire Price</Form.Label>
          <Form.Control
            type="text"
            placeholder="Set Hire Price"
            onChange={(e) => setHirePrice(e.target.value)}
            defaultValue={hirePrice}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>About the User</Form.Label>
          <Form.Control
            type="text"
            placeholder="About the User"
            onChange={(e) => setAbout(e.target.value)}
            defaultValue={about}
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

export default EditArtist;
