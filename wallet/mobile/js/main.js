(function($){ 
	"use strict";

	// mobile menu
	var menu = $('.menu');
	$('.burger').click(function(e) {
		e.preventDefault();
		$(menu).addClass('menu--active');
		if (!$('.menu__cover').length) $('body').prepend('<div class="menu__cover"></div>');
		$('html').css('overflow','hidden');
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
		excludedElements:$.fn.swipe.defaults.excludedElements+', .js-wallets-list, .career__tabs',
		preventDefaultEvents: false,
	});
	$('.menu').swipe({
		swipeLeft:function() {
			$(menu).removeClass('menu--active');
			$('.menu__cover').remove();
			$('html').css('overflow','auto');
		},
		threshold:40,
	});

	new Clipboard('.js-wallet-copy');
	$('.js-wallet-copy').click(function(e) {
		e.preventDefault();
	});

	$('.js-wallets-list').flickity({
		prevNextButtons: false,
		wrapAround: true,
	});

	$('.js-wallet-add').click(function(e) {
		e.preventDefault();
		$('.add-wallet').addClass('add-wallet--active');
		$('body').prepend('<div class="modal__bg"></div>');
		$('html').css('overflow','hidden');
	});
	$('body').on('click', '.modal__bg, .add-wallet__btn-cancel', function(e) {
		$('.add-wallet--active').removeClass('add-wallet--active');
		$('.modal__bg').remove();
		$('html').css('overflow','auto');
		e.preventDefault();
	});

	if ( $('.home-wallets__item').length > 2) {
		$('.home-wallets__item:nth-child(n+3)').addClass('home-wallets__item--hidden');
		$('.js-home-wallets-show').click(function() {
			$('.home-wallets__item--hidden').removeClass('home-wallets__item--hidden');
			$(this).removeClass('home-wallets__show-all--active');
		});
		$('.js-home-wallets-counter').text($('.home-wallets__item').length - 2);
	} else {
		$('.home-wallets__show-all--active').removeClass('home-wallets__show-all--active');
	}

	$('.js-send-qr').click(function(e) {
		e.preventDefault();
		$(this).hide();
		$(this).next().addClass('get-wallet__qr--active');
	});

	console.log('%c Верстка: mdss@makexhtml.ru ', 'color:#fff;font-size:1.2rem;background-color:#3469c6;')

})(jQuery);