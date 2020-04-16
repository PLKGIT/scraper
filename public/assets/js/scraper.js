
// Grab unsaved articles
$.getJSON("/articles", function (data) {
  // Loop through articles
  for (var i = 0; i < data.length; i++) {

    if (data[i].saved === false) {

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

    } else {
      if (data[i].image === undefined) {
        $("#articlesaved")
          .append("<p data-id='" + data[i]._id
            + "'><img class='z-depth-2' src='https://dummyimage.com/225x150/aaa/fff.png&text=++Reuters++' align='left' 'width='225' hspace='10'/><b><h6 class='teal-text'>"
            + data[i].title + "</h6></b><a href='"
            + data[i].link + "' target=_blank>"
            + data[i].summary + "</a><br/>"
            + "<span class='right'><a data-id='" + data[i]._id + "'data-target='nm' class='btn-flat note waves-effect waves-teal teal-text modal-trigger'><i class='small material-icons'> note_add</i>Add Note</a>&nbsp;<a data-id='" + data[i]._id + "'data-target='nlm' class='btn-flat manage waves-effect waves-indigo indigo-text modal-trigger'><i class='small material-icons'> assignment</i>Manage Notes</a>&nbsp;<a data-id='" + data[i]._id + "'class='btn-flat del waves-effect waves-red red-text'><i class='small material-icons'> delete_forever</i>Delete Article</a></span>"
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
            + "<span class='right'><a data-id='" + data[i]._id + "'data-target='nm' class='btn-flat note waves-effect waves-teal teal-text modal-trigger'><i class='small material-icons'> note_add</i>Add Note</a>&nbsp;<a data-id='" + data[i]._id + "'data-target='nlm' class='btn-flat manage waves-effect waves-indigo indigo-text modal-trigger'><i class='small material-icons'> assignment</i>Manage Notes</a>&nbsp;<a data-id='" + data[i]._id + "'class='btn-flat del waves-effect waves-red red-text'><i class='small material-icons'> delete_forever</i>Delete Article</a></span>"
            + "</p><br clear='left' />"
          );
      }

    }
  }
});

// Click on Scrape Menu Item
$(document).on("click", ".scrape", function () {

  $.ajax({
    method: "GET",
    url: "/scrape/"
  })
    .then(function (data) {
      console.log("New Articles Scrape Complete")
      console.log(data);
      location.reload();
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
      console.log(data);
      location.reload();
    });
});

// Click on Save Article button
$(document).on("click", ".add", function () {
  // Save the id from the a button
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
      console.log("Saved Article")
      console.log(data);
      location.reload();
    });
});

// Click on Delete Article button
$(document).on("click", ".del", function () {
  var thisId = $(this).attr("data-id");

  $.ajax({
    method: "GET",
    url: "/articlesdel/" + thisId
  })
    .then(function (data) {
      console.log("Deleted Article")
      console.log(data);
      location.reload();
    });
});

// Add Note
$(document).on("click", ".note", function () {
  // Empty the notes from the note section
  $("#notes").empty();
  // Save the id from the note button
  var thisId = $(this).attr("data-id");

  // Now make an ajax call for the Article
  $.ajax({
    method: "GET",
    url: "/articles/" + thisId
  })
    .then(function (data) {
      console.log(data);
      // The title of the article
      $("#notes").append("<h5 class='teal-text'>" + data.title + "</h5>");
      // An input to enter a new title
      $("#notes").append("<input placeholder='Note Title' id='titleinput' name='title' >");
      // A textarea to add a new note body
      $("#notes").append("<textarea placeholder='Note' class='materialize-textarea' id='bodyinput' name='body'></textarea>");
      // A button to submit a new note, with the id of the article saved to it
      $("#notes").append("<button data-id='" + data._id + "' class='teal darken-4 white-text btn savenote'>Save Note</button>");
    });
});

// When you click the savenote button
$(document).on("click", ".savenote", function () {
  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr("data-id");

  if ($("#titleinput").val() === "" || $("#bodyinput").val() === "") {
    alert("Your note must include a title and content.")
  } else {

    // Run a POST request to change the note, using what's entered in the inputs
    $.ajax({
      method: "POST",
      url: "/articles/" + thisId,
      data: {
        title: $("#titleinput").val(),
        body: $("#bodyinput").val()
      }
    })
      .then(function (data) {
        console.log(data);
        // $("#notes").empty();
      });

    // Also, remove the values entered in the input and textarea for note entry
    $("#titleinput").val("");
    $("#bodyinput").val("");

  }


});

// When you click the manage button
$(document).on("click", ".manage", function () {
  $("#noteslist").empty();
  var thisId = $(this).attr("data-id");
  // Now make an ajax call for the Article
  $.ajax({
    method: "GET",
    url: "/articles/" + thisId
  })
    // With that done, add the note information to the page
    .then(function (data) {
      console.log(data);
      // The title of the article
      $("#noteslist").append("<h5 class='teal-text'>" + data.title + "</h5>");
      for (var i = 0; i < data.note.length; i++) {
        let noteId = data.note[i]._id;
        console.log(noteId)
        $("#noteslist").append("<h6 class='teal-text'>Title:</h6>");
        $("#noteslist").append("<textarea data-id='" + noteId + "'class='title' name='title'>" + data.note[i].title + "</textarea><br/>");
        $("#noteslist").append("<h6 class='teal-text'>Note:</h6>");
        $("#noteslist").append("<textarea data-id='" + noteId + "'class='body' name='body'>" + data.note[i].body + "</textarea><p>");
        $("#noteslist").append("<button data-id='" + noteId + "' class='teal darken-4 white-text btn savnote'>Save</button>&nbsp");
        $("#noteslist").append("<button data-id='" + noteId + "' class='red darken-4 white-text btn delnote modal-close'>Delete</button></p>");
      }
    });
});

// Click on Save Note button
$(document).on("click", ".savnote", function () {
  var thisId = $(this).attr("data-id");

  if ($(".title").filter("[data-id='" + thisId + "']").val() === "" ||  $(".body").filter("[data-id='" + thisId + "']").val() === "") {
    alert("Your note must include a title and content.")
  } else {

  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "POST",
    url: "/notesav/" + thisId,
    data: {
      id: thisId,
      title: $(".title").filter("[data-id='" + thisId + "']").val(),
      body: $(".body").filter("[data-id='" + thisId + "']").val()
    }
  })
    .then(function (data) {
      console.log(data);
      // $("#notes").empty();
    });
  }
});


// Click on Delete Note button
$(document).on("click", ".delnote", function () {
  var thisId = $(this).attr("data-id");

  $.ajax({
    method: "GET",
    url: "/notedel/" + thisId
  })
    .then(function (data) {
      console.log("Deleted Note")
      console.log(data);
    });
});

