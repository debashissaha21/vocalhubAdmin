import React, { Fragment, useState, useRef, useEffect } from "react";
import PageTitle from "../../layouts/PageTitle";
import { Link } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import { format } from "date-fns";

const ListKeys = () => {
  const [keys, setkeys] = useState([]);
  useEffect(() => {
    getkeys();
    return () => {
      setkeys([]);
    };
  }, []);
  const getkeys = async () => {
    await axios
      .get("https://api.thevocalhub.com/api/v1/keys")
      .then((res) => {
        setkeys(res.data.data);
      })
      .catch((err) => {});
  };
  const sort = 10;
  let paggination = Array(Math.ceil(keys.length / sort))
    .fill()
    .map((_, i) => i + 1);

  const activePag = useRef(0);
  const jobData = keys.slice(
    activePag.current * sort,
    (activePag.current + 1) * sort
  );

  //const [demo, setdemo] = useState();
  const onClick = (i) => {
    activePag.current = i;

    jobData.current = keys.slice(
      activePag.current * sort,
      (activePag.current + 1) * sort
    );
  };
  const handleDelete = async (id) => {
    console.log("id", id);
    await axios
      .delete(`https://api.thevocalhub.com/api/v1/keys/${id}`)
      .then((res) => {
        if (res.data.status === 200) {
          setkeys(keys.filter((key) => key.keyId !== id));
          swal("Deleted!", "Key has been deleted.", "success");
        } else {
          swal("Error!", `${res.data.msg}`, "error");
        }
      })
      .catch((err) => {});
  };
  return (
    <Fragment>
      <PageTitle activeMenu="keys" motherMenu="keys" />
      <div className="col-12">
        <div className="card">
          <div className="card-header">
            <h4 className="card-title">keys table</h4>
          </div>
          <div className="card-body">
            <div className="w-100 table-responsive">
              <div id="example_wrapper" className="dataTables_wrapper">
                <table id="example" className="display w-100 dataTable">
                  <thead>
                    <tr role="row">
                      <th>Name</th>
                      <th>Created At</th>
                      <th>Updated At</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {jobData.map((d, i) => (
                      <tr key={i}>
                        {d.groupId === 1 ? (
                          <Fragment></Fragment>
                        ) : (
                          <Fragment key={i}>
                            <td>{<Fragment>{d.keyName}</Fragment>}</td>
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
                              {
                                <Fragment>
                                  <div className="d-flex">
                                    <Link
                                      to="#"
                                      className="btn btn-danger shadow btn-xs sharp"
                                      onClick={() => handleDelete(d.keyId)}
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
                      <th>Name</th>
                      <th>Created At</th>
                      <th>Updated At</th>
                      <th>Actions</th>
                    </tr>
                  </tfoot>
                </table>

                <div className="d-sm-flex text-center justify-content-between align-items-center mt-3">
                  <div className="dataTables_info">
                    Showing {activePag.current * sort + 1} to{" "}
                    {keys.length > (activePag.current + 1) * sort
                      ? (activePag.current + 1) * sort
                      : keys.length}{" "}
                    of {keys.length} entries
                  </div>
                  <div
                    className="dataTables_paginate paging_simple_numbers"
                    id="example5_paginate"
                  >
                    <Link
                      className="paginate_button previous disabled"
                      to="/keys"
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
                          to="/keys"
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
                      to="/keys"
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

export default ListKeys;
