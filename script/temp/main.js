
var body;
var viewport;
var currentSegment;
var currentSection;
var fswidth;
var fsheight;
var initState;
var state;

$(document).ready(function() {

    /* UI elements
     ----------------------------------*/
    body = $('body');
    viewport = $('.viewport');
    currentSegment = $('.segment.active');
    currentSection = $('.page.current');

    /* UI variables
     ----------------------------------*/
    fswidth = $(window).width();
    fsheight = $(window).height();

    /* UI bind events
     ----------------------------------*/
    $(window).bind('resize', windowResizeHandler);
    $('#project-list').bind('click', openProjectList);
    $('.close').bind('click', closeProjectList);
    $('.project-list .item a').bind('click', goToProject);

    /* Ready
     ----------------------------------*/
    initSite();
    initViewport();

});

/* Browser window resize handler
 ----------------------------------*/

function windowResizeHandler() {
    currentSection = $('.page.current');
    currentSegment = $('.segment.active');
    fswidth = $(window).width();
    fsheight = $(window).height();
    $('.page, .segment').width(fswidth).height(fsheight);
    $('.segment-container').each(function(event) {
        var segmentCount = $(this).find('.segment').length;
        var segmentContainerWidth = fswidth * segmentCount;
        $(this).width(segmentContainerWidth).height(fsheight);
    });
    currentSection.scrollTo( currentSegment, 0);
    viewport.scrollTo( currentSection, 0);
}

/* Initialise site
 ----------------------------------*/

function initSite() {

    // Append loading icon
    $('#site-mask').append('<span id="loader" class="loader" />');

    // Set load state: home, work or about
    state = initState = body.attr('class');

    // Prepend navigation arrows to DOM, bind click handlers
    $('.wrapper').prepend('<div class="panel-nav"><a href="#" id="rightArrow" class="arrow ra cr"><i></i><span>View</span></a><a href="/" class="arrow la cl"><span>Home</span><i></i></a><a href="#" class="arrow ua cu">Up</a><a href="#" class="arrow da cd">Down</a></div>');
    $('.cr').bind('click', slideRight);
    $('.cl').bind('click', slideLeft);
    $('.cu').bind('click', slideUp);
    $('.cd').bind('click', slideDown);
    $('a[rel="info"]').bind('click', goToInfo);

    // Load state: home
    if (state == "home") {

        $('header h1 a').bind('click', goToHome);

        // Append empty holding elements for page sections
        $('.item').each(function(index) {
            var data = $(this).data();
            var section = '<section class="page work" data-page="' + data['link'] + '" />';
            viewport.append(section);
        });

        // Load about content
        $('.homepage .segment-container').append('<div id="load-area" class="segment about-ajax"><div class="mask tabb"><span class="loader"/></div><div class="about-container"></div></div>');
        $('.about-container').load('/about/' + " #about-content, .footer-nav", function(response, status, xhr) {
            if (status == "success") {
                // $('.footer-nav a').bind('click', footerLinks);
            }
        });
    }

    if (state == "about") {
        $('.cl').unbind('click', slideLeft);
        // $('.footer-nav a').bind('click', footerLinks);
        removeSiteMask();
    } else {
        // Load first section
        var segments = $('section').eq(0).find('.segment-container .segment');
        segments.each(function(index) {
            segData = $(this).data();
            if ( !segData['bg'] == "" ) {
                $(this).backstretch(segData['bg'], {speed: 0} );
                $(this).on("backstretch.show", function () {
                    removeSiteMask();
                    // Remove segment masks
                    $(this).find('.sect.mask .loader').delay(1000).fadeTo(1000, 0, function() {
                        $(this).parent().fadeTo(1250, 0, "easeOutQuint", function() {
                            $(this).remove();
                        });
                    });
                });
            }
        });
        $('section').eq(0).addClass('loaded');
    }

    if (initState == "work") {
        $('.pad a').bind('click', goToInsights);
    }

}

/* Page functions
 ----------------------------------*/
function removeSiteMask() {
    $('#loader').delay(1000).fadeTo(1000, 0, function() {
        $('#site-mask').fadeTo(1250, 0, "easeOutQuint", function() {
            $(this).remove();
        });
    });
}

