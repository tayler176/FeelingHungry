// var config = {
//     apiKey: "AIzaSyDul4oxAsKQb-QXPljemYZGDows7j9rp4Y",
//     authDomain: "project-e35c6.firebaseapp.com",
//     databaseURL: "https://project-e35c6.firebaseio.com",
//     projectId: "project-e35c6",
//     storageBucket: "project-e35c6.appspot.com",
//     messagingSenderId: "232924423768"
//   };
//   firebase.initializeApp(config);

var config = {
    apiKey: "AIzaSyDul4oxAsKQb-QXPljemYZGDows7j9rp4Y",
    authDomain: "project-e35c6.firebaseapp.com",
    databaseURL: "https://project-e35c6.firebaseio.com",
    projectId: "project-e35c6",
    storageBucket: "project-e35c6.appspot.com",
    messagingSenderId: "232924423768"
};
firebase.initializeApp(config);
var database = firebase.database();

//sets up Authorization functionality
const auth = firebase.auth();
// <-----LOG IN START------->
//takes credentials for sign up and logs in new user
var submit = $("#sign-up-button")
submit.on('click', function (e) {
    e.preventDefault();

    var email = $("#email-input").val().trim();
    var password = $("#password-input").val().trim();

    console.log("email:" + email, "password: " + password);
    auth.createUserWithEmailAndPassword(email, password).then(cred => {
        // console.log(cred);
        // console.log(cred.user)
    });
    $("#email-input").val("");
    $("#password-input").val("");
    alert("your account has be created")
})

//logout function
const logout = $("#logout")
logout.on("click", function (e) {
    e.preventDefault();
    auth.signOut().then(() => {
        alert("you have signed out")
    })
})

//existing user login
const login = $("#login-button")
login.on("click", function (e) {
    e.preventDefault();

    var email = $("#email-login").val().trim();
    var password = $("#password-login").val().trim();

    auth.signInWithEmailAndPassword(email, password).then(cred => {
        console.log(cred);
    })
    $("#email-login").val("")
    $("#password-login").val("")
    alert("you have logged in")
})
var id;
//updates display based on user status
auth.onAuthStateChanged(user => {
    console.log(user);
    id = user.uid;
    // database.ref().child(id).child("ingredientsListFireBase")

    console.log(id)
    if (user) {
        $(".hiddenCount").show();

        console.log("user now logged in", user);

    } else {
        $(".hiddenCount").hide();
        console.log("user now logged out");
    }
})
// <-------LOGIN END ------>

// const db = firebase.firestore();

var ingredientList = [];
// var ingredientList = database.ref().child(id).child('ingredientsListFireBase');
// console.log(database.val().child(id).child('ingredientsListFireBase'));
// console.log(snapShot.child(id).child('ingredientsListFireBase'));
var miscIngredientList = [];

//function to add/remove ingredients from ingredientList
$(".food-button").on("click", function () {
    // var id = user.uid
    //marks the button as active
    $(this).toggleClass('active');
    var ingredient = $(this).attr("data-food");
    console.log(ingredient)
    //The hasClass() method checks the selected element has the specified class name.
    //If so, this method will return "true".
    if ($(".food-button").hasClass('active')) {
        //push to ingredient list
        ingredientList.push(ingredient);
        console.log(ingredientList);
        database.ref().child(id).child("ingredientsListFireBase").set(ingredientList)
        console.log("ing pushed")
    } else {
        //remove from ingredient list
        ingredientList.splice($.inArray(ingredient, ingredientList), 1);
        console.log(ingredientList);
        database.ref().id.set(ingredientList);
    }
    //if we want to generate recipes dynamically
    //displayRecipes();
});

//on-click function which displays our recipes
$("#startCooking").on("click", function () {

    $("#recipesHere").empty();

    var api_key = "cebe825ea79f235baee7ee7eb3a272ae";
    var api_id = "b58ac0e4";
    var queryURL = "https://api.edamam.com/search?app_id=" + api_id + '&app_key=' + api_key; //+ "&q=" + ingredients;

    //loop through ingredientsList
    for (i = 0; i < ingredientList.length; i++) {
        //add each ingredient into queryURL
        queryURL += "&q=" + ingredientList[i];
    }
    console.log(queryURL);

    /* If we decide to include allergens into our project
    var allergens = [];
    if (allergens) {
        queryURL = queryURL + "&excluded=" + allergens;
    } */

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);

        //loop through the response data
        for (j = 0; j < 10; j++) {

            //create new div to hold each recipe
            var recipeDiv = $("<div>");
            //append it to the HTML
            $("#recipesHere").append(recipeDiv);

            //get the recipe name and estimated cook time
            var recipeTitle = response.hits[j].recipe.label;
            var cookTime = response.hits[j].recipe.totalTime;
            console.log(cookTime);
            recipeDiv.append($("<p>").text(recipeTitle));

            if (cookTime > 0) {
                recipeDiv.append($("<p>").text("Estimated cook time: " + cookTime));
            } else {
                recipeDiv.append($("<p>").text("Estimated cook time: Unavailable"))
            }

            //get the recipe image and URL
            var recipeImage = response.hits[j].recipe.image;
            var recipeURL = response.hits[j].recipe.url;
            recipeDiv.append("<a href=" + recipeURL + "><img src='" + recipeImage + "'></a>");

        }
    });
});

/*User addition buttons are not being added to ingredient list*/
//Render buttons for User Additions
function renderButtons() {

    $(".user-button-container").empty();

    // Loops through miscIngredients array...
    for (var i = 0; i < miscIngredientList.length; i++) {
        //dynamicaly generates buttons for each ingredient in the array
        var buttonElem = $("<button>");
        // Add our classes to the button
        buttonElem.addClass("food-button");
        buttonElem.addClass("misc-button");
        buttonElem.addClass("uk-button");
        buttonElem.addClass("uk-button-default");
        buttonElem.addClass("uk-button-large");
        // Add a data-attribute
        buttonElem.attr("data-food", miscIngredientList[i]);
        // Add initial button text
        buttonElem.text(miscIngredientList[i]);
        // Append the buttons to the HTML
        $(".user-button-container").append(buttonElem);
    }
}

// This function appends more buttons if desired by user
$("#add-button").on("click", function (event) {
    event.preventDefault();

    // get input from textbox
    var ingredient = $("#miscIngredient").val().trim();

    //prevents user from adding blank button
    if (ingredient == "") {
        return false;
    } else {
        // push user input from the textbox into our miscIngredient array
        miscIngredientList.push(ingredient);
    }
    // call renderButtons function to process the new button
    renderButtons();
});

