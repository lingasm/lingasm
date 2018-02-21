// example of simple includes for js

//=include lib/jquery.min.js
//=include lib/slick.min.js
//=include lib/classie.js
//=include lib/fm.revealator.jquery.min.js



$(document).ready(function () {

  $(function(f){
    var element = f('#fix-nav-top'),
        sectionSlide = $('.topline').height();
    f(window).scroll(function(){
      if($(this).scrollTop() >= sectionSlide) {
        $('.header__nav').addClass('fixed');
        $('.header__nav.fixed').find('.logo').fadeIn();
      } else{
        $('.header__nav').removeClass('fixed');
        $('.header__nav').find('.logo').fadeOut();
      }
      // element['toggleclass'+ (f(this).scrollTop() > 200 ? 'a': 's')](500); 
    });
  });

  $(document).on('click', '.anchorJS', scrollNav )

  function scrollNav() {
    $('html, body').animate({
        scrollTop: $( $(this).data('href') ).offset().top
    }, 1000);
    return false;
  }

  // $('.header__nav.fixed').find('.logo').fadeIn()
  if ($('.header__nav').hasClass('fixed')) {
    $(this).find('.logo').fadeIn();
    console.log('dsds');
  }

/*  Slider  */
  
  function startSlider() {      
    $('.js-slider').slick({
      dots: false,
      arrows: false,
      autoplay: false,
      speed: 1500,
      cssEase: 'ease',
      autoplaySpeed: 4500,
      slidesToShow: 1
    });
  };
  startSlider();

  $('.js-slider').on('beforeChange', function(event, slick, currentSlide, nextSlide){
    $('.slide-item').find('.slide-item__text').removeClass('rotateIn');
    $('.slide-item').find('.slide-item__img').removeClass('zoomIn');
  });

  $('.js-slider').on('afterChange', function(event, slick, currentSlide){
    $('.slide-item.slick-active').find('.slide-item__text').addClass('rotateIn');
    $('.slide-item.slick-active').find('.slide-item__img').addClass('zoomIn');
  });

/*  end Slider  */

/* Animate scss */
  

/* End animate scss */

  (function() {
    // trim polyfill : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/Trim
    if (!String.prototype.trim) {
      (function() {
        // Make sure we trim BOM and NBSP
        var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
        String.prototype.trim = function() {
          return this.replace(rtrim, '');
        };
      })();
    }

    [].slice.call( document.querySelectorAll( '.order-form__input' ) ).forEach( function( inputEl ) {
      // in case the input is already filled..
      if( inputEl.value.trim() !== '' ) {
        classie.add( inputEl.parentNode, 'input--filled' );
      }

      // events:
      inputEl.addEventListener( 'focus', onInputFocus );
      inputEl.addEventListener( 'blur', onInputBlur );
    } );

    function onInputFocus( ev ) {
      classie.add( ev.target.parentNode, 'input--filled' );
    }

    function onInputBlur( ev ) {
      if( ev.target.value.trim() === '' ) {
        classie.remove( ev.target.parentNode, 'input--filled' );
      }
    }
  })();

});	

$(window).on('load', function(){
  $(window).scroll(function() {
    var wintop = $(window).scrollTop(), docheight = $('.content-out').height(), winheight = $(window).height();
    var totalScroll = (wintop/(docheight-winheight))*100;
    $(".progress-bar").css("width",totalScroll+"%");
  });

});