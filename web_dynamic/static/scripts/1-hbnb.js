$(document).ready(function () {
    const input_dict = {};
    $('input[type="checkbox"]').change(function () {
        const amenityId = $(this).attr('data-id');
        const amenityName = $(this).attr('data-name');
        if (this.checked) {
            input_dict[amenityId.val()] = amenityName.val();
        } else {
            delete input_dict[amenityId.val()];
        }

        const amenitylist = Object.values(input_dict).join(', ')
        $('.amenities h4').text(amenitylist);
    })
});