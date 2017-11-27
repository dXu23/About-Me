
//Declare the database
var db = new Dexie("promise_DB");
db.version(1).stores({
    //Promise Name and the datetime it is due
    promises: "++id, name, datetime, priority" 
})


function log(txt) {
    $("#pending").append("<li>" + txt + "</li>");
}

$(document).ready(function() {
    db.open().then(function() {
        console.log("Appending stored data to Pending Promsies tab...").then(function() {
        db.promises.orderBy("datetime").each(promise => log(promise.name));
        });
    })
    
    //When button is clicked, open the database and add user's input data
    $("#submitPromise").click(function() {
        //Open the database
        // Add the promise name and its due date to the database
        db.open().then(function() {
            console.log($("#promiseName").val());
            console.log($("#dateTime").val());
            db.promises.add({name: $("#promiseName").val(), datetime: new Date($("#dateTime").val())}).then(function() {
                log(JSON.stringify(db.promises, null, 2));
            });
        }).catch((reason) => {
            console.log("Reason why failed: " + reason);
        });
        console.log("Good night, world!");
    });
    
});