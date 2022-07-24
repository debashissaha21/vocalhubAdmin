import { useContext } from "react";

/// React router dom
import { Switch, Route } from "react-router-dom";

/// Css
import "./index.css";
import "./chart.css";
import "./step.css";

/// Layout
import Nav from "./layouts/nav";
import Footer from "./layouts/Footer";
/// Dashboard
import Home from "./components/Dashboard/Home";
import DashboardDark from "./components/Dashboard/DashboardDark";

/// Pages
import Login from "./pages/Login";
import Setting from "./layouts/Setting";
import { ThemeContext } from "../context/ThemeContext";
import ListUsers from "./components/Users/ListUsers";
import AddUsers from "./components/Users/AddUsers";
import ListVocals from "./components/Vocals/ListVocals";
import AddVocal from "./components/Vocals/AddVocal";
import EditUser from "./components/Users/EditUser";
import EditVocal from "./components/Vocals/EditVocal";
import ListTags from "./components/Tags/Listtags";
import AddTag from "./components/Tags/AddTag";
import ListKeys from "./components/Keys/ListKeys";
import AddKeys from "./components/Keys/AddKey";
import ListTestimonials from "./components/Testimonials/ListTestimonials";
import AddTestimonial from "./components/Testimonials/addTestimonials";
import EditTestimonial from "./components/Testimonials/editTestimonial";
import ArtistRequest from "./components/ArtistRequest/ArtistRequest";
import ListArtists from "./components/Artists/ListArtist";
import AddArtist from "./components/Artists/AddArtist";
import EditArtist from "./components/Artists/EditArtist";
import ListBlogs from "./components/Blogs/ListBlogs";
import AddBlog from "./components/Blogs/AddBlog";
import EditBlog from "./components/Blogs/EditBlog";
import AffiliateRequest from "./components/AffiliateRequest/AffiliateRequest";
import ContactUs from "./components/ContactUs/ContactUs";
import ListOrders from "./components/Orders/ListOrders";
import Profile from "./components/Profile/Profile";
import ListCoupons from "./components/Coupons/ListCoupons";
import AddCoupon from "./components/Coupons/AddCoupon";
import ListPaymentRequest from "./components/PaymentRequest/ListPaymentRequest";

const Markup = () => {
  const { menuToggle } = useContext(ThemeContext);
  const routes = [
    /// Dashboard
    { url: "", component: Home },
    { url: "dashboard", component: Home },
    { url: "dashboard-dark", component: DashboardDark },

    /// Users
    { url: "users", component: ListUsers },
    { url: "add-user", component: AddUsers },
    { url: "edit-user/:id", component: EditUser },

    /// Vocals
    { url: "vocals", component: ListVocals },
    { url: "add-vocal", component: AddVocal },
    { url: "edit-vocal/:id", component: EditVocal },

    /// Tags
    { url: "tags", component: ListTags },
    { url: "add-tag", component: AddTag },
    /// Keys
    { url: "keys", component: ListKeys },
    { url: "add-key", component: AddKeys },
    /// Testimonials
    { url: "testimonials", component: ListTestimonials },
    { url: "add-testimonials", component: AddTestimonial },
    { url: "edit-testimonial/:id", component: EditTestimonial },
    ///Artist Request
    { url: "artist-request", component: ArtistRequest },
    ///Artists
    { url: "artists", component: ListArtists },
    { url: "add-artist", component: AddArtist },
    { url: "edit-artist/:id", component: EditArtist },
    /// Blogs
    { url: "blogs", component: ListBlogs },
    { url: "add-blog", component: AddBlog },
    { url: "edit-blog/:id", component: EditBlog },
    ///Affiliate
    { url: "affiliate-requests", component: AffiliateRequest },
    ///Contact US
    { url: "contact-us", component: ContactUs },
    /// Orders
    { url: "orders", component: ListOrders },
    /// Coupons
    { url: "coupons", component: ListCoupons },
    { url: "add-coupon", component: AddCoupon },

    /// Payment Requests
    { url: "paymentRequest", component: ListPaymentRequest },

    /// Profile
    { url: "page-login", component: Login },
    { url: "profile", component: Profile },
  ];
  let path = window.location.pathname;
  path = path.split("/");
  path = path[path.length - 1];

  let pagePath = path.split("-").includes("page");
  return (
    <>
      <div
        id={`${!pagePath ? "main-wrapper" : ""}`}
        className={`${!pagePath ? "show" : "vh-100"}  ${
          menuToggle ? "menu-toggle" : ""
        }`}
      >
        {!pagePath && <Nav />}

        <div className={`${!pagePath ? "content-body" : ""}`}>
          <div
            className={`${!pagePath ? "container-fluid" : ""}`}
            style={{ minHeight: window.screen.height - 60 }}
          >
            <Switch>
              {routes.map((data, i) => (
                <Route
                  key={i}
                  exact
                  path={`/${data.url}`}
                  component={data.component}
                />
              ))}
            </Switch>
          </div>
        </div>
        {!pagePath && <Footer />}
      </div>
      <Setting />
    </>
  );
};

export default Markup;
