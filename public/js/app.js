// On page load
$(function() {
  getFoods();
  // set submit action for form
  $("#new-food-form").on("submit", function(e){
    // prevent form submission
    e.preventDefault();
    // post to food#create
    $.post("/foods", $(this).serialize())
      .done(function(res){
        // append new food to the page
        getFoods();
        $("#new-food-form")[0].reset();
      });
  });
});

// function definitions
function getFoods() {
  $.get("/foods", function(res){ 
    var foods = res;
    // grab foods template
    template = _.template($("#foods-template").html());
    // input foods into template and append to parent
    foodItems = foods.map(function(food) {
      return template(food);
    });
    // clear content (for repeated use)
    $("#food-ul").html("");
    // append foods to ul
    $("#food-ul").append(foodItems);
  });
}
