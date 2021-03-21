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
			if ($(window).scrollTop() > 150) {
				$('.scroll-trigger-js').addClass('show');
				$('.callback-trigger-js').addClass('show');
			}else {
				$('.scroll-trigger-js').removeClass('show')
				$('.callback-trigger-js').removeClass('show')
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
		$('.scroll-trigger-js').click(function(event){
			event.preventDefault();
			window.scrollTo({ top: 0, behavior: 'smooth' });
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

		// rating item 


		$('.rating:not(.rating-static) label').click(function(event){
			event.preventDefault();
			$(this).closest('.rating').find('label').removeClass('active')
			$(this).addClass('active')
		});

		$('.show-reviews').click(function(event){
			event.preventDefault();
			$(this).closest('.reviews-list').toggleClass('active')
			$(this).toggleClass('active')
		});

		// popups call
		$('.call-popup').click(function(event){
			event.preventDefault();
			var popup  = '#' + $(this).attr('data-popup');
			$(popup).addClass('active')
			$('header').removeClass('open');		
			$('body').addClass('hidden');		
		});
		
		$('.popup-close').click(function(){
			$(this).closest('.popup-wrapper').removeClass('active');	
			$('body').removeClass('hidden');
		});
		$('.filter-trigger').click(function(event){
			event.preventDefault();
			$(this).closest('.catalog-filter').toggleClass('open');
		});

		// phone mask
		$('.tel-trigger').mask("+380(99) 999-99-99");

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


		var cardImages = $('.card-slider-images');
		var cardImagesDots = $('.card-slider-images-dots');

		cardImagesDots.owlCarousel({
			loop: false,
			items: 5,
			margin: 10,
			nav: true,
			dots: false,
			animateOut: 'fadeOut',
			animateIn: 'fadeIn',
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

		
	},
	submit: function(){
		$("form").submit(function(event){
			event.preventDefault();
			var formGroup = $(this).find('.form-group');
			var eventEl = $(this);
			console.log(eventEl)
			setTimeout(function(){
				if(!formGroup.hasClass('has-error')) {
					if(eventEl.hasClass('reviews-form')) {
						console.log('1')
						$('.popup-wrapper').removeClass('active');
						$('#revThanksPopup').addClass('active');
						$('body').addClass('hidden');
						var bLazy = new Blazy({});
					}else {
						console.log('2')
						$('.popup-wrapper').removeClass('active');
						$('#thanksPopup').addClass('active');
						$('body').addClass('hidden');
						var bLazy = new Blazy({});
					}
				}
			}, 100)

		});
	},
};

(function() {
	common.init();
}());


