// Add a click event to the search button
$('#search-button').on('click', function() {
    // Get the values of the search fields
    var searchType = '';
    var searchTerm = '';

    // Check if you are searching by planet name or price range
    if ($('#chooseLocation').val() !== 'Planet of Origin') {
        // Search by planet name
        searchType = 'planet';
        searchTerm = $('#chooseLocation').val().toLowerCase(); // Convert to lowercase
    } else if ($('#choosePrice').val() !== 'Price Range') {
        // Search by price range
        searchType = 'price';
        searchTerm = $('#choosePrice').val();
    }
        
        // Show a loader or spinner to indicate that the request is in progress
        $('#search-results').html('<div class="loader">Loading...</div>');

        // Make the request to the backend
        $.ajax({
            type: 'GET',
            url: 'http://localhost:5000/search',
            xhrFields: {
                withCredentials: true
            },
            data: {
                type: searchType, // Parameter indicating the type of search
                term: searchTerm, // Search term
                priceOption: $('#choosePrice').val() // Price option
            },
            success: function(response) {
                // Handle server response
                console.log(response);

                // Select the search results container
                var searchResultsContainer = $('#search-results');

                 // Clear any previous content in the container
                searchResultsContainer.empty();

                // If no results are found, display a message
                if (response.length === 0) {
                    searchResultsContainer.html('<p>No results found.</p>');
                  } else {
                // Iterate over the received dishes and display them in the HTML
                response.forEach(function(dish) {
                    // Create HTML elements to display the dish details
                    var dishHTML = `
                        <div class="item">
                            <h4>${dish.name}</h4>
                            <p>Description: ${dish.description}</p>
                            <p>Price: $${dish.price}</p>
                            <p>Planet of Origin: ${dish.planet_of_origin}</p>
                        </div>
                    `;
                     // Append the dish HTML element to the search results container
                    searchResultsContainer.append(dishHTML);
                });
            }

        },
        error: function(xhr, status, error) {
                // Handle errors
                console.error(error);
                $('#search-results').html('<p>An error occurred. Please try again later.</p>');
            }
        });
});


