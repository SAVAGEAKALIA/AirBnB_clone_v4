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
});