//loop through the response data
for (j = 0; j < 10; j++) {

    //create new div to hold the recipes
    var recipeDiv = $("<div>");
    //append it to the HTML
    $("#recipesHere").append(recipeDiv);

    //create another div for each recipe card
    var recipeCard = $("<div>");
    recipeCard.addClass("uk-card");
    recipeCard.addClass("uk-card-default");
    recipeCard.addClass("uk-card-hover");
    recipeDiv.append(recipeCard);

    //create card body
    var cardBody = $("<div>");
    cardBody.addClass("uk-card-body");
    recipeCard.append(cardBody);

    //add card recipe title
    var recipeTitle = response.hits[j].recipe.label;
    var cardHeader = $("<h3>");
    cardHeader.addClass("uk-card-title");
    cardHeader.text(recipeTitle);
    //append it to recipe body
    cardBody.append(cardHeader);

    //add estimated cook time to card body
    var cookTime = response.hits[j].recipe.totalTime;
    if (cookTime > 0) {
        cardBody.append($("<p>").text("Estimated cook time: " + cookTime + " minutes"));
    } else {
        cardBody.append($("<p>").text("Estimated cook time: Unavailable"))
    }

    //create new div for card image
    var cardImage = $("<div>");
    cardImage.addClass("uk-card-media-bottom");
    recipeCard.append(cardImage);

    //get the recipe image and URL and append to cardImage div
    var recipeImage = response.hits[j].recipe.image;
    var recipeURL = response.hits[j].recipe.url;
    cardImage.append("<a href=" + recipeURL + "><img src='" + recipeImage + "'></a>");
}