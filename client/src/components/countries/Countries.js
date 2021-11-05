import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

//IMPORTS ACTIONS
import { fetchCountries, resetErrors, setCountriesSort } from "../../actions";

//IMPORTS COMPONENTS
import CountryCard from "../countryCard/CountryCard";
import imagen from "../../assets/backgroundCountries.jpg";
import Pagination from "../paginate/Pagination";
import Error404 from "../error404/Error404";

//IMPORTS ICONS
import { FaLinkedin, FaGithubSquare } from "react-icons/fa";

//IMPORTS STYLES
import styles from "../modules/Countries.module.css";

const Countries = () => {
  //DEFINES USESELECTOR AND USEDISPATCH
  let countries = useSelector((state) => state.countries);
  let countriesSort = useSelector((state) => state.countriesSort);
  let selectedSort = useSelector((state) => state.selectedSort);
  let errors = useSelector((state) => state.errors);
  let dispatch = useDispatch();

  //DEFINES LOCALS STATES
  //const [filterByContinent, setFilterByContinent] = useState("");
  //const [filterByActivity, setFilterByActivity] = useState(""); 
  const [currentPage, setCurrentPage] = useState(1);
  const [countriesPerPage] = useState(8);

  //DEFINES USEEFFECT GET COUNTRIES
  useEffect(() => {
    dispatch(fetchCountries());
  }, [dispatch]);

  //FUNCTION SORT
  function sort(params) {
    dispatch(fetchCountries());
    if (params === "") {
      dispatch(setCountriesSort(""));
    } else {
      dispatch(setCountriesSort(params));
    }
  }

  //FUNCTION HANDLE SORT
  function handleSort(e) {
    const newEvent = e;
    setCurrentPage(1);
    if (inputName.value !== "") {
      inputName.value = "";
      dispatch(fetchCountries());
      dispatch(resetErrors());
      handleSort(newEvent);
    } else {
      if (selectedSort === e.target.id) {
        sort("");
      } else {
        sorts
          .filter((element) => element.id !== e.target.id)
          .map((element) => {
            return (element.checked = false);
          });
        sort(e.target.id);
      }
    }
  }

  //FUNCTION HANDLE CHANGE
  function handleChange(e) {
    dispatch(setCountriesSort(""));
    sorts.map((element) => {
      return (element.checked = false);
    });
    dispatch(fetchCountries(e.target.value));
    setCurrentPage(1);
    if (errors) {
      dispatch(resetErrors());
    } else {
      dispatch(resetErrors());
    }
  }

  //SORTS INPUTS
  const sorts = [];
  const sortA = document.getElementById("0");
  const sortB = document.getElementById("1");
  const sortA2 = document.getElementById("2");
  const sortB2 = document.getElementById("3");
  sorts.push(sortA, sortB, sortA2, sortB2);

  //GET INPUT NAME
  const inputName = document.getElementById("inputName");

  //GET CURRENT COUNTRIES
  const indexOfLastCountry = currentPage * countriesPerPage;
  const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
  const currentCountries = countriesSort.slice(
    indexOfFirstCountry,
    indexOfLastCountry
  );

  //CHANGE PAGE
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const totalPages = countries.length / countriesPerPage;

  //RENDER
  return (
    <div className={styles.container}>
      <img className={styles.countryimg} src={imagen} alt="background-img" />
      <div className={styles.izquierda}>
        <div className={styles.henry}>
          <h2>HENRY PI</h2>
          <h1>COUNTRIES APP</h1>
        </div>
        <div className={styles.searchbyname}>
          <h2>SEARCH COUNTRY BY NAME</h2>
          <input type="text" id="inputName" onChange={handleChange}></input>
        </div>
        <div className={styles.filterbycontinent}>
          <h2>FILTER BY CONTINENT</h2>
          <ul>
            <li>
              <input type="checkbox" name="africa" id="4" />
              <h3>Africa</h3>
            </li>
            <li>
              <input type="checkbox" name="america" id="5" />
              <h3>America</h3>
            </li>
            <li>
              <input type="checkbox" name="asia" id="6" />
              <h3>Asia</h3>
            </li>
            <li>
              <input type="checkbox" name="europa" id="7" />
              <h3>Europa</h3>
            </li>
            <li>
              <input type="checkbox" name="oceania" id="8" />
              <h3>Oceania</h3>
            </li>
          </ul>
        </div>
        <div className={styles.filterbyactivity}>
          <h2>FILTER BY ACTIVITY</h2>
          <ul>
            <li>
              <input type="checkbox" name="all" id="9" />
              <h3>All</h3>
            </li>
            <li>
              <input type="checkbox" name="climb" id="10" />
              <h3>Climb</h3>
            </li>
            <li>
              <input type="checkbox" name="dance" id="11" />
              <h3>Dance</h3>
            </li>
            <li>
              <input type="checkbox" name="dive" id="12" />
              <h3>Dive</h3>
            </li>
            <li>
              <input type="checkbox" name="skydive" id="13" />
              <h3>Sky Dive</h3>
            </li>
            <li>
              <input type="checkbox" name="wwim" id="14" />
              <h3>Swim</h3>
            </li>
            <li>
              <input type="checkbox" name="windsurf" id="15" />
              <h3>Windsurf</h3>
            </li>
          </ul>
        </div>
      </div>
      <div className={styles.derecha}>
        <div className={styles.der_arriba}>
          <div className={styles.der_arriba1}>
            <div className={styles.arriba1_links}>
              <Link to="/">
                <span>HOME</span>
              </Link>
              <Link to="/addactivity">
                <span>ADD ACTIVITY</span>
              </Link>
            </div>

            <div className={styles.navlinks}>
              <a
                href="https://www.linkedin.com/in/jmarce99/"
                target="_blank"
                rel="noreferrer"
              >
                <FaLinkedin className={styles.icon} />
              </a>
              <a
                href="https://github.com/jmarce99"
                target="_blank"
                rel="noreferrer"
              >
                <FaGithubSquare className={styles.icon} />
              </a>
            </div>
          </div>
          <div className={styles.sortby}>
            <h2>SORT BY :</h2>
            <ul>
              <li>
                <input type="checkbox" name="asc" id="0" onClick={handleSort} />
                <h3>Name Asc</h3>
              </li>
              <li>
                <input
                  type="checkbox"
                  name="desc"
                  id="1"
                  onClick={handleSort}
                />
                <h3>Name Desc</h3>
              </li>
              <li>
                <input type="checkbox" name="asc" id="2" onClick={handleSort} />
                <h3>Population Asc</h3>
              </li>
              <li>
                <input
                  type="checkbox"
                  name="desc"
                  id="3"
                  onClick={handleSort}
                />
                <h3>Population Desc</h3>
              </li>
            </ul>
          </div>
        </div>
        <div className={styles.countries_container}>
          <div className={styles.countries}>
            {errors ? (
              <Error404 />
            ) : (
              currentCountries.map((country) => (
                <article className={styles.countries_article} key={country.id}>
                  <CountryCard
                    id={country.id}
                    flag={country.flag}
                    name={country.name}
                    continents={country.continents}
                    population={country.population}
                    className={styles.countries_card}
                  />
                </article>
              ))
            )}
          </div>
        </div>
        <div className={styles.der_abajo}>
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            paginate={paginate}
            className={styles.pagination}
          />
        </div>
      </div>
    </div>
  );
};

export default Countries;
