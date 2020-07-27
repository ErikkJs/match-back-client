
export const getMatchBacks = (listData, matchBackData) => {
  return new Promise((resolve, reject) => {
    let matchBackArray = [];
    if (listData) {
      matchBackData.forEach((matchBackRow) => {
        for (let i = 0; i < listData.length; i++) {
          if (matchBackRow["Address"] === listData[i]["Address"]) {
            matchBackArray.push(listData[i]);
            break;
          }
        }
      });
      resolve(matchBackArray);
    }
    reject(false);
  }).catch((e) => {
    console.log(e, "caught an error no address");
    return false;
  });
};
