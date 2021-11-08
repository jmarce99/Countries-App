import React from "react";

//IMPORTS ICONS
import { BsFillCircleFill } from "react-icons/bs";
import { BsArrowLeftShort } from "react-icons/bs";
import { BsArrowRightShort } from "react-icons/bs";

//IMPORTS STYLES
import styles from "../modules/Pagination.module.css";

const Pagination = ({ totalPages, currentPage, paginate }) => {
  //RENDER
  let errors = 0;
  return (
    <nav className={styles.nav}>
      <div
        className={styles.btn1}
        onClick={() => {
          currentPage - 1 > 0
            ? paginate(currentPage - 1)
            : errors++;
        }}
      >
        <BsArrowLeftShort className={styles.arrow1} />
        <BsFillCircleFill className={styles.pagCircle1} />
      </div>

      <div className={styles.navigationpages}>
        <div className={styles.previusPages}>
          <h3>{currentPage - 3 > 0 ? `${currentPage - 3}` : ""}</h3>
          <h3>{currentPage - 2 > 0 ? `${currentPage - 2}` : ""}</h3>
          <h3>{currentPage - 1 > 0 ? `${currentPage - 1}` : ""}</h3>
        </div>

        <div className={styles.currentPage}>
          <h2>{currentPage}</h2>
        </div>

        <div className={styles.nextPages}>
          <h3>
            {currentPage + 1 < totalPages + 1 ? `${currentPage + 1}` : ""}
          </h3>
          <h3>
            {currentPage + 2 < totalPages + 1 ? `${currentPage + 2}` : ""}
          </h3>
          <h3>
            {currentPage + 3 < totalPages + 1 ? `${currentPage + 3}` : ""}
          </h3>
        </div>
      </div>
      <div
        className={styles.btn2}
        onClick={() => {
          currentPage + 1 < totalPages + 1
            ? paginate(currentPage + 1)
            : errors++;
        }}
      >
        <BsArrowRightShort className={styles.arrow2} />
        <BsFillCircleFill className={styles.pagCircle2} />
      </div>
    </nav>
  );
};

export default Pagination;
