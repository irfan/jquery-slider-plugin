(function($){
	
	$.fn.slider = function(options, callback){
		// extend user defined and default options 
		var opts = $.extend(true, {}, defaults, options),
			el = $(this);
		
		el.bind('init.slider', actions.init);
		el.bind('start.slider', actions.start);
		
		el.bind('next.circle.slider', actions.next.circle);
		el.bind('next.flat.slider', actions.next.flat);
		
		el.bind('prev.slider', actions.prev);
		el.bind('stop.slider', actions.stop);
		el.bind('debug.slider', actions.debug);
		
		if (callback) {
			opts.callback = callback;
		};
		
		el.trigger('init.slider', opts);
		//console.log('hede')
	};
	
	var actions = {
		init: function(e, opts){
			//console.log(e, opts);
			var el = $(e.target)
				ul = $('ul', el);

			opts.el = el;
			
			if (opts.showControls) {
				el.append('<div id="sliderControl"><ol></ol></div>');
			};
			
			if (opts.horizontal) {
				ul.children().css('float','none');
				// TODO
			}
			else{
				var	items = ul.children().length,
					itemWidth = ul.children(':first').width(),
					width = (items + 1) * itemWidth;
				
				opts.totalItem = items;
				opts.slideSize = itemWidth;
				ul.width(width + 'px');
			}
			
			if (opts.showControls) {
				var list = '<li class="sliderActive" />';
				for (var i=0; i < (opts.totalItem -1); i++) {
					list = list + '<li />';
				};

				$('ol', '#sliderControl').append(list);
			};
			
			el.data('slider', opts);
			
			// clone first element for circle
			if (opts.method == 'circle') {
				ul.children(':first').clone().appendTo(ul);
			};
			
			if (opts.auto) {
				el.trigger('start.slider');
			};
			return;
		},
		start: function(e){
			
			var el = $(e.target),
				opts = el.data('slider'),
				
				event = '';
			
			switch(opts.method){
				case 'circle' :
					event = 'next.circle.slider';
				break;
				
				case 'flat':
					event = 'next.flat.slider';
				break;
			}
			
			opts.interval = setInterval(function(){
				el.trigger(event);
				
				if (opts.callback) {
					opts.callback(opts);
				};
			}, opts.wait);
			
			el.data('slider', opts);
			
		},
		next:{
			circle: function(e){
				var el = $(e.target),
					opts = el.data('slider'),

					to = '',
					duration = opts.duration,
					ul = $('ul', opts.el);

				if (opts.active < opts.totalItem) {
					to = ul.position().left - opts.slideSize;
					ul.animate({left: to}, duration);
					opts.active = opts.active + 1;
				}
				else {
					to = '-' + opts.slideSize;
					ul.css('left', '0px').animate({left: to}, duration);
					opts.active = 1;
				}
			},
			flat: function(e){
				var el = $(e.target),
					opts = el.data('slider'),

					to = '',
					duration = opts.duration,
					ul = $('ul', opts.el);

				if (opts.active < (opts.totalItem -1)) {
					to = ul.position().left - opts.slideSize;
					duration = opts.duration;
					opts.active = opts.active + 1;
				}
				else{
					to = ul.position().left + (opts.slideSize * (opts.totalItem -1));
					duration = opts.duration * opts.totalItem;
					opts.active = 0;
				}
				ul.animate({left: to}, duration);
			}
		},
		prev: function(e){
			
		},
		stop: function(e){
			
		},
		goto: function(e, id){
			
		},
		debug:function(e){
			console.group('slider debugging');
				var item = $(e.target).data('slider');
				$.each(item, function(i, v){
					console.log(i, ' : ', v);
				});
			console.groupEnd();
		}
	},
	
	defaults = {
		auto: true,
		showControls: true,
		wait: 3000,
		effect: 'slide',
		duration: 300,
		repeat: true,
		horizontal: false,
		method: 'circle',
		active: 0
	};
	
})(jQuery);