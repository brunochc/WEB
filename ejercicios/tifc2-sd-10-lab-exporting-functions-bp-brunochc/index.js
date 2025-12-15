// DO NOT MODIFY THIS FILE!

// Your 7 tasks are located in separate files.
// Open task1.js to begin.
import promptSync from "prompt-sync";
import * as task1 from "./task1.js";
import * as task2 from "./task2.js";
import * as task3 from "./task3.js";
import * as task4 from "./task4.js";
import * as task5 from "./task5.js";
import * as task6 from "./task6.js";
import * as task7 from "./task7.js";

let task;

if (process.argv[3]) {
  task = parseInt(process.argv[2]);
} else {
  const prompt = promptSync();
  task = parseInt(prompt("Run task [1-7]: "));
};

const prompt = promptSync();
switch (task) {
  case 1:
    globalThis.costCalculator = task1.costCalculator;
    const amount = parseInt(prompt("Enter a amount: "));
    console.log(costCalculator(amount));
    break;
  case 2:
    globalThis.FriendNames = task2.FriendNames;
    const friend1 = prompt("Enter first friend name: ");
    const friend2 = prompt("Enter second friend name: ");
    const friend3 = prompt("Enter third friend name: ");
    let inputNames = new FriendNames(friend1, friend2, friend3);
    console.log(inputNames);
    break;
  case 3:
    globalThis.ageCalculator = task3.ageCalculator;
    
    let y = prompt("Enter year: ");
    let m = prompt("Enter month: ");
    let d = prompt("Enter day: ");
    let learnerAnswer = ageCalculator(y, m, d);
    let today = new Date();
    let birthday = new Date(y, m, d);
    let age = today.getFullYear() - birthday.getFullYear();
    let theMonth = today.getMonth() - birthday.getMonth();

    if (theMonth < 0x0 || 0x0 === theMonth && today.getDate() < birthday.getDate()) {
      age--;
    }

    if (learnerAnswer === age) {
      console.log("Successful");
    }

    break;
  case 4:
    globalThis.FriendAge = task4.FriendAge;

    let name = prompt("Enter friend name: ");
    let year = prompt("Enter year: ");
    let month = prompt("Enter month: ");
    let day = prompt("Enter day: ");
    let friend = new task4.FriendAge(name, year, month, day);
    let output = friend.returnAge();
    let today4 = new Date();
    let birthday4 = new Date(year, month, day);
    let age4 = today4.getFullYear() - birthday4.getFullYear();
    let month4 = today4.getMonth() - birthday4.getMonth();

    if (month4 < 0x0 || 0x0 === month4 && today4.getDate() < birthday4.getDate()) {
      age4--;
    }

    let testAnswer4 = name + " is " + age4 + " today!";

    if (output === testAnswer4) {
      console.log('Successful');
    }

    break;
  case 5:
    globalThis.rubricPassFail = task5.rubricPassFail;
    let score5 = parseInt(prompt("Enter a score: "));
    console.log(rubricPassFail(score5));
    break;
  case 6:
    globalThis.rubricExcellent = task6.rubricExcellent;
    let score6 = parseInt(prompt("Enter a score: "));
    console.log(rubricExcellent(score6));
    break;
  case 7:
    globalThis.rubricPerfect = task7.rubricPerfect;
    let score7 = parseInt(prompt("Enter a score: "));
    console.log(rubricPerfect(score7));
}