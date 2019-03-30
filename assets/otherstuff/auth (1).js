// var config = {
//     apiKey: "AIzaSyAcU5xcV_D8STkH-IMH5qIyBStrZSNnxVk",
//     authDomain: "project-1-3bf2f.firebaseapp.com",
//     databaseURL: "https://project-1-3bf2f.firebaseio.com",
//     projectId: "project-1-3bf2f",
//     storageBucket: "project-1-3bf2f.appspot.com",
//     messagingSenderId: "769372076886"
//   };
// firebase.initializeApp(config);
// var database = firebase.database();

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

var currentUser;
//sets up Authorization functionality
const auth = firebase.auth();
var id;
var userLoggedIn = false;
var ingredientList = [];
var miscIngredientList = [];
var allergenList = [];


var submit = $("#sign-up-button")
submit.on('click', function (e) {
    e.preventDefault();

    var email = $("#email-input").val().trim();
    var password = $("#password-input").val().trim();

    console.log("email:" + email, "password: " + password);
    auth.createUserWithEmailAndPassword(email, password).then(cred => {
        
        database.ref().child("users").child(cred.user.uid).set(cred.user.Rb.email);
        id = cred.user.uid;
        console.log(id);
        userLoggedIn = true;
        // .set(cred.user.Rb.email);
    });
    $("#email-input").val("");
    $("#password-input").val("");
    $("#modal-example").hide();
})

const logout = $("#logout")
logout.on("click", function (e) {
    e.preventDefault();
    auth.signOut().then(() => {
        console.log("user signed out")
        userLoggedIn = false;
    })
})

const login = $("#login-button")
login.on("click", function (e) {
    e.preventDefault();

    var email = $("#email-login").val().trim();
    var password = $("#password-login").val().trim();

    auth.signInWithEmailAndPassword(email, password).then(cred => {
        console.log(cred);
        id = cred.user.uid;
        console.log(id);
        userLoggedIn = true;
        ingredientList = database.ref().child("users").child(id).child("ingredients");
        console.log(ingredientList);
        console.log(database.ref().child("users").child(id).child("ingredients"));
        // database.ref().child("users").child(id).set({
        //     ingredients: ingredientList,
        //     allergens: allergenList
        // })
    })
    $("#email-login").val("")
    $("#password-login").val("")
    $("#modal-example").hide();
})

auth.onAuthStateChanged(user => {
    if (user) {
        // database.ref().child(id).child("ingredientsListFireBase")

        // console.log("user now logged in", user);

    } else {
        

        console.log("user now logged out");
    }
})