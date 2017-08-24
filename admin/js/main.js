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