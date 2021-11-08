import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import imagen from "../../assets/backgroundCountries.jpg";
import ActivityCard from "../activityCard/ActivityCard";

import Nav from "../nav/Nav";
// import Error404 from "../error404/Error404.js"

import styles from "../modules/SeeMore.module.css";
import { useSelector, useDispatch } from "react-redux";
import { fetchCountriesById, resetErrors } from "../../actions/index";
import Pagination from "../paginate/Pagination";
import Error404 from "../error404/Error404";

const SeeMore = () => {
  let countryData = useSelector((state) => state.countrieById);
  let activities = useSelector((state) => state.activities);
  let dispatch = useDispatch();
  let errors = useSelector((state) => state.errors);
  let { id } = useParams();
  let history = useHistory();

  const [currentPage, setCurrentPage] = useState(1);
  const [activitiesPerPage] = useState(1);

  useEffect(() => {
    dispatch(fetchCountriesById(id));
  }, [dispatch, id]);

  function errorFunction() {
    dispatch(resetErrors());
    alert("ERROR 404: Country Not Found");
    setTimeout(function () {
      history.push("/");
    }, 100);
  }

  //GET CURRENT COUNTRIES
  const indexOfLastActivity = currentPage * activitiesPerPage;
  const indexOfFirstActivity = indexOfLastActivity - activitiesPerPage;
  const currentActivities = activities.slice(
    indexOfFirstActivity,
    indexOfLastActivity
  );

  //CHANGE PAGE
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const totalPages = activities.length / activitiesPerPage;


  return (
    <div className={styles.container}>
      <img className={styles.countryimg} src={imagen} alt="background-img" />
      <div className={styles.arriba}>
        <Nav />
      </div>
      <div className={styles.abajo}>
        {errors ? (
          errorFunction()
        ) : (
          <div className={styles.data}>
            <div className={styles.izqdata}>
              <div className={styles.izqdata_up}>
                <div className={styles.imgcircle}>
                  <img
                    className={styles.dataimg}
                    src={countryData ? countryData.flag : ""}
                    alt="country-img"
                  />
                </div>
                <h2>{countryData ? countryData.name : ""}</h2>
              </div>
              <div className={styles.izqdata_down}>
                <h2>Country Data</h2>
                <ul>
                  <li>
                    <h3>Code: </h3>
                    <span>{countryData ? countryData.id : ""}</span>
                  </li>
                  <li>
                    <h3>Capital:</h3>
                    <span>{countryData ? countryData.capital : ""}</span>
                  </li>
                  <li>
                    <h3>Subregion:</h3>
                    <span>{countryData ? countryData.subregion : ""}</span>
                  </li>
                  <li>
                    <h3>Area: </h3>
                    <span>
                      {countryData
                        ? `${countryData.area
                            ?.toString()
                            .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")} KM²`
                        : ""}
                    </span>
                  </li>
                  <li>
                    <h3>Population:</h3>
                    <span>
                      {countryData
                        ? `${countryData.population
                            ?.toString()
                            .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}`
                        : ""}
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            <div className={styles.derdata}>
              <div className={styles.derdata_up}>
                <h2>Available Activities</h2>
              </div>
              {currentActivities.length ? (
                <div className={styles.derdata_down}>
                  <div className={styles.activityContainer}>
                    {errors ? (
                      <Error404 />
                    ) : (
                      currentActivities.map((activity) => (
                        <article
                          className={styles.activities_article}
                          key={activity.id}
                        >
                          <ActivityCard
                            name={activity.name}
                            difficulty={activity.difficulty}
                            duration={activity.duration}
                            season={activity.season}
                            countries={activity.countries}
                            className={styles.activity_card}
                          />
                        </article>
                      ))
                    )}
                  </div>
                  <div className={styles.paginationContainer}>
                    <div className={styles.pagination}>
                      <Pagination
                        totalPages={totalPages}
                        currentPage={currentPage}
                        paginate={paginate}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <h2 className={styles.error}>Activities not found</h2>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SeeMore;
