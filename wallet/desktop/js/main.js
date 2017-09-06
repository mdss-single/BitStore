(function($){ 
	"use strict";

	$('.select, .radio, .checkbox').styler();

	$('html').click(function() {
		$('.wallet__menu--active').removeClass('wallet__menu--active');
		$('.header__notice-link').removeClass('header__notice-link--active');
		$('.header__notice--active').removeClass('header__notice--active');
		$('.get-wallets__list--active').removeClass('get-wallets__list--active');
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

	new Clipboard('.js-wallet-copy');

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

	$('.js-send-custom-link').click(function(e) {
		$('.js-send-auto').removeClass('send__settings--active');
		$('.js-send-custom').addClass('send__settings--active');
		e.preventDefault();
	});
	$('.js-send-custom-cancel').click(function(e) {
		$('.js-send-custom').removeClass('send__settings--active');
		$('.js-send-auto').addClass('send__settings--active');
		e.preventDefault();
	});

	$('.js-wallet-send').click(function() {
		$('body').prepend('<div class="modal__bg"></div>');
		$('.send').addClass('send--active');
		$('.send').find('input[autofocus]').focus();
		$('.select').trigger('refresh');
	});
	$('body').on('click', '.send__close, .modal__bg, .js-send-close, .get__close', function(e) {
		$('.modal__bg').remove();
		$('.send--active').removeClass('send--active');
		$('.get--active').removeClass('get--active');
		e.preventDefault();
	});

	$('.send__google-input').keyup(function() {
		if (this.value.length == this.maxLength) {
			$(this).next('.send__google-input').focus();
		}
	});

	var sendTimer = $('.js-send-resend').text();
	var sendInterval = setInterval(function() {
		sendTimer--;
		$('.js-send-resend').text(sendTimer);
		if (sendTimer === 0) {
			clearInterval(sendInterval);
			//$('.send__resend').html('<a href="#" class="send__resend-link">Выслать еще раз</a>');
		}
	}, 1000);

	$('.js-wallet-get').click(function() {
		$('body').prepend('<div class="modal__bg"></div>');
		$('.get').addClass('get--active');
	});
	$('.get-wallets__current').click(function(e) {
		e.preventDefault();
		e.stopPropagation();
		$(this).next().toggleClass('get-wallets__list--active');
	});
	$('.get-wallets__list').each(function(i) {
		var storage = localStorage.getItem('tab' + i);
		if (storage) {
			$(this).find('div').removeClass('get-wallets__list-item--active').eq(storage).addClass('get-wallets__list-item--active').closest('.get__wallets').find('.get-wallets__content').removeClass('get-wallets__content--active').eq(storage).addClass('get-wallets__content--active');
		}
	});
	$('.get-wallets__list').on('click', 'div:not(.get-wallets__list-item--active)', function() {
		$(this).addClass('get-wallets__list-item--active').siblings().removeClass('get-wallets__list-item--active').closest('.get__wallets').find('.get-wallets__content').removeClass('get-wallets__content--active').eq($(this).index()).addClass('get-wallets__content--active');
		var ulIndex = $('.get-wallets__list').index($(this).parents('.get-wallets__list'));
		localStorage.removeItem('tab' + ulIndex);
		localStorage.setItem('tab' + ulIndex, $(this).index());
	});
	$('.get-wallets__list-item').click(function() {
		var thisContent = $(this).html();
		$('.get-wallets__current').html(thisContent);
	});

	console.log('%c Верстка: mdss@makexhtml.ru ', 'color:#fff;font-size:1.2rem;background-color:#3469c6;')

})(jQuery);