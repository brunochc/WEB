/*5. Create a constructor for a FriendsList object that will store a list of names in an array.
    * Your program should prompt the user for a number, then prompt that number of times to list each name one at a time.
    * Your program should then print the array directly to the console.
        * The output should look like this: `[ 'name1', 'name2' ]`
*/


// Type your code below this line!

const prompt = require("prompt-sync")();

function FriendsList(names) {
    this.names = names;
}

const count = Number(prompt("cuantos nombres quieres ingresar? "));
const names = [];
for (let i = 0; i < count; i++) {
    names.push(prompt("Ingrese nombre: "));
}

const friends = new FriendsList(names);
console.log(friends.names);

// Type your code above this line!

