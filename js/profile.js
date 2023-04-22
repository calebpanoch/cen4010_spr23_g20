// Initialize Parse
Parse.initialize("JVrGVwgQsCwWg2WmUP3TTJxGa3OABHCOpgkikbQI", "NxY9i597NxYHFPeyGfB8BoKUgYUwcvXLQTzUUlDZ"); //PASTE HERE YOUR Back4App APPLICATION ID AND YOUR JavaScript KEY
Parse.serverURL = "https://parseapi.back4app.com/";

var Users = Parse.Object.extend("User");
var Posts = Parse.Object.extend("Posts");
var user = false;

var sPageURL = window.location.search.substring(1);
var sURLVariables = sPageURL.split('&');
for (var i = 0; i < sURLVariables.length; i++)
{
    var sParameterName = sURLVariables[i].split('=');
    if (sParameterName[0] == "user")
    {
        user = sParameterName[1]
        console.log(user)
        
        queryObj = new Parse.Query(Users);
        queryObj.equalTo("username",user)
        queryObj.first().then(function(result) {
            $("#usernamePlaceholder").html(user)
            $("#followersPlaceholder").html((result.get("followers")).length)
            $("#followingPlaceholder").html("n/a")
            $("#likesPlaceholder").html("n/a")
        });
    }
}

var newPost = `
<div id="posts" class=" flex justify-center items-center h-screen">
        <div class="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
              <div class="center" align="center" style="margin: auto; padding-top: 2%; padding-bottom: 2%; max-width: 100%;">
                    <div class="bg-white bg-opacity-0 text-black contents"> 
                        <div class=" lg:flex items-center ml-auto text-pink">
                            <button HIDDENHERE onclick="deletPost('POSTIDHERE')" class="bg-indigo-500 hover:bg-indigo-100 text-black font-bold py-1 px-1 rounded">Delete 🗑️</button>
                        </div>
                        <div class="pfp">
                            <img src="../assets/pfp.jpg" style="max-width: 3%;">
                            <a href="/profile/?user=USERNAMEHERE" style="padding-left: 10px">USERNAMEHERE</a>
                        </div>
                        <h2 class="text-3xl font-serif text-center"style="padding-bottom: 2%;">
                        TITLEHERE
                        </h2>
                        <div class="center">
                        <img src=IMGSRCHERE style="padding: 1%">

                        </div>
                         
                        <div class=" lg:flex items-center ml-auto text-pink">
                            <ul class="flex space-x-8">
                                <li>  <button onclick="likePost('POSTIDHERE')" class="likebutton">Likes NUMLIKESHERE &#x1F44D</button>
                                <p id="liked"></p> </li>
                                <li>  <button onclick="Repost()" class="repostbutton">Repost &#x1F501</button> 
                                <p id="reposted"></p> </li>
                                <li>  <button onclick="Share()" class="sharebutton">Share &#x1F639</button> 
                                <p id="shared"></p> </li>

                            </ul>
                        </div>

                        <h3 class="font-sans text-lg"style="padding: 1%;"> CAPTIONHERE
                        </h3>
                        <h4 class = "font-sans text-lg text-bold text-left"><b>Comments:</b></h4>
                        <div id="comments" >COMMENTSHERE</div>
                        <input placeholder="Write a comment..." type="text" id="POSTIDHEREcomment">
                        <button onclick="postComment('POSTIDHERE')">Send</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
`

if (user) {
    var postNum = 0
    query = new Parse.Query(Posts);

    function loadPosts(numPosts) {
        query.addDescending("createdAt")
        query.limit(numPosts)
        query.skip(postNum)
        query.equalTo("poster",user)
        console.log(user)
        postNum = postNum + numPosts
        //postList = query.find()
        query.find().then(function(results) {
            console.log(results)
            if (results.length < 5) {numPosts = results.length}
            for (let step = 0; step < numPosts; step++) {
              // Runs 5 times, with values of step 0 through 4.
                replaceUsername = newPost.replaceAll("USERNAMEHERE", results[step].get("poster"))
                replaceTitle = replaceUsername.replaceAll("TITLEHERE", results[step].get("title"))
                replaceCaption = replaceTitle.replaceAll("CAPTIONHERE", results[step].get("caption"))
                replaceImg = replaceCaption.replaceAll("IMGSRCHERE", results[step].get("image")._url)
                replaceLikes = replaceImg.replaceAll("NUMLIKESHERE", results[step].get("likes").length)
                replacePostId = replaceLikes.replaceAll("POSTIDHERE", results[step].id)

                if (results[step].get("poster") == user) {
                    replaceHidden = replacePostId.replaceAll("HIDDENHERE", "")
                }
                else {
                    replaceHidden = replacePostId.replaceAll("HIDDENHERE", "hidden")
                }
                // Add comments here
                let newComments = ""
                comments = results[step].get("comments")
                if (comments.length > 0) {
                    for (let step2 = 0; step2 < comments.length; step2++) {
                        newComments = newComments + '<h5 class = "font-sans text-lg text-bold text-left">' + comments[step2] + '</h5>'
                    }
                    replaceComments = replaceHidden.replace("COMMENTSHERE",newComments)
                    $('#posts').append(replaceComments);
                }
                else {
                    replaceHidden = replaceHidden.replace("COMMENTSHERE","")
                    $('#posts').append(replaceHidden);
                }
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
}