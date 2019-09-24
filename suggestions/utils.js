const ALL = 0;
const VEGAN = 1;
const GLUTEN_FREE = 2;

const intersectionLength = (arr1, arr2) => {
    return arr1.filter(val => {
        return arr2.indexOf(val) !== -1;
    }).length;
};

const sumArray = (arr) => {
    let sum = 0;
    for (let val in arr) sum += val;
    return sum;
}



module.exports = {
    intersectionLength,
    sumArray,
    ALL,
    VEGAN,
    GLUTEN_FREE
};