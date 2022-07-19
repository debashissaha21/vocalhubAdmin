import React, { Fragment, useState, useRef, useEffect } from "react";
import PageTitle from "../../layouts/PageTitle";
import { Link } from "react-router-dom";
import axios from "axios";
import Toggle from "react-toggle";
import "react-toggle/style.css";
import swal from "sweetalert";

const ListCoupons = () => {
  const [coupons, setcoupons] = useState([]);
  useEffect(() => {
    getcoupons();
    return () => {
      setcoupons([]);
    };
  }, []);
  const getcoupons = async () => {
    await axios
      .get("https://api.thevocalhub.com/api/v1/coupon")
      .then((res) => {
        setcoupons(res.data.data);
      })
      .catch((err) => {});
  };

  const sort = 10;
  let paggination = Array(Math.ceil(coupons.length / sort))
    .fill()
    .map((_, i) => i + 1);

  const activePag = useRef(0);
  const jobData = coupons.slice(
    activePag.current * sort,
    (activePag.current + 1) * sort
  );

  //const [demo, setdemo] = useState();
  const onClick = (i) => {
    activePag.current = i;

    jobData.current = coupons.slice(
      activePag.current * sort,
      (activePag.current + 1) * sort
    );
  };
  const handleDelete = async (id) => {
    console.log("id", id);
    await axios
      .delete(`https://api.thevocalhub.com/api/v1/coupon/${id}`)
      .then((res) => {
        if (res.data.status === 200) {
          setcoupons(coupons.filter((user) => user.couponId !== id));
          swal("Deleted!", "Coupon has been deleted.", "success");
        } else {
          swal("Error!", `${res.data.msg}`, "error");
        }
      })
      .catch((err) => {});
  };
  const handleStatus = async (id, subscribeCoupon) => {
    await axios
      .put(`https://api.thevocalhub.com/api/v1/coupon/${id}`, {
        subscribeCoupon: subscribeCoupon ? 0 : 1,
      })
      .then((res) => {
        if (res.data.status === 200) {
          swal("Success", "Coupon has been updated", "success");
          getcoupons();
        } else {
          swal("Error", "Something went wrong", "error");
        }
      })
      .catch((err) => {});
  };

  return (
    <Fragment>
      <PageTitle activeMenu="Coupons" motherMenu="Coupons" />
      <div className="col-12">
        <div className="card">
          <div className="card-header">
            <h4 className="card-title">Coupons table</h4>
          </div>
          <div className="card-body">
            <div className="w-100 table-responsive">
              <div id="example_wrapper" className="dataTables_wrapper">
                <table id="example" className="display w-100 dataTable">
                  <thead>
                    <tr role="row">
                      <th>Name</th>
                      <th>Code</th>
                      <th>Discount</th>
                      <th>Subscribe Coupon</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {jobData.map((d, i) => (
                      <tr key={i}>
                        <Fragment key={i}>
                          <td>{<Fragment>{d.couponName}</Fragment>}</td>
                          <td>{<Fragment>{d.code}</Fragment>}</td>
                          <td>{<Fragment>{d.discount}%</Fragment>}</td>
                          <td>
                            <Toggle
                              id="biscuit-status"
                              defaultChecked={
                                d.subscribeCoupon === true ? true : false
                              }
                              onChange={() =>
                                handleStatus(d.couponId, d.subscribeCoupon)
                              }
                              aria-labelledby="biscuit-label"
                            />
                          </td>

                          <td>
                            {
                              <Fragment>
                                <div className="d-flex">
                                  <Link
                                    to="#"
                                    className="btn btn-danger shadow btn-xs sharp"
                                    onClick={() => handleDelete(d.couponId)}
                                  >
                                    <i className="fa fa-trash"></i>
                                  </Link>
                                </div>
                              </Fragment>
                            }
                          </td>
                        </Fragment>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr role="row">
                      <th>Name</th>
                      <th>Code</th>
                      <th>Discount</th>
                      <th>subscribe Coupon</th>
                      <th>Actions</th>
                    </tr>
                  </tfoot>
                </table>

                <div className="d-sm-flex text-center justify-content-between align-items-center mt-3">
                  <div className="dataTables_info">
                    Showing {activePag.current * sort + 1} to{" "}
                    {coupons.length > (activePag.current + 1) * sort
                      ? (activePag.current + 1) * sort
                      : coupons.length}{" "}
                    of {coupons.length} entries
                  </div>
                  <div
                    className="dataTables_paginate paging_simple_numbers"
                    id="example5_paginate"
                  >
                    <Link
                      className="paginate_button previous disabled"
                      to="/coupons"
                      onClick={() =>
                        activePag.current > 0 && onClick(activePag.current - 1)
                      }
                    >
                      <i
                        className="fa fa-angle-double-left"
                        aria-hidden="true"
                      ></i>
                    </Link>
                    <span>
                      {paggination.map((number, i) => (
                        <Link
                          key={i}
                          to="/coupons"
                          className={`paginate_button  ${
                            activePag.current === i ? "current" : ""
                          } `}
                          onClick={() => onClick(i)}
                        >
                          {number}
                        </Link>
                      ))}
                    </span>
                    <Link
                      className="paginate_button next"
                      to="/coupons"
                      onClick={() =>
                        activePag.current + 1 < paggination.length &&
                        onClick(activePag.current + 1)
                      }
                    >
                      <i
                        className="fa fa-angle-double-right"
                        aria-hidden="true"
                      ></i>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ListCoupons;
