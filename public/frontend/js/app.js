


// Swipper slider
var swiper = new Swiper(".mySwiper", {
    spaceBetween: 30,
    effect: "fade",
    loop:true,
    autoplay: {
        delay: 250000,
        disableOnInteraction: false,
      },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    
  });


  // mobile menu
  // $(".menu__bar").click(function(){
    // $(".mobile__menu").slideToggle();
  // })

  $(".menu__bar").click(function(){
    $(".mobile__menu").toggleClass("open");
  })


var fixed_top = $("#header");
$(window).on('scroll', function(){
    if( $(this).scrolltop() > 100 ){
        fixed_top.addClass("animated fadeInDown menu-fixed");
    }
    else{
        fixed_top.removeClass("animated fadeInDown menu-fixed");
    }
});

var fixed_top = $("#mobile__header");
$(window).on('scroll', function(){
    if( $(this).scrollTop() > 100 ){
        fixed_top.addClass("animated fadeInDown menu-fixed");
    }
    else{
        fixed_top.removeClass("animated fadeInDown menu-fixed");
    }
});

 
$(".drop__home").click(function(){
  $(".home__ul").slideToggle("slow");
 
});


 $(".drop__lifestyle").click(function(){
   $(".lifestyle__ul").slideToggle("slow")
 })


//  mobile menu class add

$(".drop__home").click(function(){
  $("i.fa-solid.fa-angle-down.home").toggleClass("rotate");
})

$(".drop__lifestyle").click(function(){
  $("i.fa-solid.fa-angle-down.lifestyle").toggleClass("rotate");
})