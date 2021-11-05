import React from "react";
import styles from "../modules/Home.module.css";
import { FaLinkedin } from "react-icons/fa";
import { FaGithubSquare } from "react-icons/fa";
import { Link } from "react-router-dom";
import imagen from "../../assets/backgroundHome.jpg"
const Home = () => {
  return (
    <div className={styles.container}>
      <img
        className={styles.bkgimagen}
        src={imagen}
        alt="background-img"
      />
      <div className={styles.nav}>
        <h2>HENRY PI</h2>
        <div className={styles.navlinks}>
          <a href="https://www.linkedin.com/in/jmarce99/" target="_blank" rel="noreferrer">
            <FaLinkedin className={styles.icon} />
          </a>
          <a href="https://github.com/jmarce99" target="_blank" rel="noreferrer">
            <FaGithubSquare className={styles.icon} />
          </a>
        </div>
      </div>
      <div className={styles.home}>
        <div className={styles.titles}>
          <h1 className={styles.primary}>COUNTRIES APP</h1>
          <h2 className={styles.secondary}>
            A SIMPLE FULL STACK WEB INTEGRATION
          </h2>
        </div>
        <div className={styles.prueba}>
          <span style={{ l: "¡H" }}>¡H</span>
          <span style={{ l: "e" }}>e</span>
          <span style={{ l: "l" }}>l</span>
          <span style={{ l: "l" }}>l</span>
          <span style={{ l: "0!" }}>0!</span>
        </div>
        <span className={styles.start}>
          <Link to="/countries">START</Link>
        </span>
      </div>
      <div className={styles.designby}>
        <h2>DESIGN AND DEVELOPMENT: JULIO FERNANDEZ</h2>
      </div>
    </div>
  );
};

export default Home;
