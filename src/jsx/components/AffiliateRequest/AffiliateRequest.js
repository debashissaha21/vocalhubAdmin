import React, { Fragment, useState, useRef, useEffect } from "react";
import PageTitle from "../../layouts/PageTitle";
import { Link } from "react-router-dom";
import axios from "axios";
import Toggle from "react-toggle";
import "react-toggle/style.css";
import swal from "sweetalert";
import { format, formatDistance, formatRelative, subDays } from "date-fns";

const AffiliateRequest = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    getUsers();
    return () => {
      setUsers([]);
    };
  }, []);
  const getUsers = async () => {
    await axios
      .get("https://api.thevocalhub.com/api/v1/affiliate")
      .then((res) => {
        setUsers(res.data.data);
      })
      .catch((err) => {});
  };
  const sort = 10;
  let paggination = Array(Math.ceil(users.length / sort))
    .fill()
    .map((_, i) => i + 1);

  const activePag = useRef(0);
  const jobData = users.slice(
    activePag.current * sort,
    (activePag.current + 1) * sort
  );

  //const [demo, setdemo] = useState();
  const onClick = (i) => {
    activePag.current = i;

    jobData.current = users.slice(
      activePag.current * sort,
      (activePag.current + 1) * sort
    );
  };
  const handleStatus = async (id, affiliateId) => {
    await axios
      .put(`https://api.thevocalhub.com/api/v1/users/${id}`, {
        affiliateStatus: 1,
      })
      .then((res) => {
        if (res.data.status === 200) {
          handleDelete(affiliateId);
          swal("Success", "User has been selected as affiliate", "success");
        } else {
          swal("Error", `${res.data.msg}`, "error");
        }
      })
      .catch((err) => {});
  };
  const handleDelete = async (id) => {
    await axios
      .delete(`https://api.thevocalhub.com/api/v1/affiliate/${id}`)
      .then((res) => {
        if (res.data.status === 200) {
          swal("Success", "Request has been deleted", "success");
          getUsers();
        } else {
          swal("Error", `${res.data.msg}`, "error");
        }
      })
      .catch((err) => {});
  };
  return (
    <Fragment>
      <PageTitle
        activeMenu="Affliate Requests"
        motherMenu="AffiliateRequests"
      />
      <div className="col-12">
        <div className="card">
          <div className="card-header">
            <h4 className="card-title">Affilaite Requests table</h4>
          </div>
          <div className="card-body">
            <div className="w-100 table-responsive">
              <div id="example_wrapper" className="dataTables_wrapper">
                <table id="example" className="display w-100 dataTable">
                  <thead>
                    <tr role="row">
                      <th>Name</th>
                      <th>Paypal Email Id</th>
                      <th>Website URL</th>
                      <th>Promote Us</th>
                      <th>Created At</th>
                      <th>Updated At</th>
                      <th>Accept/Reject</th>
                    </tr>
                  </thead>
                  <tbody>
                    {jobData.map((d, i) => (
                      <tr key={i}>
                        <Fragment key={i}>
                          <td>{<Fragment>{d.yourName}</Fragment>}</td>
                          <td>{<Fragment>{d.accountEmail}</Fragment>}</td>
                          <td>{<Fragment>{d.websiteURL}</Fragment>}</td>
                          <td>{<Fragment>{d.promoteUs}</Fragment>}</td>
                          <td>
                            {
                              <Fragment>
                                {format(new Date(d.createdAt), "''eeee")}
                              </Fragment>
                            }
                          </td>
                          <td>
                            {
                              <Fragment>
                                {format(new Date(d.updatedAt), "''eeee")}
                              </Fragment>
                            }
                          </td>
                          <td>
                            <Toggle
                              id="biscuit-status"
                              defaultChecked={d.affiliateStatus === 1}
                              aria-labelledby="biscuit-label"
                              onChange={() =>
                                handleStatus(d.userId, d.affiliateId)
                              }
                            />
                          </td>
                        </Fragment>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr role="row">
                      <th>Name</th>
                      <th>Paypal Email Id</th>
                      <th>Website URL</th>
                      <th>Promote Us</th>
                      <th>Created At</th>
                      <th>Updated At</th>
                      <th>Accept/Reject</th>
                    </tr>
                  </tfoot>
                </table>

                <div className="d-sm-flex text-center justify-content-between align-items-center mt-3">
                  <div className="dataTables_info">
                    Showing {activePag.current * sort + 1} to{" "}
                    {users.length > (activePag.current + 1) * sort
                      ? (activePag.current + 1) * sort
                      : users.length}{" "}
                    of {users.length} entries
                  </div>
                  <div
                    className="dataTables_paginate paging_simple_numbers"
                    id="example5_paginate"
                  >
                    <Link
                      className="paginate_button previous disabled"
                      to="/affiliate-requests"
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
                          to="/affiliate-requests"
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
                      to="/affiliate-requests"
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

export default AffiliateRequest;
