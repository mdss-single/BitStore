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

	var helloCarousel = $('.js-hello').flickity({
		cellSelector: '.hello__item',
		prevNextButtons: false,
	});
	var storage = localStorage.getItem('hello');
	if (!storage) {
		$('body').prepend('<div class="hello__bg"></div>');
		$('.hello').addClass('hello--active');
		helloCarousel.flickity('resize');
	}
	$('.js-hello-skip').click(function() {
		$('.hello__bg').remove();
		$('.hello').removeClass('hello--active');
		localStorage.setItem('hello', true);
	});
	$('.js-hello-next').click(function() {
		helloCarousel.flickity('next');
	});

	console.log('%c Верстка: mdss@makexhtml.ru ', 'color:#fff;font-size:1.2rem;background-color:#3469c6;')

})(jQuery);