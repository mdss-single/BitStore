(function($){ 
	"use strict";

	// mobile menu
	$(window).on('load resize', function() {
		if ($(window).width() < 992) {
			var menu = $('.menu');
			$('.burger').click(function(e) {
				$(menu).addClass('menu--active');
				$('body').prepend('<div class="menu__cover"></div>');
				$('html').css('overflow','hidden');
				e.preventDefault();
			});
			$('body').on('click', '.menu__cover', function() {
				$(menu).removeClass('menu--active');
				$('.menu__cover').remove();
				$('html').css('overflow','auto');
			});
			$('body').swipe({
				swipeRight:function() {
					$(menu).addClass('menu--active');
					if (!$('.menu__cover').length) $('body').prepend('<div class="menu__cover"></div>');
					$('html').css('overflow','hidden');
				},
				threshold:40,
				excludedElements:$.fn.swipe.defaults.excludedElements+', .press',
				preventDefaultEvents: false,
			});
			$('.menu').swipe({
				swipeLeft:function() {
					$(menu).removeClass('menu--active');
					$('.menu__cover').remove();
					$('html').css('overflow','auto');
				},
				threshold:40
			});
		} else {
			$('body').swipe('destroy');
		}
	});

	// press talking
	if ($(window).width() < 992) {
		$('.js-press').flickity({
			prevNextButtons: false,
		});
	}

	console.log('%c Верстка: mdss@makexhtml.ru ', 'color:#fff;font-size:1.2rem;background-color:#3469c6;')

})(jQuery);