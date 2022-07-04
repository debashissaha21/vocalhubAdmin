/// Menu
import Metismenu from "metismenujs";
import React, { Component, useContext, useEffect } from "react";
/// Scroll
import PerfectScrollbar from "react-perfect-scrollbar";
/// Link
import { Link } from "react-router-dom";
import useScrollPosition from "use-scroll-position";
import { ThemeContext } from "../../../context/ThemeContext";

/// Image
//import profile from "../../../images/profile/pic1.jpg";
//import plus from "../../../images/plus.png";

class MM extends Component {
  componentDidMount() {
    this.$el = this.el;
    this.mm = new Metismenu(this.$el);
  }
  componentWillUnmount() {}
  render() {
    return (
      <div className="mm-wrapper">
        <ul className="metismenu" ref={(el) => (this.el = el)}>
          {this.props.children}
        </ul>
      </div>
    );
  }
}

const SideBar = () => {
  const { iconHover, sidebarposition, headerposition, sidebarLayout } =
    useContext(ThemeContext);
  useEffect(() => {
    var btn = document.querySelector(".nav-control");
    var aaa = document.querySelector("#main-wrapper");
    function toggleFunc() {
      return aaa.classList.toggle("menu-toggle");
    }
    btn.addEventListener("click", toggleFunc);

    //sidebar icon Heart blast
    var handleheartBlast = document.querySelector(".heart");
    function heartBlast() {
      return handleheartBlast.classList.toggle("heart-blast");
    }
    handleheartBlast.addEventListener("click", heartBlast);
  }, []);
  let scrollPosition = useScrollPosition();
  /// Path
  let path = window.location.pathname;
  path = path.split("/");
  path = path[path.length - 1];
  /// Active menu
  let deshBoard = ["", "dashboard"],
    Users = ["users", "add-user"],
    Vocals = ["vocals", "add-vocal"],
    Tags = ["tags", "add-tag"],
    Keys = ["keys", "add-key"],
    Testimonials = ["testimonials", "add-testimonials"],
    ArtistRequest = ["artist-request"],
    bootstrap = [
      "ui-accordion",
      "ui-badge",
      "ui-alert",
      "ui-button",
      "ui-modal",
      "ui-button-group",
      "ui-list-group",
      "ui-media-object",
      "ui-card",
      "ui-carousel",
      "ui-dropdown",
      "ui-popover",
      "ui-progressbar",
      "ui-tab",
      "ui-typography",
      "ui-pagination",
      "ui-grid",
    ],
    plugins = [
      "uc-select2",
      "uc-nestable",
      "uc-sweetalert",
      "uc-toastr",
      "uc-noui-slider",
      "map-jqvmap",
      "uc-lightgallery",
    ],
    redux = ["redux-form", "redux-wizard", "todo"],
    widget = ["widget-basic"],
    forms = [
      "form-element",
      "form-wizard",
      "form-editor-summernote",
      "form-pickers",
      "form-validation-jquery",
    ],
    table = ["table-bootstrap-basic", "table-datatable-basic"],
    pages = [
      "page-register",
      "page-login",
      "page-lock-screen",
      "page-error-400",
      "page-error-403",
      "page-error-404",
      "page-error-500",
      "page-error-503",
    ],
    error = [
      "page-error-400",
      "page-error-403",
      "page-error-404",
      "page-error-500",
      "page-error-503",
    ];
  return (
    <div
      className={`deznav ${iconHover} ${
        sidebarposition.value === "fixed" &&
        sidebarLayout.value === "horizontal" &&
        headerposition.value === "static"
          ? scrollPosition > 120
            ? "fixed"
            : ""
          : ""
      }`}
    >
      <PerfectScrollbar className="deznav-scroll">
        <MM className="metismenu" id="menu">
          <li className={`${deshBoard.includes(path) ? "mm-active" : ""}`}>
            <Link to="/">
              <i className="flaticon-025-dashboard"></i>
              <span className="nav-text">Dashboard</span>
            </Link>
          </li>
          <li className={`${Users.includes(path) ? "mm-active" : ""}`}>
            <Link className="has-arrow ai-icon" to="#">
              <i className="flaticon-050-info"></i>
              <span className="nav-text">Users</span>
            </Link>
            <ul>
              <li>
                <Link
                  className={`${path === "users" ? "mm-active" : ""}`}
                  to="/users"
                >
                  List Users
                </Link>
              </li>
              <li>
                <Link
                  className={`${path === "add-user" ? "mm-active" : ""}`}
                  to="/add-user"
                >
                  Add User
                </Link>
              </li>
            </ul>
          </li>
          <li className={`${Vocals.includes(path) ? "mm-active" : ""}`}>
            <Link className="has-arrow ai-icon" to="#">
              <i className="flaticon-041-graph"></i>
              <span className="nav-text">Vocals</span>
            </Link>
            <ul>
              <li>
                <Link
                  className={`${path === "vocals" ? "mm-active" : ""}`}
                  to="/vocals"
                >
                  Vocals
                </Link>
              </li>
              <li>
                <Link
                  className={`${path === "add-vocal" ? "mm-active" : ""}`}
                  to="/add-vocal"
                >
                  Add Vocal
                </Link>
              </li>
            </ul>
          </li>
          <li className={`${Keys.includes(path) ? "mm-active" : ""}`}>
            <Link className="has-arrow ai-icon" to="#">
              <i className="flaticon-086-star"></i>
              <span className="nav-text">Keys</span>
            </Link>
            <ul>
              <li>
                <Link
                  className={`${path === "keys" ? "mm-active" : ""}`}
                  to="/keys"
                >
                  Keys
                </Link>
              </li>
              <li>
                <Link
                  className={`${path === "add-key" ? "mm-active" : ""}`}
                  to="/add-key"
                >
                  Add Key
                </Link>
              </li>
            </ul>
          </li>
          <li className={`${Tags.includes(path) ? "mm-active" : ""}`}>
            <Link className="has-arrow ai-icon" to="#">
              <i className="flaticon-086-star"></i>
              <span className="nav-text">Tags</span>
            </Link>
            <ul>
              <li>
                <Link
                  className={`${path === "tags" ? "mm-active" : ""}`}
                  to="/tags"
                >
                  Tags
                </Link>
              </li>
              <li>
                <Link
                  className={`${path === "add-tag" ? "mm-active" : ""}`}
                  to="/add-tag"
                >
                  Add Tag
                </Link>
              </li>
            </ul>
          </li>
          <li className={`${Testimonials.includes(path) ? "mm-active" : ""}`}>
            <Link className="has-arrow ai-icon" to="#">
              <i className="flaticon-045-heart"></i>
              <span className="nav-text">Testimonials</span>
            </Link>
            <ul>
              <li>
                <Link
                  className={`${path === "testimonials" ? "mm-active" : ""}`}
                  to="/testimonials"
                >
                  Testimonials
                </Link>
              </li>
              <li>
                <Link
                  className={`${path === "add-testimonials" ? "mm-active" : ""}`}
                  to="/add-testimonials"
                >
                  Add Testimonials
                </Link>
              </li>
            </ul>
          </li>
          <li className={`${ArtistRequest.includes(path) ? "mm-active" : ""}`}>
            <Link className="" to="/artist-request">
              <i className="flaticon-087-stop"></i>
              <span className="nav-text">Artist Requests</span>
            </Link>
          </li>
          {/* <li className={`${bootstrap.includes(path) ? "mm-active" : ""}`}>
            <Link className="has-arrow ai-icon" to="#">
              <i className="flaticon-086-star"></i>
              <span className="nav-text">Bootstrap</span>
            </Link>
            <ul>
              <li>
                <Link
                  className={`${path === "ui-accordion" ? "mm-active" : ""}`}
                  to="/ui-accordion"
                >
                  Accordion
                </Link>
              </li>
              <li>
                <Link
                  className={`${path === "ui-alert" ? "mm-active" : ""}`}
                  to="/ui-alert"
                >
                  Alert
                </Link>
              </li>
              <li>
                <Link
                  className={`${path === "ui-badge" ? "mm-active" : ""}`}
                  to="/ui-badge"
                >
                  Badge
                </Link>
              </li>
              <li>
                <Link
                  className={`${path === "ui-button" ? "mm-active" : ""}`}
                  to="/ui-button"
                >
                  Button
                </Link>
              </li>
              <li>
                <Link
                  className={`${path === "ui-modal" ? "mm-active" : ""}`}
                  to="/ui-modal"
                >
                  Modal
                </Link>
              </li>
              <li>
                <Link
                  className={`${path === "ui-button-group" ? "mm-active" : ""}`}
                  to="/ui-button-group"
                >
                  Button Group
                </Link>
              </li>
              <li>
                <Link
                  className={`${path === "ui-list-group" ? "mm-active" : ""}`}
                  to="/ui-list-group"
                >
                  List Group
                </Link>
              </li>
              <li>
                <Link
                  className={`${path === "ui-card" ? "mm-active" : ""}`}
                  to="/ui-card"
                >
                  Cards
                </Link>
              </li>
              <li>
                <Link
                  className={`${path === "ui-carousel" ? "mm-active" : ""}`}
                  to="/ui-carousel"
                >
                  Carousel
                </Link>
              </li>
              <li>
                <Link
                  className={`${path === "ui-dropdown" ? "mm-active" : ""}`}
                  to="/ui-dropdown"
                >
                  Dropdown
                </Link>
              </li>
              <li>
                <Link
                  className={`${path === "ui-popover" ? "mm-active" : ""}`}
                  to="/ui-popover"
                >
                  Popover
                </Link>
              </li>
              <li>
                <Link
                  className={`${path === "ui-progressbar" ? "mm-active" : ""}`}
                  to="/ui-progressbar"
                >
                  Progressbar
                </Link>
              </li>
              <li>
                <Link
                  className={`${path === "ui-tab" ? "mm-active" : ""}`}
                  to="/ui-tab"
                >
                  Tab
                </Link>
              </li>
              <li>
                <Link
                  className={`${path === "ui-typography" ? "mm-active" : ""}`}
                  to="/ui-typography"
                >
                  Typography
                </Link>
              </li>
              <li>
                <Link
                  className={`${path === "ui-pagination" ? "mm-active" : ""}`}
                  to="/ui-pagination"
                >
                  Pagination
                </Link>
              </li>
              <li>
                <Link
                  className={`${path === "ui-grid" ? "mm-active" : ""}`}
                  to="/ui-grid"
                >
                  Grid
                </Link>
              </li>
            </ul>
          </li>
          <li className={`${plugins.includes(path) ? "mm-active" : ""}`}>
            <Link className="has-arrow ai-icon" to="#">
              <i className="flaticon-045-heart"></i>
              <span className="nav-text">Plugins</span>
            </Link>
            <ul>
              <li>
                <Link
                  className={`${path === "uc-select2" ? "mm-active" : ""}`}
                  to="/uc-select2"
                >
                  Select 2
                </Link>
              </li>
              <li>
                <Link
                  className={`${path === "uc-nestable" ? "mm-active" : ""}`}
                  to="/uc-nestable"
                >
                  Nestedable
                </Link>
              </li>
              <li>
                <Link
                  className={`${path === "uc-noui-slider" ? "mm-active" : ""}`}
                  to="/uc-noui-slider"
                >
                  Noui Slider
                </Link>
              </li>
              <li>
                <Link
                  className={`${path === "uc-sweetalert" ? "mm-active" : ""}`}
                  to="/uc-sweetalert"
                >
                  Sweet Alert
                </Link>
              </li>
              <li>
                <Link
                  className={`${path === "uc-toastr" ? "mm-active" : ""}`}
                  to="/uc-toastr"
                >
                  Toastr
                </Link>
              </li>
              <li>
                <Link
                  className={`${path === "map-jqvmap" ? "mm-active" : ""}`}
                  to="/map-jqvmap"
                >
                  Jqv Map
                </Link>
              </li>
              <li>
                <Link
                  className={`${path === "uc-lightgallery" ? "mm-active" : ""}`}
                  to="/uc-lightgallery"
                >
                  Light Gallery
                </Link>
              </li>
            </ul>
          </li>
          <li className={`${redux.includes(path) ? "mm-active" : ""}`}>
            <Link className="has-arrow ai-icon" to="#">
              <i className="flaticon-087-stop"></i>
              <span className="nav-text">Redux</span>
            </Link>
            <ul>
              <li>
                <Link
                  className={`${path === "todo" ? "mm-active" : ""}`}
                  to="/todo"
                >
                  Todo
                </Link>
              </li>
              <li>
                <Link
                  className={`${path === "redux-form" ? "mm-active" : ""}`}
                  to="/redux-form"
                >
                  Redux Form
                </Link>
              </li>
              <li>
                <Link
                  className={`${path === "redux-wizard" ? "mm-active" : ""}`}
                  to="/redux-wizard"
                >
                  Redux Wizard
                </Link>
              </li>
            </ul>
          </li>
          <li className={`${widget.includes(path) ? "mm-active" : ""}`}>
            <Link to="widget-basic" className="ai-icon">
              <i className="flaticon-013-checkmark"></i>
              <span className="nav-text">Widget</span>
            </Link>
          </li>
          <li className={`${forms.includes(path) ? "mm-active" : ""}`}>
            <Link className="has-arrow ai-icon" to="#">
              <i className="flaticon-072-printer"></i>
              <span className="nav-text forms">Forms</span>
            </Link>
            <ul>
              <li>
                <Link
                  className={`${path === "form-element" ? "mm-active" : ""}`}
                  to="/form-element"
                >
                  Form Elements
                </Link>
              </li>
              <li>
                <Link
                  className={`${path === "form-wizard" ? "mm-active" : ""}`}
                  to="/form-wizard"
                >
                  Wizard
                </Link>
              </li>
              <li>
                <Link
                  className={`${
                    path === "form-editor-summernote" ? "mm-active" : ""
                  }`}
                  to="/form-editor-summernote"
                >
                  Summernote
                </Link>
              </li>
              <li>
                <Link
                  className={`${path === "form-pickers" ? "mm-active" : ""}`}
                  to="/form-pickers"
                >
                  Pickers
                </Link>
              </li>
              <li>
                <Link
                  className={`${
                    path === "form-validation-jquery" ? "mm-active" : ""
                  }`}
                  to="/form-validation-jquery"
                >
                  Form Validate
                </Link>
              </li>
            </ul>
          </li>
          <li className={`${table.includes(path) ? "mm-active" : ""}`}>
            <Link className="has-arrow ai-icon" to="#">
              <i className="flaticon-043-menu"></i>
              <span className="nav-text">Table</span>
            </Link>
            <ul>
              <li>
                <Link
                  className={`${path === "table-filtering" ? "mm-active" : ""}`}
                  to="/table-filtering"
                >
                  Table Filtering
                </Link>
              </li>
              <li>
                <Link
                  className={`${path === "table-sorting" ? "mm-active" : ""}`}
                  to="/table-sorting"
                >
                  Table Sorting
                </Link>
              </li>
              <li>
                <Link
                  className={`${
                    path === "table-bootstrap-basic" ? "mm-active" : ""
                  }`}
                  to="/table-bootstrap-basic"
                >
                  Bootstrap
                </Link>
              </li>
              <li>
                <Link
                  className={`${
                    path === "table-datatable-basic" ? "mm-active" : ""
                  }`}
                  to="/table-datatable-basic"
                >
                  Datatable
                </Link>
              </li>
            </ul>
          </li>
          <li className={`${pages.includes(path) ? "mm-active" : ""}`}>
            <Link className="has-arrow ai-icon" to="#">
              <i className="flaticon-022-copy"></i>
              <span className="nav-text">Pages</span>
            </Link>
            <ul>
              <li className={`${error.includes(path) ? "mm-active" : ""}`}>
                <Link className="has-arrow" to="#">
                  Error
                </Link>
                <ul>
                  <li>
                    <Link
                      className={`${
                        path === "page-error-400" ? "mm-active" : ""
                      }`}
                      to="/page-error-400"
                    >
                      Error 400
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={`${
                        path === "page-error-403" ? "mm-active" : ""
                      }`}
                      to="/page-error-403"
                    >
                      Error 403
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={`${
                        path === "page-error-404" ? "mm-active" : ""
                      }`}
                      to="/page-error-404"
                    >
                      Error 404
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={`${
                        path === "page-error-500" ? "mm-active" : ""
                      }`}
                      to="/page-error-500"
                    >
                      Error 500
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={`${
                        path === "page-error-503" ? "mm-active" : ""
                      }`}
                      to="/page-error-503"
                    >
                      Error 503
                    </Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link
                  className={`${
                    path === "page-lock-screen" ? "mm-active" : ""
                  }`}
                  to="/page-lock-screen"
                >
                  Lock Screen
                </Link>
              </li>
            </ul>
          </li> */}
        </MM>
        <div className="copyright">
          <p>
            <strong>Vocalhub Admin</strong> © 2022 All Rights Reserved
          </p>
          <p className="fs-12">
            Made with <span className="heart"></span> by Debashis Saha
          </p>
        </div>
      </PerfectScrollbar>
    </div>
  );
};

export default SideBar;
