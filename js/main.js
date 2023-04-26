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
var Comments = Parse.Object.extend("Comments");

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
        event = window.event; 
    };

    var el = (event.target || event.srcElement);
    queryObj = new Parse.Query(Posts);
    queryObj.equalTo("objectId",objectId)
    queryObj.first().then(function(result) {
        if (result.get("likes").find(x => x==currentUsername) == null) {
            result.addUnique("likes",currentUsername)
            result.save()
            el.innerHTML = "Likes " + result.get("likes").length + " &#x1F44D"
        }
    });
}

function deletePost(objectId) {
    if (confirm("Are you sure you want to delete this post?") == true) {
        queryObj = new Parse.Query(Posts);
        queryObj.equalTo("objectId",objectId)
        queryObj.first().then(function(result) {
            result.destroy();
            location.reload();
        });
    }
}


async function postComment(objectId) {
    comment = document.getElementById(objectId + "comment").value;
    if (comment != "") {
        let queryObj = new Parse.Query(Posts);
        queryObj.equalTo("objectId", objectId);
        try {
            let result = await queryObj.first();
            /*newComment = new Comments();
            newComment.set("post",objectId)
            newComment.set("author",currentUsername)
            newComment.set("text",comment)
            newComment.save()*/
            //result.addUnique("comments",newComment)
            result.addUnique("comments", currentUsername + ": " + comment);
            await result.save();
            // Reload the page after the save is completed
            location.reload();
        } catch (error) {
            console.error("Error saving comment:", error);
        }
    }
}

var newPost = `
              <div  class="center" align="center" style="margin: auto; padding-top: 2%; padding-bottom: 2%; max-width: 50%;">
                    <div class="bg-white bg-opacity-0 text-black contents"> 
                        <div class=" lg:flex items-center ml-auto text-pink">
                            <button HIDDENHERE onclick="deletePost('POSTIDHERE')" class="bg-indigo-500 hover:bg-indigo-100 text-black font-bold py-1 px-1 rounded">Delete 🗑️</button>
                        </div>
                        <div class="pfp">
                            <img src="./assets/pfp.jpg" style="max-width: 3%;">
                            <a href="./profile/?user=USERNAMEHERE" style="padding-left: 10px">USERNAMEHERE</a>
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
`

var postNum = 0
query = new Parse.Query(Posts);

/*function makeComments(comments, step2) {
    if (step2 < comments.length) {
        queryObj = new Parse.Query(Comments);
        queryObj.equalTo("objectId",comments[step2].id)
        queryObj.first().then(function(result) {
            newComment = '<h5 class = "font-sans text-lg text-bold text-left">' + result.get("author") + ": " + result.get("text") + '</h5>'
            return newComment + makeComments(comments, step2+1);
        })
    }
}*/

function loadPosts(numPosts) {
    query.addDescending("createdAt")
    query.limit(numPosts)
    query.skip(postNum)
    postNum = postNum + numPosts
    postList = query.find()
    query.find().then(function(results) {
        for (let step = 0; step < numPosts; step++) {
          // Runs 5 times, with values of step 0 through 4.
           replaceUsername = newPost.replaceAll("USERNAMEHERE", results[step].get("poster"))
           replaceTitle = replaceUsername.replaceAll("TITLEHERE", results[step].get("title"))
           replaceCaption = replaceTitle.replaceAll("CAPTIONHERE", results[step].get("caption"))
           replaceImg = replaceCaption.replaceAll("IMGSRCHERE", results[step].get("image")._url)
            replaceLikes = replaceImg.replaceAll("NUMLIKESHERE", results[step].get("likes").length)
            replacePostId = replaceLikes.replaceAll("POSTIDHERE", results[step].id)
            
            if (results[step].get("poster") == currentUsername) {
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
