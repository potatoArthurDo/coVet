import { useState, useEffect } from "react";
import api from "../api";
import { getAdapter } from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Navbar from "../components/Navbar";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import "../styles/Pet.css";
import "../styles/index.css";
import { Modal } from "../components/Modal";
import Form from "react-bootstrap/Form";
import { createPortal } from "react-dom";

function Pets() {
  const [pets, setPet] = useState([]);
  const [pet_name, setPetName] = useState("");
  const [animal_type, setAnimal_type] = useState("");
  const [breed, setBreed] = useState("");
  // const [age, setAge] = useState(0);
  const [date_of_birth, setDate_of_birth] = useState("");
  const [weight, setWeight] = useState(0);
  const [length, setLength] = useState(0);
  // const [date_of_birth, SetDay] = useState(new Date());
  const [fixed, setFixed] = useState("");
  const [photo, setphoto] = useState(null);

  const [gender, setGender] = useState("");

  const initialFormData = Object.freeze({
    pet_name: "",
    animal_type: "",
    breed: "",
    gender: "",
    date_of_birth: "",
    fixed: "",
  });
  const [petData, updatePetData] = useState(initialFormData);

  const handlechange = (e) => {
    if ([e.target.name] == "photo") {
      setphoto({
        photo: e.target.files[0],
      });
      console.log(e.target.files[0].name);
    }
    updatePetData({
      ...petData,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("pet_name", petData.pet_name);
    formData.append("animal_type", petData.animal_type);
    formData.append("breed", petData.breed);
    formData.append("gender", petData.gender);
    formData.append("date_of_birth", petData.date_of_birth);
    formData.append("fixed", petData.fixed);
    formData.append("image", photo);
    api
      .post("/api/pets/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (res.status === 201) alert("Pet Created");
        else alert("Creating failed");
        getPets();
      })
      .catch((err) => console.log(err));
    window.location.reload();
    console.log(formData.get("photo"));
  };

  const [modalOpen, setModalOpen] = useState(false);

  const handleButtonClick = (value) => {
    setModalOpen(false);
  };

  useEffect(() => {
    getPets();
  }, []);

  const getPets = () => {
    api
      .get("/api/pets/")
      .then((res) => res.data)
      .then((data) => {
        setPet(data);
        console.log(data);
      })
      .catch((err) => alert(err));
  };

  const deletePet = () => {
    api
      .delete(`/api/pets/${id}/`)
      .then((res) => {
        if (res.status === 204) alert("deleted");
        else alert("Deleting Failed");
      })
      .catch((err) => alert(err));
    getPet();
  };

  const createPet = (e) => {
    e.preventDefault();
    api
      .post("/api/pets/", {
        pet_name,
        animal_type,
        breed,
        gender,
        date_of_birth,
        fixed,
        photo,
      })
      .then((res) => {
        if (res.status === 201) alert("Pet Created");
        else alert("Creating failed");
        getPets();
      })
      .catch((err) => console.log(err));
  };
  console.log(pets)

  return (
    <>
      <Navbar />
      <div className="add-pet">
        <button
          type="button"
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#staticBackdrop"
        >
          Add a pet
        </button>
      </div>
      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
                Add a pet
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                
              ></button>
            </div>

            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="pet_name" className="col-form-label">
                    Name:
                  </label>
                  <input
                    type="text"
                    name="pet_name"
                    id="pet_name"
                    required
                    onChange={handlechange}
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="animal_type" className="col-form-label">
                    Kind:
                  </label>
                  <input
                    type="text"
                    name="animal_type"
                    id="animal_type"
                    required
                    onChange={handlechange}
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="Breed:" className="col-form-label">
                    Breed:
                  </label>
                  <input
                    type="text"
                    name="breed"
                    id="breed"
                    required
                    onChange={handlechange}
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="gender" className="col-form-label">
                    Gender:
                  </label>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    onChange={handlechange}
                    name="gender"
                  >
                    <option selected>Choose a gender </option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="date_of_birth" className="col-form-label">
                    D.O.B
                  </label>
                  <input
                    className="form-control"
                    type="date"
                    name="date_of_birth"
                    onChange={handlechange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="fixed" className="col-form-label">
                    Fixed:
                  </label>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    onChange={handlechange}
                    name="fixed"
                  >
                    <option selected>Choose an option </option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="photo" className="col-form-label">
                    Photo:
                  </label>
                  <input
                    type="file"
                    name="photo"
                    id="photo"
                    accept="image/jpg, image/jpeg, image/png"
                    onChange={handlechange}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSubmit}
                style={{"backgroundColor": "#03442D","color":"#f7ecd0" }}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="pet-grid">
        {pets.map((pet) => {
          return (
            <div className="card" style={{"width" : "18em"}} key={pet.id}>
              <img className="card-img-top" src={pet.file} alt="Card image cap" style={{"width" : "280px", "height" : "280px"}} />
              <div className="card-body">
                <h5 className="card-title">{pet.pet_name} </h5>
                <p className="card-text">
                  {pet.animal_type}
                </p>
                <Link to={`/pets/${pet.id}`}>
                <button>See more</button></Link>
              </div>
            </div>
          );
        })}
      </div>
      );
    </>
  );
}
export default Pets;
