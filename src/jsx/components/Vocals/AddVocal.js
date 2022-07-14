import React, { Fragment, useEffect } from "react";
import PageTitle from "../../layouts/PageTitle";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import axios from "axios";
import swal from "sweetalert";
import Select from "react-select";

const AddVocal = () => {
  const CustomClearText = () => "clear all";
  const ClearIndicator = (props) => {
    const {
      children = <CustomClearText />,
      getStyles,
      innerProps: { ref, ...restInnerProps },
    } = props;
    return (
      <div
        {...restInnerProps}
        ref={ref}
        style={getStyles("clearIndicator", props)}
      >
        <div style={{ padding: "0px 5px" }}>{children}</div>
      </div>
    );
  };
  const ClearIndicatorStyles = (base, state) => ({
    ...base,
    cursor: "pointer",
    color: state.isFocused ? "blue" : "black",
  });
  const [songSpecialization, setSongSpecialization] = React.useState([]);
  const [songImage, setSongImage] = React.useState(null);
  const [songSrc, setSongSrc] = React.useState(null);
  const [SongSpecializationId, setSongSpecializationId] = React.useState(0);
  const [SongName, setSongName] = React.useState("");
  const [songPrice, setSongPrice] = React.useState();
  const [songDescription, setSongDescription] = React.useState("");
  const [tags, setTags] = React.useState([]);
  const [keys, setKeys] = React.useState([]);
  const [userId, setUserId] = React.useState();
  const [artistData, setArtistData] = React.useState([]);
  const [tagsSelected, setTagsSelected] = React.useState(null);
  const [keysSelected, setKeysSelected] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);

  useEffect(() => {
    getSongSpecialization();
    getTags();
    getKeys();
    getArtistData();
    return () => {
      setSongSpecialization([]);
      setTags([]);
      setKeys([]);
      setArtistData([]);
    };
  }, []);
  const getSongSpecialization = async () => {
    await axios
      .get("https://api.thevocalhub.com/api/v1/songSpecialization")
      .then((res) => {
        setSongSpecialization(res.data.data);
      })
      .catch((err) => {});
  };
  const getTags = async () => {
    await axios
      .get("https://api.thevocalhub.com/api/v1/tags")
      .then((res) => {
        setTags(res.data.data);
      })
      .catch((err) => {});
  };
  const getKeys = async () => {
    await axios
      .get("https://api.thevocalhub.com/api/v1/keys")
      .then((res) => {
        setKeys(res.data.data);
      })
      .catch((err) => {});
  };
  const getArtistData = async () => {
    await axios
      .get(`https://api.thevocalhub.com/api/v1/users/group/2`)
      .then((res) => {
        setArtistData(res.data.data);
      })
      .catch((err) => {});
  };
  const tagData = [];
  tags &&
    tags.map((tag) => {
      tagData.push({
        value: tag.tagName,
        label: tag.tagName,
      });
    });
  const keysData = [];
  keys &&
    keys.map((key) => {
      keysData.push({
        value: key.keyName,
        label: key.keyName,
      });
    });
  const tagsData = [];
  tagsSelected && tagsSelected.map((tag) => {
    tagsData.push(tag.value);
  });
  const keysSelectedData = [];
  keysSelected && keysSelected.map((key) => {
    keysSelectedData.push(key.value);
  });
  console.log(tagsData);
  console.log(keysSelectedData);
  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    console.log(userId);
    // console.log(SongSpecializationId);
    const formData = new FormData();
    formData.append("songImage", songImage);
    formData.append("songSrc", songSrc);
    formData.append("SongSpecializationId", SongSpecializationId);
    formData.append("userId", userId);
    formData.append("SongName", SongName);
    formData.append("songPrice", songPrice);
    formData.append("songDescription", songDescription);
    formData.append("tags", tagsData);
    formData.append("songKeys", keysSelectedData);

    await axios
      .post("https://api.thevocalhub.com/api/v1/product/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.status === 200) {
          setIsLoading(false);
          swal("Success", "Vocal Added Successfully", "success");
        } else {
          setIsLoading(false);
          swal("Oops", `${res.data.msg}`, "error");
        }
      })
      .catch((err) => {});
  };
  if (isLoading) {
    swal("Please Wait", "Vocal is being added", "info");
  }
  return (
    <Fragment>
      <PageTitle activeMenu="Add Vocal" motherMenu="Vocals" />
      <Form method="POST" onSubmit={onSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Vocal Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter vocal name"
            onChange={(e) => setSongName(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Vocal Image</Form.Label>
          <Form.Control
            type="file"
            className="form-file-input form-control"
            onChange={(e) => setSongImage(e.target.files[0])}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Vocal Src</Form.Label>
          <Form.Control
            type="file"
            onChange={(e) => setSongSrc(e.target.files[0])}
            className="form-file-input form-control"
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Artist</Form.Label>
          <select
            className="form-control form-control-lg"
            onChange={(e) => setUserId(e.target.value)}
          >
            <option value="">Select Artist</option>
            <option value={7}>Page</option>
          </select>
        </Form.Group>
        <div className="input-group mb-3  input-info">
          <span className="input-group-text">£</span>

          <input
            type="number"
            className="form-control"
            onChange={(e) => setSongPrice(parseInt(e.target.value))}
            required
          />

          <span className="input-group-text">.00</span>
        </div>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Vocal Tags</Form.Label>
          <div id="multiselect">
            <Select
              closeMenuOnSelect={false}
              components={{ ClearIndicator }}
              styles={{ clearIndicator: ClearIndicatorStyles }}
              onChange={setTagsSelected}
              isMulti
              options={tagData}
              required
            />
          </div>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Vocal Keys</Form.Label>
          <div id="multiselect">
            <Select
              closeMenuOnSelect={false}
              components={{ ClearIndicator }}
              styles={{ clearIndicator: ClearIndicatorStyles }}
              onChange={(e) => setKeysSelected(e)}
              options={keysData}
              isMulti
              required
            />
          </div>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Vocal Description</Form.Label>
          <textarea
            className="form-control"
            rows="10"
            id="comment"
            onChange={(e) => setSongDescription(e.target.value)}
            required
          ></textarea>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Vocal Status (Optional)</Form.Label>
          <div id="multiselect">
            <select
              defaultValue={2}
              className="form-control form-control-lg"
              onChange={(e) =>
                setSongSpecializationId(parseInt(e.target.value))
              }
              required
            >
              {songSpecialization.map((item) => (
                <option
                  value={item.SongSpecializationId}
                  key={item.SongSpecializationId}
                >
                  {item.SongSpecializationName}
                </option>
              ))}
            </select>
          </div>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form.Group>
      </Form>
    </Fragment>
  );
};

export default AddVocal;
