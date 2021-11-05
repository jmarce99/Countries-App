import React from "react";
import { FaLinkedin, FaGithubSquare } from "react-icons/fa";
import { Link } from "react-router-dom";

import styles from "../modules/Nav.module.css";

const Nav = () => {
  return (
      <div className={styles.container}>
          <div className={styles.nav}>
      <div className={styles.henry}>
        <h2>HENRY PI</h2>
        <h1>COUNTRIES APP</h1>
      </div>
      <div className={styles.nav_links}>
        <span>
          <Link to="/">HOME</Link>
        </span>

        <span>
          <Link to="/countries">COUNTRIES</Link>
        </span>

        <span>
          <Link to={`/addactivity`}>ADD ACTIVITY </Link>
        </span>
      </div>
      <div className={styles.nav_falinks}>
        <a
          href="https://www.linkedin.com/in/jmarce99/"
          target="_blank"
          rel="noreferrer"
        >
          <FaLinkedin className={styles.icon} />
        </a>
        <a href="https://github.com/jmarce99" target="_blank" rel="noreferrer">
          <FaGithubSquare className={styles.icon} />
        </a>
      </div>
    </div>
      </div>
    
  );
};

export default Nav;
