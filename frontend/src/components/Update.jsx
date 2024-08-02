import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
const Update = () => {
  const navigate = useNavigate()
  const [data , setData] = useState({
    name : '',
    email : '',
    age : 0,
    gender : ''
  })
  const { id } = useParams()

  useEffect(()=>{
    axios.get(`/api/v1/student/getstudents/${id}`,data)
    .then((response)=>{
      // console.log(response.data.data)
      setData(response.data.data)
    }).catch((error)=>{
      console.log(error)
    })
  },[id])
  // console.log(data)
  const handleFormSubmit=(e)=>{
    e.preventDefault()
    axios.put(`/api/v1/student/update/${id}`,data).then((response)=>{
      console.log(response)
      navigate('/')
    }).catch((error)=>{
      console.log(error)
    })
  }
  return (
    <div className="container bg-light mt-5 p-5 border rounded col-lg-4">
      <h1 className="text-center mt-3">Update Student Data</h1>
      <form onSubmit={handleFormSubmit} className="row">
        {/* Name Input */}
        <div className="my-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            value={data.name}
            type="text"
            className="form-control"
            id="name"
            aria-describedby="nameHelp"
            onChange={(e) => setData( { ...data, name: e.target.value })}
          />
        </div>
        {/* Email Input */}
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
          value={data.email}
            type="email"
            className="form-control"
            id="email"
            onChange={(e) => setData({ ...data, email: e.target.value })}
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
          value={data.age}
            type="number"
            className="form-control"
            id="age"
            aria-describedby="ageHelp"
            onChange={(e) => setData({ ...data, age: e.target.value })}
          />
        </div>
        {/* Gender Input */}
        <div className="mt-3">
          <label htmlFor="gender" className="form-label">
            Gender
          </label>
          <input
          value={data.gender}
            type="text"
            className="form-control"
            id="gender"
            aria-describedby="genderHelp"
            onChange={(e) => setData({ ...data, gender: e.target.value })}
          />
        </div>

        {/* Button */}
        <button type="submit" className="btn btn-primary mt-4">
          Submit
        </button>
      </form>
    </div>
  )
}

export default Update