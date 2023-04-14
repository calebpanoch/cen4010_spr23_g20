// Initialize Parse
Parse.initialize("JVrGVwgQsCwWg2WmUP3TTJxGa3OABHCOpgkikbQI", "NxY9i597NxYHFPeyGfB8BoKUgYUwcvXLQTzUUlDZ"); //PASTE HERE YOUR Back4App APPLICATION ID AND YOUR JavaScript KEY
Parse.serverURL = "https://parseapi.back4app.com/";

const currentUser = Parse.User.current();

if (currentUser) {    
    document.getElementById("username").innerHTML = currentUser.getUsername()
    currentUsername = currentUser.getUsername()
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

function likePost(objectId) {
    if (!event) {
        event = window.event; // Older versions of IE use 
                              // a global reference 
                              // and not an argument.
    };

    var el = (event.target || event.srcElement); // DOM uses 'target';
                                                 // older versions of 
                                                 // IE use 'srcElement'
    queryTest = new Parse.Query(Posts);
    queryTest.equalTo("objectId",objectId)
    queryTest.first().then(function(result) {
        if (result.get("likes").find(x => x==currentUsername) == null) {
            result.addUnique("likes",currentUsername)
            result.save()
            el.innerHTML = "Likes " + result.get("likes").length + " &#x1F44D"
        }

    });
    
    
}

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
                                <li>  <button onclick="likePost('POSTIDHERE')" class="bg-indigo-500 hover:bg-indigo-100 text-black font-bold py-1 px-1 rounded">Likes NUMLIKESHERE &#x1F44D</button>
                                <p id="liked"></p> </li>
                                <li>  <button onclick="Repost()" class="bg-indigo-500 hover:bg-indigo-100 text-black font-bold py-1 px-1 rounded">Repost &#x1F501</button> 
                                <p id="reposted"></p> </li>
                                <li>  <button onclick="Share()" class="bg-indigo-500 hover:bg-indigo-100 text-black font-bold py-1 px-1 rounded">Share &#x1F639</button> 
                                <p id="shared"></p> </li>

                            </ul>
                        </div>

                        <h3 class="font-sans text-lg"style="padding: 1%;"> CAPTIONHERE
                        </h3>
                    </div>
                </div>`

var postNum = 0
query = new Parse.Query(Posts);

function loadPosts(numPosts) {
    query.addDescending("createdAt")
    query.limit(numPosts)
    query.skip(postNum)
    postNum = postNum + numPosts
    postList = query.find()
    query.find().then(function(results) {
        for (let step = 0; step < numPosts; step++) {
          // Runs 5 times, with values of step 0 through 4.
           replaceUsername = newPost.replace("USERNAMEHERE", results[step].get("poster"))
           replaceTitle = replaceUsername.replace("TITLEHERE", results[step].get("title"))
           replaceCaption = replaceTitle.replace("CAPTIONHERE", results[step].get("caption"))
           replaceImg = replaceCaption.replace("IMGSRCHERE", results[step].get("image")._url)
            replaceLikes = replaceImg.replace("NUMLIKESHERE", results[step].get("likes").length)
            replacePostId = replaceLikes.replace("POSTIDHERE", results[step].id)

           $('#posts').append(replacePostId);
        }
    });
}

loadPosts(5);

//window scroll function
$(window).scroll(function() {
    if($(window).scrollTop() + $(window).height() == $(document).height()) {
        loadPosts(5);
    }
 });