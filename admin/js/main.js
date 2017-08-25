(function($){ 
	"use strict";

	$('html').click(function() {
		$('.settings__modal--active').removeClass('settings__modal--active');
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

	console.log('%c Верстка: mdss@makexhtml.ru ', 'color:#fff;font-size:1.2rem;background-color:#3469c6;')

})(jQuery);