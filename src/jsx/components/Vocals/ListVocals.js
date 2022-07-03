import React, { Fragment, useState, useRef, useEffect } from "react";
import PageTitle from "../../layouts/PageTitle";
import { Link } from "react-router-dom";
import { Badge } from "react-bootstrap";
import axios from "axios";
import swal from "sweetalert";

const ListVocals = () => {
  const [vocals, setVocals] = useState([]);
  const [songSpecialization, setSongSpecialization] = React.useState([]);
  const [tags, setTags] = React.useState([]);
  useEffect(() => {
    getProducts();
    getSongSpecialization();
    return () => {
      setVocals([]);
      setSongSpecialization([]);
    };
  }, []);

  const getProducts = async () => {
    await axios
      .get("https://api.thevocalhub.com/api/v1/product")
      .then((res) => {
        setVocals(res.data.products);
      })
      .catch((err) => {});
    console.log(vocals);
  };
  const getSongSpecialization = async () => {
    await axios
      .get("https://api.thevocalhub.com/api/v1/songSpecialization")
      .then((res) => {
        setSongSpecialization(res.data.data);
      })
      .catch((err) => {});
  };
  const sort = 5;
  let paggination = Array(Math.ceil(vocals.length / sort))
    .fill()
    .map((_, i) => i + 1);

  const activePag = useRef(0);
  const jobData = vocals.slice(
    activePag.current * sort,
    (activePag.current + 1) * sort
  );
  const onClick = (i) => {
    activePag.current = i;

    jobData.current = vocals.slice(
      activePag.current * sort,
      (activePag.current + 1) * sort
    );
  };
  const handleDelete = (id) => {
    axios
      .delete(`https://api.thevocalhub.com/api/v1/product/${id}`)
      .then((res) => {
        if (res.data.status === 200) {
          setVocals(vocals.filter((vocal) => vocal.productId !== id));
          swal("Deleted!", "Your vocal has been deleted.", "success");
        } else {
          swal("Error!", `${res.data.msg}`, "error");
        }
      })
      .catch((err) => {});
  };
  return (
    <Fragment>
      <PageTitle activeMenu="Vocals" motherMenu="Vocals" />
      <div className="col-12">
        <div className="card">
          <div className="card-body">
            <div className="w-100 table-responsive">
              <div id="example_wrapper" className="dataTables_wrapper">
                <table id="example" className="display w-100 dataTable">
                  <thead>
                    <tr role="row">
                      <th>Vocal Image</th>
                      <th>Vocals Name</th>
                      <th>Vocal Description</th>
                      <th>Price</th>
                      <th>Vocal Tags</th>
                      <th>Artist Name</th>
                      <th>Artist Image</th>
                      <th>Artist Rating</th>
                      <th>Vocal Keys</th>
                      <th>Vocal Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {jobData.map((d, i) => (
                      <tr>
                        <Fragment key={i}>
                          <td>
                            <img
                              src={d.songImage}
                              alt=""
                              className="rounded-circle"
                              width="80"
                            />
                          </td>
                          <td>{<Fragment>{d.SongName}</Fragment>}</td>
                          <td>
                            {
                              <Fragment>
                                {d.songDescription.slice(0, 50)}
                              </Fragment>
                            }
                          </td>
                          <td>
                            {
                              <Fragment>
                                <Badge variant="success light">
                                  ${d.songPrice}
                                </Badge>
                              </Fragment>
                            }
                          </td>
                          <td>
                            {
                              <Badge variant="danger badge-lg light">
                                {d.tags}
                              </Badge>
                            }
                          </td>
                          <td>{<Fragment>{d.songArtistName}</Fragment>}</td>
                          <td>
                            <img
                              src={d.songArtistImage}
                              alt=""
                              className="rounded-circle"
                              width="80"
                            />
                          </td>
                          <td>{d.songArtistRating}</td>
                          <td> {
                              <Badge variant="warning badge-lg light">
                                {d.songKeys}
                              </Badge>
                            }</td>
                          {d.SongSpecializationId === 1 ? (
                            <td>
                              <Badge variant="danger badge-lg light">
                                Main Hit
                              </Badge>
                            </td>
                          ) : d.SongSpecializationId === 2 ? (
                            <td>
                              <Badge variant="warning badge-lg light">
                                Week Top
                              </Badge>
                            </td>
                          ) : (
                            <td>
                              <Badge variant="primary badge-lg light">
                                New Hit
                              </Badge>
                            </td>
                          )}
                          <td>
                            {
                              <Fragment>
                                <div className="d-flex">
                                  <Link
                                    to={`/edit-vocal/${d.productId}`}
                                    className="btn btn-primary shadow btn-xs sharp me-1"
                                  >
                                    <i className="fas fa-pen"></i>
                                  </Link>
                                  <Link
                                    to="#"
                                    className="btn btn-danger shadow btn-xs sharp"
                                    onClick={() => handleDelete(d.productId)}
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
                      <th>Vocal Image</th>
                      <th>Vocals Name</th>
                      <th>Vocal Description</th>
                      <th>Price</th>
                      <th>Vocal Tags</th>
                      <th>Artist Name</th>
                      <th>Artist Image</th>
                      <th>Artist Rating</th>
                      <th>Vocal Keys</th>
                      <th>Vocal Status</th>
                      <th>Actions</th>
                    </tr>
                  </tfoot>
                </table>

                <div className="d-sm-flex text-center justify-content-between align-items-center mt-3">
                  <div className="dataTables_info">
                    Showing {activePag.current * sort + 1} to{" "}
                    {vocals.length > (activePag.current + 1) * sort
                      ? (activePag.current + 1) * sort
                      : vocals.length}{" "}
                    of {vocals.length} entries
                  </div>
                  <div
                    className="dataTables_paginate paging_simple_numbers"
                    id="example5_paginate"
                  >
                    <Link
                      className="paginate_button previous disabled"
                      to="/vocals"
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
                          to="/vocals"
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
                      to="/vocals"
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

export default ListVocals;
