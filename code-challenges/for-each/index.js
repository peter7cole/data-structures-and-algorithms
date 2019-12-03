'use strict';

const arr = [4, 8, 2];
const newArr = [];

for(let i=0; i < arr.length; i++){
  console.log(arr[i]);
}

arr.forEach((value) => {
  console.log(value);
});

arr.forEach((value, index, array) => {
  console.log('value = ', value, 'index = ', index, 'array = ', array);
});

arr.forEach(value => {
  newArr.push(value + 1); // won't work to use value++ b/c it changes a const
});


