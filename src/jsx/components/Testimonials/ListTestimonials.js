import React, { Fragment, useState, useRef, useEffect } from "react";
import PageTitle from "../../layouts/PageTitle";
import { Link } from "react-router-dom";
import { Badge } from "react-bootstrap";
import axios from "axios";
import swal from "sweetalert";

const ListTestimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  useEffect(() => {
    getReviews();
    return () => {};
  }, []);

  const getReviews = async () => {
    await axios
      .get("https://api.thevocalhub.com/api/v1/reviews")
      .then((res) => {
        setTestimonials(res.data.data);
      })
      .catch((err) => {});
  };
  const sort = 5;
  let paggination = Array(Math.ceil(testimonials.length / sort))
    .fill()
    .map((_, i) => i + 1);

  const activePag = useRef(0);
  const jobData = testimonials.slice(
    activePag.current * sort,
    (activePag.current + 1) * sort
  );
  const onClick = (i) => {
    activePag.current = i;

    jobData.current = testimonials.slice(
      activePag.current * sort,
      (activePag.current + 1) * sort
    );
  };
  const handleDelete = (id) => {
    axios
      .delete(`https://api.thevocalhub.com/api/v1/reviews/${id}`)
      .then((res) => {
        if (res.data.status === 200) {
          setTestimonials(
            testimonials.filter((testimonial) => testimonial.reviewId !== id)
          );
          swal("Deleted!", "Your Review has been deleted.", "success");
        } else {
          swal("Error!", `${res.data.msg}`, "error");
        }
      })
      .catch((err) => {});
  };
  return (
    <Fragment>
      <PageTitle activeMenu="testimonials" motherMenu="testimonials" />
      <div className="col-12">
        <div className="card">
          <div className="card-body">
            <div className="w-100 table-responsive">
              <div id="example_wrapper" className="dataTables_wrapper">
                <table id="example" className="display w-100 dataTable">
                  <thead>
                    <tr role="row">
                      <th>Reviewer Image</th>
                      <th>Reviewer Name</th>
                      <th>Reviewer title</th>
                      <th>Reviewer Description</th>
                      <th>Reviewer Rating</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {jobData.map((d, i) => (
                      <tr key={i}>
                        <Fragment key={i}>
                          <td>
                            <img
                              src={`https://api.thevocalhub.com/uploads/${d.image}`}
                              alt=""
                              className="rounded-circle"
                              width="80"
                            />
                          </td>
                          <td>{<Fragment>{d.name}</Fragment>}</td>
                          <td>{<Fragment>{d.title}</Fragment>}</td>
                          <td>{<Fragment>{d.reviews}</Fragment>}</td>
                          <td><Badge variant="danger light badge-lg">{d.Rating}</Badge></td>

                          <td>
                            {
                              <Fragment>
                                <div className="d-flex">
                                  <Link
                                    to={`/edit-testimonial/${d.reviewId}`}
                                    className="btn btn-primary shadow btn-xs sharp me-1"
                                  >
                                    <i className="fas fa-pen"></i>
                                  </Link>
                                  <Link
                                    to="#"
                                    className="btn btn-danger shadow btn-xs sharp"
                                    onClick={() => handleDelete(d.reviewId)}
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
                      <th>Reviewer Image</th>
                      <th>Reviewer Name</th>
                      <th>Reviewer title</th>
                      <th>Reviewer Description</th>
                      <th>Reviewer Rating</th>
                      <th>Actions</th>
                    </tr>
                  </tfoot>
                </table>

                <div className="d-sm-flex text-center justify-content-between align-items-center mt-3">
                  <div className="dataTables_info">
                    Showing {activePag.current * sort + 1} to{" "}
                    {testimonials.length > (activePag.current + 1) * sort
                      ? (activePag.current + 1) * sort
                      : testimonials.length}{" "}
                    of {testimonials.length} entries
                  </div>
                  <div
                    className="dataTables_paginate paging_simple_numbers"
                    id="example5_paginate"
                  >
                    <Link
                      className="paginate_button previous disabled"
                      to="/testimonials"
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
                          to="/testimonials"
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
                      to="/testimonials"
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

export default ListTestimonials;
