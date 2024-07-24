import Navbar from "../components/Navbar";
import "../styles/Profile.css";
import api from "../api";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Profile() {
  useEffect(() => {
    getProfile();
  }, []);

  // get all profile
  const [profile, setProfile] = useState([]);
  const getProfile = () => {
    api
      .get(`/api/profiles/`)
      .then((res) => res.data)
      .then((data) => {
        setProfile(data);
      })
      .catch((err) => alert(err));
  };

  // formdata to post edit

  // const profile_data = profile[0]
  // console.log(profile_data)
  const initialUpdateProfileFormData = Object.freeze({
    name: profile.name,
    email: profile.email,
    phone: profile.phone,
  });

  const [updateProfile, setUpdateProfile] = useState(
    initialUpdateProfileFormData
  );

  const handleChange = (e) => {
    setUpdateProfile({
      ...updateProfile,
      [e.target.name]: e.target.value.trim(),
    });
  };
  console.log(updateProfile);

  //update profile
  const ProfileUpdate = (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("name", updateProfile.name);
    formData.append("email", updateProfile.email);
    formData.append("phone", updateProfile.phone);
    api
      .put(`/api/profile-update/${profile[0].id}/`, formData)
      .then((res) => {
        if (res.status === 200) alert("Profile Updated");
        else alert("Update Failed");
      })
      .catch((err) => console.log(err));
    window.location.reload();
  };

  return (
    <>
      <Navbar />
      <br />
      <div className="profile-page" style={{ textAlign: "center" }}>
        <h1>Personal Info</h1>
        {profile.map((item) => {
          return (
            <>
              <div className="container emp-profile">
                <form method="post">
                  <div className="row">
                    <div className="col-md-4">
                      <div className="profile-img">
                        <img
                          src="https://localwebdesigncompany.com/newdesign9/wp-content/uploads/sites/94/2019/05/Avatar_female-1.png"
                          alt=""
                          style={{ height: "200px", width: "200px" }}
                        />
                        <div className="file btn btn-lg btn-primary">
                          Change Photo
                          <input type="file" name="file" />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="profile-head">
                        <h5>{item.name}</h5>
                        <ul className="nav nav-tabs" id="myTab" role="tablist">
                          <li className="nav-item">
                            <a
                              className="nav-link active"
                              id="home-tab"
                              data-toggle="tab"
                              href="#home"
                              role="tab"
                              aria-controls="home"
                              aria-selected="true"
                            >
                              About
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              className="nav-link"
                              id="appointment-tab"
                              data-toggle="tab"
                              href="#appointment"
                              role="tab"
                              aria-controls="appointment"
                              aria-selected="false"
                            >
                              Appointment
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className="col-md-2">
                      <input
                        type="button"
                        className="profile-edit-btn"
                        name="btnAddMore"
                        value="Edit Profile"
                        data-bs-toggle="modal"
                        data-bs-target="#edit"
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-4"></div>
                    <div className="col-md-8">
                      <div className="tab-content profile-tab" id="home">
                        <div
                          className="tab-pane fade show active"
                          id="home"
                          role="tabpanel"
                          aria-labelledby="home-tab"
                        >
                          <div className="row">
                            <div className="col-md-6">
                              <label>User Id</label>
                            </div>
                            <div className="col-md-6">
                              <p>#{item.id}</p>
                            </div>
                          </div>

                          <div className="row">
                            <div className="col-md-6">
                              <label>Name</label>
                            </div>
                            <div className="col-md-6">
                              <p>{item.name}</p>
                            </div>
                          </div>

                          <div className="row">
                            <div className="col-md-6">
                              <label>Email</label>
                            </div>
                            <div className="col-md-6">
                              <p>{item.email}</p>
                            </div>
                          </div>

                          <div className="row">
                            <div className="col-md-6">
                              <label>Phone</label>
                            </div>
                            <div className="col-md-6">
                              <p>{item.phone}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        className="tab-pane fade"
                        id="appointment"
                        role="tabpanel"
                        aria-labelledby="appointment-tab"
                      >
                        <div className="row">
                          <div className="col-md-6">
                            <label>Experience</label>
                          </div>

                          <div className="col-md-6">
                            <p>Expert</p>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-md-6">
                            <label>Hourly Rate</label>
                          </div>
                          <div className="col-md-6">
                            <p>10$/hr</p>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-md-6">
                            <label>Total Projects</label>
                          </div>
                          <div className="col-md-6">
                            <p>230</p>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-md-6">
                            <label>English Level</label>
                          </div>
                          <div className="col-md-6">
                            <p>Expert</p>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-md-6">
                            <label>Availability</label>
                          </div>
                          <div className="col-md-6">
                            <p>6 months</p>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-md-12">
                            <label>Your Bio</label>
                            <br />
                            <p>Your detail description</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
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
                        Profile Update
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
                        <div className="mb-3" style={{ textAlign: "start" }}>
                          <label htmlFor="name" className="col-form-label">
                            Name:
                          </label>
                          <input
                            type="text"
                            name="name"
                            id="name"
                            required
                            placeholder={profile[0].name}
                            className="form-control"
                            onChange={handleChange}
                          />
                        </div>
                        <div className="mb-3" style={{ textAlign: "start" }}>
                          <label htmlFor="email" className="col-form-label">
                            Email:
                          </label>
                          <input
                            type="email"
                            name="email"
                            id="email"
                            required
                            placeholder={profile[0].email}
                            className="form-control"
                            onChange={handleChange}
                          />
                        </div>
                        <div className="mb-3" style={{ textAlign: "start" }}>
                          <label htmlFor="Phone" className="col-form-label">
                            Phone:
                          </label>
                          <input
                            type="number"
                            name="phone"
                            id="phone"
                            required
                            placeholder={profile[0].phone}
                            className="form-control"
                            onChange={handleChange}
                          />
                          <br />
                          <div className="chang-password">
                            <Link to="/changepassword">
                              <button
                                data-bs-dismiss="modal"
                                style={{
                                  height: "40px",
                                  width: "200px",
                                  padding: "0",
                                  backgroundColor: "none",
                                }}
                              >
                                Change Password
                              </button>
                            </Link>
                          </div>
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
                        onClick={ProfileUpdate}
                        style={{ backgroundColor: "#03442D", color: "#f7ecd0" }}
                      >
                        Save changes
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
}
export default Profile;
