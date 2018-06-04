// example of simple includes for js

//=include lib/jquery.min.js
//=include lib/slick.min.js
//=include lib/classie.js
//=include lib/fm.revealator.jquery.js

$(document).ready(function () {

/* active menu */

 $(document).on('click', '.anchorJS', scrollNav )

  function scrollNav() {
    $('html, body').animate({
        scrollTop: ($( $(this).data('href') ).offset().top - 40)
    }, 1000);
    return false;
  }



  function navbarResponsive() {  
    var toggles = $('.navbar-responsive__btn'),
        wrapperBg = $('.wrapper-bg'),
        togglesHidden = $('.topline__right');

    toggles.on("click", function (){      
      $(this).toggleClass('active');
      $(this).closest('.topline').find(togglesHidden).toggleClass('open');
      $(this).closest('.content-out').find(wrapperBg).fadeToggle();
    });
    toggles.mouseup(function(){
      return false;
    });     
  };
  navbarResponsive();

$(function () {
  var menu_selector = ".main-nav"; 
    function onScroll(){
      var scroll_top = $(document).scrollTop();
      $(menu_selector + " a").each(function(){
        var hash = $(this).attr("href");
        var target = $(hash);
        if ((target.position().top - 80) <= scroll_top && target.position().top + target.outerHeight() > scroll_top) {
          $(menu_selector + " a.active").removeClass("active");
          $(this).addClass("active");
        } else {
          $(this).removeClass("active");
        }
      });
    }

  $(document).on("scroll", onScroll);

  $("a[href^=#]").click(function(e){
    e.preventDefault();
    $(document).off("scroll");
    $(menu_selector + " a.active").removeClass("active");
    $(this).addClass("active");
    var hash = $(this).attr("href");
    var target = $(hash);
    $("html, body").animate({
        scrollTop: target.offset().top
    }, 500, function(){
      window.location.hash = hash;
      $(document).on("scroll", onScroll);
    });
  });
});

/* End active menu */
  var authorCourseTop = $('.author-course__top'),
      authorCourseDescr = $('.author-course__descr'),
      authorCourseHidden = $('.author-course__hidden');

    authorCourseTop.on("click", function () {
      var _this = $(this);
      _this.toggleClass('open');
      _this.closest(authorCourseDescr).find(authorCourseHidden).slideToggle();
      
    });
/* End author-courses */


});	

$(window).on('load', function(){
  $(window).scroll(function() {
    var wintop = $(window).scrollTop(), docheight = $('.content-out').height(), winheight = $(window).height();
    var totalScroll = (wintop/(docheight-winheight))*100;
    $(".progress-bar").css("width",totalScroll+"%");
  });

});