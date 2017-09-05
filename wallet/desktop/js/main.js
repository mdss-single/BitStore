(function($){ 
	"use strict";

	$('html').click(function() {
		$('.wallet__menu--active').removeClass('wallet__menu--active');
		$('.header__notice-link').removeClass('header__notice-link--active');
		$('.header__notice--active').removeClass('header__notice--active');
	});
	
	$('.js-header-notice').click(function(e) {
		e.preventDefault();
		e.stopPropagation();
		$(this).toggleClass('header__notice-link--active');
		$('.header__notice').toggleClass('header__notice--active');
	});
	$('.header__notice').click(function(e) {
		e.stopPropagation();
	});

	$('.js-wallet-menu').on('click', function(e) {
		e.preventDefault();
		e.stopPropagation();
		$(this).next().toggleClass('wallet__menu--active');
	});
	$('.wallet__menu').click(function(e) {
		e.stopPropagation();
	});

	console.log('%c Верстка: mdss@makexhtml.ru ', 'color:#fff;font-size:1.2rem;background-color:#3469c6;')

})(jQuery);