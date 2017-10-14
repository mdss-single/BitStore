(function($){ 
	"use strict";

	// custom styles for select, radio buttons and checkboxes
	$('.select, .radio, .checkbox').styler();

	// hide all dropdown
	$('html').click(function() {
		$('.wallet__menu--active').removeClass('wallet__menu--active');
		$('.header__notice-link').removeClass('header__notice-link--active');
		$('.header__notice--active').removeClass('header__notice--active');
		$('.get-wallets__list--active').removeClass('get-wallets__list--active');
		$('.footer__language-list--active').removeClass('footer__language-list--active');
		$('.header__system--active').removeClass('header__system--active');
		$('.wallet__password--active').removeClass('wallet__password--active');
		$('.wallet__name--active').removeClass('wallet__name--active');
		$('.wallet__hide--active').removeClass('wallet__hide--active');
	});
	
	// show notices
	$('.js-header-notice').click(function(e) {
		e.preventDefault();
		e.stopPropagation();
		$(this).toggleClass('header__notice-link--active');
		$('.header__notice').toggleClass('header__notice--active');
	});
	$('.header__notice').click(function(e) {
		e.stopPropagation();
	});

	// show user menu in header
	$('.js-header-avatar').click(function(e) {
		e.preventDefault();
		e.stopPropagation();
		$(this).next('.header__system').toggleClass('header__system--active');
	});
	$('.header__system').click(function(e){
		e.stopPropagation();
	});

	// copy to clipboard function
	var clipboard = new Clipboard('.js-wallet-copy');
	$('.js-wallet-copy').click(function(e) {
		e.preventDefault();
	});
	$('[data-clipboard-text]').hover(function() {
		var thisPos = $(this).position();
		$('<span class="clipboard-tooltip" style="top:'+thisPos.top+'px;left:'+thisPos.left+'px">Копировать адрес</span>').insertAfter(this);
		if ($(window).width() < thisPos.left+160) $('.clipboard-tooltip').addClass('clipboard-tooltip--left');
	}, function() {
		$('.clipboard-tooltip').remove();
	});
	clipboard.on('success', function(e) {
		$('.clipboard-tooltip').text('Скопировано в буфер');
		e.clearSelection();
	});

	// wallet menu
	$('.js-wallet-menu').on('click', function(e) {
		e.preventDefault();
		e.stopPropagation();
		$(this).next().toggleClass('wallet__menu--active');
	});
	$('.wallet__menu').click(function(e) {
		e.stopPropagation();
	});
	$('.js-wallet-edit').click(function(e) {
		e.preventDefault();
		e.stopPropagation();
		$(this).closest('.wallet__menu--active').removeClass('wallet__menu--active');
		$(this).closest('.wallet__settings').find('.wallet__name').addClass('wallet__name--active');
	});
	$('.wallet__name').click(function(e) {
		e.stopPropagation();
	});
	$('.js-wallet-name-close').click(function() {
		$(this).closest('.wallet__name--active').removeClass('wallet__name--active');
	});
	$('.js-wallet-password').click(function(e) {
		e.preventDefault();
		e.stopPropagation();
		$(this).closest('.wallet__menu--active').removeClass('wallet__menu--active');
		$(this).closest('.wallet__settings').find('.wallet__password').addClass('wallet__password--active');
		var $this = $(this).closest('.wallet__settings').find('.wallet__password--active');
		var topOffset = $(this).closest('.wallet__settings').offset().top;
		var bottomOffset = $(document).height() - topOffset;
		if (bottomOffset < $this.outerHeight()) {
			$this.addClass('bottom--active');
		}
	});
	$('.wallet__password').click(function(e) {
		e.stopPropagation();
	});
	$('.js-wallet-password-close').click(function() {
		$(this).closest('.wallet__password--active').removeClass('wallet__password--active');
	});
	$('.js-wallet-hide').click(function(e) {
		e.preventDefault();
		e.stopPropagation();
		$(this).closest('.wallet__menu--active').removeClass('wallet__menu--active');
		$(this).closest('.wallet__settings').find('.wallet__hide').addClass('wallet__hide--active');
		var $this = $(this).closest('.wallet__settings').find('.wallet__hide--active');
		var topOffset = $(this).closest('.wallet__settings').offset().top;
		var bottomOffset = $(document).height() - topOffset;
		if (bottomOffset < $this.outerHeight()) {
			$this.addClass('bottom--active');
		}
	});
	$('.wallet__hide').click(function(e) {
		e.stopPropagation();
	});
	$('.js-wallet-hide-close').click(function() {
		$(this).closest('.wallet__hide--active').removeClass('wallet__hide--active');
	});

	// hello modal window
	var helloCarousel = $('.js-hello').flickity({
		cellSelector: '.hello__item',
		prevNextButtons: false,
	});
	$('.js-hello-skip').click(function(e) {
		e.preventDefault();
		localStorage.setItem('hello','shown');
	});
	if(localStorage.getItem('hello') != 'shown'){
		$.fancybox.open({
			src: '#modalHello',
			type: 'inline',
			opts : {
				touch: false,
				afterLoad : function( instance, current ) {
					helloCarousel.flickity('resize');
				}
			}
		});
	}
	$('.js-hello-next').click(function() {
		helloCarousel.flickity('next');
	});

	// modal windows
	$('.modal__close, .js-modal-close, .js-hello-skip').click(function(e){
		e.preventDefault();
		$.fancybox.close();
	});
	$('.js-modal').fancybox({
		touch: false,
		lang : 'ru',
		i18n : {
			'ru' : {
				CLOSE: 'Закрыть',
				ERROR: 'Невозможно загрузить данные. Попробуйте еще раз.',
			}
		},
		afterLoad: function(current) {
			$(this).find('input[autofocus]').focus();
			$('.select, .get__select').trigger('refresh');
			if (clipboard) {
				clipboard.destroy();
			}
			var clipboard = new Clipboard('.js-wallet-copy', {
				container: document.getElementById('modalGet'),
			});
			$('.js-wallet-copy').click(function(e) {
				e.preventDefault();
			});
			$('[data-clipboard-text]').hover(function() {
				var thisPos = $(this).position();
				$('<span class="clipboard-tooltip" style="top:'+thisPos.top+'px;left:'+thisPos.left+'px">Копировать адрес</span>').insertAfter(this);
				if ($(window).width() < thisPos.left+160) $('.clipboard-tooltip').addClass('clipboard-tooltip--left');
			}, function() {
				$('.clipboard-tooltip').remove();
			});
			clipboard.on('success', function(e) {
				$('.clipboard-tooltip').text('Скопировано в буфер');
				e.clearSelection();
			});
		}
	});

	// specify manually commission in send modal window
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

	// auto focus to next input in google verification
	$('.send__google-input').keyup(function() {
		if (this.value.length == this.maxLength) {
			$(this).next('.send__google-input').focus();
		}
	});

	// timer for resend new code
	var sendTimer = $('.js-send-resend').text();
	var sendInterval = setInterval(function() {
		sendTimer--;
		$('.js-send-resend').text(sendTimer);
		if (sendTimer === 0) {
			clearInterval(sendInterval);
			//$('.send__resend').html('<a href="#" class="send__resend-link">Выслать еще раз</a>');
		}
	}, 1000);

	// choose wallet in get modal widnow
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

	// tabs on settings page
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

	// tabs in two step verification modal window
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

	// tabs on partner program page
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

	// show your link on partner page
	$('.js-partner-link').click(function(e) {
		e.preventDefault();
		$('.partner__link-link').toggleClass('partner__link-link--active');
	});

	// show wallet value on adding page
	$('.js-addplace-currency').styler({
		onFormStyled: function() {
			var newVal = $('.js-adplace-currency').find('li.selected').attr('data-adplacevalue');
			var curVal = $('.js-adplace-currency').find('.jq-selectbox__select-text').text();
			$('.js-adplace-currency').find('.jq-selectbox__select-text').html(curVal + '<span>' + newVal + '</span>');
		},
		onSelectClosed: function() {
			var newVal = $(this).find('li.selected').attr('data-adplacevalue');
			var curVal = $(this).find('li.selected').text();
			$(this).find('.jq-selectbox__select-text').html(curVal + '<span>' + newVal + '</span>');
		}
	});

	// input file styling
	$('.deal-chat__file, .js-input-file').change(function() {
		$('label[for="' + this.id + '"]').text($(this).val());
	});

	// auto focus to next input in verification
	$('.verification-code__text').keyup(function() {
		if (this.value.length == this.maxLength) {
			$(this).next().focus();
		}
	});

	// show language list
	$('.js-footer-language').click(function(e) {
		e.preventDefault();
		e.stopPropagation();
		$(this).next().toggleClass('footer__language-list--active');
	});
	$('.footer__language-list').click(function(e) {
		e.stopPropagation();
	});

	// show period if select this option
	$('.transactions__nav-period').change(function(e) {
		if ( $(this).find('.js-transactions-period').is(':selected') ) {
			$('.transactions__period').addClass('transactions__period--active');
		}
	});
	$('.js-transactions-period-close').click(function() {
		$('.transactions__period--active').removeClass('transactions__period--active');
	});

	// support page QA expanding
	$('.support__questions-link').click(function(e) {
		e.preventDefault();
		$(this).next().toggleClass('support__answer-text--active');
	});

	// show wallet value into get modal
	$('.get__select').styler({
		onFormStyled: function() {
			var newVal = $('.get__select').find('li.selected').attr('data-value'),
			curVal = $('.get__select').find('.jq-selectbox__select-text').text(),
			hash = $('.get__select').find('li.selected').attr('data-hash');
			$('.get__select').find('.jq-selectbox__select-text').html(curVal + '<span>' + newVal + '</span>');
			$('.get-wallet__content-hash').text(hash);
			$('.get-wallets__content-link').attr('data-clipboard-text', hash);
		},
		onSelectClosed: function() {
			var newVal = $(this).find('li.selected').attr('data-value'),
			curVal = $(this).find('li.selected').text(),
			hash = $(this).find('li.selected').attr('data-hash');
			$(this).find('.jq-selectbox__select-text').html(curVal + '<span>' + newVal + '</span>');
			$('.get-wallet__content-hash').text(hash);
			$('.get-wallets__content-link').attr('data-clipboard-text', hash);
		}
	});

	$('.js-settings-edit').click(function(e) {
		e.preventDefault();
		$(this).closest('tr').addClass('settings__hidden').next().addClass('settings__hidden--active');
		$(this).closest('tr').next().find('input[autofocus]').focus();
		$('.select').trigger('refresh');
	});
	$('.js-settings-cancel').click(function(e) {
		e.preventDefault();
		$(this).closest('tr').removeClass('settings__hidden--active').prev().removeClass('settings__hidden');
	});

	console.log('%c Верстка: mdss@makexhtml.ru ', 'color:#fff;font-size:1.2rem;background-color:#3469c6;')

})(jQuery);