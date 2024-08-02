//imports
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";

const Navbar = () => {
  //all the states for the navbar
  const [results, setResults] = useState([
    {
      name: " ",
      email: " ",
      age: 0,
      gender: " ",
    },
  ]);
  const [filtereddata, setFilteredData] = useState(results);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [isResultsVisible, setIsResultsVisible] = useState(false);
  const searchContainerRef = useRef(null);


  //to handle the search functionality
  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim() === "") return;
    axios
      .get(`/api/v1/student/getstudents?query=${query}`)
      .then((response) => {
        const details = response.data;
        console.log(details.data);
        setResults(details.data);
        setIsResultsVisible(true);
      })
      .catch((error) => {
        console.log("Unable to get search data from api endpoint", error);
      });
  };

  //to handle the click outside and the search box
  const handleClickOutside = (e) => {
    if (
      searchContainerRef.current &&
      !searchContainerRef.current.contains(e.target)
    ) {
      setIsResultsVisible(false);
    }
  };
  //to handle the search box when it is clicked 
  //useEffect for the click outside every time the search box is clicked
  
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  //HTML PART
  return (
    <header>
      <nav className="navbar navbar-expand-lg bg-body-secondary">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            Student
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={() => setOpen(!open)}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className={`${!open ? "collapse" : ""} navbar-collapse`}
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav me-auto mb-4 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link" href="/">
                  Link
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/">
                  Link
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/">
                  Link
                </a>
              </li>
            </ul>
            <form className="d-flex" role="search" ref={searchContainerRef}>
              <input
                className="form-control me-4"
                type="search"
                value={query}
                placeholder="Search"
                aria-label="Search"
                onChange={(e) => {
                  //handling the changes that happens when I type on the search bar
                  handleSearch(e);
                  setQuery(e.target.value);
                  const filtereditems = results.filter((items) =>
                    items.name
                      .toLowerCase()
                      .includes(e.target.value.toLowerCase())
                  );
                  //storing all the filtered data on the state vaariable(filtereddata)
                  setFilteredData(filtereditems);
                }}
              />
              <button
                className="btn btn-outline-success"
                type="submit"
                //to prevent page reload on click the search button
                onClick={(e) => {
                  e.preventDefault();
                }}
              >
                Search
              </button>
              {isResultsVisible && (
                <div className="position-absolute mt-5  bg-light max-h-100 overflow-auto z-1000 border rounded p-4 shadow">
                  {/* mapping through the filtered data and displaying the results */}

                  {filtereddata.length > 0 ? (
                    filtereddata.map((result, index = 0) => {
                      return (
                        <div className="mb-4" key={result.name}>
                          {`${index + 1}) ${result.name} with id: ${result.id}`}
                          <hr />
                        </div>
                      );
                    })
                  ) : (
                    <div>No results found</div>
                  )}
                </div>
              )}
            </form>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
