import { List } from "@material-ui/core";

export const getMatchBacks = (listData, matchBackData) => {
  return new Promise((resolve, reject) => {
    let matchBackArray = [];
    if (listData[0]["Address 1"]) {
      matchBackData.forEach((matchBackRow) => {
        for (let i = 0; i < listData.length; i++) {
          if (matchBackRow["Address"] == listData[i]["Address 1"]) {
            matchBackArray.push(listData[i]);
            break;
          }
        }
      });
      resolve(matchBackArray);
    }
    reject(false)
  }).catch((e) => {
    console.log("caught an error no address");
    return false;
  });
};
