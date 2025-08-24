import React from "react";
import styles from "./Toolbar.module.scss";

export default function Toolbar({ onCreate, onDownload }) {
  return (
    <div className={styles.toolbar}>
      <div className="col-7">
        <h1 style={{ fontSize: "20px" }}>Professional CV Generator</h1>
      </div>
      <button className={styles.createBtn} onClick={onCreate}>Create New CV</button>
    </div>
  );
}
