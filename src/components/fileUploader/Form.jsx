import { getMatchBacks } from "../../api";
import React, { useState } from "react";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Stepper from "@material-ui/core/Stepper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import styles from "./Form.module.css";
import UploadedFile from "../UploadedFileCard/UploadedFileCard";
import GetList from "../UploadButton/UploadButton";
import csvDownload from "../CsvExport/CsvExport";

const CSV = require("csv-string");

const csvToJson = file => {
  let keys = file.shift();
  file = file.map(function (row) {
    return keys.reduce(function (obj, key, i) {
      obj[key] = row[i];
      return obj;
    }, {});
  });
  return file;
};

const cleanDateAttribute = listFile => {
  
  listFile = listFile.filter(row => typeof row["Customer Since"] != undefined)
  console.log(listFile)
  listFile.forEach((clientRow) => {
    clientRow["Customer Since"] ? clientRow['Customer Since'] = new Date(clientRow["Customer Since"].slice(0,-2)) : console.log("undefined");
    clientRow["Last Purchase Date"] ? clientRow['Last Purchase Date'] = new Date(clientRow["Last Purchase Date"].slice(0,-2)) : console.log("undefined");
  });
  return listFile;
};

const readFileAsync = file => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      let file = CSV.parse(reader.result);

      let jsonCsv = csvToJson(file);
      resolve(jsonCsv);
    };

    reader.readAsBinaryString(file);
  });
};

function getSteps() {
  return [
    "Upload A List",
    "Upload your CSV file to compare",
    "Create Matchback List",
  ];
}

export default function HorizontalLabelPositionBelowStepper() {
  const [activeStep, setActiveStep] = React.useState(0);

  const [list, setList] = useState(null);
  const [matchBack, setMatchBack] = useState(null);

  const [listData, setListData] = useState(null);
  const [matchBackData, setMatchBackData] = useState(null);

  const [matchBackCSV, setMatchBackCSV] = useState(null);

  const [errorMessage, setErrorMessage] = useState(null);

  const steps = getSteps();

  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <div className={styles.uploadSection}>
            {list ? UploadedFile(list, resetList) : GetList(handleList)}
          </div>
        );
      case 1:
        return (
          <div className={styles.uploadSection}>
            {matchBack
              ? UploadedFile(matchBack, resetMatchBack)
              : GetList(handleMatchBack)}
          </div>
        );
      case 2:
        return (
          <div className={styles.uploadSection}>
            {list ? (
              UploadedFile(list, resetList)
            ) : (
              <div>
                <Typography>You are missing a list</Typography>
              </div>
            )}
            {matchBack ? (
              UploadedFile(matchBack, resetMatchBack)
            ) : (
              <div>
                <Typography>You are missing a Match Back List</Typography>
              </div>
            )}
            {errorMessage ? (
              <div>
                <Typography>{errorMessage}</Typography>
              </div>
            ) : null}
            {list && matchBack && !matchBackCSV ? createCSVButton() : null}
            {matchBackCSV ? csvDownload(matchBackCSV, matchBack) : null}
          </div>
        );
      default:
        return "Unknown step";
    }
  }

  const createCSV = async () => {
    let matchMadeCSV = await getMatchBacks(listData, matchBackData);
    console.log(matchMadeCSV);
    matchMadeCSV ? setMatchBackCSV(matchMadeCSV) : handleError();
  };
  const handleList = async (file) => {
    if (file) {
      setErrorMessage(null);
      setList(file);
      setListData(cleanDateAttribute(await readFileAsync(file[0])))
    }
  };

  const handleMatchBack = async (file) => {
    if (file) {
      console.log(file)
      setErrorMessage(null);
      setMatchBack(file);
      setMatchBackData(await readFileAsync(file[0]));
    }
  };
  const handleError = () => {
    setErrorMessage(
      `List Is Invalid, Ensure An Address Field Exists In The List Supplied \n The Adress Column On Both Lists Should Be Named "Address"`
    );
    resetList();
  };

  const resetList = () => {
    setListData(null);
    setList(null);
    setMatchBackCSV(null);
  };
  const resetMatchBack = () => {
    setMatchBackData(null);
    setMatchBack(null);
    setMatchBackCSV(null);
  };
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const createCSVButton = () => {
    return (
      <Button className="btn" variant="contained" onClick={createCSV}>
        Create Matchback List
      </Button>
    );
  };

  const handleReset = () => {
    resetList();
    resetMatchBack();
    setActiveStep(0);
  };

  return (
    <div className={styles.container}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div className={styles.buttons}>
        {activeStep === steps.length ? (
          <div>
            <Typography className={styles.instructions}>
              All steps completed
            </Typography>
            <Button onClick={handleReset}>Reset</Button>
          </div>
        ) : (
          <div>
            {getStepContent(activeStep)}
            <div className={styles.buttons}>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={styles.backButton}
              >
                Back
              </Button>
              {activeStep === steps.length - 1 ? null : (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                >
                  Next
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
