(function($){ 
	"use strict";

	$(document).click(function(e) {
		if (!$(e.target).closest('.wallet__menu').length) {
			$('.wallet__menu').removeClass('wallet__menu--active');
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
		if (!$(e.target).closest('.footer__language-list').length) {
			$('.footer__language-list').removeClass('footer__language-list--active');
		}
	});

	$('.tabs__nav').each(function(i) {
		var storage = localStorage.getItem('tab' + i);
		if (storage) {
			$(this).find('div').removeClass('tabs__nav-item--active').eq(storage).addClass('tabs__nav-item--active').closest('.tabs').find('.tab__content').removeClass('tab__content--active').eq(storage).addClass('tab__content--active');
		}
	});
	$('.tabs__nav').on('click', 'div:not(.tabs__nav-item--active)', function() {
		$(this).addClass('tabs__nav-item--active').siblings().removeClass('tabs__nav-item--active').closest('.tabs').find('.tab__content').removeClass('tab__content--active').eq($(this).index()).addClass('tab__content--active');
		var ulIndex = $('.tabs__nav').index($(this).parents('.tabs__nav'));
		localStorage.removeItem('tab' + ulIndex);
		localStorage.setItem('tab' + ulIndex, $(this).index());
	});

	$('.stat-block__nav').each(function(i) {
		var storage = localStorage.getItem('stab' + i);
		if (storage) {
			$(this).find('div').removeClass('stat-block__nav-item--active').eq(storage).addClass('stat-block__nav-item--active').closest('.stat-block').find('.stat-block__content').removeClass('stat-block__content--active').eq(storage).addClass('stat-block__content--active');
		}
	});
	$('.stat-block__nav').on('click', 'div:not(.stat-block__nav-item--active)', function() {
		$(this).addClass('stat-block__nav-item--active').siblings().removeClass('stat-block__nav-item--active').closest('.stat-block').find('.stat-block__content').removeClass('stat-block__content--active').eq($(this).index()).addClass('stat-block__content--active');
		var ulIndex = $('.stat-block__nav').index($(this).parents('.stat-block__nav'));
		localStorage.removeItem('stab' + ulIndex);
		localStorage.setItem('stab' + ulIndex, $(this).index());
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

	$('.js-modal').on('click', function(e) {
		e.preventDefault();
		e.stopPropagation();
		$(this).next().toggleClass('settings__modal--active');
	});
	$('.settings__modal').click(function(e) {
		e.stopPropagation();
	});

	$('.support-ticket__attach').change(function() {
		$('label[for="' + this.id + '"]').text($(this).val());
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

	var dHeight = $(window).height() - 515;
	$('.js-chat-calculate-height').css('height',dHeight)

})(jQuery);