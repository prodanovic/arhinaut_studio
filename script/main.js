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

    //using index
    if(index == 1){
        //alert("Section 1 ended loading");
        $(".fp-prev").hide();
        $( ".fp-next").show();
        //$("<h3 class='arrow-text'>About us</h3>").insertAfter(".fp-next");
        $( ".fp-next" ).append( "<h3 class='arrow-text'>About us</h3>" );

    }

    //using anchorLink
    if(anchorLink == 'ourWork'){
        alert("Section ourWork ended loading");
    }
}

afterSlideLoadAction = function( anchorLink, index, slideAnchor, slideIndex) {
    var loadedSlide = $(this);

    //first slide of the second section
    if (index == 1 && slideIndex == 1) {
        $(".fp-prev").show();
        $( ".fp-prev" ).append( "<h3 class='arrow-text'>Back</h3>" );
        $(".fp-next").hide();
    }

    //second slide of the second section (supposing #secondSlide is the
    //anchor for the second slide
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