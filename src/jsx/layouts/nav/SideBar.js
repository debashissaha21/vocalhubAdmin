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
    Artists = ["artists", "add-artist", "edit-artist"],
    Blogs = ["blogs", "add-blog", "edit-blog"],
    AffiliateRequest = ["affiliate-requests"],
    ContactUs = ["contact-us"],
    Orders = ["orders"];

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
          <li className={`${Artists.includes(path) ? "mm-active" : ""}`}>
            <Link className="has-arrow ai-icon" to="#">
              <i className="flaticon-050-info"></i>
              <span className="nav-text">Artists</span>
            </Link>
            <ul>
              <li>
                <Link
                  className={`${path === "artists" ? "mm-active" : ""}`}
                  to="/artists"
                >
                  List Artists
                </Link>
              </li>
              <li>
                <Link
                  className={`${path === "add-artist" ? "mm-active" : ""}`}
                  to="/add-artist"
                >
                  Add Artist
                </Link>
              </li>
            </ul>
          </li>
          <li className={`${Blogs.includes(path) ? "mm-active" : ""}`}>
            <Link className="has-arrow ai-icon" to="#">
              <i className="flaticon-050-info"></i>
              <span className="nav-text">Blogs</span>
            </Link>
            <ul>
              <li>
                <Link
                  className={`${path === "blogs" ? "mm-active" : ""}`}
                  to="/blogs"
                >
                  List Blogs
                </Link>
              </li>
              <li>
                <Link
                  className={`${path === "add-blog" ? "mm-active" : ""}`}
                  to="/add-blog"
                >
                  Add Blog
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
          <li
            className={`${Orders.includes(path) ? "mm-active" : ""}`}
          >
            <Link className="" to="/orders">
              <i className="flaticon-087-stop"></i>
              <span className="nav-text">Orders</span>
            </Link>
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
                  className={`${
                    path === "add-testimonials" ? "mm-active" : ""
                  }`}
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
          <li
            className={`${AffiliateRequest.includes(path) ? "mm-active" : ""}`}
          >
            <Link className="" to="/affiliate-requests">
              <i className="flaticon-087-stop"></i>
              <span className="nav-text">Affiliate Requests</span>
            </Link>
          </li>
          <li
            className={`${ContactUs.includes(path) ? "mm-active" : ""}`}
          >
            <Link className="" to="/contact-us">
              <i className="flaticon-087-stop"></i>
              <span className="nav-text">ContactUs</span>
            </Link>
          </li>
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
