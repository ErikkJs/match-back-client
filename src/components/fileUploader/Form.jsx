import React, { useState } from "react";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Stepper from "@material-ui/core/Stepper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import styles from "./Form.module.css";
import UploadedFile from "../UploadedFileCard/UploadedFileCard";
import GetList from "../UploadButton/UploadButton";

function getSteps() {
  return [
    "Upload A List",
    "Upload your csv files to compare",
    "Create Matchbacks",
  ];
}
export default function HorizontalLabelPositionBelowStepper() {
  const [activeStep, setActiveStep] = React.useState(0);

  const [list, setList] = useState(null);
  const [matchBack, setMatchBack] = useState(null);


  const steps = getSteps();

  function getStepContent(step) {
    console.log(list);
    switch (step) {
      case 0:
        return (
          <div className={styles.container}>
            {list 
              ? UploadedFile(list, resetList) 
              : GetList(handleList)}
          </div>
        );
      case 1:
        return (
          <div className={styles.container}>
            {matchBack
              ? UploadedFile(matchBack, resetMatchBack)
              : GetList(handleMatchBack)}
          </div>
        );
      case 2:
        return "Lets create the matchbacks!";
      default:
        return "Unknown step";
    }
  }
  const handleList = (file) => {
    if (file) {
      setList(file);
    }
  };
  const handleMatchBack = (file) => {
    if (file) {
      setMatchBack(file);
    }
  };
  const resetList = () => {
    setList(null);
  };
  const resetMatchBack = () => {
    setMatchBack(null);
  };
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    resetList();
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
            <div>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={styles.backButton}
              >
                Back
              </Button>
              <Button variant="contained" color="primary" onClick={handleNext}>
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
