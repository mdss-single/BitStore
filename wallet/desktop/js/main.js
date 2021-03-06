(function($){ 
	"use strict";

	// custom styles for select, radio buttons and checkboxes
	$('.radio, .checkbox').styler();
	$('.select').select2({
		minimumResultsForSearch: -1,
	});
	$('.select, .get__select').on('select2:open', function (e) {
		var container = $(this).closest('body').find('.select2-dropdown');
		var winH = $(window).height();
		var position = container.offset();
		var availableHeight = winH - position.top;
		var bottomPadding = 50; // Set as needed
		$('ul.select2-results__options').css('max-height', (availableHeight - bottomPadding) + 'px');
	});
	// show wallet value in select
	$('.js-select-currency').select2({
		minimumResultsForSearch: -1,
		templateSelection: selectCurrency,
		templateResult: selectCurrency,
		escapeMarkup: function(m) {
			return m;
		}
	});
	function selectCurrency(item) {
		var $state = item.text + '<span>' + $(item.element).data('currency-value') + '</span>';
		return $state;
	};
	$('.get__select').select2({
		minimumResultsForSearch: -1,
		templateSelection: getCurrency,
		templateResult: getCurrency,
		escapeMarkup: function(m) {
			return m;
		}
	});
	function getCurrency(item) {
		var $state = item.text + '<span>' + $(item.element).data('value') + '</span>';
		var hash = $(item.element).data('hash');
		$('.get-wallet__content-hash').text(hash);
		$('.get-wallets__content-link').attr('data-clipboard-text', hash);
		return $state;
	};

	// hide all dropdown
	$(document).click(function(e) {
		if (!$(e.target).closest('.wallet__menu').length) {
			$('.wallet__menu').removeClass('wallet__menu--active');
		}
		if (!$(e.target).closest('.header__notice').length) {
			$('.header__notice').removeClass('header__notice--active');
			$('.header__notice-link').removeClass('header__notice-link--active');
		}
		if (!$(e.target).closest('.get-wallets__list').length) {
			$('.get-wallets__list').removeClass('get-wallets__list--active');
		}
		if (!$(e.target).closest('.footer__language-list').length) {
			$('.footer__language-list').removeClass('footer__language-list--active');
		}
		if (!$(e.target).closest('.header__system').length) {
			$('.header__system').removeClass('header__system--active');
		}
		if (!$(e.target).closest('.wallet__password').length) {
			$('.wallet__password').removeClass('wallet__password--active');
		}
		if (!$(e.target).closest('.wallet__name').length) {
			$('.wallet__name').removeClass('wallet__name--active');
		}
		if (!$(e.target).closest('.wallet__hide').length) {
			$('.wallet__hide').removeClass('wallet__hide--active');
		}
		if (!$(e.target).closest('.transactions__period').length) {
			$('.transactions__period').removeClass('transactions__period--active');
		}
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
		var thisWidth = $(this).outerWidth();
		$('<span class="clipboard-tooltip" style="top:'+thisPos.top+'px;left:'+(thisPos.left - thisWidth / 2)+'px">Копировать адрес</span>').insertAfter(this);
		if ($(window).width() < thisPos.left) $('.clipboard-tooltip').addClass('clipboard-tooltip--left');
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
		$.fancybox.close();
		localStorage.setItem('hello');
	});
	var hello = localStorage.getItem('hello');
	if (!hello) {
		$.fancybox.open({
			src: '#modalHello',
			type: 'inline',
			opts : {
				touch: false,
				afterLoad : function( instance, current ) {
					helloCarousel.flickity('resize');
					var flkty = helloCarousel.data('flickity');
					function playOnSelect() {
						var video = flkty.selectedElement.querySelector('video');
						video.play();
					}
					playOnSelect();
					helloCarousel.on( 'select.flickity', playOnSelect );
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
			if (clipboard) {
				clipboard.destroy();
			}
			var clipboard = new Clipboard('.js-wallet-copy', {
				container: document.getElementById('getPayment'),
			});
			$('.js-wallet-copy').click(function(e) {
				e.preventDefault();
			});
			$('.js-hello').flickity('resize');
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
			$('.select').trigger('change.select2');
		}
	});
	$('.settings__nav').on('click', 'div:not(.settings-nav__item--active)', function() {
		$(this).addClass('settings-nav__item--active').siblings().removeClass('settings-nav__item--active').closest('.settings').find('.settings__content').removeClass('settings__content--active').eq($(this).index()).addClass('settings__content--active');
		var ulIndex = $('.settings__nav').index($(this).parents('.settings__nav'));
		localStorage.removeItem('stab' + ulIndex);
		localStorage.setItem('stab' + ulIndex, $(this).index());
		$('.select').trigger('change.select2');
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
	$('.js-transactions-period').click(function(e) {
		e.stopPropagation();
	});
	$('.js-transactions-period-close').click(function() {
		$('.transactions__period--active').removeClass('transactions__period--active');
	});

	// support page QA expanding
	$('.support__questions-link').click(function(e) {
		e.preventDefault();
		$(this).next().toggleClass('support__answer-text--active');
	});

	$('.js-settings-edit').click(function(e) {
		e.preventDefault();
		$(this).closest('tr').addClass('settings__hidden').next().addClass('settings__hidden--active');
		$(this).closest('tr').next().find('input[autofocus]').focus();
		$('.select').trigger('change.select2');
	});
	$('.js-settings-cancel').click(function(e) {
		e.preventDefault();
		$(this).closest('tr').removeClass('settings__hidden--active').prev().removeClass('settings__hidden');
	});

	$('.js-input-phone').intlTelInput({
		nationalMode: false,
		preferredCountries: ["ru", "ua", "by", "kz"],
		initialCountry: "auto",
		geoIpLookup: function(callback) {
			$.get('https://ipinfo.io', function() {}, "jsonp").always(function(resp) {
				var countryCode = (resp && resp.country) ? resp.country : "";
				callback(countryCode);
			});
		},
		utilsScript: "js/phone-prefix.js"
	});

	$('.js-trade-comment').click(function(e) {
		e.preventDefault();
		$(this).next().toggleClass('trade-fav__comment--active');
	});

	$('.deal-review__rating-item').on('mouseover', function() {
		var onStar = parseInt($(this).data('value'), 10);
		$(this).parent().children('.deal-review__rating-item').each(function(e){
			if (e < onStar) {
				$(this).addClass('deal-review__rating-item--hovered');
			} else {
				$(this).removeClass('deal-review__rating-item--hovered');
			}
		});
	}).on('mouseout', function(){
		$(this).parent().children('.deal-review__rating-item').each(function(e){
			$(this).removeClass('deal-review__rating-item--hovered');
		});
	});
	$('.deal-review__rating-item').on('click', function(i) {
		var onStar = parseInt($(this).data('value'), 10);
		var stars = $(this).parent().children('.deal-review__rating-item');
		for (i = 0; i < stars.length; i++) {
			$(stars[i]).removeClass('deal-review__rating-item--selected');
		}
		for (i = 0; i < onStar; i++) {
			$(stars[i]).addClass('deal-review__rating-item--selected');
		}
	});
	// get clicked rating value
	//var ratingValue = parseInt($('.deal-review__rating-item--selected').last().data('value'), 10);

	$('.js-toggle-menu').click(function(e) {
		e.preventDefault();
		$('.main').toggleClass('main--narrow');
	});

	// editable content
	$('.js-editable').click(function(e) {
		e.preventDefault();
		$(this).addClass('editable__link--hidden').next('.editable__content').addClass('editable__content--active');
		setTimeout(function() {
			$('.select').trigger('change.select2');
		}, 1)
	});
	$('.editable__btn').click(function() {
		$(this).closest('.editable__content').removeClass('editable__content--active');
		$(this).closest('.editable__content').prev('.js-editable').removeClass('editable__link--hidden');
	});

	// dynamic width of input-text
	$.fn.textWidth = function(text, font) {
		if (!$.fn.textWidth.fakeEl) $.fn.textWidth.fakeEl = $('<span>').hide().appendTo(document.body);
		$.fn.textWidth.fakeEl.text(text || this.val() || this.text() || this.attr('placeholder')).css('font', font || this.css('font'));
		return $.fn.textWidth.fakeEl.width();
	};
	$('.js-input-text-dynamic').on('input', function() {
		var inputWidth = $(this).textWidth();
		$(this).css({
			width: inputWidth
		})
	}).trigger('input');
	var targetElem = $('.js-input-text-dynamic');
	inputWidth(targetElem);

	// datepicker
	$('.js-datepicker').datepicker({
		autoHide: true,
		format: 'dd.mm.yyyy',
		weekStart: 1,
		days: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
		daysMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
		months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
		monthsShort: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек']
	});

	$('.js-notice-close').click(function(e) {
		e.preventDefault();
		$(this).closest('.notice__item').addClass('notice__item--hide').delay(500).queue(function(){
			$(this).remove();
		});
	});

})(jQuery);

function inputWidth(elem, minW, maxW) {
	elem = $(this);
}