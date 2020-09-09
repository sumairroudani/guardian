    $(function () {
        $('.mail-address').hide();
        $('#mail_addother').on('click', function () {
            if ($(this).prop('checked')) {
                $('.mail-address').show();
            } else {
                $('.mail-address').hide();
            }
        });
    });

        $(function () {
        $('.trusted_person').hide();
        $('#trusted_person').on('click', function () {
            if ($(this).prop('checked')) {
                $('.trusted_person').show();
            } else {
                $('.trusted_person').hide();
            }
        });
    });

    $(document).ready(function(){
        // Add minus icon for collapse element which is open by default
        $(".collapse.show").each(function(){
          $(this).prev(".card-header").find(".fa").addClass("fa-minus").removeClass("fa-plus");
        });
        
        // Toggle plus minus icon on show hide of collapse element
        $(".collapse").on('show.bs.collapse', function(){
          $(this).prev(".card-header").find(".fa").removeClass("fa-plus").addClass("fa-minus");
        }).on('hide.bs.collapse', function(){
          $(this).prev(".card-header").find(".fa").removeClass("fa-minus").addClass("fa-plus");
        });

  if ($(window).width() <= 575){  
   $('.dblogo,.dbnav,.dbadmin').wrapAll('<div id="mobileNav" class="sidenav"></div>');
   $(".sidenav").append("<a href='javascript:void(0)' class='closebtn' onclick='closeNav()'>&times;</a>");
  } else{
     $('.dblogo,.dbnav,.dbadmin').unwrap('<div id="mobileNav" class="sidenav"></div>');
  }
        
});



$(window).resize(function(){
  if ($(window).width() <= 575){  
       $('.dblogo,.dbnav,.dbadmin').wrapAll('<div id="mobileNav" class="sidenav"></div>');
        $(".sidenav").append("<a href='javascript:void(0)' class='closebtn' onclick='closeNav()'>&times;</a>");
  } else{
         $('.dblogo,.dbnav,.dbadmin').unwrap('<div id="mobileNav" class="sidenav"></div>');
  }
});


function openNav() {
  document.getElementById("mobileNav").style.width = "250px";
}

function closeNav() {
  document.getElementById("mobileNav").style.width = "0";
}





//jQuery time
var current_fs, next_fs, previous_fs; //fieldsets
var left, opacity, scale; //fieldset properties which we will animate
var animating; //flag to prevent quick multi-click glitches

$(".next").click(function(){

   var form = $(this).closest("form");
            var validator = form.data("validator");
            var section = $(this).closest("div");
            var fields = section.find(".validate");
            if (fields.valid()){

              
             if(animating) return false;
    animating = true;
    
    current_fs = $(this).parent();
    next_fs = $(this).parent().next();
    
    //activate next step on progressbar using the index of next_fs
    $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");
    
    //show the next fieldset
    next_fs.show(); 
    //hide the current fieldset with style
    current_fs.animate({opacity: 0}, {
        step: function(now, mx) {
            //as the opacity of current_fs reduces to 0 - stored in "now"
            //1. scale current_fs down to 80%
            scale = 1 - (1 - now) * 0.2;
            //2. bring next_fs from the right(50%)
            left = (now * 50)+"%";
            //3. increase opacity of next_fs to 1 as it moves in
            opacity = 1 - now;
            current_fs.css({
        'transform': 'scale('+scale+')',
        'position': 'relative',
        'top'     : '0'
      });
            next_fs.css({'left': left, 'opacity': opacity});
        }, 
        duration: 500, 
        complete: function(){
            current_fs.hide();
            animating = false;
        }, 
        //this comes from the custom easing plugin
        easing: 'easeInQuad'
    });

}else{
   $('.validate').removeClass('emsg');
}
    
});

$(".previous").click(function(){
    if(animating) return false;
    animating = true;
    
    current_fs = $(this).parent();
    previous_fs = $(this).parent().prev();
    
    //de-activate current step on progressbar
    $("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");
    
    //show the previous fieldset
    previous_fs.show(); 
    //hide the current fieldset with style
    current_fs.animate({opacity: 0}, {
        step: function(now, mx) {
            //as the opacity of current_fs reduces to 0 - stored in "now"
            //1. scale previous_fs from 80% to 100%
            scale = 0.8 + (1 - now) * 0.2;
            //2. take current_fs to the right(50%) - from 0%
            left = ((1-now) * 50)+"%";
            //3. increase opacity of previous_fs to 1 as it moves in
            opacity = 1 - now;
            current_fs.css({'left': left});
            previous_fs.css({'transform': 'scale('+scale+')', 'opacity': opacity, 'top' : 0});
        }, 
        duration: 500, 
        complete: function(){
            current_fs.hide();
            animating = false;
        }, 
        //this comes from the custom easing plugin
        easing: 'easeInQuad'
    });
});

$(".submit").click(function(){
    return true;
})

$('.label-icon').click(function() {
    $(this).addClass('radiocurrent').siblings().removeClass('radiocurrent');
    
});


$('.changeVal').click(function(){
        if($(this).attr("value")=="employed"){
            $(".emp_name").text('Employer Name');
            $(".occ_name").text('Occupation');
             $(".busi_adres").text('Address Of Employer');
             $(".ywe").text('Years With Employer');
             $(".eb_phone").text('Employers Phone Number');
             $('.current-work').show('slow');

              
        }
        if($(this).attr("value")=="self_employee"){
         $(".emp_name").text('Bussiness Name');
         $(".occ_name").text('Company Type');
         $(".busi_adres").text('Business Address');
         $(".ywe").text('Years of business');
         $(".eb_phone").text('Business Phone Number');
         $('.current-work').show('slow');

        }   
        if($(this).attr("value")=="not_employee"){
            $('.current-work').hide('slow');
         
        }
        if($(this).attr("value")=="retired"){
         $('.current-work').hide('slow');

        } 
        if($(this).attr("value")=="other_bussi"){
         $(".emp_name").text('Bussiness Name');
         $(".occ_name").text('Company Type');
         $(".busi_adres").text('Business Address');
         $(".ywe").text('Years of business');
         $(".eb_phone").text('Business Phone Number');
         $('.current-work').show('slow');
         
        }     
    });


if (/Mobi/.test(navigator.userAgent)) {
  // if mobile device, use native pickers
  $(".date input").attr("type", "date");
  $(".time input").attr("type", "time");
} else {
  // if desktop device, use DateTimePicker
  $("#datepicker").datetimepicker({
    useCurrent: false,
    format: "L",
    showTodayButton: true,
    icons: {
      next: "fa fa-chevron-right",
      previous: "fa fa-chevron-left",
      today: 'todayText',
    }
  });
  $("#timepicker").datetimepicker({
    format: "LT",
    icons: {
      up: "fa fa-chevron-up",
      down: "fa fa-chevron-down"
    }
  });
}








