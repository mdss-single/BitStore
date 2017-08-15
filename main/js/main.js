(function($){ 
	"use strict";

	// mobile menu
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
		excludedElements: '.press',
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

	// press talking
	$('.js-press').flickity({
		prevNextButtons: false,
	});

})(jQuery);