/*7. A matrix is an array of arrays, representing a grid with rows and columns. Use this task to experiment with matrices!
    * Can you add a single number to an existing row?
    * Can you add a whole new row of numbers?
    * Can you remove a single number from a single row?
    * Can you reverse one of the rows without affecting the others
*/
const arr = [
    [0,1,2,3,4,5,6,7,8,9],
    [10,11,12,13,14,15,16,17,18,19],
    [20,21,22,23,24,25,26,27,28,29]
  ]
  
  // Type your code below this line!

module.exports = function task7() {
    // Adding a single number to the first row
    arr[0].push(10); // Adds 10 to the end of the first row

    // Adding a new row of numbers
    arr.push([30, 31, 32, 33, 34, 35, 36, 37, 38, 39]); // Adds a new row at the end

    // Removing a single number from the second row
    arr[1].splice(5, 1); // Removes the number at index 5 from the second row

    // Reversing the third row
    arr[2].reverse(); // Reverses the third row in place

    // Printing the modified matrix
    arr.forEach(row => console.log(row));
}
// Type your code above this line!