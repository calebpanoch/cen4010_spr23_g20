Parse.initialize("JVrGVwgQsCwWg2WmUP3TTJxGa3OABHCOpgkikbQI", "NxY9i597NxYHFPeyGfB8BoKUgYUwcvXLQTzUUlDZ"); //PASTE HERE YOUR Back4App APPLICATION ID AND YOUR JavaScript KEY
Parse.serverURL = "https://parseapi.back4app.com/";

const currentUser = Parse.User.current();
if (currentUser) {
} else {
    location.href = 'login.html';
}


var TestObject = Parse.Object.extend("Posts");

$(document).ready(function() {
    console.log("JQuery Loaded");

    $("#post").on("click", function() {
        console.log("Button clicked");

        var fileUploadControl = $("#inputEl")[0];
        if (fileUploadControl.files.length > 0) {
            var file = fileUploadControl.files[0];
            var name = file.name;
            console.log("File Uploaded successfully" + name);

            //code to save file to Parse server
            var parseFile = new Parse.File(name, file);
            //save the object to Parse server
            parseFile.save().then(function() {
                //display the parse url
                console.log(parseFile.url());
                //pass the source of the image tag to the url
                $("#imageEl").attr("src", parseFile.url());
                //create a test object ID, set the field, save to parse database
                var testObj = new TestObject();
                //set the image in field column
                testObj.set("image", parseFile);
                testObj.set("title",document.getElementById("title").value)
                testObj.set("caption",document.getElementById("caption").value)
                testObj.set("author",currentUser)
                //save the Object ID to the database and show object ID in console
                testObj.save().then(function() {
                    console.log(testObj.id);
                })
            });
            location.href = 'index.html';
        }
    });
});