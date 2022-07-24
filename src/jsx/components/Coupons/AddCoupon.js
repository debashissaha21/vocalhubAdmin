import React, { Fragment } from "react";
import PageTitle from "../../layouts/PageTitle";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import axios from "axios";
import swal from "sweetalert";

const AddCoupon = () => {
  const [couponName, setCouponName] = React.useState("");
  const [discount, setDiscount] = React.useState(0);
  const onSubmit = (e) => {
    e.preventDefault();
    const formData = {
      couponName,
      discount,
    };
    axios
      .post("https://api.thevocalhub.com/api/v1/coupon/", formData)
      .then((res) => {
        if (res.data.status === 200) {
          swal("Success", " Added Successfully", "success");
        } else {
          swal("Oops", `${res.data.msg}`, "error");
        }
      })
      .catch((err) => {});
  };
  return (
    <Fragment>
      <PageTitle activeMenu="Add Coupon" motherMenu="Coupons" />
      <Form method="POST" onSubmit={onSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Coupon Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            onChange={(e) => setCouponName(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Coupon Discount in (%)</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter discount"
            onChange={(e) => setDiscount(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Fragment>
  );
};

export default AddCoupon;
