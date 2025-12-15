// DO NOT MODIFY THIS FILE!

const task1 = require('./task1.js')
const task2 = require('./task2');
const task3 = require('./task3.js');
const task4 = require('./task4.js');

// Your 7 tasks are located in separate files.
// Open task1.js to begin.

let task;
let args;

if (process.argv[2]) {
  task = parseInt(process.argv[2]);
  args = process.argv.slice(2);
} else {
  const prompt = require("prompt-sync")();
  task = parseInt(prompt("Run task [1-7]: "));
};

switch (task) {
  case 1:
    task1();
    break;
  case 2:
    task2();
    break;
  case 3:
    task3();
    break;
  case 4:
    task4();
    break;
  case 5:
    require('./task5.js');
    break;
  case 6:
    require('./task6.js');
    break;
  case 7:
    require('./task7.js');
}
