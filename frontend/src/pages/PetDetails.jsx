import Navbar from "../components/Navbar";
import Banner from "../components/Banner";
import "../styles/Detail.css";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api";
import { Link } from "react-router-dom";
import ResultDetail from "./ResultDetail";

function PetDetails() {
  const { id } = useParams();

  const [pet, setDetail] = useState([]);
  const [appointment, setAppointment] = useState([]);
 
  const [selectedService, setSelectedService] = useState([]);
  const [photo, setphoto] = useState(null);
  const [result, setResult] = useState([]);
  const [time, setTime] = useState([]);

  const initialUpdateFormData = Object.freeze({
    pet_name: pet.pet_name,
    animal_type: pet.animal_type,
    breed: pet.breed,
    gender: pet.gender,
    date_of_birth: pet.date_of_birth,
    fixed: pet.fixed,
  });
  const [updateData, setUpdateData] = useState(initialUpdateFormData);

  const handlechange = (e) => {
    if ([e.target.name] == "photo") {
      setphoto({
        photo: e.target.files[0],
      });
      console.log(e.target.files[0].name);
    }
    setUpdateData({
      ...updateData,
      [e.target.name]: e.target.value.trim(),
    });
  };

  // const [service_name, setServiceName] = useState("");

  useEffect(() => {
    getDetail();
    getAppointment();
    getService();
    getResult();
    getTime();
  }, []);

  const formattedDate = new Date(pet.created_at).toLocaleDateString("en-US");
  const getFilterApp = () => {
    return appointment.filter((item) => {
      const foundFata = item.pet_id.toString();
      return foundFata === id;
    });
  };

  const getfilterService = () => {
    return selectedService.filter((item) => {
      const foundData = item.service;
      return foundData;
    });
  };
  const getDetail = () => {
    api
      .get(`/api/pets/${id}`)
      .then((res) => res.data)
      .then((data) => {
        setDetail(data);
      })
      .catch((err) => alert(err));
  };

  const petUpdate = (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("pet_name", updateData.pet_name);
    formData.append("animal_type", updateData.animal_type);
    formData.append("breed", updateData.breed);
    formData.append("gender", updateData.gender);
    formData.append("date_of_birth", updateData.date_of_birth);
    formData.append("fixed", updateData.fixed);
    formData.append("image", photo);
    api
      .put(`/api/pets-update/${id}/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (res.status === 200) alert("Pet Edited");
        else alert("Creating failed");
      })
      .catch((err) => console.log(err));
    window.location.reload();
  };

  const navigate = useNavigate();
  const PetDelete = () => {
    api
      .delete(`/api/pets-delete/${id}/`)
      .then((res) => {
        if (res.status === 204) alert("Pet deleted!");
        else alert("Failed to delete.");
      })
      .catch((error) => alert(error));
    navigate("/pets");
  };

  const getAppointment = () => {
    api
      .get(`/api/appointments/`)
      .then((res) => res.data)
      .then((data) => {
        setAppointment(data);
        console.log(data);
      })
      .catch((err) => alert(err));
  };

  const getResult = () => {
    api
      .get(`/api/results/`)
      .then((res) => res.data)
      .then((data) => {
        setResult(data);
        console.log(data);
      })
      .catch((err) => alert(err));
  };

  console.log(result);

  const getService = () => {
    api
      .get(`/api/services/`)
      .then((res) => res.data)
      .then((data) => {
        setSelectedService(data);
      })
      .catch((err) => alert(err));
  };

  const getTime = () => {
    api
      .get(`/api/time/`)
      .then((res) => res.data)
      .then((data) => {
        setTime(data);
      })
      .catch((err) => alert(err));
  };

  console.log(result);

  return (
    <>
      <Navbar />
      <Banner />

      <div className="page-content page-container" id="page-content">
        <div className="padding">
          <div className="row container d-flex justify-content-space-between">
            <div className="col-xl-6 col-md-12">
              <div className="card user-card-full">
                <div className="row m-l-0 m-r-0">
                  <div className="col-sm-4 bg-c-lite-green user-profile">
                    <div className="card-block text-center">
                      <div className="m-b-25">
                        <img
                          src={pet.file}
                          className="img-radius"
                          alt="User-Profile-Image"
                          style={{ width: "100px", height: "100px" }}
                        />
                      </div>
                      <h6 className="f-w-600">{pet.pet_name}</h6>
                      <p>{pet.animal_type}</p>
                      <i className=" mdi mdi-square-edit-outline feather icon-edit m-t-10 f-16"></i>
                    </div>
                  </div>
                  <div className="col-sm-8">
                    <div className="card-block">
                      <h6 className="m-b-20 p-b-5 b-b-default f-w-600">
                        Information
                      </h6>
                      <div className="row">
                        <div className="col-sm-6">
                          <p className="m-b-10 f-w-600">Breed:</p>
                          <h6 className="text-muted f-w-400">{pet.breed}</h6>
                        </div>
                        <div className="col-sm-6">
                          <p className="m-b-10 f-w-600">Gender:</p>
                          <h6 className="text-muted f-w-400">{pet.gender}</h6>
                        </div>
                        <div className="col-sm-6">
                          <p className="m-b-10 f-w-600">D.O.B</p>
                          <h6 className="text-muted f-w-400">
                            {pet.date_of_birth}
                          </h6>
                        </div>
                      </div>
                      <h6 className="m-b-20 m-t-40 p-b-5 b-b-default f-w-600">
                        Medical History
                      </h6>
                      <div className="row">
                        <div className="col-sm-6">
                          <p className="m-b-10 f-w-600">Spayed:</p>
                          <h6 className="text-muted f-w-400">{pet.fixed}</h6>
                        </div>
                      </div>
                      <h6 className="m-b-20 m-t-40 p-b-5 b-b-default f-w-600">
                        Creation Info
                      </h6>
                      <div className="row">
                        <div className="col-sm-6">
                          <p className="m-b-10 f-w-600">Created At:</p>
                          <h6 className="text-muted f-w-400">
                            {formattedDate}
                          </h6>
                        </div>
                        <div className="col-sm-6">
                          <p className="m-b-10 f-w-600">Verified: </p>
                          <h6 className="text-muted f-w-400">{pet.verified}</h6>
                        </div>
                      </div>
                      <h6 className="m-b-20 m-t-40 p-b-5 b-b-default f-w-600">
                        Edit
                        <div className="row">
                          <div className="col-sm-6">
                            <button
                              className="pencil"
                              data-bs-toggle="modal"
                              data-bs-target="#edit"
                            >
                              <i className="fa-solid fa-pencil"></i>
                            </button>
                          </div>
                        </div>
                      </h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-6 col-md-12">
              <div className="card user-card-full">
                <div className="row m-l-0 m-r-0">
                  <div className="col-sm-8">
                    <div className="card-block">
                      <h6 className="m-b-20 p-b-5 b-b-default f-w-600">
                        Pending Appointment
                      </h6>
                      {getFilterApp().map((item) => {
                        if (item.status === "pending") {
                          return (
                            <div className="row" style={{ height: "200px" }}>
                              <div className="col-sm-6">
                                <p className="m-b-10 f-w-600">Title:</p>
                                <h6 className="text-muted f-w-400">
                                  {item.title}
                                </h6>
                              </div>
                              <div className="col-sm-6">
                                <p className="m-b-10 f-w-600">Date:</p>
                                <h6 className="text-muted f-w-400">
                                  {item.date}
                                </h6>
                              </div>
                              <div className="col-sm-6">
                                <p className="m-b-10 f-w-600">Time:</p>
                                {time.map((t) => {
                                  if (t.id === item.time) {
                                    return (
                                      <h6 className="text-muted f-w-400">
                                        {t.time}
                                      </h6>
                                    );
                                  }
                                })}
                              </div>
                              <div className="col-sm-6">
                                <p className="m-b-10 f-w-600">Service:</p>
                                {selectedService.map((s) => {
                                  if (s.id === item.service) {
                                    return (
                                      <h6 className="text-muted f-w-400">
                                        {s.service_name}
                                      </h6>
                                    );
                                  }
                                })}
                              </div>
                              <div className="col-sm-6">
                                <p className="m-b-10 f-w-600">Status: </p>
                                <h6 className="text-muted f-w-400">
                                  {item.status}
                                </h6>
                              </div>
                              <hr />
                            </div>
                          );
                        }
                      })}
                    </div>
                  </div>
                </div>
                <div className="row m-l-0 m-r-0">
                  <div className="col-sm-8">
                    <div className="card-block">
                      <h6 className="m-b-20 p-b-5 b-b-default f-w-600">
                        Appointment History
                      </h6>
                      <div className="row" style={{ height: "200px" }}>
                        <div className="col-sm-6">
                          <p className="m-b-10 f-w-600">Details</p>
                          <button
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModal"
                            data-backdrop="false"
                          >
                            See Details
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-scrollable modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Appointment History
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <table style={{ width: "1300px" }}>
                <tr style={{ "background-color": "#03442D", color: "white" }}>
                  <th>Title</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Date Created</th>
                  <th>Phone</th>
                  <th>Note</th>
                  <th>Status</th>
                  <th>Service</th>
                  <th>Estimated Price</th>
                  <th>Details</th>
                </tr>

                {getFilterApp().map((item) => {
                  const formattedDateApp = new Date(
                    item.date_created
                  ).toLocaleDateString("en-US");

                  // getService(item.service)

                  return (
                    <>
                      <tr>
                        <td>{item.title}</td>
                        <td>{item.date}</td>
                        {time.map((time) => {
                          if (time.id === item.time) {
                            return <td>{time.time}</td>;
                          }
                        })}

                        <td>{formattedDateApp}</td>
                        <td>{item.phone}</td>
                        <td>{item.note}</td>
                        <td>{item.status}</td>
                        {selectedService.map((i) => {
                          if (i.id === item.service) {
                            return (
                              <>
                                <td>{i.service_name}</td>
                                <td>{i.price}</td>
                              </>
                            );
                          }
                        })}
                        {result.map((a) => {
                          if (a.appointment === item.id) {
                            console.log(item.id)
                            return (
                              <td>
                                <Link to={`/result/${a.id}`}>
                                  <button
                                    type="button"
                                    data-bs-dismiss="modal"
                                    style={{
                                      width: "70px",
                                      height: "30px",
                                      backgroundColor: "maroon",
                                      fontSize: "13px",
                                    }}
                                  >
                                    Details
                                  </button>
                                </Link>
                              </td>
                            );
                          }
                        })}
                      </tr>
                    </>
                  );
                })}
              </table>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="edit"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit
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
                    placeholder={pet.pet_name}
                    className="form-control"
                    onChange={handlechange}
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
                    placeholder={pet.animal_type}
                    className="form-control"
                    onChange={handlechange}
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
                    placeholder={pet.breed}
                    className="form-control"
                    onChange={handlechange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="gender" className="col-form-label">
                    Gender:
                  </label>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    name="gender"
                    onChange={handlechange}
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
                    name="fixed"
                    onChange={handlechange}
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
                className="btn btn-danger"
                data-bs-dismiss="modal"
                onClick={() => {
                  const confirmBox = window.confirm(
                    "Are you sure? All records about this pet will be deleted."
                  );
                  if (confirmBox === true) {
                    PetDelete();
                  }
                }}
              >
                Delete Pet
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={petUpdate}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PetDetails;
