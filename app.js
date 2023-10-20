// Declare variable for API URL endpoint 
const tvShowsURL = 'http://localhost:3000/tvShows'; 

// Get show data from API to populate table using $.ajax
function displayTVShows () {
  
// AJAX GET request to fetch TV show data from API
  $.ajax({
    url: tvShowsURL,
    method: 'GET',
    success: function (tvShows) {
      
      // console.log('TV show data:', tvShows); // Log TV Show (data) to the console
      // Loop through data and append it to the table rows
      tvShows.forEach(function (tvShow) {
        $('tbody').append(
          $('<tr>').append(
            $('<td>').text(tvShow.id),
            $('<td>').text(tvShow.title),
            $('<td>').text(tvShow.genre),
            $('<td>').append(
              $('<button>').text('🗑').click(function () {
                deleteTVShow(tvShow.id);
              })
            )
          )
        );
      });
    },
    error: function (error) {
      // console.error('Error fetching data:', error);
    },
  });
}
  
/* $.get(tvShowsURL).then((data) =>
  
// Loop throgh TV shows in array
data.forEach((tvShow) => {
    $('tbody').append(
      $(
        `<tr>
          <td>${tvShow.id}</td>
          <td>${tvShow.title}</td>
          <td>${tvShow.genre}
            <button onclick="deleteTVShow(${tvShow.id})">🗑</button>
          </td>
        </tr>`
      )
    );
  })
); */

//Function to add TV show
$('#submitShow').click(function () { 

    // Get the show title and genre from input box
    const title = $('#addShow').val();
    const genre = $('#addGenre').val();

  if (title && genre) { // Checks for valid input
    // Send a post request to API to add new show
    $.post(tvShowsURL, {title, genre}, function() { // Send post to API to add new show
        
      // Clear input boxes
        $('#addShow').val('');
        $('#addGenre').val('');

        // Refresh TV show table to display new TV show
        refreshShowTable();
    });
}
});


function deleteTVShow(id) { // Function to deleted a show
  
  $.ajax(`${tvShowsURL}/${id}`, { // Send delete request to API ro remove show by ID
    type: 'DELETE',
    success: function() { // Refresh TV show table after show deletion
        
      refreshShowTable();
    },
  });
}

$('#updateShowList').click(function () { // Function to update show list
   
  // Get show id, title, and genre from input 
    const id = $('#updateId').val();
    const title = $('#updateShow').val();
    const genre = $('#updateGenre').val();

    if (id && title && genre) {
        $.ajax({
            url: `${tvShowsURL}/${id}`,
            type: 'PUT',
            data: {title, genre},
           
            success: function() {
                $('#updateID').val('');
                $('#updateShow').val('');
                $('#updateGenre').val('');
                // Refresh TV show table to display new TV show
                refreshShowTable();
            }
        });
    }

});

//Function to refresh TV show list with array from the API
function refreshShowTable() {
    $('tbody').empty(); // Clear table

    $.get(tvShowsURL).then(function (tvShows) { // Fetch show data from API
      tvShows.forEach(function (tvShow) { // Loops through TV shows
        // Append each TV show to the table
        $('tbody').append(
          $('<tr>').append(
            $('<td>').text(tvShow.id),
            $('<td>').text(tvShow.title),
            $('<td>').text(tvShow.genre),
            $('<td>').append(
              $('<button>').text('🗑').click(function () {
                deleteTVShow(tvShow.id);
              })
            )
          )
        );
      });
    });
  }
