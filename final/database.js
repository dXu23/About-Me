//Declare the database
var db = new Dexie("promise_DB");
db.version(1).stores({
    //Promise Name, datetime it is due, and the priority of promise
    promises: "++id, name, datetime, priority, status" 
});

var priorityEnum = {
    A: 1,
    B: 2,
    C: 3
}

function toHTML(name, id, priority, date) {
    /*
    var item = "<li id = '' class = 'mdc-list-item'>\n <span class = 'mdc-list-item__text'> </span class = 'mdc-list-item__text__secondary'></span></li>";
    var itemJS = $(item);
    itemJS.attr('id', id);
    itemJS.addClass(priority);
    itemJS.find('.mdc-list-item__text').prepend(name);
    itemJS.find('.mdc-list-item__text__secondary').append(date)
    console.log("toHTML was a success!");
    return itemJS;
    */
    
    return "<li id = '" + id + "'" + " class = 'mdc-list-item " + priority + "'>\n" + "<span class = 'mdc-list-item__text'>\n" + name 
     + "<span class = 'mdc-list-item__text__secondary'>\n" + date + "\n</span>\n" + "\n</span>\n" +
     "<button class = 'mdc-button mdc-button--raised done'><i class = 'material-icons mdc-button__icon'>done</i>Done</button>" + "</li>\n";
}

function done(e) {
    console.log("In function done...\n");
    e.currentTarget.remove();
}

function check() {
    if ($("#A").is(":checked")) {
        return 'A';
    } else if ($("#B").is(":checked")) {
        return 'B';
    } else if ($("#C").is(":checked")) {
        return 'C';
    }
}

function render(mode) {
    var scontent = "";
    db.promises.orderBy(mode).each(function(promise) {
        //console.log(toHTML(promise.name, promise.id, promise.priority, promise.datetime));
        scontent += toHTML(promise.name, promise.id, promise.priority, promise.datetime); //+= toHTML(promise.name, promise.id, promise.priority, promise.datetime);
        //console.log("Foo bar!");
    }).then(function() {
        //console.log("3.14159265358979323846264338327950288419716939937510582097494459230781640628");
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
        console.log("in onSubmit...");
        //Open the database
        // Add the promise name and its due date to the database
        db.open().then(function() {
            // Sanity checkers: 
            //console.log("promiseName: " + $("#promiseName").val());
            //console.log("dateTime: " + $("#dateTime").val());
            // Append the promise to the objectStore promiseList which is in the database promiseDB
            var html;
            db.promises.put({name: $("#promiseName").val(), priority: check(), datetime: $("#dateTime").val()}).then(function() {
                render(db.promises, "datetime");
            }).catch(function(error) {
                console.log("Error:" + error);
            });
        }).catch((reason) => {
            console.log("Reason why failed: " + reason);
        });
        console.log("Good night, world!");
    }
    
    document.getElementById("submitPromise").addEventListener("click", onSubmit);
    document.getElementByClassName("done").addEventListener("click", done);
    
});