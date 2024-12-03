import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
const Contact = () => {
  const [users, setUsers] = useState([]);
  const [inputs, setInputs] = useState({});

  function getUsers() {
    axios
      .get("http://localhost/chatapi/fetch_users.php")
      .then(function (response) {
        console.log(response.data);
        setUsers(response.data);
      });
  }

  useEffect(() => {
    getUsers();
  }, []);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post("http://localhost/chatapi/add_massage.php", inputs);
    console.log(inputs);
  };

  return (
    <div className="Contact py-2">
      <div className="container-fluid">
        <div className="row d-flex justify-content-center">
          <div className="col-4  me-1 bg-primary-subtle rounded">
            <div className="d-flex p-3 justify-content-start align-items-center px-3">
              <h1 style={{ color: "black" }}>Contacts</h1>
            </div>
            <ul className="list-group list-group-light pb-5">
              {users.map((user, index) => (
                <li
                  className="list-group-item px-3 my-1 border-0 rounded bg-secondary-subtle"
                  aria-current="true"
                >
                  <a href={"/" + user.id} className="text-decoration-none">
                    <div className="d-flex justify-content-between align-items-center">
                      <img
                        src="https://via.placeholder.com/50"
                        alt="placeholder"
                        className="rounded-circle"
                        style={{ width: "75px", height: "75px" }}
                      />
                      <h2 style={{ color: "black" }}>{user.name}</h2>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-7 p-1 bg-primary-subtle rounded position-relative">
            <div className="d-flex justify-content-between align-items-center p-2 fixed-top position-absolute">
              <img
                src="https://via.placeholder.com/50"
                alt="placeholder"
                className="rounded-circle"
                style={{ width: "75px", height: "75px" }}
              />
              <h2 style={{ color: "black" }}></h2>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="d-flex justify-content-between align-items-center p-2 fixed-bottom position-absolute">
                <input style={{display : "none"}}  />
                <input
                  type="text"
                  className="form-control p-3 position-relative"
                  placeholder="Type a message"
                  name="message"
                  onChange={handleChange}
                />
                <button
                  className="btn bg-secondary-subtle fs-4 position-absolute"
                  style={{ right: 15 }}
                >
                  <i class="bi bi-send bg-secondary-subtle"></i>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
