import React from "react";

import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import styles from "./UploadedFileCard.module.css";

const UploadedFile = (list, resetFunc) => {
  console.log(list);
  return (
    <Card className={styles.root}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {list[0].name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Last Modified Date: {new Date(list[0].lastModified).toDateString()}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="secondary" onClick={resetFunc}>
          reset
        </Button>
      </CardActions>
    </Card>
  );
};

export default UploadedFile;
