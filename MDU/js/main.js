(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // Initiate the wowjs
    new WOW().init();


    // Sticky Navbar
    // Honor a global flag to suppress sticky behavior during programmatic scrolls
    window.__programmaticScroll = window.__programmaticScroll || false;
    $(window).on('scroll.stickyToggle', function () {
        if (window.__programmaticScroll) return; // ignore while programmatic scroll is happening
        if ($(this).scrollTop() > 300) {
            $('.sticky-top').addClass('shadow-sm').css('top', '0px');
        } else {
            // Keep navbar fixed at top instead of sliding up
            $('.sticky-top').removeClass('shadow-sm').css('top', '0px');
        }
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        items: 1,
        dots: false,
        loop: true,
        nav: true,
        navText : [
            '<i class="bi bi-chevron-left"></i>',
            '<i class="bi bi-chevron-right"></i>'
        ]
    });

    
})(jQuery);

// Section highlight for navbar (MDU page)
(function($){
    $(function(){
        var $nav = $('.navbar .navbar-nav');
        var $homeLink = $nav.find('a[href="../index.html"]');
        var $links = $nav.find('a[href^="#"]');
        var linkData = [];
        var offsetAdjust = 100; // adjust for sticky navbar height

        function build(){
            linkData = [];
            $links.each(function(){
                var $a = $(this);
                var href = $a.attr('href');
                var $t = $(href);
                if ($t.length){
                    linkData.push({ $link: $a, $target: $t, offset: $t.offset().top - offsetAdjust });
                }
            });
            linkData.sort(function(a,b){ return a.offset - b.offset; });
        }

        function updateOffsets(){
            linkData.forEach(function(d){
                var top = d.$target.offset().top;
                var height = d.$target.outerHeight();
                d.top = top - offsetAdjust;
                d.bottom = top + height - offsetAdjust;
            });
        }

        function onScroll(){
            var vpMid = $(window).scrollTop() + ($(window).height() / 2);
            var current = null;

            // choose section whose center is closest to viewport middle
            var minDist = Infinity;
            for (var i=0;i<linkData.length;i++){
                var d = linkData[i];
                var top = d.$target.offset().top - offsetAdjust;
                var height = d.$target.outerHeight();
                var center = top + (height / 2);
                var dist = Math.abs(vpMid - center);
                if (dist < minDist){ minDist = dist; current = d; }
            }

            // clear all active
            $nav.find('.nav-link').removeClass('active');

            // if we're near very top, prefer Home
            if ($(window).scrollTop() < 100){
                $homeLink.addClass('active');
                return;
            }

            if (current){
                current.$link.addClass('active');
            }
        }

        // smooth scroll for in-page links
        $links.on('click', function(e){
            e.preventDefault();
            var target = $($(this).attr('href'));
            if (target.length){
                // instant jump for snappier navigation
                $('html,body').animate({ scrollTop: target.offset().top - offsetAdjust }, 0);
            }
        });

        // init
        build();
        $(window).on('resize', function(){ updateOffsets(); onScroll(); });
        $(document).on('scroll', onScroll);
        updateOffsets();
        onScroll();
    });
})(jQuery);

