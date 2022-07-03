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
  const [file, setFile] = React.useState(null);
  const [SongSpecializationId, setSongSpecializationId] = React.useState(0);
  const [SongName, setSongName] = React.useState("");
  const [songPrice, setSongPrice] = React.useState(0);
  const [songDescription, setSongDescription] = React.useState("");
  const [tags, setTags] = React.useState([]);
  const [keys, setKeys] = React.useState([]);
  useEffect(() => {
    getSongSpecialization();
    getTags();
    getKeys();
    return () => {
      setSongSpecialization([]);
      setTags([]);
      setKeys([]);
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
  const tagData = [];
  tags &&
    tags.map((tag) => {
      tagData.push({
        value: tag.tagId,
        label: tag.tagName,
      });
    });
  const keysData = [];
  keys &&
    keys.map((key) => {
      keysData.push({
        value: key.keyId,
        label: key.keyName,
      });
    });
  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("file", file);
    formData.append("file", file);
    formData.append("SongName", SongName);
    formData.append("songPrice", songPrice);
    formData.append("songDescription", songDescription);

    await axios
      .post("https://api.thevocalhub.com/api/v1/product/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        if (res.data.status === 200) {
          swal("Success", "Vocal Added Successfully", "success");
        } else {
          swal("Oops", `${res.data.msg}`, "error");
        }
      })
      .catch((err) => {});
  };
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
            // required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Vocal Image</Form.Label>
          <Form.Control
            type="file"
            className="form-file-input form-control"
            onChange={(e) => setFile(e.target.files[0])}
            // required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Vocal Src</Form.Label>
          <Form.Control
            type="file"
            className="form-file-input form-control"
            // required
          />
        </Form.Group>
        <div className="input-group mb-3  input-info">
          <span className="input-group-text">£</span>

          <input
            type="number"
            className="form-control"
            onChange={(e) => setSongPrice(parseInt(e.target.value))}
            // required
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
              isMulti
              options={tagData}
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
              options={keysData}
              isMulti
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
            // required
          ></textarea>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Vocal Status (Optional)</Form.Label>
          <div id="multiselect">
            <select
              defaultValue={4}
              className="form-control form-control-lg"
              onChange={(e) =>
                setSongSpecializationId(parseInt(e.target.value))
              }
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
