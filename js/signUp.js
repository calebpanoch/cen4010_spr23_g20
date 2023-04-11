Parse.initialize("JVrGVwgQsCwWg2WmUP3TTJxGa3OABHCOpgkikbQI", "NxY9i597NxYHFPeyGfB8BoKUgYUwcvXLQTzUUlDZ"); //PASTE HERE YOUR Back4App APPLICATION ID AND YOUR JavaScript KEY
Parse.serverURL = "https://parseapi.back4app.com/";

function logIn() {
    // Create a new instance of the user class
    var user = Parse.User
        .logIn(user.get("username"), user.get("password")).then(function(user) {
            console.log('User created successful with name: ' + user.get("username") + ' and email: ' + user.get("email"));
    }).catch(function(error){
        console.log("Error: " + error.code + " " + error.message);
    });
}

function signUp() {
    // Create a new instance of the user class
    var user = new Parse.User();
    user.set("username", document.getElementById("username").value);
    user.set("password", document.getElementById("password").value);
    user.set("email", document.getElementById("email").value);
  
    // other fields can be set just like with Parse.Object
    //user.set("phone", "415-392-0202");
  
    user.signUp().then(function(user) {
        console.log('User created successful with name: ' + user.get("username") + ' and email: ' + user.get("email"));
        document.getElementById("errorOutput").innerHTML = ""
        
        console.log("AAAAAAAAAAAAAAAAAA");
        currUser = Parse.User.current();
        console.log(currUser)
        
        location.href = 'login.html';
    }).catch(function(error){
        console.log("Error: " + error.code + " " + error.message);
        document.getElementById("errorOutput").innerHTML = "Error: " + error.message
        console.log(error.code)
        if error.code == 203 {
            location.href = 'login.html';
        }
    });
    
}

document.getElementById("signUp").addEventListener("click", async function () {
  signUp();
});