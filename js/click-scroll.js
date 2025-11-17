// jquery-click-scroll
// Improved: set active state only for the nav link whose target section is in view

$(function(){
    var $links = $('.navbar-nav .nav-item .nav-link.click-scroll');
    var linkData = [];

    function buildLinkData(){
        linkData = [];
        $links.each(function(){
            var $a = $(this);
            var href = $a.attr('href');
            if (!href || href.charAt(0) !== '#') return;
            var $target = $(href);
            if ($target.length === 0) return;
            linkData.push({ $link: $a, href: href, $target: $target, offset: $target.offset().top - 90 });
        });
        // sort by offset ascending
        linkData.sort(function(a,b){ return a.offset - b.offset; });
    }

    function updateOffsets(){
        linkData.forEach(function(d){ d.offset = d.$target.offset().top - 90; });
    }

    function onScroll(){
        var docScroll1 = $(document).scrollTop() + 1;
        var current = null;
        for (var i = 0; i < linkData.length; i++){
            if (docScroll1 >= linkData[i].offset) current = linkData[i];
            else break;
        }

        if (current){
            $links.removeClass('active').addClass('inactive');
            current.$link.addClass('active').removeClass('inactive');
        }
    }

    // click behavior
    $links.on('click', function(e){
        e.preventDefault();
        var targetId = $(this).attr('href');
        var $t = $(targetId);
        if ($t.length){
            var offsetClick = $t.offset().top - 90;
            $('html, body').animate({ scrollTop: offsetClick }, 0);
        }
        
        // Close mobile navbar after clicking a link
        var navbarCollapse = $('.navbar-collapse');
        if (navbarCollapse.hasClass('show')) {
            navbarCollapse.removeClass('show');
            $('.navbar-toggler').attr('aria-expanded', 'false');
        }
    });

    // build data and wire events
    buildLinkData();
    $(document).on('scroll', onScroll);
    $(window).on('resize', function(){ updateOffsets(); onScroll(); });

    // initial state
    $links.addClass('inactive');
    if (linkData.length) { linkData[0].$link.addClass('active').removeClass('inactive'); }
    updateOffsets();
    onScroll();
});