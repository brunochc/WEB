/*
let scoops = 7

while (scoops > 0) {        //mientras scoops sea mayor que cero hacer: entrara con un valor 7
    scoops = scoops - 1     //luego de la primera comparacion, scoops tendra un nuevo valor "6"
    console.log(`Now you have ${scoops} scoops`)     // mostrara ese valor por pantalla
        if (scoops < 3 & scoops > 0) {
            console.log(`Just ${scoops} scoops left`)
        }   else if (scoops == 0) {
            console.log(`thats all boy`) 
        }
}

console.log(`life without scream hit hard`)
*/

const word = "bottles";
let count = 99;
while (count > 0) {
    console.log(count + " " + word + " of rootbeer on the wall");
    console.log(count + " " + word + " of rootbeer,");
    console.log("Take one down, pass it around,");
    count = count - 1;
    if (count > 0) {
        console.log(count + " " + word + " of rootbeer on the wall.");
    } else {
        console.log("no more " + word + " of rootbeer on the wall.");
    }
}