function loadPage(target) {
    var targetDiv;
    var targetUrl;
    var dataLoaded;
    if (target == "next") {
        targetDiv = $('.current').next();
    } else if (target == "prev") {
        targetDiv = $('.current').prev();
    } else {
        targetDiv = target;
    }
    targetUrl = targetDiv.data('page');
    dataLoaded = targetDiv.hasClass('loaded');
    if (targetUrl && dataLoaded == false) {
        targetDiv.load(targetUrl + " .segment-container", function(response, status, xhr) {
            if (status == "success") {
                targetDiv.addClass('loaded');
                initBackgroundImages(targetDiv);
                // Calculate width of segment-container and segments pre in viewport
                var noOfSegments = targetDiv.find('.segment').length;
                var segmentContainerWidth = fswidth * noOfSegments;
                targetDiv.find('.segment-container').css("width", segmentContainerWidth);
                targetDiv.find('.segment').css("width", fswidth);
                // Init viewport (again) for current viewport section
                if ( targetDiv.hasClass('current') ) {
                    $(document).unbind('keydown');
                    initViewport();
                }
                targetDiv.find('.pad a').bind('click', goToInsights);
                // Add scroll bar to browser chrome
                var imageWidth = targetDiv.find('.scroll-area img').width();
                if (imageWidth < 321) {
                    targetDiv.find('.website').addClass('mobile-viewport');
                }
                targetDiv.find('.scroll-area').mCustomScrollbar({
                    horizontalScroll: false,
                    scrollInertia: 550,
                    scrollEasing: "easeOutCirc",
                    mouseWheel: "pixels",
                    mouseWheelPixels: 60,
                    scrollButtons: {
                        enable: false,
                        scrollType: "continuous",
                        scrollSpeed: 20,
                        scrollAmount: 40
                    }
                });
            }
        });
    }
}

function initBackgroundImages(div) {
    var segments = div.find('.segment-container .segment');
    segments.each(function(index) {
        segData = $(this).data();
        if ( !segData['bg'] == "" ) {
            $(this).backstretch(segData['bg'], {speed: 450} );
            $(this).on("backstretch.show", function () {
                $(this).find('.sect.mask .loader').delay(1000).fadeTo(1000, 0, function() {
                    $(this).parent().fadeTo(1250, 0, "easeOutQuint", function() {
                        $(this).remove();
                    });
                });
            });
        }
    });
}

function upArrowKeyDownHandler(event) {
    if (event.keyCode == 38) {
        slideUp();
        return false;
    }
}

function rightArrowKeyDownHandler(event) {
    if (event.keyCode == 39) {
        slideRight();
        return false;
    }
}

function downArrowKeyDownHandler(event) {
    if (event.keyCode == 40) {
        slideDown();
        return false;
    }
}

function leftArrowKeyDownHandler(event) {
    if (event.keyCode == 37) {
        slideLeft();
        return false;
    }
}

function openProjectList(event) {
    event.preventDefault();
    $('.overlay').animate({bottom: "0%"}, 550, 'easeInOutCirc', function() {
        $('.overlay .mask').fadeOut(400);
        if (!$('.project-page').hasClass('mCustomScrollbar')) {
            $('.project-page').mCustomScrollbar({
                set_width: false,
                set_height: false,
                horizontalScroll: false,
                scrollInertia: 550,
                scrollEasing: "easeOutCirc",
                mouseWheel: "pixels",
                mouseWheelPixels: 60,
                autoDraggerLength: true,
                scrollButtons:{
                    enable: false,
                    scrollType: "continuous",
                    scrollSpeed: 20,
                    scrollAmount: 40
                }
            });
        }
    });
}

function closeProjectList(event) {
    if (event) {
        event.preventDefault();
    }
    $('.overlay .mask').fadeIn(250);
    $('.overlay').animate({bottom: "-100%"}, 600, 'easeInOutCirc', function(){
        $('.mCSB_container,.mCSB_dragger.ui-draggable').css('top', '0px');
    });
}

