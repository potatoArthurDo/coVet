import Navbar from "../components/Navbar";
import Banner from "../components/Banner";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api";



function Appointment() {
  const [pet, setPet] = useState([]);

  const [service, setService] = useState("");
  const [time, setTime] = useState("");

  const [title, setTitle] = useState("");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");
  const [date, setDate] = useState("");

  const [pet_id, setPetID] = useState(0);
  const [selectedService, setSelectedService] = useState([]);
  const [selectedTime, setSelectedTime] = useState([]);

  const initialFormData = Object.freeze({
    title:"",
    date:"",
    time:"",
    note:"",
    service:"",
    pet_id:"",
  });
  const [AppointmentData, updateAppointmentData] = useState(initialFormData);

  const handlechange = (e) => {
    updateAppointmentData({
      ...AppointmentData,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("title", AppointmentData.title);
    formData.append("date", AppointmentData.date);
    formData.append("time", AppointmentData.time);
    formData.append("note", AppointmentData.note);
    formData.append("service", AppointmentData.service);
    formData.append("pet_id", AppointmentData.pet_id);
    api
      .post("/api/appointments/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (res.status === 201) alert("Appointment Created");
        else alert("Creating failed");
      })
      .catch((err) => {console.log(err)
      alert("Please choose other date and time")});
    // window.location.reload()

  };

  useEffect(() => {
    getPets();
    getService();
    getTime();
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

  const getService = () => {
    api
      .get("/api/services/")
      .then((res) => res.data)
      .then((data) => {
        setSelectedService(data);
        console.log(data);
      })
      .catch((err) => alert(err));
  };

  const getTime = () => {
    api
      .get("/api/time/")
      .then((res) => res.data)
      .then((data) => {
        setSelectedTime(data);
        console.log(data);
      })
      .catch((err) => alert(err));
  };

  const createAppointment = (e) => {
    e.preventDefault();
    api
      .post("/api/appointments/", {
        title,
        date,
        time,
        note,
        service,
        pet_id,
      })
      .then((res) => {
        if (res.status === 201) alert("Appointment created");
        else alert("Creating failed");
      })
      .catch((err) => console.log(err));
  };
  console.log(AppointmentData);
  return (
    <>
      <Navbar />
      {/* <Banner  state = "instruction"/> */}
      <br />
      <div className="container d-flex justify-content-center">
        <form style={{ width: "26rem" }}>
          <div data-mdb-input-init className="form-outline mb-4">
            <label className="form-label" for="form4Example1">
              Pet:
            </label>
            <select
              className="form-select"
              aria-label="Default select example"
              name="pet_id"
              onChange={handlechange}
            >
              <option selected>Choose a pet</option>
              {pet.map((item) => { return (
              <option value={item.id} key={item.id}>{item.pet_name} </option>
            )})}
            </select>
          </div>

          <div data-mdb-input-init className="form-outline mb-4">
            <label className="form-label" for="form4Example2">
              Title
            </label>
            <input
              type="text"
              id="form4Example2"
              className="form-control"
              name="title"
              onChange={handlechange}
              required
            />
          </div>

          <div data-mdb-input-init className="form-outline mb-4">
            <label className="form-label" for="form4Example3">
              Service
            </label>
            <select
              className="form-select"
              aria-label="Default select example"
              name="service"
              required
              onChange={handlechange}
            >
              <option selected>Choose an option </option>
              {selectedService.map((item) => { return (
              <option value = {item.id} key={item.id}>{item.service_name} </option>
            )})}
            </select>
          </div>

          <div data-mdb-input-init className="form-outline mb-4">
            <label className="form-label" for="form4Example2">
              Date
            </label>
            <input
              type="date"
              id="form4Example2"
              className="form-control"
              name="date"
              onChange={handlechange}
            />
          </div>
          <div data-mdb-input-init className="form-outline mb-4">
            <label className="form-label" for="form4Example2">
              Time
            </label>
            <select
              className="form-select"
              aria-label="Default select example"
              name="time"
              onChange={handlechange}
              required
            >
              <option selected>Choose an option </option>
              {selectedTime.map((item) => { return (
              <option value={item.id} key={item.id}>{item.time}</option>
            )})}
            </select>
          </div>

          <div data-mdb-input-init className="form-outline mb-4">
            <label className="form-label" for="form4Example2">
              Phone Number:
            </label>
            <input
              type="tel"
              id="form4Example2"
              className="form-control"
              name="phone"
              onChange={handlechange}
              required
              pattern="[0-9]{10}"
            />
          </div>
          <div data-mdb-input-init className="form-outline mb-4">
            <label className="form-label" for="form4Example2">
              Note:
            </label>
            <textarea class="form-control" id="form4Example3" rows="4" onChange={handlechange} name="note"></textarea>
          </div>

          <button
            data-mdb-ripple-init
            type="button"
            className="btn btn-primary btn-block mb-4"
            onClick={handleSubmit}
            style={{"color": "#f7ecd0", "backgroundColor": "#03442D"}}
          >
            Send
          </button>
        </form>
      </div>
      {/* <div className="appointment-section">
        <div className="appointment-form">
          <table>
            <tr>
              <th>Pet:</th>
              <td>
                <select
                  name="pets"
                  id="pets-options"
                  onChange={(e) => setPetID(e.target.value)}
                  value={pet_id}
                >
                  {pet.map((item) => {
                    return <option value={item.id}>{item.pet_name}</option>;
                  })}
                </select>
              </td>
            </tr>
            <tr>
              <th>Title:</th>
              <td>
                <input
                  type="text"
                  name="title"
                  required
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
                />
              </td>
            </tr>

            <tr>
              <th>Service:</th>
              <td>
                <select
                  name="services"
                  id="services"
                  onChange={(e) => setService(e.target.value)}
                  value={service}
                >
                  {selectedService.map((service) => {
                    return (
                      <option value={service.service_name}>
                        {service.service_name}
                      </option>
                    );
                  })}
                </select>
              </td>
            </tr>
            <tr>
              <th>Date:</th>
              <td>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                  name="date"
                />
              </td>
            </tr>
            <tr>
              <th>Time:</th>
              <td>
                <select
                  name="time"
                  id="time"
                  onChange={(e) => setTime(e.target.value)}
                  value={time}
                >
                  <option value="choose_time">Choose Time:</option>
                  {selectedTime.map((time) => {
                    return <option value={time.time}>{time.time}</option>;
                  })}
                </select>
              </td>
            </tr>
            <tr>
              <th>Phone:</th>
              <td>
                <input
                  type="phone"
                  required
                  onChange={(e) => setPhone(e.target.value)}
                  value={phone}
                />
              </td>
            </tr>
            <tr>
              <th>Note:</th>
              <td>
                <textarea
                  name="note"
                  id="note"
                  cols={25}
                  rows={10}
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                ></textarea>
              </td>
            </tr>
            <tr>
              <td colSpan="2">
                <Link>
                  <button type="submit" onClick={createAppointment}>
                    Book Visit
                  </button>
                </Link>
              </td>
            </tr>
          </table>
        </div>
      </div> */}
    </>
  );
}

export default Appointment;
