leavingSectionAction = function(index, nextIndex, direction){
    var leavingSection = $(this);

    //after leaving section 2
    if(index == 2 && direction =='down'){
        alert("Going to section 3!");
    }

    else if(index == 2 && direction == 'up'){
        alert("Going to section 1!");
    }
}

afterSectionLoadAction = function(anchorLink, index){
    var loadedSection = $(this);

    if(index == 1){

        //$("<h3 class='arrow-text'>About us</h3>").insertAfter(".fp-next");
        if(!$(".arrow-text-next").length)
            $(".fp-next").append("<h3 class='arrow-text arrow-text-next font'>About us</h3>" );
        if(!$(".arrow-text-prev").length)
            $(".fp-prev").append("<h3 class='arrow-text arrow-text-prev font'>Back</h3>");
        if(!$(".arrow-text-down").length)
            $(".arrowDown").append("<h3 class='arrow-text arrow-text-down font'>Projects</h3>" );

        $(".fp-prev").hide();

    }

    //using anchorLink
    if(anchorLink == 'ourWork'){
        //alert("Section ourWork ended loading");
    }
}

afterSlideLoadAction = function( anchorLink, index, slideAnchor, slideIndex) {
    var loadedSlide = $(this);

    if (index == 1) {
        $(".arrowUp").hide();
        if(slideIndex == 0){
            $(".fp-prev").hide();
            $(".fp-next").show();
            $.fn.fullpage.setKeyboardScrolling(false, 'left');
            $.fn.fullpage.setKeyboardScrolling(true, 'right');
        }
        if(slideIndex == 1){
            $(".fp-prev").show();
            $(".fp-next").hide();
            $.fn.fullpage.setKeyboardScrolling(false, 'right');
            $.fn.fullpage.setKeyboardScrolling(true, 'left');
        }
    }
    if (index == 2 && slideIndex == 'secondSlide') {
        alert("Second slide loaded");
    }
}

leavingSlideAction = function( anchorLink, index, slideIndex, direction, nextSlideIndex){
    var leavingSlide = $(this);

    //leaving the first slide of the 2nd Section to the right
    if(index == 2 && slideIndex == 0 && direction == 'right'){
        alert("Leaving the fist slide!!");
    }

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