function goToProject(event) {
    event.preventDefault();
    if (state == "about") {
        $('header h1, .quick-links').removeClass('light');
        $('.la').removeClass('tip').removeClass('show');
    }
    var itemPosition = $(this).parent().parent().index() + 1;
    var targetSection = $('section').eq(itemPosition);
    closeProjectList();
    $('.viewport').scrollTo(targetSection, 0, {
        axis:'y',
        onAfter: function() {
            $(targetSection).scrollTo('0px', 0, {
                axis:'x',
                onAfter: function() {
                    $(document).unbind('keydown');
                    initViewport();
                    loadPage(targetSection);
                }
            });
        }
    });
}

function goToInfo(event) {
    if (event) {
        event.preventDefault();
    }
    var activeTabLink = $(this).hasClass('selected');
    if ( !activeTabLink ) {
        $('a[rel="info"]').removeClass('selected');
        $(this).addClass('selected');
        if (state != "about") {
            $('.viewport').scrollTo(0, 0, {
                axis:'y',
                onAfter: function() {
                    $('.homepage').scrollTo('+='+fswidth+'px', 450, {
                        axis:'x',
                        onAfter: function() {
                            initViewport();
                        }
                    });
                }
            });
        }
        var url = $(this).attr('href');
        $('.mask.tabb').fadeIn(200, function() {
            $('.mask.tabb .loader').fadeIn('fast', function() {
                $('#about-content').load(url + " .tab", function(response, status, xhr) {
                    if (status == "success") {
                        $('.content').imagesLoaded( function( $images ) {
                            $('.mask.tabb .loader').fadeOut('fast', function() {
                                $('.mask.tabb').fadeOut(400);
                            });
                        });
                    }
                    if (status == "error") {
                        document.location.href = href;
                    }
                });
            });
        });
    }
}

function goToHome(event) {
    event.preventDefault();
    if (state == "about") {
        $('header h1').removeClass('light');
        $('.quick-links').delay(200).removeClass('light');
        $('.la').removeClass('tip').removeClass('show');
    }
    $('.page.current').scrollTo(0, 750, {
        axis:'x',
        onAfter: function() {
            $('.viewport').scrollTo('0px', 750, {
                axis:'y',
                onAfter: function() {
                    initViewport();
                }
            });
        }
    });
}

/* Slide transitions
 ----------------------------------*/

function goToInsights(event) {
    if (event) {
        event.preventDefault();
    }
    $('.page.current').scrollTo('.insights', 450, {
        axis:'x',
        easing: 'easeInOutCirc',
        onAfter: function() {
            initViewport();
        }
    });
}

function slideUp(event) {
    if (event) {
        event.preventDefault();
    }
    $(document).unbind('keydown');
    $('.viewport').scrollTo('-='+fsheight+'px', 450, {
        axis:'y',
        easing: 'easeInOutCirc',
        onAfter: function() {
            initViewport();
            $('.page').scrollTo('0px', 0, {
                axis:'x'
            });
        }
    });
}

function slideRight(event) {
    if (event) {
        event.preventDefault();
    }
    $(document).unbind('keydown');
    if (state == "homepage") {
        $('.footer-nav a[rel="about"]').trigger('click');
    }
    $('.page.current').scrollTo('+='+fswidth+'px', 450, {
        axis:'x',
        easing: 'easeInOutCirc',
        onAfter: function() {
            initViewport();
        }
    });
}

function slideDown(event) {
    if (event) {
        event.preventDefault();
    }
    $(document).unbind('keydown');
    $('.viewport').scrollTo('+='+fsheight+'px', 450, {
        axis:'y',
        easing: 'easeInOutCirc',
        onAfter: function() {
            initViewport();
            $('.page').scrollTo('0px', 0, {
                axis:'x'
            });
        }
    });
}

function slideLeft(event) {
    if (event) {
        event.preventDefault();
    }
    $(document).unbind('keydown');
    if (state == "about") {
        $('header h1').removeClass('light');
        $('.quick-links').delay(200).removeClass('light');
        $('.la').removeClass('tip', 900);
    }
    $('.page.current').scrollTo('-='+fswidth+'px', 450, {
        axis:'x',
        easing: 'easeInOutCirc',
        onAfter: function() {
            initViewport();
        }
    });
}

