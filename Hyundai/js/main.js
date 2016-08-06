     $(document).ready(function () {
    console.log("Welcome to IPIX");
    setOrientation();
         
    $('#Slider').carousel({
        interval: 3000
    });

    $("#Slider").swiperight(function () {
        $(this).carousel('prev');
    });

    $("#Slider").swipeleft(function () {
        $(this).carousel('next');
    });

    $('.my_location').on('click', onMyLocationClicked);
    $('.zip_button').on('click', onZipGoBtn);
});

var setOrientation = function () {
    if (window.innerHeight > window.innerWidth) {
        console.log("Portrait");

        $('.featuredcar').css('width', '49%');
        $('.twintitle').hide();
        $('.cros_title').show();

        $('footer .subMenus_items li').css('width', '49%');

        $('.footer_message br').show();

    }
    else {
        console.log("Landscape");
        $('.featuredcar').css('width', '24.5%');
        $('.crosstitle').hide();
        $('.twintitle').show();

        $('footer .subMenus_items li').css('width', '24.5%');

        $('.footermessage br').hide();
    }
};

$(document).on("pagecreate", function (event) {
    $(window).on("orientationchange", function () {
        setOrientation();
    });
});

$('.close_menu').click(function (e) {
    e.preventDefault();
    $('.collapse').collapse('hide');
});

var onMyLocationClicked = function () {
    console.log("location clicked");
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var latitude = position.coords.latitude;
            var longitude = position.coords.longitude;
            if (latitude == null || longitude == null) { alert("Failed to get your location."); }
            $.ajax({
                type: "GET",
                url: "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + latitude + "," + longitude + "&sensor=true&callback=zipmap", dataType: "json",
                cache: true,
                success: function (data) {
                    for (var i = 0; i < data.results[0].address_components.length; i++) {
                        var s = data.results[0].address_components[i];
                        if (s.types == "postal_code") {
                            $('.zipcode_input').val(s.short_name);
//                            window.location.href = "/https://www.hyundaiusa.com/dealer-locator/#/" + s.short_name;
                            return;
                        }
                    }
                    alert("Failed to get your location.");
                }
            })

        });
    }
}

$('.zipcode_input').keypress(function (e) {
    if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
        return false;
    }
});

var onZipGoBtn = function () {
    var zipcode = $('.zipcode_input').val();
    console.log("zip code is ", zipcode);
   window.location.href = "https://www.hyundaiusa.com/dealer-locator/#/" +zipcode;

}

function reloadPage(){
     location.reload();
}