leavingSectionAction = function(index, nextIndex, direction){
    var leavingSection = $(this);

    //after leaving section 2
    //if(direction == 'down'){ //slideIndex == 0 &&
    //    $.fn.fullpage.moveTo(nextIndex, 0);
    //}
    //if(direction == 'up'){ //slideIndex == 0 &&
    //    $.fn.fullpage.moveTo(nextIndex, 0);
    //}
}

afterSectionLoadAction = function(anchorLink, index){
    var loadedSection = $(this);

    if(index == 1){
        $(".fp-prev").hide();
        $(".arrowUp").hide();

        //$("<h3 class='arrow-text'>About us</h3>").insertAfter(".fp-next");
        if(!$(".arrow-text-next").length)
            $(".fp-next").after("<h3 class='arrow-text arrow-text-next font'>About</h3>" );
        if(!$(".arrow-text-prev").length)
            $(".fp-prev").after("<h3 class='arrow-text arrow-text-prev font'>Back</h3>");
        if(!$(".arrow-text-down").length)
            $(".arrowDown").before("<h3 class='arrow-text arrow-text-down font'>Projects</h3>");

        $(".arrow-text-next").show();
        $(".fp-prev, .arrow-text-prev").hide();
        $(".arrow-text-down").show();
    }
    else {
        $(".fp-prev").show();
        $(".fp-next").show();
        $(".arrowUp").show();
        $(".arrow-text-next").hide();
        $(".arrow-text-prev").hide();
        $(".arrow-text-down").hide();

        $.fn.fullpage.setKeyboardScrolling(true, 'left');
        $.fn.fullpage.setKeyboardScrolling(true, 'right');

    }

    $.each($(".section:nth-child(" + index + ") img"), function(key, val) {
        if (val.hasAttribute('data-img-src')) {
            $(val).attr('src', $(val).attr('data-img-src'));
        }
    });


    //using anchorLink
    if(anchorLink == 'ourWork'){
        //alert("Section ourWork ended loading");
    }
}

afterSlideLoadAction = function( anchorLink, index, slideAnchor, slideIndex) {
    var loadedSlide = $(this);

    if (index == 1) {
        $(".arrowUp").hide();
        $(".arrowDown h3").show();
        if(slideIndex == 0){
            $(".fp-prev, .arrow-text-prev").hide();
            $(".fp-next, .arrow-text-next").show();
            $.fn.fullpage.setKeyboardScrolling(false, 'left');
            $.fn.fullpage.setKeyboardScrolling(true, 'right');
        }
        if(slideIndex > 0){
            $(".fp-prev, .arrow-text-prev").show();
            $(".fp-next, .arrow-text-next").hide();
            $.fn.fullpage.setKeyboardScrolling(false, 'right');
            $.fn.fullpage.setKeyboardScrolling(true, 'left');
        }
    }

}

leavingSlideAction = function( anchorLink, index, slideIndex, direction, nextSlideIndex){
    var leavingSlide = $(this);


    //leaving the 3rd slide of the 2nd Section to the left
    if(index == 2 && slideIndex == 1 && direction == 'left'){
        alert("Going to slide 2! ");
    }
}

$('.arrowUp').click(function(){
    $.fn.fullpage.moveSectionUp();
});

$('.arrowDown').click(function(){
    $.fn.fullpage.moveSectionDown();
});