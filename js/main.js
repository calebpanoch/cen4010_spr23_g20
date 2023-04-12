// Initialize Parse
Parse.initialize("JVrGVwgQsCwWg2WmUP3TTJxGa3OABHCOpgkikbQI", "NxY9i597NxYHFPeyGfB8BoKUgYUwcvXLQTzUUlDZ"); //PASTE HERE YOUR Back4App APPLICATION ID AND YOUR JavaScript KEY
Parse.serverURL = "https://parseapi.back4app.com/";

const currentUser = Parse.User.current();

if (currentUser) {    
    document.getElementById("username").innerHTML = currentUser.getUsername()
} else {
    location.href = 'login.html';
}

var Posts = Parse.Object.extend("Posts");

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

function logout() {
    Parse.User.logOut()
    location.href = 'login.html'
}

// Add on click listener to call the create parse user function
document.getElementById("logout").addEventListener("click", async function () {
  logout();
});

var newPost = `<div  class="center" align="center" style="margin: auto; padding-top: 2%; padding-bottom: 2%; max-width: 50%;">
                    <div class="bg-white bg-opacity-0 text-black contents"> 
                        <div class="pfp">
                            <img src="./assets/pfp.jpg" style="max-width: 3%;">
                            <p style="padding-left: 10px">USERNAMEHERE</p>
                        </div>
                        <h2 class="text-3xl font-serif text-center"style="padding-bottom: 2%;">
                        TITLEHERE
                        </h2>
                        <div class="center">
                        <img src=IMGSRCHERE style="padding: 1%">

                        </div> 
                        <div class=" lg:flex items-center ml-auto text-pink">
                            <ul class="flex space-x-8">
                                <li>  <button onclick="displayLike()">Like</button> 
                                <p id="liked"></p> </li>
                                <li>  <button onclick="Repost()">Repost</button> 
                                <p id="reposted"></p> </li>
                                <li>  <button onclick="Share()">Share</button> 
                                <p id="shared"></p> </li>
                                <li>  <button onclick="uploadPost()">Upload</button> 
                                <p id="uploadPost"></p> </li>

                            </ul>
                        </div>

                        <h3 class="font-sans text-lg"style="padding: 1%;"> CAPTIONHERE
                        </h3>
                    </div>
                </div>`

var postNum = 0
query = new Parse.Query(Posts);

query.addDescending("createdAt")
query.limit(5)
query.skip(postNum)
postNum = postNum + 5
postList = query.find()
query.find().then(function(results) {
    console.log()
    for (let step = 0; step < 5; step++) {
      // Runs 5 times, with values of step 0 through 4.                
        repalceUsername = newPost.replace("USERNAMEHERE", results[step].get("author").get("username"))
       replaceTitle = repalceUsername.replace("TITLEHERE", results[step].get("title"))
       replaceCaption = replaceTitle.replace("CAPTIONHERE", results[step].get("caption"))
       replaceIMG = replaceCaption.replace("IMGSRCHERE", results[step].get("image")._url)

       $('#posts').append(replaceIMG);
    }
})

$(window).scroll(function() {
   if($(window).scrollTop() + $(window).height() == $(document).height()) {
       
        
        query.addDescending("createdAt")
        query.limit(5)
        query.skip(postNum)
        postNum = postNum + 5
        postList = query.find()
        query.find().then(function(results) {
            console.log()
            for (let step = 0; step < 5; step++) {
              // Runs 5 times, with values of step 0 through 4.                
                repalceUsername = newPost.replace("USERNAMEHERE", results[step].get("author").get("username"))
               replaceTitle = repalceUsername.replace("TITLEHERE", results[step].get("title"))
               replaceCaption = replaceTitle.replace("CAPTIONHERE", results[step].get("caption"))
               replaceIMG = replaceCaption.replace("IMGSRCHERE", results[step].get("image")._url)

               $('#posts').append(replaceIMG);
            }
        })
       
   }
});