// Initialize Parse
Parse.initialize("JVrGVwgQsCwWg2WmUP3TTJxGa3OABHCOpgkikbQI", "NxY9i597NxYHFPeyGfB8BoKUgYUwcvXLQTzUUlDZ"); //PASTE HERE YOUR Back4App APPLICATION ID AND YOUR JavaScript KEY
Parse.serverURL = "https://parseapi.back4app.com/";



var Posts = Parse.Object.extend("Posts");

/*function create() {
    mypet = new Pet();
    mypet.set("caption", textName);

    mypet.save().then(function(pet){
         console.log('Pet created successful with name: ' + pet.get("name") + ' and age: ' + pet.get("agePet"));
    }).catch(function(error){
         console.log('Error: ' + error.message);
    });
}

create();
*/

function read() {
    query = new Parse.Query(Posts);
    console.log(document.getElementById("PostCaption").value)
    query.equalTo("caption", document.getElementById("PostCaption").value);
    query.first().then(function(caption){ 
        if(caption){
            document.getElementById("display").innerHTML = "Post Age: " + caption.get("updatedAt")
            document.getElementById("image").src = caption.get("image")._url
        } else {
           console.log("Nothing found, please try again");
        }
    }).catch(function(error){
        console.log("Error: " + error.code + " " + error.message);       
    });
}


// Create a new User
/*async function createParseUser() {
  // Creates a new Parse "User" object, which is created by default in your Parse app
  let user = new Parse.User();
  // Set the input values to the new "User" object
  user.set("username", document.getElementById("username").value);
  user.set("email", document.getElementById("email").value);
  user.set("password", document.getElementById("password").value);
  try {
    // Call the save method, which returns the saved object if successful
    user = await user.save();
    if (user !== null) {
      // Notify the success by getting the attributes from the "User" object, by using the get method (the id attribute needs to be accessed directly, though)
      alert(
        `New object created with success! ObjectId: ${
          user.id
        }, ${user.get("username")}`
      );
    }
  } catch (error) {
    alert(`Error: ${error.message}`);
  }
}*/

// Add on click listener to call the create parse user function
document.getElementById("createButton").addEventListener("click", async function () {
  read();
});