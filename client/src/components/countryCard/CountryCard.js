import React from "react";
import styles from "../modules/CountryCard.module.css";
import { Link } from "react-router-dom";

const CountryCard = ({ flag, name, continent, population, id }) => {
  return (
    <div className={styles.container}>
      <Link to={`/seemore/${id}`}>
        <div className={styles.country}>
          <img src={flag} alt="country-flag" />
          <h2>{name} </h2>
        </div>
        <div className={styles.data}>
          <h3>Continent : </h3>
          <h4 className={styles.da}>{continent}</h4>
          <h3>Population :</h3>
          <h4 className={styles.da}>{population}</h4>
        </div>
      </Link>
    </div>
  );
};

export default CountryCard;
