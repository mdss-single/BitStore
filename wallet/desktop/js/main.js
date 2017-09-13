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
	$('.js-wallet-copy').click(function(e) {
		e.preventDefault();
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
	$('body').on('click', '.send__close, .modal__bg, .js-send-close, .get__close, .twostep__cancel, .verification__close', function(e) {
		$('.modal__bg').remove();
		$('.send--active').removeClass('send--active');
		$('.get--active').removeClass('get--active');
		$('.twostep--active').removeClass('twostep--active');
		$('.verification--active').removeClass('verification--active');
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
			var thisContent = $(this).find('.get-wallets__list-item--active').html();
			$('.get-wallets__current').html(thisContent);
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

	$('.settings__nav').each(function(i) {
		var storage = localStorage.getItem('stab' + i);
		if (storage) {
			$(this).find('div').removeClass('settings-nav__item--active').eq(storage).addClass('settings-nav__item--active').closest('.settings').find('.settings__content').removeClass('settings__content--active').eq(storage).addClass('settings__content--active');
			$('.select').trigger('refresh');
		}
	});
	$('.settings__nav').on('click', 'div:not(.settings-nav__item--active)', function() {
		$(this).addClass('settings-nav__item--active').siblings().removeClass('settings-nav__item--active').closest('.settings').find('.settings__content').removeClass('settings__content--active').eq($(this).index()).addClass('settings__content--active');
		var ulIndex = $('.settings__nav').index($(this).parents('.settings__nav'));
		localStorage.removeItem('stab' + ulIndex);
		localStorage.setItem('stab' + ulIndex, $(this).index());
		$('.select').trigger('refresh');
	});

	$('.js-twostep-link').click(function(e) {
		$('body').prepend('<div class="modal__bg"></div>');
		$('.twostep').addClass('twostep--active');
		e.preventDefault();
	});

	$('.twostep__tabs').each(function(i) {
		var storage = localStorage.getItem('ttab' + i);
		if (storage) {
			$(this).find('div').removeClass('twostep__tab--active').eq(storage).addClass('twostep__tab--active').closest('.twostep').find('.twostep__content').removeClass('twostep__content--active').eq(storage).addClass('twostep__content--active');
		}
	});
	$('.twostep__tabs').on('click', 'div:not(.twostep__tab--active)', function() {
		$(this).addClass('twostep__tab--active').siblings().removeClass('twostep__tab--active').closest('.twostep').find('.twostep__content').removeClass('twostep__content--active').eq($(this).index()).addClass('twostep__content--active');
		var ulIndex = $('.twostep__tabs').index($(this).parents('.twostep__tabs'));
		localStorage.removeItem('ttab' + ulIndex);
		localStorage.setItem('ttab' + ulIndex, $(this).index());
	});

	$('.partner-banners__tabs').each(function(i) {
		var storage = localStorage.getItem('ptab' + i);
		if (storage) {
			$(this).find('div').removeClass('partner-banners__tab--active').eq(storage).addClass('partner-banners__tab--active').closest('.partner__banners').find('.partner-banners__content').removeClass('partner-banners__content--active').eq(storage).addClass('partner-banners__content--active');
		}
	});
	$('.partner-banners__tabs').on('click', 'div:not(.partner-banners__tab--active)', function() {
		$(this).addClass('partner-banners__tab--active').siblings().removeClass('partner-banners__tab--active').closest('.partner__banners').find('.partner-banners__content').removeClass('partner-banners__content--active').eq($(this).index()).addClass('partner-banners__content--active');
		var ulIndex = $('.partner-banners__tabs').index($(this).parents('.partner-banners__tabs'));
		localStorage.removeItem('ptab' + ulIndex);
		localStorage.setItem('ptab' + ulIndex, $(this).index());
	});

	$('.js-partner-link').click(function(e) {
		$('.partner__link-link').toggleClass('partner__link-link--active');
		e.preventDefault();
	});

	$('.js-adplace-currency').styler({
		onFormStyled: function() {
			var newVal = $('.js-adplace-currency').find('li.selected').attr('data-adplacevalue');
			var curVal = $('.js-adplace-currency').find('.jq-selectbox__select-text').text();
			$('.js-adplace-currency').find('.jq-selectbox__select-text').html(curVal + '<span>' + newVal + '</span>');
		},
		onSelectClosed: function() {
			var newVal = $(this).find('li.selected').attr('data-adplacevalue');
			var curVal = $(this).find('.jq-selectbox__select-text').text();
			$(this).find('.jq-selectbox__select-text').html(curVal + '<span>' + newVal + '</span>');
		}
	});

	$('.deal-chat__file').change(function() {
		$('label[for="' + this.id + '"]').text($(this).val());
	});

	$('.verification-code__text').keyup(function() {
		if (this.value.length == this.maxLength) {
			$(this).next().focus();
		}
	});

	$('.js-verification-btn').click(function(e) {
		e.preventDefault();
		$('.verification').addClass('verification--active');
		$('body').prepend('<div class="modal__bg"></div>');
	});

	console.log('%c Верстка: mdss@makexhtml.ru ', 'color:#fff;font-size:1.2rem;background-color:#3469c6;')

})(jQuery);