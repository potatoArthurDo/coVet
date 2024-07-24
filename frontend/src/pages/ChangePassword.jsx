import Navbar from "../components/Navbar";
import api from "../api";
import { useState } from "react";

function ChangePassword() {
  const [user, setuser] = useState("");

  const updatePassword = (e) => {
    e.preventDefault();
    api
      .put("/api/updatePassword/", user)
      .then((res) => {
        if (res.status === 200) alert("Password Updated");
        else alert("Update Failed");
      })
      .catch((err) => console.log(err));
  };
  console.log(user);
  return (
    <>
      <Navbar />
      <br />
      <div className="password-form">
        <table>
          <tr>
            <th>New password:</th>
            <td>
              <input
                type="password"
                name="password"
                onChange={(e) => setuser(e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <th>Re-password</th>
            <td>
              <input type="password" />
            </td>
          </tr>
          <tr style={{ alignItems: "center" }}>
            <td colSpan="2">
              <button style={{ width: "100px" }} onClick={updatePassword}>Confirm</button>
            </td>
          </tr>
        </table>
      </div>
    </>
  );
}

export default ChangePassword;
