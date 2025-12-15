module.exports = function task4() {

for (let i = 1; i < 106; i++) {
    let output = "";
    if (i % 3 === 0) output += "Fizz";
    if (i % 5 === 0) output += "Buzz";
    if (i % 7 === 0) output += "Woof";
    if (output === "") {
      console.log(i);
    } else {
      console.log(output);
    }
  };

}
