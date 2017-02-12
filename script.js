// Initialize Firebase
var config = {
  apiKey: "AIzaSyAVzFVDBKE0YRtJqvlW71ZtXKA7l_dXw_I",
  authDomain: "list-sharing-22d6b.firebaseapp.com",
  databaseURL: "https://list-sharing-22d6b.firebaseio.com",
  storageBucket: "list-sharing-22d6b.appspot.com",
  messagingSenderId: "133174321997"
};

// Firebase reference
firebase.initializeApp(config);
var database = firebase.database();
var ref = database.ref('list');

// Retrieve data from Firebase to add to the list
ref.on('value', gotData, error);

// Define x for a counter
var x = 0;

// Declare position of the list
var pos = 0;

// status icons
var imgStatus = document.getElementById('loadingStat');
var loading = false;

// Checks wich loading icon needs to be picked
function loadingStatus() {
   if (loading == true) {
     imgStatus.setAttribute("src","img/donecloud.svg");
   } else {
     imgStatus.setAttribute("src","img/loading.svg");
   }
 }

 // Call the function
loadingStatus();

function gotData(data) {

  // Reset the value of x
   x = 0;

  // Reset thee value of pos
   pos = 0;

  // Reset the keyList array
  keyList = [];

  // Remove the already existing posts
  var posts = document.querySelectorAll(".list");
    for (var i = 0; i < posts.length; i++) {
       posts[i].remove();
    }

  // Data from firebase
  var listData = data.val();

  // Object into an array
  var keys = Object.keys(listData);

  // Reverse array
  var revKey = keys.reverse();

  // Get the sections
  var sec = document.getElementsByClassName('wrapper-list');

  // Loop through the array
  for (var i = 0; i < keys.length; i++) {

       var k = revKey[i];
       keyList.push(k);


       var descrip = listData[k].description;
       var title = listData[k].title;
       var color = listData[k].color;

       // Creating new elements
       var article = document.createElement('article');
       var head = document.createElement('header');
       var p = document.createElement('p');
       var icon = document.createElement('img');

       // Set background color
       article.style.backgroundColor = color;

       // Apply the values
       p.innerHTML = descrip;
       head.innerHTML = title;


       // Set attributes
       icon.setAttribute("onclick","removeItem(" + x + ")");
       icon.setAttribute("class","rmv");
       icon.setAttribute("src","img/trash.png");
       icon.setAttribute("title","Verwijder deze post");
       p.setAttribute("class","text");
       article.setAttribute("id",x);

       // Checks for the value of hor
       if (hor == true) {
         article.setAttribute("class","list hor");
       } else {
         article.setAttribute("class","list");
       }


       // Append elements
       article.appendChild(head);
       article.appendChild(p);
       article.appendChild(icon);

       // Adds one to x
       x++;

      // Which position the post should be placed
      if (pos == 3) {
          pos = 0;
       }
       var sections = document.querySelectorAll('.wrapper-list');
       sections[pos].appendChild(article);
       pos++;


  }

  // Reset x
  x = 0;

  // return a value for status
     loading = true;

  // Call Loading function again
    loadingStatus();
}

function error(error) {
  console.log('error');
  console.log(error);
}

// Get the buttons
var title = document.getElementById('title');
var input = document.getElementById('content');
var submit = document.getElementById('submit');
var cancel = document.getElementById('cancel');

// Buttons onclick
submit.addEventListener("click", submitData);
cancel.addEventListener("click", cancelData);

function submitData() {
  var data = {
     title: title.innerHTML,
     description: input.innerHTML,
     color: backgroundcolor
   }
   // Push data to Firebase
   ref.push(data);
   // Reset the preferences
   cancelData();
   // Closes the list again
   closeList();
}

function cancelData() {
  // Reset all text input
 input.innerHTML = "Maak een Notitie";
 title.innerHTML = "Titel";
 // Reset background color input
  list.style.backgroundColor = "white";
  backgroundcolor = "white";
}
// TOOLBAR FUNCTION

// List color event listener
var ballOne = document.getElementsByClassName('colorball')[0];
var ballTwo = document.getElementsByClassName('colorball')[1];
var ballTree = document.getElementsByClassName('colorball')[2];
var ballFour = document.getElementsByClassName('colorball')[3];
ballOne.addEventListener("click", setColorOne);
ballTwo.addEventListener("click", setColorTwo);
ballTree.addEventListener("click", setColorTree);
ballFour.addEventListener("click", setColorFour);

// Grab the list section
var list = document.getElementById('list');

// Create var backgroundColor
var backgroundcolor = "white";

function setColorOne() {
  list.style.backgroundColor = "#FFEA00";
  backgroundcolor = "#FFEA00";
}
function setColorTwo() {
   list.style.backgroundColor = "#F4511E";
   backgroundcolor = "#F4511E";
}
function setColorTree() {
   list.style.backgroundColor = "#039BE5";
   backgroundcolor = "#039BE5";
}
function setColorFour() {
   list.style.backgroundColor = "white";
   backgroundcolor = "white";
}

// List ordering vertical/horizontal

  var sorting = document.getElementById('sortingOption');
  var sw = 0;
  var hor = false;

  sorting.addEventListener("click", function () {
    // Grab the sections
    var sections = document.querySelectorAll('.wrapper-list');
    // Grab the articles
    var articles = document.querySelectorAll('.list');
    if (sw == 0) {
      sorting.setAttribute("src","img/sortVert.svg");
      sw = 1;
      hor = true;
      // Loop trough all the list
      for (var z = 0; z < articles.length; z++) {
        articles[z].setAttribute("class","list hor");

      }
      // Loop trough all the sections
      for (var i = 0; i < sections.length; i++) {
        sections[i].setAttribute("class","wrapper-list hor");
      }
    } else {
      sorting.setAttribute("src","img/sortHor.svg");
      sw = 0;
      hor = false;
      // Loop trough all the list
      for (var z = 0; z < articles.length; z++) {
        articles[z].setAttribute("class","list");
      }
      // Loop trough all the sections
      for (var i = 0; i < sections.length; i++) {
        sections[i].setAttribute("class","wrapper-list");
      }
    }
  });

 // EDIT FUNCTIONS FOR THE POSTS

// REMOVE THE CLICKED LIST
// Store the keys in the array
 var keyList = [];

function removeItem(x) {
  controle = false;
  var key = keyList[x];
  var article = document.getElementById(x);
  article.style.opacity = "0";
  keyList.splice(x,1);

// Wait for deleting to show animation
  setTimeout(function () {

    // Delete the key from the list object
    firebase.database().ref('list/' + key).remove();
  }, 1000);
}

// Grow list when onfocus
  var content = document.getElementById('content');
  var title = document.getElementById('title');
  var toolbar = document.getElementById('toolbar');

  content.addEventListener("click", openList);
    function openList() {
      list.style.minHeight = "200px";
      list.style.width = "100%";
      title.style.display = "block";
      content.style.paddingTop = "10px";
      content.style.paddingBottom = "65px";
      list.style.overflow = "visible";
      // Wait 300ms to show toolbar
      setTimeout(function() {
        toolbar.style.display = "block";
      },250);
  }
  // Listen for cancel button to be pressed
  cancel.addEventListener("click", closeList);

  function closeList() {
    title.style.display = "none";
    content.style.paddingTop = "17px";
    content.style.paddingBottom = "0px";
    list.style.minHeight = "50px";
    list.style.width = "700px";
    list.style.overflow = "hidden";
    toolbar.style.display = "none";
  }
