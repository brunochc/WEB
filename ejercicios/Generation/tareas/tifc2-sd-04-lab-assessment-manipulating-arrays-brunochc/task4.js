//4. Use the `arr.splice()` method to delete one of the two duplicate numbers in the given array.

module.exports = function task4(){

const arr = [1,2,3,4,5,5,6,7,8,9,10,11,12,13,14]

// Type your code below this line!

arr.splice(5, 1); // Elimina un elemento en el índice 5 (el segundo 5)

// Type your code above this line!

arr.forEach(element => console.log(element))

}