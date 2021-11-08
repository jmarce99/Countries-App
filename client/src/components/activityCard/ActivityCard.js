import React from "react";
import styles from "../modules/ActivityCard.module.css";

const ActivityCard = ({ name, difficulty, duration, season, countries }) => {
  let difficultyToText = ""

  if(difficulty === "1") difficultyToText ="Begginer"
  if(difficulty === "2") difficultyToText ="Amateur"
  if(difficulty === "3") difficultyToText ="Normal"
  if(difficulty === "4") difficultyToText ="Professional"
  if(difficulty === "5") difficultyToText ="Expert"

  let timeSplit = duration.split(":");
  let timeValues = `${timeSplit[0] === "00" ? `${timeSplit[1]} minutes` : `${timeSplit[0]} hours and ${timeSplit[1]} minutes`}`;

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h2>{name}</h2>
      </div>

      <div className={styles.data}>
        <ul>
          <li>
            <h3 className={styles.dah3}>difficulty : </h3>
            <span>{difficulty ? difficultyToText : ""}</span>
          </li>
          <li>
            <h3 className={styles.dah3}>duration :</h3>
            <span>{duration ? timeValues : ""}</span>
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
