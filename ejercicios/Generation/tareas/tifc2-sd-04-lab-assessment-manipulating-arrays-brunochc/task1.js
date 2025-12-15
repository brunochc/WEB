/*
# Instructions
Arrays are a simple data structure used everywhere in programming. There are many ways to interact with arrays in JavaScript.

**Today, you will be exploring arrays, and teaching yourselves different methods for manipulating them.**

For each of these tasks, type your code directly in the task file - the marking scripts will evaluate what you have written!

## Tasks

1. Use the `arr.push()` method to populate an empty array with the numbers 1 to 20, in order.
*/

module.exports = function task1() {
    const arr = [];
    
    // Type your code below this line!
    for (let i = 1; i <= 20; i++) {
        arr.push(i);
    }
    // Type your code above this line!
    
    arr.forEach(element => console.log(element));
}