
//Declare the database
var db = new Dexie("promise_DB");
db.version(1).stores({
    //Promise Name, datetime it is due, and the priority of promise
    promises: "++id, name, datetime, priority" 
});


function toHTML(name, date) {
    return "<li class = 'mdc-list-item>" + "<span class = 'mdc-list-item__text'>" + name 
    + "</span>" + "<span class = 'mdc-list-item__text__secondary'>" + date + "</span>" + "</li>";
}

function render(objStore, mode) {
    var scontent = "";
    objStore.orderBy(mode).each(function(promise) {
        scontent += toHTML(promise.name, promise.datetime);
    }).then(function() {
        console.log(scontent);
        $("#pending").html(scontent);
    }).catch(function(error) {
        console.log("Error in function render: " + error);
    })
}

$(document).ready(function() {
    // add onSumbmit event so that when button with id submitPromise is clicked, 
    // function onSumbit is called
    
    db.open().then(function() {
        render(db.promises, "datetime");
    }).catch(function(error) {
        console.log("Error in initial render...:" + error);
    });
    
    // onSubmit function
    function onSubmit() {
        //Open the database
        // Add the promise name and its due date to the database
        db.open().then(function() {
            // Sanity checkers: 
            //console.log("promiseName: " + $("#promiseName").val());
            //console.log("dateTime: " + $("#dateTime").val());
            // Append the promise to the objectStore promiseList which is in the database promiseDB
            var html;
            db.promises.put({name: $("#promiseName").val(), datetime: $("#dateTime").val()}).then(function() {
                render(db.promises, "datetime");
                /*
                db.promises.orderBy("dateTime").each(function(item) {
                    html += "<li class = 'mdc-list-item'>" + item.name + "</li>";
                }).then(function() {
                    console.log(html);
                    $("#pending").html(html);
                    */
            }).catch(function(error) {
                console.log("Error:" + error);
            });
        }).catch((reason) => {
            console.log("Reason why failed: " + reason);
        });
        console.log("Good night, world!");
    }
    
    document.getElementById("submitPromise").addEventListener("click", onSubmit);

    
});