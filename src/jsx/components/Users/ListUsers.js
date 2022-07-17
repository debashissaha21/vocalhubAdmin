import React, { Fragment, useState, useRef, useEffect } from "react";
import PageTitle from "../../layouts/PageTitle";
import { Link } from "react-router-dom";
import axios from "axios";
import Toggle from "react-toggle";
import "react-toggle/style.css";
import swal from "sweetalert";

const ListUsers = () => {
  const [users, setUsers] = useState([]);
  const [isArtist, setIsArtist] = useState(null);
  const [affiliateStatus, setAffiliateStatus] = useState(1);
  useEffect(() => {
    getUsers();
    return () => {
      setUsers([]);
    };
  }, []);
  const getUsers = async () => {
    await axios
      .get("https://api.thevocalhub.com/api/v1/users")
      .then((res) => {
        setUsers(res.data.users);
      })
      .catch((err) => {});
  };
  const handleStatus = async (id) => {
    await axios
      .delete(`https://api.thevocalhub.com/api/v1/users/${id}`)
      .then((res) => {
        if (res.data.status === 200) {
          swal("Success", "User has been updated", "success");
          getUsers();
        } else {
          swal("Error", "Something went wrong", "error");
        }
      })
      .catch((err) => {});
  };
  const handleAffiliate = async (id, affiliateStatus) => {
    if (affiliateStatus) {
      setAffiliateStatus(0);
    } else {
      setAffiliateStatus(1);
    }
    await axios
      .put(`https://api.thevocalhub.com/api/v1/users/${id}`, {
        affiliateStatus: affiliateStatus,
      })
      .then((res) => {
        if (res.data.status === 200) {
          swal("Success", "User has been updated", "success");
          getUsers();
        } else {
          swal("Error", "Something went wrong", "error");
        }
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
  const handleDelete = async (id) => {
    console.log("id", id);
    await axios
      .delete(`https://api.thevocalhub.com/api/v1/users/delete/${id}`)
      .then((res) => {
        if (res.data.status === 200) {
          setUsers(users.filter((user) => user.userId !== id));
          swal("Deleted!", "User has been deleted.", "success");
        } else {
          swal("Error!", `${res.data.msg}`, "error");
        }
      })
      .catch((err) => {});
  };
  const handleArtist = async (id, groupId) => {
    console.log(groupId);
    if (groupId === 3) {
      setIsArtist(2);
    } else {
      setIsArtist(3);
    }
    await axios
      .put(`https://api.thevocalhub.com/api/v1/users/${id}`, {
        groupId: 2,
      })
      .then((res) => {
        if (res.data.status === 200) {
          swal("Success", "User has been updated to Artist", "success");
        } else {
          swal("Error", `${res.data.msg}`, "error");
        }
      })
      .catch((err) => {});
  };
  return (
    <Fragment>
      <PageTitle activeMenu="Users" motherMenu="Users" />
      <div className="col-12">
        <div className="card">
          <div className="card-header">
            <h4 className="card-title">Users table</h4>
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
                      <th>Affiliate Status</th>
                      <th>Created At</th>
                      <th>Updated At</th>
                      <th>Active/Inactive</th>
                      <th>User/Artist</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {jobData.map((d, i) => (
                      <tr key={i}>
                        {d.groupId === 1 || d.groupId === 2 ? (
                          <Fragment></Fragment>
                        ) : (
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
                            <td>
                              <Toggle
                                id="biscuit-status"
                                defaultChecked={
                                  d.affiliateStatus === true ? true : false
                                }
                                aria-labelledby="biscuit-label"
                                onChange={() =>
                                  handleAffiliate(d.userId, d.affiliateStatus)
                                }
                              />
                            </td>
                            <td>{<Fragment>{d.createdAt}</Fragment>}</td>
                            <td>{<Fragment>{d.updatedAt}</Fragment>}</td>
                            <td>
                              <Toggle
                                id="biscuit-status"
                                defaultChecked={d.isActive}
                                aria-labelledby="biscuit-label"
                                onChange={() => handleStatus(d.userId)}
                              />
                            </td>
                            <td>
                              {/* {setIsArtist(d.groupId)} */}
                              <Toggle
                                id="biscuit-status"
                                defaultChecked={d.groupId === 2}
                                aria-labelledby="biscuit-label"
                                onChange={() => handleArtist(d.userId)}
                              />
                            </td>

                            <td>
                              {
                                <Fragment>
                                  <div className="d-flex">
                                    <Link
                                      to={`/edit-user/${d.userId}`}
                                      className="btn btn-primary shadow btn-xs sharp me-1"
                                    >
                                      <i className="fas fa-pen"></i>
                                    </Link>
                                    <Link
                                      to="#"
                                      className="btn btn-danger shadow btn-xs sharp"
                                      onClick={() => handleDelete(d.userId)}
                                    >
                                      <i className="fa fa-trash"></i>
                                    </Link>
                                  </div>
                                </Fragment>
                              }
                            </td>
                          </Fragment>
                        )}
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr role="row">
                      <th>UserImage</th>
                      <th>Name</th>
                      <th>EmailId</th>
                      <th>Created At</th>
                      <th>Updated At</th>
                      <th>Active/Inactive</th>
                      <th>Actions</th>
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
                      to="/users"
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
                          to="/users"
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
                      to="/users"
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

export default ListUsers;
