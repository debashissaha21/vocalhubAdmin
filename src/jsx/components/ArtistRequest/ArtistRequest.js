import React, { Fragment, useState, useRef, useEffect } from "react";
import PageTitle from "../../layouts/PageTitle";
import { Link } from "react-router-dom";
import AudioPlayer, { RHAP_UI } from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import Toggle from "react-toggle";
import axios from "axios";
import swal from "sweetalert";

const ArtistRequest = () => {
  const [ArtistRequest, setArtistRequest] = useState([]);
  const [isActive, setIsActive] = useState(false);
  useEffect(() => {
    getArtistRequests();
    return () => {
      setArtistRequest([]);
    };
  }, []);

  const getArtistRequests = async () => {
    await axios
      .get("https://api.thevocalhub.com/api/v1/artists")
      .then((res) => {
        setArtistRequest(res.data.data);
      })
      .catch((err) => {});
  };
  const sort = 5;
  let paggination = Array(Math.ceil(ArtistRequest.length / sort))
    .fill()
    .map((_, i) => i + 1);

  const activePag = useRef(0);
  const jobData = ArtistRequest.slice(
    activePag.current * sort,
    (activePag.current + 1) * sort
  );
  const onClick = (i) => {
    activePag.current = i;

    jobData.current = ArtistRequest.slice(
      activePag.current * sort,
      (activePag.current + 1) * sort
    );
  };
  const handleDelete = (id) => {
    axios
      .delete(`https://api.thevocalhub.com/api/v1/artists/${id}`)
      .then((res) => {
        if (res.data.status === 200) {
          setArtistRequest(
            ArtistRequest.filter((testimonial) => testimonial.artistId !== id)
          );
          swal("Deleted!", "Your Artists Request has been deleted.", "success");
        } else {
          swal("Error!", `${res.data.msg}`, "error");
        }
      })
      .catch((err) => {});
  };
  const handleStatus = async (id, artistId) => {
    axios
      .put(`https://api.thevocalhub.com/api/v1/users/${id}`, { groupId: 2 })
      .then((res) => {
        if (res.data.status === 200) {
          setIsActive(!isActive);
          handleDelete(artistId);
        }
      })
      .catch((err) => {});
  };
  return (
    <Fragment>
      <PageTitle activeMenu="ArtistRequest" motherMenu="ArtistRequest" />
      <div className="col-12">
        <div className="card">
          <div className="card-body">
            <div className="w-100 table-responsive">
              <div id="example_wrapper" className="dataTables_wrapper">
                <table id="example" className="display w-100 dataTable">
                  <thead>
                    <tr role="row">
                      <th>Requester Name</th>
                      <th>Requester EmailId</th>
                      <th>Requester Experience</th>
                      <th>Requester PerfectFit</th>
                      <th>Requester Work</th>
                      <th>Requester BestAt</th>
                      <th>Requester Demo Song</th>
                      <th>Approve/Reject</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {jobData.map((d, i) => (
                      <tr key={i}>
                        <Fragment key={i}>
                          <td>{d.artistName}</td>
                          <td>{<Fragment>{d.emailId}</Fragment>}</td>
                          <td>{<Fragment>{d.experience} Years</Fragment>}</td>
                          <td>{<Fragment>{d.perfectFit}</Fragment>}</td>
                          <td>
                            <Fragment>{d.work}</Fragment>
                          </td>
                          <td>{d.bestAt}</td>
                          <td>
                            {" "}
                            <AudioPlayer
                              className="audio-player"
                              src={`https://api.thevocalhub.com/uploads/${d.songUpload}`}
                              layout="stacked-reverse"
                              style={{
                                width: "90px",
                                height: "50px",
                                boxShadow: "none",
                              }}
                              showSkipControls={false}
                              showJumpControls={false}
                              customVolumeControls={[]}
                              customAdditionalControls={[]}
                              showDownloadProgress={false}
                            />
                          </td>
                          <td>
                            <Toggle
                              id="biscuit-status"
                              defaultChecked={isActive}
                              aria-labelledby="biscuit-label"
                              onChange={() =>
                                handleStatus(d.userId, d.artistId)
                              }
                            />
                          </td>
                          <td>
                            {
                              <Fragment>
                                <div className="d-flex">
                                  <Link
                                    to="#"
                                    className="btn btn-danger shadow btn-xs sharp"
                                    onClick={() => handleDelete(d.artistId)}
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
                      <th>Requester Name</th>
                      <th>Requester EmailId</th>
                      <th>Requester Experience</th>
                      <th>Requester PerfectFit</th>
                      <th>Requester Work</th>
                      <th>Requester BestAt</th>
                      <th>Requester Demo Song</th>
                      <th>Actions</th>
                    </tr>
                  </tfoot>
                </table>

                <div className="d-sm-flex text-center justify-content-between align-items-center mt-3">
                  <div className="dataTables_info">
                    Showing {activePag.current * sort + 1} to{" "}
                    {ArtistRequest.length > (activePag.current + 1) * sort
                      ? (activePag.current + 1) * sort
                      : ArtistRequest.length}{" "}
                    of {ArtistRequest.length} entries
                  </div>
                  <div
                    className="dataTables_paginate paging_simple_numbers"
                    id="example5_paginate"
                  >
                    <Link
                      className="paginate_button previous disabled"
                      to="/ArtistRequest"
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
                          to="/ArtistRequest"
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
                      to="/ArtistRequest"
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

export default ArtistRequest;
