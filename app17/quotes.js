    function getQuote() {
        $.get("https://quotes.rest/qod.json", function(response) {
            console.log(response.contents.quotes[0].quote);
            console.log("Hello, world!");
            return 2;
            //return key.contents.quotes[0].quote;
            //console.log(response);
        }
    )
    console.log("Good night, world!");
    return 1 + 3;
    };
    
    getQuote();
    console.log(getQuote());
    console.log("Hello, world!");
    //console.log(message);
    //var message = getQuote();
    
    function say(msg) {
        var message = new SpeechSynthesis(msg);  
        window.speechSynthesis.speak(message);
    }
    
    
    //var quotesDB = new Dexie("quote");