import axios from "axios";
import React, { useEffect, useState } from "react";

const Home = () => {
  const [data, setData] = useState([]);
  const [deleted , setDeleted] = useState(true)
  
//sending request to api endpoint to get students
  useEffect(() => {
    if(deleted){
      setDeleted(false)
      axios
        .get("/api/v1/student/getstudents" ,data)
        .then((response) => {
          console.log(response.data.data);
          setData(response.data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
  }, [data,deleted]);
  

    const handleDelete=(id)=>{
      axios.delete(`/api/v1/student/delete/${id}`)
      .then((response)=>{
        setDeleted(true)
      }).catch((error)=>{
        console.log(error)
      })
    
    }
    //search filtering
    

  return (
    //TABLE HTML

    <div className="container">
      <h1 className="text-center mt-4">Student Details View Table </h1>
      <div className="container table-responsive p-4 bg-light border rounded my-4">
        <table className="table table-bordered table-hover">
          <thead className="thead-dark ">
            <tr className="text-center">
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Age</th>
              <th scope="col">Gender</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {data.map((item, index = 0) => (
              <tr key={item.id}>
                <th scope="row">{index + 1}</th>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.age}</td>
                <td>{item.gender}</td>
                <td>
                  <a
                    href={`/update/${item.id}`}
                    className="btn btn-success mx-4"
                  >
                    Edit
                  </a>
                <button className="btn btn-danger" onClick= {()=>handleDelete(item.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Button */}

      <div className="text-center">
        <a href="/create" className="btn btn-primary">
          Add More
        </a>
      </div>
    </div>
  );
};

export default Home;
