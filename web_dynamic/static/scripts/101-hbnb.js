$(document).ready(function () {
    const input_dict = {};
    const location_dict = {};

    // Populate amenities dropdown
    $('input[type="checkbox"].amenities').change(function () {
        const amenityId = $(this).attr('data-id');
        const amenityName = $(this).attr('data-name');

        if (this.checked) {
            input_dict[amenityId] = amenityName;
        } else {
            delete input_dict[amenityId];
        }

        updatelist()
    })

     // Handle changes in location checkboxes (states and cities)
    $('input[type="checkbox"].locations').change(function () {
        const locationId = $(this).attr('data-id');
        const locationName = $(this).attr('data-name');

        if (this.checked) {
            location_dict[locationId] = locationName;
        } else {
            delete location_dict[locationId];
        }

        updateLocationList();
    });

    function updateLocationList(){
        const locationList = Object.values(location_dict).join(', ');
        $('div.locations h4').text(locationList);
    }

    function updatelist(){
        const amenitylist = Object.values(input_dict).join(', ')
        $('div.amenities h4').text(amenitylist);
    }
    // Check if the API is available
    $.ajax({
        url: 'http://0.0.0.0:5001/api/v1/status/',
        success: function(response) {
            if (response.status === 'OK') {
                $('div#api_status').addClass('available');
            } else {
                $('div#api_status').removeClass('available');
            }
        },
        error: function() {
            $('div#api_status').removeClass('available');
        }
    });

    $('button').click(function () {
        $.ajax({
            url: 'http://0.0.0.0:5001/api/v1/places_search/',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({amenities: Object.keys(input_dict),
                states: Object.keys(location_dict),
                cities: Object.keys(location_dict)
            }),
            success: function (data) {
                $('section.places').empty();
                for (const place of data) {
                    const template = `<article>
                    <div class="title_box">
                    <h2>${place.name}</h2>
                    <div class="price_by_night">
                    
                    $${place.price_by_night}
                    </div>
                    
                    <div class="information">
                    
                    <div class="max_guest">
                    <i class="fa fa-users fa-3x" aria-hidden="true"></i>
                    
                     <br />
                    Max ${place.max_guest} guests
                    </div>
                    <div class="number_rooms">
                    
                     <br />
                    ${place.number_rooms} Room(s)
                    </div>
                    <div class="number_bathrooms">
                    
                     <br />
                    ${place.number_bathrooms} Bathroom(s)
                    </div>
                    </div> <!--end of information-->
                    
                    <div class="description">
                    ${place.description}
                    </div>
                    
                    </div> <!--end of title_box-->
                    
                </article> <!--end of template article-->`;
                $('section.places').append(template);
                }
            }
        });
    });
    // Review
    $('#toggle-reviews').click(function () {
        const reviewsSection = $('#reviews-section');
        const toggleText = $(this);

        if (toggleText.attr('data-state') === 'show') {
            $.ajax({
                url: 'http://0.0.0.0:5001/api/v1/reviews/', // Assuming there's an endpoint for reviews
                method: 'GET',
                success: function (reviews) {
                    reviewsSection.empty(); // Clear any existing reviews
                    for (const review of reviews) {
                        const reviewTemplate = `<div class="review">
                            <h4>${review.title}</h4>
                            <p>${review.content}</p>
                        </div>`;
                        reviewsSection.append(reviewTemplate);
                    }
                    reviewsSection.show();
                    toggleText.text('hide');
                    toggleText.attr('data-state', 'hide');
                }
            });
        } else {
            reviewsSection.hide();
            toggleText.text('show');
            toggleText.attr('data-state', 'show');
        }
    });
});