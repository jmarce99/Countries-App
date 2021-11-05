import React from "react";
import styles from "../modules/ActivityCard.module.css";

const ActivityCard = ({ name, difficulty, duration, season, countries }) => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h2>{name}</h2>
      </div>

      <div className={styles.data}>
        <ul>
          <li>
            <h3 className={styles.dah3}>difficulty : </h3>
            <span>{difficulty ? difficulty : ""}</span>
          </li>
          <li>
            <h3 className={styles.dah3}>duration :</h3>
            <span>{duration ? duration : ""}</span>
          </li>
          <li>
            <h3 className={styles.dah3}>season : </h3>
            <span>{season ? season : ""}</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ActivityCard;
