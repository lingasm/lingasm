// example of simple includes for js

//=include lib/jquery.min.js
//=include lib/slick.min.js
//=include lib/classie.js
//=include lib/svganimations.js

//=include lib/css3-animate-it.js
//=include lib/detect_swipe.js

$(document).ready(function () {

/* active menu */

 $(document).on('click', '.anchorJS', scrollNav )

  function scrollNav(e) {
    e.preventDefault();
    $('html, body').animate({
        scrollTop: ($( $(this).data('href') ).offset().top - 40)
    }, 1000);
    return false;
  }

  $('.wrapper-bg').on('click', function(e) {
    var _self = $(this),
        togglesHidden = $('.topline__right'),
        contentOut = $('.content-out');
    if (!$(e.target).closest($('.topline')).length){
      _self.fadeToggle();
      _self.closest(contentOut).find(togglesHidden).toggleClass('open');
      _self.closest(contentOut).find('.navbar-responsive__btn').removeClass('active');
      _self.closest('body').toggleClass('no-scroll');
    }
  });

  $('.anchorJS').on('click', function(e) {
    var _self = $(this),
        togglesHidden = $('.topline__right'),
        contentOut = $('.content-out'),
        wrapperBg = $('.wrapper-bg');
    _self.closest(contentOut).find(togglesHidden).removeClass('open');
    _self.closest(contentOut).find('.navbar-responsive__btn').removeClass('active');
    _self.closest('.content-out').find(wrapperBg).fadeOut();
    _self.closest('body').removeClass('no-scroll');

  });

  $(".js-nav-swipe").on('swiperight',  function() {
    var _self = $(this),
    wrapperBg = $('.wrapper-bg');
    _self.removeClass('open');
    _self.closest('.topline').find('.navbar-responsive__btn').removeClass('active');
    _self.closest('.content-out').find(wrapperBg).fadeToggle();
    _self.closest('body').toggleClass('no-scroll');
  })


  function navbarResponsive() {
    var toggles = $('.navbar-responsive__btn'),
        wrapperBg = $('.wrapper-bg'),
        togglesHidden = $('.topline__right');

    toggles.on("click", function (){
      $(this).toggleClass('active');
      $(this).closest('.topline').find(togglesHidden).toggleClass('open');
      $(this).closest('.content-out').find(wrapperBg).fadeToggle();
      $(this).closest('body').toggleClass('no-scroll');
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




/* question-drop */
$(function () {
  var  sidebarDrop = $('.question-drop__descr'),
    sidebarmenuItem = $('.question-drop__block'),
    sidebarmenuLink = $('.question-drop__title');

  sidebarmenuLink.on("click", function() {
    sidebarmenuItem.removeClass('active');
    $(this).closest(sidebarmenuItem).addClass('active');
    var checkElement = $(this).next();
      if((checkElement.is(sidebarDrop)) && (checkElement.is(':visible'))) {
        $(this).closest(sidebarmenuItem).removeClass('active');
        checkElement.slideUp('normal');
      }
      if((checkElement.is(sidebarDrop)) && (!checkElement.is(':visible'))) {
        $('.question-drop .question-drop__descr:visible').slideUp('normal');
        checkElement.slideDown('normal');
      }
      // if($(this).closest('li').find('ul').children().length == 0) {
      //   return true;
      // } else {
      //   return false;
      // }

  });
});

/* end question-drop */

  function inputChangLevel(){
    var inputChange = $('.js-question-checkbox__input');

    inputChange.on('change', function() {
      var _this = $(this);

      var questionText =  _this.closest($('.question-checkbox__label'))
            .find('.question-checkbox__text')
            .text();
      _this.closest($('.question-drop__block'))
            .find($('.question__gap')).text(questionText);
    });
  };
  inputChangLevel()








});

$(window).on('load', function(){
  $(window).scroll(function() {
    var wintop = $(window).scrollTop(), docheight = $('.content-out').height(), winheight = $(window).height();
    var totalScroll = (wintop/(docheight-winheight))*100;
    $(".progress-bar").css("width",totalScroll+"%");
  });

});
