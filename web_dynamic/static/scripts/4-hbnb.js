$(document).ready(function () {
    const input_dict = {};
    $('input[type="checkbox"]').change(function () {
        const amenityId = $(this).attr('data-id');
        const amenityName = $(this).attr('data-name');

        if (this.checked) {
            input_dict[amenityId] = amenityName;
        } else {
            delete input_dict[amenityId];
        }

        updatelist()
    })

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

    $.ajax({
        url: 'http://0.0.0.0:5001/api/v1/places_search/',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({}),
        success: function(data) {
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

    $('button').click(function () {
        $.ajax({
            url: 'http://0.0.0.0:5001/api/v1/places_search/',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({amenities: Object.keys(input_dict)}),
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
});