/* Show/Hide arrows and key UI
 ----------------------------------*/

function initUIelements() {

    var currentParentPosition = $('.current').index() + 1;
    var totalParentSections = $('.viewport .page').length;

    var currentChildPosition = $('.active').index() + 1;
    var totalChildSegments = $('.current .segment-container .segment').length;

    if (state == "about") {
        // Change UI to light theme
        $('header h1, .quick-links').addClass('light');
        $('.la').addClass('tip', 'fast');
    } else if ("homepage") {
        $('.quick-links').not(":visible").fadeIn('fast');
    }

    // Arrow: ↑
    if (currentParentPosition == 1) {
        $('.ua').delay(300).removeClass('show', 600);
    } else {
        $(document).bind('keydown', upArrowKeyDownHandler);
        $('.ua').delay(300).addClass('show', 600);
    }

    // Arrow: →
    if (currentChildPosition == totalChildSegments || state == "homepage" || totalChildSegments == 0) {
        $('.ra').delay(300).removeClass('show', 800, "easeInCirc").removeClass('tip', 800, "easeInCirc");
    } else {
        $(document).bind('keydown', rightArrowKeyDownHandler);
        if (currentChildPosition == 1) {
            $('.ra').delay(300).addClass('tip', 900);
        } else {
            $('.ra').delay(300).addClass('show').removeClass('tip', 600, "easeOutCirc");
        }
    }

    // Arrow: ↓
    if (currentParentPosition == totalParentSections || state == "homepage" || state == "about") {
        $('.da').delay(300).removeClass('show', 600);
    } else {
        $(document).bind('keydown', downArrowKeyDownHandler);
        $('.da').delay(300).addClass('show', 600);
    }

    // Arrow: ←
    if (currentChildPosition == 1 || totalChildSegments == 0) {
        $('.la').delay(300).removeClass('show', 600);
    } else {
        $(document).bind('keydown', leftArrowKeyDownHandler);
        $('.la').delay(300).addClass('show', 600);
    }

    // Show / Hide logo in work section
    var logo = $('header h1');
    if (currentChildPosition > 1 && currentChildPosition < totalChildSegments) {
        // hide logo
        if (!logo.hasClass('min')) {
            logo = logo.clone();
            $(logo).addClass('min').insertAfter('header h1');
            $('header h1:first').fadeOut('fast', function(){
                $(this).remove();
                if (initState != "work") {
                    $('header h1 a').bind('click', goToHome);
                }
            });
        }
    } else {
        // show logo
        if (logo.hasClass('min')) {
            logo = logo.clone();
            $(logo).hide().removeClass('min').insertBefore('header h1');
            $('header h1:first').fadeIn(500, function(){
                $('header h1.min').remove();
                if (initState != "work") {
                    $('header h1 a').bind('click', goToHome);
                }
            });
        }
    }

}

/* Init page change (viewport)
 ----------------------------------*/

function initViewport() {

    // Remove .current and .active class selectors
    $('.page').removeClass('current');
    $('.page:in-viewport').addClass('current');
    $('.segment').removeClass('active');
    $('.segment:in-viewport').addClass('active');

    // Give segment height and width
    $('.segment').css('width', ''+fswidth+'px');

    // Assign secton name to state variable
    state = $('.current').attr('class');
    state = state.split(' ');
    state = state[1];

    // Overide state variable on 'about' section
    if ($('.segment:in-viewport').hasClass('about-ajax') || state == "about-page") {
        state = "about";
    }

    // Calculate width of segment-container
    var noOfSegments = $('.current .segment-container .segment').length;
    var segmentContainerWidth = fswidth * noOfSegments;
    $('.current .segment-container').css("width", segmentContainerWidth);

    // Do UI layout
    initUIelements();

    // Preload next page contents
    if (state == "homepage" || state == "work") {
        loadPage("next");
        loadPage("prev");
        $('a[rel="info"]').removeClass('selected');
    }

}

/* End of file: main.js
 ----------------------------------*/
