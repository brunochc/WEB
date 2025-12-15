// Type your code below this line!

function Mail(subj, msg) {
    this.subject = subj
    this.message = msg
    this.printMail = function() {
        console.log(this.subject + ": " + this.message)
    }
    
// Type your code above this line!
}
function task3() {

    const prompt = require("prompt-sync")();
    // Type your code below this line!
    const subject = prompt();
    const message = prompt();
    const newMail = new Mail(subject, message);
    // Type your code above this line!
  
    newMail.printMail()

}

module.exports = task3;