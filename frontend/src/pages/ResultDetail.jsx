import { useNavigate, useParams } from "react-router-dom";
import "../styles/ResultDetail.css";
import logo from "../assets/logo/covet-logo.png";
import { useEffect, useState } from "react";
import api from "../api";

function ResultDetail() {
  const { id } = useParams();
  const [result, setResult] = useState([]);
  const [profile, setProfile] = useState([]);
  const [appointment, setAppointment] = useState([]);
  const [service, setService] = useState([]);
  const [selectedService, setSelectedService] = useState([]);

  useEffect(() => {
    getResult();
    getProfile();
    getAppointments();
    getServices();
  }, []);

  const getFilterApp = () => {
    return appointment.filter((item) => {
      const foundApp = item.id;
      return foundApp === result.appointment;
    });
  };
  // console.log(getFilterApp()[0].id)
  // const getFilterService = () => {
  //     // getFilterApp()
  //     return service.filter((item) => {
  //         const foundService = item.id
  //         return foundService === getFilterApp()[0]
  // return foundService === appointment.filter((i) => {
  //     const foundApp = i.id
  //     return foundApp === result.appointment
  // }).service

  const getResult = () => {
    api
      .get(`/api/results/${id}`)
      .then((res) => res.data)
      .then((data) => {
        setResult(data);
      })
      .catch((err) => alert(err));
  };

  const getProfile = () => {
    api
      .get(`/api/profiles/`)
      .then((res) => res.data)
      .then((data) => {
        setProfile(data);
        // console.log(data);
      })
      .catch((err) => alert(err));
  };

  const getAppointments = () => {
    api
      .get(`/api/appointments/`)
      .then((res) => res.data)
      .then((data) => {
        setAppointment(data);
        // console.log(data);
      })
      .catch((err) => alert(err));
  };

  const getServices = () => {
    api
      .get(`/api/services/`)
      .then((res) => res.data)
      .then((data) => {
        setService(data);
        // console.log(data);
      })
      .catch((err) => alert(err));
  };
    console.log(appointment);

  return (
    <>
      <header className="top-bar align-center">
        <div className="top-bar-title"></div>
      </header>
      <div className="row expanded">
        <main className="columns">
          <div className="inner-container">
            <header className="row align-center">
              {/* <a className="button hollow secondary">
                <i className="ion ion-chevron-left"></i> Go Back to Purchases
              </a> */}
              &nbsp;&nbsp;
              <a className="button">
                <i className="ion ion-ios-printer-outline"></i> Print Invoice
              </a>
            </header>
            <section className="row">
              <div className="callout large invoice-container">
                <table className="invoice" >
                  <tr className="header">
                    <td className="">
                      <img src={logo} alt="Company Name" />
                    </td>
                    <td className="align-right">
                      <h2>Invoice</h2>
                    </td>
                  </tr>
                  <tr className="intro">
                    {profile.map((item) => {
                      return (
                        <>
                          <td className="">
                            Hello, {item.name}
                            <br />
                            Thank you for using our sevice
                          </td>
                          <td className="text-right">
                            <span className="num"> #{item.id}</span>
                            <br />
                            
                          </td>
                        </>
                      );
                    })}
                  </tr>
                  <tr className="details">
                    <td scolSpan="2">
                      <table>
                        <thead>
                          <tr>
                            <th className="id">Pet id</th>
                            <th className="desc">Description</th>
                            <th className="qty">Service</th>
                            <th className="amt">Price</th>
                            <th>Addition fee</th>
                            <th>Total</th>
                          </tr>
                        </thead>
                        <tbody>
                            {getFilterApp().map((item) => {
                                return (
                                    <>
                                    {service.map((i) => {
                                        if (i.id === item.service) {
                                            return (
                                                <>
                                                <td>{item.pet_id}</td>
                                                <td>{result.doctor_note}</td>
                                                <td>{i.service_name}</td>
                                                <td>{i.price}</td>
                                                <td>{result.addition_fee}</td>
                                                <td>{i.price + result.addition_fee}</td>
                                                </>
                                            )
                                        }

                                    })}
                                    </>
                                )
                            })}
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </table>

                <section className="additional-info">
                  <div className="row">
                    <div className="columns">
                      <h5>Payment Information</h5>
                      <p>
                        Credit Card
                        <br />
                        Card Type: Visa
                        <br />
                        &bull;&bull;&bull;&bull; &bull;&bull;&bull;&bull;
                        &bull;&bull;&bull;&bull; 1234
                      </p>
                    </div>
                  </div>
                </section>
              </div>
            </section>
          </div>
        </main>
      </div>
    </>
  );
}
export default ResultDetail;
