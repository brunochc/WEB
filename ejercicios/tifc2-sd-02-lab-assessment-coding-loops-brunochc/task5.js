const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question("How many lines do you want to generate? ", function(answer) {
  const numLines = parseInt(answer, 10);
  if (!isNaN(numLines) && numLines > 0) {
    for (let i = 0; i < numLines; i++) {
      console.log(`This is Task Five! Line ${i + 1}`);
    }
  } else {
    console.log("Please enter a valid positive number.");
  }
  rl.close();
});