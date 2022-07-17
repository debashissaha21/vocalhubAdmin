import { useState, useContext, useEffect } from "react";
import axios from "axios";

//Import
import { ThemeContext } from "../../../context/ThemeContext";

const Home = () => {
  const { changeBackground } = useContext(ThemeContext);
  useEffect(() => {
    getUser();
    getVocals();
    getArtists();
    getArtistRequest();
    changeBackground({ value: "light", label: "Light" });
  }, []);
  const [users, setUsers] = useState({});
  const [vocals, setVocals] = useState({});
  const [artists, setArtists] = useState({});
  const [artistRequests, setArtistRequests] = useState({});
  const getUser = async () => {
    await axios
      .get(`https://api.thevocalhub.com/api/v1/users`)
      .then((res) => {
        setUsers(res.data.users);
      })
      .catch((err) => {});
  };
  const getVocals = async () => {
    await axios
      .get(`https://api.thevocalhub.com/api/v1/product`)
      .then((res) => {
        setVocals(res.data.products);
      })
      .catch((err) => {});
  };
  const getArtists = async () => {
    await axios
      .get(`https://api.thevocalhub.com/api/v1/users/group/2`)
      .then((res) => {
        setArtists(res.data.data);
      })
      .catch((err) => {});
  };
  const getArtistRequest = async () => {
    await axios
      .get(`https://api.thevocalhub.com/api/v1/artists`)
      .then((res) => {
        setArtistRequests(res.data.data);
      })
      .catch((err) => {});
  };

  return (
    <>
      <div className="row">
        <div className="col-xl-3 col-sm-6">
          <div className="card gradient-1 card-bx">
            <div className="card-body d-flex align-items-center">
              <div className="me-auto text-white">
                <h2 className="text-white">{users && users.length}</h2>
                <span className="fs-18">Total Users</span>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="58"
                height="58"
                fill="#fff"
                viewBox="0 0 24 24"
              >
                <path d="M20.822 18.096c-3.439-.794-6.64-1.49-5.09-4.418 4.72-8.912 1.251-13.678-3.732-13.678-5.082 0-8.464 4.949-3.732 13.678 1.597 2.945-1.725 3.641-5.09 4.418-3.073.71-3.188 2.236-3.178 4.904l.004 1h23.99l.004-.969c.012-2.688-.092-4.222-3.176-4.935z" />
              </svg>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-sm-6">
          <div className="card gradient-2 card-bx">
            <div className="card-body d-flex align-items-center">
              <div className="me-auto text-white">
                <h2 className="text-white">{vocals && vocals.length}</h2>
                <span className="fs-18">Total Vocals</span>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="58"
                height="58"
                viewBox="0 0 24 24"
                fill="#fff"
              >
                <path d="M15.526 11.409c-1.052.842-7.941 6.358-9.536 7.636l-2.697-2.697 7.668-9.504 4.565 4.565zm5.309-9.867c-2.055-2.055-5.388-2.055-7.443 0-1.355 1.356-1.47 2.842-1.536 3.369l5.61 5.61c.484-.054 2.002-.169 3.369-1.536 2.056-2.055 2.056-5.388 0-7.443zm-9.834 17.94c-2.292 0-3.339 1.427-4.816 2.355-1.046.656-2.036.323-2.512-.266-.173-.211-.667-.971.174-1.842l-.125-.125-1.126-1.091c-1.372 1.416-1.129 3.108-.279 4.157.975 1.204 2.936 1.812 4.795.645 1.585-.995 2.287-2.088 3.889-2.088 1.036 0 1.98.464 3.485 2.773l1.461-.952c-1.393-2.14-2.768-3.566-4.946-3.566z" />
              </svg>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-sm-6">
          <div className="card gradient-3 card-bx">
            <div className="card-body d-flex align-items-center">
              <div className="me-auto text-white">
                <h2 className="text-white">{artists && artists.length}</h2>
                <span className="fs-18">Total Artists</span>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="58"
                height="58"
                fill="#fff"
                stroke="#fff"
                stroke-width="1"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                &lt;!--! Atomicons Free 1.00 by @atisalab License -
                https://atomicons.com/license/ (Icons: CC BY 4.0) Copyright 2021
                Atomicons --&gt;<circle cx="12" cy="6" r="4"></circle>
                <path d="M17.67,22a2,2,0,0,0,1.92-2.56A7.8,7.8,0,0,0,12,14a7.8,7.8,0,0,0-7.59,5.44A2,2,0,0,0,6.34,22Z"></path>
              </svg>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-sm-6">
          <div className="card gradient-4 card-bx">
            <div className="card-body d-flex align-items-center">
              <div className="me-auto text-white">
                <h2 className="text-white">
                  {artistRequests && artistRequests.length}
                </h2>
                <span className="fs-18">Total Artist Requests</span>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="58"
                height="58"
                fill="#fff"
                stroke="#fff"
                stroke-width="1"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                &lt;!--! Atomicons Free 1.00 by @atisalab License -
                https://atomicons.com/license/ (Icons: CC BY 4.0) Copyright 2021
                Atomicons --&gt;<circle cx="10" cy="6" r="4"></circle>
                <path d="M15.67,22a2,2,0,0,0,1.92-2.56A7.8,7.8,0,0,0,10,14a7.8,7.8,0,0,0-7.59,5.44A2,2,0,0,0,4.34,22Z"></path>
                <line x1="19" y1="8" x2="19" y2="14"></line>
                <line x1="22" y1="11" x2="16" y2="11"></line>
              </svg>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-sm-6">
          <div className="card gradient-6 card-bx">
            <div className="card-body d-flex align-items-center">
              <div className="me-auto text-white">
                <h2 className="text-white">
                  {artistRequests && artistRequests.length}
                </h2>
                <span className="fs-18">Total Orders</span>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="58"
                height="58"
                fill="none"
                stroke="#fff"
                stroke-width="1"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                &lt;!--! Atomicons Free 1.00 by @atisalab License -
                https://atomicons.com/license/ (Icons: CC BY 4.0) Copyright 2021
                Atomicons --&gt;
                <path
                  d="M2,3H4.23a1,1,0,0,1,1,.74L8.1,14.52A2,2,0,0,0,10,16h6.53a2,2,0,0,0,1.9-1.37l2.1-6.31A1,1,0,0,0,19.61,7H6.1"
                  stroke-linecap="round"
                ></path>
                <line
                  x1="9.99"
                  y1="20"
                  x2="10.01"
                  y2="20"
                  stroke-linecap="round"
                  stroke-width="2"
                ></line>
                <line
                  x1="15.99"
                  y1="20"
                  x2="16.01"
                  y2="20"
                  stroke-linecap="round"
                  stroke-width="2"
                ></line>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Home;
