import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Create = () => {
  const [value, setValue] = useState({
    name: " ",
    email: " ",
    age: 0,
    gender: " ",
  });
  const navigate = useNavigate();
  const handleFormSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/api/v1/student/create", value)
      .then((response) => {
        console.log(response);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    //FORM html

    <div className="container bg-light mt-5 p-5 border rounded col-lg-4">
      <h1 className="text-center mt-3">Create Student Data</h1>
      <form onSubmit={handleFormSubmit} className="row">
        {/* Name Input */}
        <div className="my-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            aria-describedby="nameHelp"
            onChange={(e) => setValue({ ...value, name: e.target.value })}
            required
          />
        </div>
        {/* Email Input */}
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            onChange={(e) => setValue({ ...value, email: e.target.value })}
            required
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        {/* Age Input */}
        <div className="mt-3">
          <label htmlFor="age" className="form-label">
            Age
          </label>
          <input
            type="number"
            className="form-control"
            id="age"
            aria-describedby="ageHelp"
            onChange={(e) => setValue({ ...value, age: e.target.value })}
            required
          />
        </div>
        {/* Gender Input */}
        <div className="mt-3">
          <label htmlFor="gender" className="form-label">
            Gender
          </label>
          <input
            type="text"
            className="form-control"
            id="gender"
            aria-describedby="genderHelp"
            onChange={(e) => setValue({ ...value, gender: e.target.value })}
            required
          />
        </div>

        {/* Button */}
        <button type="submit" className="btn btn-primary mt-4">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Create;
