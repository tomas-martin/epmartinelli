(function ($) {
    "use strict";
   
    
    new WOW().init();  
    
	$(window).on('load', function () {
		dataBackgroundImage();
	});

	/*--
        Data Background Image 
    -----------------------------------*/

    function dataBackgroundImage() {
        $('.bg-image').each(function () {
            var attr = $(this).attr('data-bgimage');
            if (typeof attr !== typeof undefined && attr !== false) {
                var bgImageUrl = $(this).data('bgimage');
                $(this).css({
                    'background-image': 'url(' + bgImageUrl + ')',
                });
                $(this).removeAttr('data-bgimage')
            }
        });
    }
    
    /*--
        Menu Sticky
    -----------------------------------*/
    var windows = $(window);
    var sticky = $('.header-sticky');

    windows.on('scroll', function() {
        var scroll = windows.scrollTop();
        if (scroll < 300) {
            sticky.removeClass('is-sticky');
        }else{
            sticky.addClass('is-sticky');
        }
    });
    
    /*--
        Mobile Menu
    ------------------------*/
    var menuNav = $('nav.main-navigation');
    menuNav.meanmenu({
        meanScreenWidth: '991',
        meanMenuContainer: '.mobile-menu',
        meanMenuClose: '<span class="menu-close"></span>',
        meanMenuOpen: '<span class="menu-bar"></span>',
        meanRevealPosition: 'right',
        meanMenuCloseSize: '0',
    });

    /*--
        Testimonial Slider
    ----------------------------*/
    var testimonial = $('.testimonial-active');
    testimonial.slick({
        accessibility: false,
        dots: false,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false,
        prevArrow:true,
        nextArrow: true,
        prevArrow: '<span class="slick-prev"><i class="bi bi-arrow-left-rounded"></i> </span>',
        nextArrow: '<span class="slick-next"><i class="bi bi-arrow-right-rounded"></i></span>'
    });


    /*--
        Gallery Carousel Slider
    ----------------------------*/
    var galleryCarousel = $('.gallery-carousel');
    galleryCarousel.slick({
        centerMode: true,
        centerPadding: '260px',
        slidesToShow: 3,
        prevArrow: false,
        nextArrow: false,
        responsive: [{
            breakpoint: 1600,
            settings: {
                arrows: false,
                centerMode: true,
                centerPadding: '120px',
                slidesToShow: 3
            }
        },{
            breakpoint: 1200,
            settings: {
                arrows: false,
                centerMode: true,
                centerPadding: '220px',
                slidesToShow: 2
            }
        },{
            breakpoint: 991,
            settings: {
                arrows: false,
                centerMode: true,
                centerPadding: '120px',
                slidesToShow: 2
            }
        },{
            breakpoint: 768,
            settings: {
                arrows: false,
                centerMode: true,
                centerPadding: '80px',
                slidesToShow: 2
            }
        },{
            breakpoint: 480,
                settings: {
                    arrows: false,
                    centerMode: true,
                    centerPadding: '0px',
                    slidesToShow: 1
                }
            }
        ]
    });

    
    /*--
    Magnific Popup
    ------------------------*/
    $('.img-popup').magnificPopup({
        type: 'image',
        gallery: {
            enabled: true
        }
    });
    // Magnific Popup Video
    $('.popup-youtube').magnificPopup({
        type: 'iframe',
        removalDelay: 300,
        mainClass: 'mfp-fade'
    });
    
    /*--
        ScrollUp Active
    ------------------------*/
    $.scrollUp({
        scrollText: '<img src="assets/images/icon/up.png" alt="caret" />',
        easingType: 'linear',
        scrollSpeed: 900,
        animation: 'fade'
    });   
    
})(jQuery);	
