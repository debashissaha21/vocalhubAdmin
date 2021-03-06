import React, { Fragment, useState, useRef, useEffect } from "react";
import PageTitle from "../../layouts/PageTitle";
import { Link } from "react-router-dom";
import axios from "axios";
import Toggle from "react-toggle";
import "react-toggle/style.css";
import swal from "sweetalert";
import { format, formatDistance, formatRelative, subDays } from 'date-fns'

const ListPaymentRequest = () => {
  const [paymentRequest, setpaymentRequest] = useState([]);
  useEffect(() => {
    getpaymentRequest();
    return () => {
      setpaymentRequest([]);
    };
  }, []);
  const getpaymentRequest = async () => {
    await axios
      .get("https://api.thevocalhub.com/api/v1/paymentRequest")
      .then((res) => {
        setpaymentRequest(res.data.data);
      })
      .catch((err) => {});
  };
  const handleStatus = async (id, status) => {
    await axios
      .put(`https://api.thevocalhub.com/api/v1/paymentRequest/${id}`, {
        status: status === "Pending" ? "Paid" : "Pending",
      })
      .then((res) => {
        if (res.data.status === 200) {
          swal("Success", "Payment Completed", "success");
          getpaymentRequest();
        } else {
          swal("Error", "Something went wrong", "error");
        }
      })
      .catch((err) => {});
  };
  const sort = 10;
  let paggination = Array(Math.ceil(paymentRequest.length / sort))
    .fill()
    .map((_, i) => i + 1);

  const activePag = useRef(0);
  const jobData = paymentRequest.slice(
    activePag.current * sort,
    (activePag.current + 1) * sort
  );

  //const [demo, setdemo] = useState();
  const onClick = (i) => {
    activePag.current = i;

    jobData.current = paymentRequest.slice(
      activePag.current * sort,
      (activePag.current + 1) * sort
    );
  };
  return (
    <Fragment>
      <PageTitle activeMenu="PaymentRequest" motherMenu="PaymentRequest" />
      <div className="col-12">
        <div className="card">
          <div className="card-header">
            <h4 className="card-title">PaymentRequest table</h4>
          </div>
          <div className="card-body">
            <div className="w-100 table-responsive">
              <div id="example_wrapper" className="dataTables_wrapper">
                <table id="example" className="display w-100 dataTable">
                  <thead>
                    <tr role="row">
                      <th>UserImage</th>
                      <th>Name</th>
                      <th>EmailId</th>
                      <th>Amount</th>
                      <th>Payment Email</th>
                      <th>Payment Status</th>
                      <th>Created At</th>
                      <th>Updated At</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {jobData.map((d, i) => (
                      <tr key={i}>
                        <Fragment key={i}>
                          <td>
                            {d.image != null ? (
                              <Fragment>
                                {
                                  <img
                                    src={`https://api.thevocalhub.com/uploads/${d.image}`}
                                    width={60}
                                    height={60}
                                    className="rounded-circle"
                                  />
                                }
                              </Fragment>
                            ) : (
                              <Fragment>
                                {
                                  <img
                                    src={
                                      "https://icon-library.com/images/no-user-image-icon/no-user-image-icon-0.jpg"
                                    }
                                    width={60}
                                    height={60}
                                    className="rounded-circle"
                                  />
                                }
                              </Fragment>
                            )}
                          </td>
                          <td>{<Fragment>{d.userName}</Fragment>}</td>
                          <td>{<Fragment>{d.regemailId}</Fragment>}</td>
                          <td>{<Fragment>{d.withdrawalAmount}</Fragment>}</td>
                          <td>{<Fragment>{d.paymentEmailId}</Fragment>}</td>
                          <td>
                            <Toggle
                              id="biscuit-status"
                              defaultChecked={
                                d.status === "Paid" ? true : false
                              }
                              aria-labelledby="biscuit-label"
                              onChange={() =>
                                handleStatus(d.paymentRequestId, d.status)
                              }
                            />
                          </td>
                          <td>{<Fragment>{format(new Date(d.createdAt), "''eeee")}</Fragment>}</td>
                          <td>{<Fragment>{format(new Date(d.updatedAt), "''eeee")}</Fragment>}</td>
                          <td>
                            {
                              <Fragment>
                                <div className="d-flex">
                                  <Link
                                    to="#"
                                    className="btn btn-danger shadow btn-xs sharp"
                                    onClick={() =>
                                      handleDelete(d.paymentRequestId)
                                    }
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
                    <th>UserImage</th>
                      <th>Name</th>
                      <th>EmailId</th>
                      <th>Amount</th>
                      <th>Payment Email</th>
                      <th>Payment Status</th>
                      <th>Created At</th>
                      <th>Updated At</th>
                      <th>Actions</th>
                    </tr>
                  </tfoot>
                </table>

                <div className="d-sm-flex text-center justify-content-between align-items-center mt-3">
                  <div className="dataTables_info">
                    Showing {activePag.current * sort + 1} to{" "}
                    {paymentRequest.length > (activePag.current + 1) * sort
                      ? (activePag.current + 1) * sort
                      : paymentRequest.length}{" "}
                    of {paymentRequest.length} entries
                  </div>
                  <div
                    className="dataTables_paginate paging_simple_numbers"
                    id="example5_paginate"
                  >
                    <Link
                      className="paginate_button previous disabled"
                      to="/paymentRequest"
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
                          to="/paymentRequest"
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
                      to="/paymentRequest"
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

export default ListPaymentRequest;
