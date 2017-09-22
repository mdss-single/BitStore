(function($){ 
	"use strict";

	$('html').click(function() {
		$('.footer__language-list--active').removeClass('footer__language-list--active');
	});

	$(window).scroll(function() {
		var scrolledY = $(window).scrollTop();
		if ($('.header').attr('style')) $('.header').css('background-position', 'center ' + ((scrolledY)) + 'px');
	});

	// mobile menu
	$(window).on('load resize', function() {
		if ($(window).width() < 992) {
			var menu = $('.menu');
			$('.burger').click(function(e) {
				$(menu).addClass('menu--active');
				if (!$('.menu__cover').length) $('body').prepend('<div class="menu__cover"></div>');
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
				excludedElements:$.fn.swipe.defaults.excludedElements+', .press__list, .career__tabs',
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
		} else {
			$('body').swipe('destroy');
		}
	});

	// press talking
	$(window).on('load resize', function() {
		if ($(window).width() < 992) {
			$('.js-press').flickity({
				prevNextButtons: false,
			});
		} else {
			$('.js-press').flickity('destroy');
		}
	});

	// career tabs
	$('.career__tabs').each(function(i) {
		var storage = localStorage.getItem('tab' + i);
		if (storage) {
			$(this).find('div').removeClass('career__tab-item--active').eq(storage).addClass('career__tab-item--active').closest('.career__items').find('.career__tab-content').removeClass('career__tab-content--active').eq(storage).addClass('career__tab-content--active');
		}
	});
	$('.career__tabs').on('click', 'div:not(.career__tab-item--active)', function() {
		$(this).addClass('career__tab-item--active').siblings().removeClass('career__tab-item--active').closest('.career__items').find('.career__tab-content').removeClass('career__tab-content--active').eq($(this).index()).addClass('career__tab-content--active');
		var ulIndex = $('.career__tabs').index($(this).parents('.career__tabs'));
		localStorage.removeItem('tab' + ulIndex);
		localStorage.setItem('tab' + ulIndex, $(this).index());
	});

	// news dropdown
	$(window).on('load resize', function() {
		if ($(window).width() < 992) {
			$('.news__sort-wrap').each(function() {
				var list = $(this), select = $(document.createElement('select')).addClass('news__sort-select').insertBefore($(this).hide()).wrap('<div class="news__sort-date"></div>');
				$('> a', this).each(function() {
					var target = $(this).attr('target');
					if ($(this).hasClass('news__sort-link--current')) {
						var option = $(document.createElement('option')).attr('selected', true).appendTo(select).val(this.href).html($(this).html()).click(function(){
							if(target==='_blank') {
								window.open($(this).val());
							} else {
								window.location.href = $(this).val();
							}
						});
					} else {
						var option = $(document.createElement('option')).appendTo(select).val(this.href).html($(this).html()).click(function(){
							if(target==='_blank') {
								window.open($(this).val());
							} else {
								window.location.href = $(this).val();
							}
						});
					}
				});
				list.remove();
			});
		}
	});

	// trade page custom select
	$('.js-trade-select').styler();

	$('.js-footer-language').click(function(e) {
		e.preventDefault();
		e.stopPropagation();
		$(this).next().toggleClass('footer__language-list--active');
	});
	$('.footer__language-list').click(function(e) {
		e.stopPropagation();
	});

	// input file change label text
	$('.js-input-file').change(function() {
		$('label[for="' + this.id + '"]').text($(this).val());
	});

	console.log('%c Верстка: mdss@makexhtml.ru ', 'color:#fff;font-size:1.2rem;background-color:#3469c6;')

})(jQuery);