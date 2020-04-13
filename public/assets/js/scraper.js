
// Grab unsaved articles
$.getJSON("/articles", function (data) {
  // Loop through articles
  for (var i = 0; i < data.length; i++) {

    if (data[i].saved===false){

      if (data[i].image === undefined) {
        $("#articles")
          .append("<p data-id='" + data[i]._id
            + "'><img class='z-depth-2' src='https://dummyimage.com/225x150/aaa/fff.png&text=++Reuters++' align='left' 'width='225' hspace='10'/><b><h6 class='teal-text'>"
            + data[i].title + "</h6></b><a href='"
            + data[i].link + "' target=_blank>"
            + data[i].summary + "</a><br/>"
            + "<span class='right'><a data-id='" + data[i]._id + "'class='btn-flat add waves-effect waves-teal teal-text'><i class='small material-icons'> playlist_add</i>Save Article</a>&nbsp;<a data-id='" + data[i]._id + "'class='btn-flat del waves-effect waves-red red-text'><i class='small material-icons'> delete_forever</i>Delete Article</a></span>"
            + "</p><br clear='left' />"
          );
  
      } else {
        $("#articles")
          .append("<p data-id='" + data[i]._id
            + "'><img class='z-depth-2' src='"
            + data[i].image + "' align='left' width='225' hspace='10'/><b><h6 class='teal-text'>"
            + data[i].title + "</h6></b><a href='"
            + data[i].link + "' target=_blank>"
            + data[i].summary + "</a><br/>"
            + "<span class='right'><a data-id='" + data[i]._id + "'class='btn-flat add waves-effect waves-teal teal-text'><i class='small material-icons'> playlist_add</i>Save Article</a>&nbsp;<a data-id='" + data[i]._id + "'class='btn-flat del waves-effect waves-red red-text'><i class='small material-icons'> delete_forever</i>Delete Article</a></span>"
            + "</p><br clear='left' />"
          );
      }

    } else{
      if (data[i].image === undefined) {
        $("#articlesaved")
          .append("<p data-id='" + data[i]._id
            + "'><img class='z-depth-2' src='https://dummyimage.com/225x150/aaa/fff.png&text=++Reuters++' align='left' 'width='225' hspace='10'/><b><h6 class='teal-text'>"
            + data[i].title + "</h6></b><a href='"
            + data[i].link + "' target=_blank>"
            + data[i].summary + "</a><br/>"
            + "<span class='right'><a data-id='" + data[i]._id + "'class='btn-flat del waves-effect waves-red red-text'><i class='small material-icons'> delete_forever</i>Delete Article</a></span>"
            + "</p><br clear='left' />"
          );
  
      } else {
        $("#articlesaved")
          .append("<p data-id='" + data[i]._id
            + "'><img class='z-depth-2' src='"
            + data[i].image + "' align='left' width='225' hspace='10'/><b><h6 class='teal-text'>"
            + data[i].title + "</h6></b><a href='"
            + data[i].link + "' target=_blank>"
            + data[i].summary + "</a><br/>"
            + "<span class='right'><a data-id='" + data[i]._id + "'class='btn-flat del waves-effect waves-red red-text'><i class='small material-icons'> delete_forever</i>Delete Article</a></span>"
            + "</p><br clear='left' />"
          );
      }

    }
  }
});

// Click on Scrape button
$(document).on("click", ".scrape", function () {

  $.ajax({
    method: "GET",
    url: "/scrape/"
  })
    .then(function (data) {
      console.log("scrape complete")
      location = '/'
    });
});

// Click on Delete Menu Item
$(document).on("click", ".delete", function () {

  $.ajax({
    method: "GET",
    url: "/articlesdel/"
  })
    .then(function (data) {
      console.log("Unsaved Articles Deleted")
      location = '/'
    });
});

// Click on add article button
$(document).on("click", ".add", function () {
  // Save the id from the p tag
  var thisId = $(this).attr("data-id");

  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "POST",
    url: "/articlessav/" + thisId,
    data: {
      saved: true
    }
  })
    .then(function (data) {
      console.log("Updated Record")
      console.log(data);
      location.reload();
    });
});

// Click on del article button
$(document).on("click", ".del", function () {
  // Save the id from the p tag
  var thisId = $(this).attr("data-id");

  $.ajax({
    method: "GET",
    url: "/articlesdel/" + thisId
  })
    .then(function (data) {
      console.log("Deleted Record")
      console.log(data);
      location.reload();
    });
});

// When you click the savenote button
$(document).on("click", "#savenote", function () {
  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr("data-id");

  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {
      // Value taken from title input
      title: $("#titleinput").val(),
      // Value taken from note textarea
      body: $("#bodyinput").val()
    }
  })
    // With that done
    .then(function (data) {
      // Log the response
      console.log(data);
      // Empty the notes section
      $("#notes").empty();
    });

  // Also, remove the values entered in the input and textarea for note entry
  $("#titleinput").val("");
  $("#bodyinput").val("");
});
