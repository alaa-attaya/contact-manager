import React, { useState, useRef } from "react";
import Avatar from "./Avatar";
import Details from "./Details";
import axios from "axios";

function Card(props) {
  return (
    <div className="card">
      <div className="top">
        <h2 className="name">{props.name}</h2>
        <Avatar image={props.image} />
      </div>
      <div className="bottom">
        <Details detailInfo={"Phone: " + props.tel} />
        <Details detailInfo={"Location: [" + props.address + "]"} />
      </div>
    </div>
  );
}

function CardAdd(props) {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [image, setImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const imageInputRef = useRef();

  const handleImageClick = () => {
    imageInputRef.current.click();
  };

  const handleImageChange = (event) => {
    const selectedImage = event.target.files[0];

    if (selectedImage) {
      setImage(URL.createObjectURL(selectedImage));
      setImageFile(selectedImage);
    }
  };

  const handleAddContact = () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("phone_number", phoneNumber);
    formData.append("address", JSON.stringify({ latitude, longitude }));
    if (imageFile == null) {
    } else {
      formData.append("image", imageFile);
    }
    console.log(imageFile);
    axios
      .post("http://127.0.0.1:8000/api/contacts/store", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log("Contact added successfully:", response.data);
        setName("");
        setPhoneNumber("");
        setLatitude("");
        setLongitude("");
        setImage(null);
        setImageFile(null);
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error adding contact:", error);
        console.log("Validation Errors:", error.response.data.errors);
        console.log("Error details:", error.message, error.config);
      });
  };

  return (
    <div className="card">
      <h1 className="heading-add">ADD</h1>
      <div className=" image-add">
        <div onClick={handleImageClick} style={{ cursor: "pointer" }}>
          <Avatar image={image || "../../images/profilepic.png"} />
        </div>

        <input
          type="file"
          ref={imageInputRef}
          onChange={handleImageChange}
          accept="image/*"
          style={{ display: "none", cursor: "pointer" }}
        />
        <div className="top">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ height: 20 }}
          />
        </div>
        <div className="bottom">
          <input
            type="tel"
            placeholder="Phone"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            style={{ height: 20 }}
          />
          <input
            type="text"
            placeholder="Latitude"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
            style={{ height: 20 }}
          />
          <input
            type="text"
            placeholder="Longitude"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
            style={{ height: 20 }}
          />
          <button
            onClick={handleAddContact}
            className="add-btn"
            style={{ width: 170 }}
          >
            Add Contact
          </button>
        </div>
      </div>
    </div>
  );
}

export default Card;
export { CardAdd };
