export const sliceArray = (array, sliceSize) => {
  const slicedArray = [];
  for (let i = 0; i < array.length; i += sliceSize) {
    slicedArray.push(array.slice(i, i + sliceSize));
  }
  return slicedArray;
};

export const formatDate = dateString => {
  const date = new Date(dateString);

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const formattedDate = `${year}년 ${month}월 ${day}일`;
  return formattedDate;
};

export const throttle = (handler, timeout = 300) => {
  let invokedTime;
  let timer;
  return function (...args) {
    if (!invokedTime) {
      handler.apply(this, args);
      invokedTime = Date.now();
    } else {
      clearTimeout(timer);
      timer = window.setTimeout(
        () => {
          if (Date.now() - invokedTime >= timeout) {
            handler.apply(this, args);
            invokedTime = Date.now();
          }
        },
        Math.max(timeout - (Date.now() - invokedTime), 0),
      );
    }
  };
};
