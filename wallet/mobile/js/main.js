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

	var clipboard = new Clipboard('.js-wallet-copy');
	$('.js-wallet-copy').click(function(e) {
		e.preventDefault();
	});
	clipboard.on('success', function(e) {
		alert('Скопировано в буфер');
		e.clearSelection();
	});

	$('.js-wallets-list').flickity({
		prevNextButtons: false,
		wrapAround: true,
	});

	$('.js-wallet-add').click(function(e) {
		e.preventDefault();
		$('.add-wallet').addClass('modal--active');
		$('body').prepend('<div class="modal__bg"></div>');
		$('html').css('overflow','hidden');
	});
	$('.js-deal-confirm').click(function(e) {
		e.preventDefault();
		$('.deal-confirm').addClass('modal--active');
		$('body').prepend('<div class="modal__bg"></div>');
		$('html').css('overflow','hidden');
	});
	$('.js-deal-cancel').click(function(e) {
		e.preventDefault();
		$('.deal-cancel').addClass('modal--active');
		$('body').prepend('<div class="modal__bg"></div>');
		$('html').css('overflow','hidden');
	});
	$('body').on('click', '.modal__bg, .add-wallet__btn-cancel, .js-modal-cancel', function(e) {
		$('.modal--active').removeClass('modal--active');
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

	$('.help__section-title').click(function() {
		$(this).addClass('help__section-title--active').siblings().removeClass('help__section-title--active').closest('.help').find('.help__section').removeClass('help__section--active');
		$(this).next().toggleClass('help__section--active');
	});
	$('.help-section__question').click(function() {
		$(this).next().toggleClass('help-section__answer--active');
	});

	$('.js-favorite-select').click(function(e) {
		e.preventDefault();
		$(this).toggleClass('favorite__select--selected');
		$('.favorite__item').toggleClass('favorite__item--active');
	});

	$('.personal-verification__code-input').keyup(function() {
		if (this.value.length == this.maxLength) {
			$(this).next().focus();
		}
	});

	$('.js-chat-link').click(function(e) {
		e.preventDefault();
		$('.deal-chat').addClass('deal-chat--active');
		$('html').css('overflow-y','hidden');
	});
	$('.js-chat-close').click(function(e) {
		e.preventDefault();
		$('.deal-chat').removeClass('deal-chat--active');
		$('html').css('overflow-y','auto');
	});

	$('.js-notice-close').click(function(e) {
		e.preventDefault();
		$(this).closest('.notice__item').addClass('notice__item--hide').delay(500).queue(function(){
			$(this).remove();
		});
	});

	setInterval(function() {
		var timer = $('.js-countdown').data('countdown').split(':');
		var minutes = parseInt(timer[0], 10);
		var seconds = parseInt(timer[1], 10);
		--seconds;
		minutes = (seconds < 0) ? --minutes : minutes;
		if (minutes < 0) clearInterval(interval);
		seconds = (seconds < 0) ? 59 : seconds;
		seconds = (seconds < 10) ? '0' + seconds : seconds;
		$('.js-countdown').html(minutes + ':' + seconds);
		$('.js-countdown').data('countdown', minutes + ':' + seconds);
	}, 1000);

	$('.js-settings-avatar').change(function () {
		readURL(this);
	});
	function readURL(input) {
		if (input.files && input.files[0]) {
			var reader = new FileReader();
			reader.onload = function (e) {
				$('.js-settings-avatar-pic').attr('src', e.target.result);
			}
			reader.readAsDataURL(input.files[0]);
		}
	}

})(jQuery);
$(document).one('focus.autoExpand', 'textarea.autoExpand', function(){
	var savedValue = this.value;
	this.value = '';
	this.baseScrollHeight = this.scrollHeight;
	this.value = savedValue;
}).on('input.autoExpand', 'textarea.autoExpand', function(){
	var minRows = this.getAttribute('data-min-rows')|0, rows;
	this.rows = minRows;
	rows = Math.ceil((this.scrollHeight - this.baseScrollHeight) / 20);
	this.rows = minRows + rows;
});