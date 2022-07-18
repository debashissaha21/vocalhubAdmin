import React, { Fragment, useState, useRef, useEffect } from "react";
import PageTitle from "../../layouts/PageTitle";
import { Link } from "react-router-dom";
import axios from "axios";
import Toggle from "react-toggle";
import "react-toggle/style.css";
import swal from "sweetalert";

const ListOrders = () => {
  const [orders, setorders] = useState([]);
  useEffect(() => {
    getorders();
    return () => {
      setorders([]);
    };
  }, []);
  const getorders = async () => {
    await axios
      .get("http://api.thevocalhub.com/api/v1/orders/getAllUsersOrder")
      .then((res) => {
        setorders(res.data.data);
      })
      .catch((err) => {});
  };

  const sort = 10;
  let paggination = Array(Math.ceil(orders.length / sort))
    .fill()
    .map((_, i) => i + 1);

  const activePag = useRef(0);
  const jobData = orders.slice(
    activePag.current * sort,
    (activePag.current + 1) * sort
  );

  //const [demo, setdemo] = useState();
  const onClick = (i) => {
    activePag.current = i;

    jobData.current = orders.slice(
      activePag.current * sort,
      (activePag.current + 1) * sort
    );
  };
  const handleDelete = async (id) => {
    await axios
      .delete(`https://api.thevocalhub.com/api/v1/orders/deleteOrder/${id}`)
      .then((res) => {
        if (res.data.status === 200) {
          setorders(orders.filter((user) => user.orderId !== id));
          swal("Deleted!", "Order has been deleted.", "success");
        } else {
          swal("Error!", `${res.data.msg}`, "error");
        }
      })
      .catch((err) => {});
  };
  
  return (
    <Fragment>
      <PageTitle activeMenu="orders" motherMenu="orders" />
      <div className="col-12">
        <div className="card">
          <div className="card-header">
            <h4 className="card-title">orders table</h4>
          </div>
          <div className="card-body">
            <div className="w-100 table-responsive">
              <div id="example_wrapper" className="dataTables_wrapper">
                <table id="example" className="display w-100 dataTable">
                  <thead>
                    <tr role="row">
                      <th>UserName</th>
                      <th>EmailId</th>
                      <th>Transaction Id</th>
                      <th>Payeer Id</th>
                      <th>Total Price</th>
                      <th>Paid Price</th>
                      <th>Coupon Name</th>
                      <th>Created At</th>
                      <th>Updated At</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {jobData.map((d, i) => (
                      <tr key={i}>
                        <td>{<Fragment>{d.users.userName}</Fragment>}</td>
                        <td>{<Fragment>{d.users.regemailId}</Fragment>}</td>
                        <td>{<Fragment>{d.transactionId}</Fragment>}</td>
                        <td>{<Fragment>{d.payerId}</Fragment>}</td>
                        <td>{<Fragment>£{d.totalPrice}</Fragment>}</td>
                        <td>{<Fragment>£{d.payableAmount}</Fragment>}</td>
                        <td>{<Fragment>{d.couponName}</Fragment>}</td>
                        <td>{<Fragment>{d.createdAt.split("T")}</Fragment>}</td>
                        <td>{<Fragment>{d.updatedAt.split("T")}</Fragment>}</td>

                        <td>
                          {
                            <Fragment>
                              <div className="d-flex">
                                <Link
                                  to="#"
                                  className="btn btn-danger shadow btn-xs sharp"
                                  onClick={() => handleDelete(d.orderId)}
                                >
                                  <i className="fa fa-trash"></i>
                                </Link>
                              </div>
                            </Fragment>
                          }
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr role="row">
                      <th>UserName</th>
                      <th>EmailId</th>
                      <th>Transaction Id</th>
                      <th>Payeer Id</th>
                      <th>Total Price</th>
                      <th>Paid Price</th>
                      <th>Coupon Name</th>
                      <th>Created At</th>
                      <th>Updated At</th>
                      <th>Actions</th>
                    </tr>
                  </tfoot>
                </table>

                <div className="d-sm-flex text-center justify-content-between align-items-center mt-3">
                  <div className="dataTables_info">
                    Showing {activePag.current * sort + 1} to{" "}
                    {orders.length > (activePag.current + 1) * sort
                      ? (activePag.current + 1) * sort
                      : orders.length}{" "}
                    of {orders.length} entries
                  </div>
                  <div
                    className="dataTables_paginate paging_simple_numbers"
                    id="example5_paginate"
                  >
                    <Link
                      className="paginate_button previous disabled"
                      to="/orders"
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
                          to="/orders"
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
                      to="/orders"
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

export default ListOrders;
