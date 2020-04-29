import React from "react";

import ReactFileReader from "react-file-reader";
import Button from "@material-ui/core/Button";

const GetList = (handleFunc) => (
    <ReactFileReader handleFiles={handleFunc} fileTypes={".csv"}>
      <Button className="btn" variant="contained">
        Upload
      </Button>
    </ReactFileReader>
  );
export default GetList;