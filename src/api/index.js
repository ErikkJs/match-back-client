// Merge the two arrays: left and right
export const merge = (left, right) => {
  let resultArray = [],
    leftIndex = 0,
    rightIndex = 0;

  // We will concatenate values into the resultArray in order
  while (leftIndex < left.length && rightIndex < right.length) {
    if (
      left[leftIndex]["Customer Since"].getTime() <
      right[rightIndex]["Customer Since"].getTime()
    ) {
      resultArray.push(left[leftIndex]);
      leftIndex++; // move left array cursor
    } else {
      resultArray.push(right[rightIndex]);
      rightIndex++; // move right array cursor
    }
  }

  // We need to concat here because there will be one element remaining
  return resultArray
    .concat(left.slice(leftIndex))
    .concat(right.slice(rightIndex));
};

// Merge Sort Implentation (Recursion)
export const mergeSort = (unsortedArray) => {
  // No need to sort the array if the array only has one element or empty
  if (unsortedArray.length <= 1) {
    return unsortedArray;
  }
  // In order to divide the array in half, we need to figure out the middle
  const middle = Math.floor(unsortedArray.length / 2);

  // This is where we will be dividing the array into left and right
  const left = unsortedArray.slice(0, middle);
  const right = unsortedArray.slice(middle);

  // Using recursion to combine the left and right
  return merge(mergeSort(left), mergeSort(right));
};

export const Sort = (unsortedArray, FunctionToRun) => {
  return new Promise( (resolve,reject) => {
    resolve (mergeSort(unsortedArray))
  })
}
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
      console.log(matchBackArray)
      matchBackArray.sort((leftSide, rightSide) =>{
        console.log(leftSide, rightSide)
        if(rightSide["Customer Since"].getTime() > leftSide["Customer Since"].getTime()){
          return 1;
        }
        return -1;
      })
      resolve(matchBackArray);
    }
    reject(false);
  }).catch((e) => {
    console.log(e, "caught an error no address");
    return false;
  });
};
