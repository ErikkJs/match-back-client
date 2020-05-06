import React from "react";
import CsvDownload from "react-json-to-csv";
import styles from "./CsvExport.module.css";

let buttonStyles = {
  //pass other props, like styles
  boxShadow: "inset 0px 1px 0px 0px #e184f3",
  backgroundColor: "#87509C",
  borderRadius: "6px",
  border: "1px solid #a511c0",
  display: "inline-block",
  cursor: "pointer",
  color: "#ffffff",
  fontSize: "15px",
  fontWeight: "bold",
  padding: "6px 24px",
  textDecoration: "none",
  textShadow: "0px 1px 0px #9b14b3",
};
const csvDownload = (matchBackData, matchBackName) => {

    //lets add the filename of the matchback list to our string
  let fileName = `MatchedBacked_${matchBackName[0].name}`;

  return (
    <div className={styles.container}>
      <CsvDownload
        data={matchBackData}
        style={buttonStyles}
        filename={fileName}
      >
        Download Matchback List
      </CsvDownload>
    </div>
  );
};

export default csvDownload;
