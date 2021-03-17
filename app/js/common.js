var common = {
	init: function() {
		common.fixNavigation();
		common.main();
		common.carousel();
		common.submit();
	},
	fixNavigation: function(){
		function fixPanel() {
			if ($(window).scrollTop() > 0) {
				$('.header').addClass('fixed');
			}else {
				$('.header').removeClass('fixed')
			}
		};
		fixPanel();
		$(window).scroll(function() {
			fixPanel();
		});
		$( window ).resize(function() {
			fixPanel();
			var bLazy = new Blazy({});
		});
	},
	main: function(){

		$('.basic-select').select2();

		$('.menu-trigger').click(function(event){
			event.preventDefault();
			$('.header').toggleClass('open');
			$('body').toggleClass('hidden');
		});

		$('.show-more-trigger').click(function(event){
			event.preventDefault();
			thisTrigger = $(this).find('span');
			var show = $(this).attr('data-show');
			var hide = $(this).attr('data-hide');
			var wrap = $(this).closest('.show-more-wrap');
			if(wrap.hasClass('active') == false) {
				wrap.addClass('active');
				thisTrigger.text(show)
			}else {
				wrap.removeClass('active');
				thisTrigger.text(hide)
			}
		});

		// b-lazy

		var bLazy = new Blazy({});

		// tabs 

		$('.tabs-section a').click(function(e){
			e.preventDefault();
			if(!$(this).hasClass('.active')) {
				var tabCnt = '.' + $(this).attr('data-cnt');
				$(this).closest('.tabs-block').find('.tabs-section a.active').removeClass('active')
				$(this).closest('.tabs-block').find('.tab-cnt').removeClass('active')
				$(tabCnt).addClass('active')
				$(this).addClass('active');
				var bLazy = new Blazy({});
			}
		});

		// click in another place

		jQuery(function($){
			$(document).mouseup(function (e){ 
				var popup = $(".popup");
				var popupLayout = $(".popup-layout");
				var cart = $('.cart-trigger-wrap');
				if (!popup.is(e.target) && popupLayout.is(e.target) 
					&& popup.has(e.target).length === 0) { 
					$('.popup-wrapper').fadeOut('fast');
					$('body').removeClass('hidden');
				}
				if (!cart.is(e.target) 
					&& cart.has(e.target).length === 0) { 
					$('.cart-trigger-wrap').find('.cart-small-wrap').fadeOut('fast');
				}
			});
		});

		// popups call
		$('.call-popup').click(function(event){
			event.preventDefault();
			var popup  = '#' + $(this).attr('data-popup');
			if($(this).attr('data-popup') != 'polyticsPopup'){
				$('.popup-wrapper').removeClass('active');
				$('.header').removeClass('open');
				$('body').addClass('hidden');
				$(popup).fadeIn('fast')
				if ($(window).width() < 993)  {
					$('.header-bottom').slideUp('fast');
				}
			}else {
				$(popup).fadeIn('fast')
				$('header').removeClass('open');
				if ($(window).width() < 993)  {
					$('.header-bottom').slideUp('fast');
				}
			}

		});
		
		$('.popup-close').click(function(){
			$(this).closest('.popup-wrapper').fadeOut('fast');
			$('body').removeClass('hidden');
		});

		// phone mask
		$('.tel-trigger').mask("+7(999) 999-99-99");

		$('.cart-trigger').on('click', function(e){
			e.preventDefault();
			var that = $(this).closest('.cart-trigger-item').find('.cart-trigger-item-img');
			var cart = $(".cart");
			var cartNum = cart.find('span');
			var cartNumCount = Number(cartNum.text());
			var w = that.width();
			
			that.clone()
				.css({'width' : w,
				'position' : 'absolute',
				'z-index' : '9999',
				top: that.offset().top,
				left:that.offset().left})
				.appendTo("body")
				.animate({opacity: 0.05,
					left: cart.offset()['left'],
					top: cart.offset()['top'],
					width: 20}, 1000, function() {  
						$(this).remove();
			});
			

			cartNumCount++
			setTimeout(function(){
				if(cartNumCount > 0){
					cart.addClass('active');
				}else {
					cart.removeClass('active');
				}
				cartNum.text(cartNumCount);
			}, 1000)
		});
		

	},
	carousel: function(){
		var cardImages = $('.card-slider-images');
		var cardImagesDots = $('.card-slider-images-dots');

		cardImagesDots.owlCarousel({
			loop:false,
			items: 4,
			margin: 10,
			nav: true,
			dots: false,
			animateOut: 'fadeOut',
			animateIn: 'fadeIn',
			responsive:{
				0:{
					items:2,
				},
				319:{
					items:3
				},
				456:{
					items:4
				},
			}
		});

		cardImages.owlCarousel({
			loop:false,
			items: 1,
			margin: 0,
			nav: false,
			dots: false,
			autoHeight: true,
			animateOut: 'fadeOut',
			animateIn: 'fadeIn',
			dotsContainer: '.card-slider-images-dots'
		});

		$('.card-slider-images-dots .owl-dot.card-slider-dots-img').click(function () {
			cardImages.trigger('to.owl.carousel', [$(this).parent().index(), 300]);
		});





		var bannerSlider = $('.banner-slider');

		bannerSlider.owlCarousel({
			loop:true,
			items: 1,
			margin:0,
			nav: true,
			dots: false,
			autoHeight: true,
			animateOut: 'fadeOut',
			animateIn: 'fadeIn',
		});

		$('.owl-carousel').on('translated.owl.carousel', function(event) {
			var bLazy = new Blazy({});
		})

		
	},
	submit: function(){
		$("form:not(.product-filter-checkers)").submit(function(event){
			event.preventDefault();
			formField = $(this).find(".required-field")
			thanksTrigger = $(this).find('.thanks-page-trigger');

			console.log()
			
			formField.each(function(){
				var thisEl = $(this);
				if (! thisEl.val().length) {
					thisEl.addClass('error')
					setTimeout(function(){
						thisEl.removeClass('error')
					}, 3000)
					thisEl.addClass('form-error')
				}else { thisEl.removeClass('form-error')}
			});	
			if(formField.hasClass('form-error') == false){
				if(!thanksTrigger.hasClass('thanks-page-trigger')) {
					$('.popup-wrapper').hide();
					$('.popup-wrapper').removeClass('active');
					$('#thanksPopup').fadeIn('fast');
					$('body').addClass('hidden');
					var bLazy = new Blazy({});
				}else {
					window.location.href = "./thanks.html";
				}
			}
		});

		
	},
};

(function() {
	common.init();
}());


