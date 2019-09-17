module.exports = class Statistics {
  constructor() {}

  average(array) { return(array.reduce((x, y) => x + y, 0) / array.length); }

  median(array) {
    if (array.length === 1) { return array[0]; }
    array = array.sort((a, b) => a - b);
    let midpoint = array.length / 2;
    return midpoint % 1 ? array[midpoint - 0.5] : (array[midpoint - 1] + array[midpoint]) / 2;
  }

  mode(array) {
    var out = [];
    var arr = [];
    var i, number, max = 0;

    for (const item of array) {
      arr[item] = (arr[item] || 0) + 1;
      if (arr[item] > max) { max = arr[item]; }
    }

    for (i in arr) {
      if (arr.hasOwnProperty(i)) {
        if (arr[i] === max) { out.push(Number(i).toFixed(2)); }
      }
    }

    return out;
  }
}
