import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "reactstrap";
import axios from "axios";
import "./App.css";
import moment from "moment";
import * as utility from "./utility";

let baseUrl = "http://localhost:4000/";
let userId = "";

function App() {
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [dob, setDob] = useState("");
  const [users, setUsers] = useState([]);
  const [modal, setModal] = useState(false);

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    getUsersDetails();
  }, users[0]);

  const toggle = () => setModal(!modal);

  let resetForm = () => {
    setName("");
    setEmail("");
    setAddress("");
    setDob("");
  };

  let getUsersDetails = async () => {
    const response = await axios.get(`${baseUrl}api/Users/GetAll`);
    const { status } = response;

    if (status == 200) {
      await setUsers(response["data"]["data"]);
    }
  };

  let handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let response: any;
    let obj = {
      name: name,
      email: email,
      address: address,
      dob: dob
    };

    if (editMode == true) {
      response = await axios.post(`${baseUrl}api/Users/Update/${userId}`, obj);
      setEditMode(false);
    } else {
      response = await axios.post(`${baseUrl}api/Users/Save`, obj);
    }
    await utility.processStatus(response);

    await getUsersDetails();
    await resetForm();
  };

  let updateUser = async (id: any) => {
    await setEditMode(true);
    const response = await axios.get(`${baseUrl}api/Users/GetUser/${id}`);
    let user = response["data"]["data"];

    userId = user["_id"];
    setName(user["name"]);
    setEmail(user["email"]);
    setDob(moment(user["dob"]).format("YYYY-MM-DDTHH:mm"));
    setAddress(user["address"]);
  };

  let deleteUser = async () => {
    const response = await axios.get(`${baseUrl}api/Users/Delete/${userId}`);
    await utility.processStatus(response);

    userId = "";
    toggle();
    await getUsersDetails();
  };

  const closeBtn = (
    <button className="close" onClick={toggle}>
      &times;
    </button>
  );

  return (
    <div className="container">
      <Card>
        <CardHeader>
          <div className="col text-center">
            <h3>
              <b>User Details</b>
            </h3>
          </div>
        </CardHeader>
        <CardBody>
          <div className="row">
            <div className="col-md-6">
              <form onSubmit={handleSubmit} className="form-group">
                <div className="form-group">
                  <label htmlFor="name">Name:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email address:</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    disabled={editMode}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="dob">DOB:</label>
                  <input
                    type="datetime-local"
                    className="form-control"
                    id="dob"
                    value={dob}
                    onChange={e => setDob(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="address">Address:</label>
                  <textarea
                    className="form-control"
                    id="address"
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-primary">
                  {editMode ? "Update" : "Submit"}
                </button>
              </form>
            </div>
            <div className="col-md-6">
              <table className="table" id="usersTable">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Edit</th>
                    <th scope="col">Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {users.length != 0
                    ? users.map(user => {
                        return (
                          <tr key={user["_id"]}>
                            <td>{user["name"]}</td>
                            <td>{user["email"]}</td>
                            <td>
                              <i
                                className="far fa-edit"
                                style={{ fontSize: "22px", color: "#4469db" }}
                                onClick={() => updateUser(user["_id"])}
                              ></i>
                            </td>
                            <td>
                              <i
                                className="far fa-trash-alt"
                                style={{ fontSize: "22px", color: "#4469db" }}
                                onClickCapture={() => {
                                  setEditMode(false);
                                  resetForm();
                                  userId = user["_id"];
                                }}
                                onClick={toggle}
                              ></i>
                            </td>
                          </tr>
                        );
                      })
                    : null}
                </tbody>
              </table>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Confirmation Box */}
      <div>
        <Modal isOpen={modal} toggle={toggle} className="model">
          <ModalHeader toggle={toggle} close={closeBtn}>
            Confirm
          </ModalHeader>
          <ModalBody>
            <h4 className="col text-center">
              Are you sure to delete the entry?
            </h4>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={deleteUser}>
              I'm Sure
            </Button>{" "}
            <Button color="secondary" onClick={toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    </div>
  );
}

export default App;
