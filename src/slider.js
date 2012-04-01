/* jQuery Slider Plugin
 * 
 * @Author
 * Copyright Nov 08 2010, Irfan Durmus - http://irfandurmus.com/
 *
 * @Version
 * 0.2b
 *
 * @License
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 * Visit the plugin page for more information.
 * http://irfandurmus.com/projects/jquery-slider-plugin/
 *
 */


(function($){
    
    $.fn.slider = function(options){
        
        // extend user defined and default options 
        var opts = $.extend(true, {}, defaults, options),
            el = $(this);
            
        
        if (opts.method == 'flat') {
            el.bind('next.flat.slider', actions.next.flat);
        }
        else {
            el.bind('next.circle.slider', actions.next.circle);
        }
        
        el.bind('init.slider', actions.init)
            .bind('start.slider', actions.start)
            .bind('debug.slider', actions.debug)

            .bind('prev.slider', actions.prev)
            .bind('stop.slider', actions.stop)

            .trigger('init.slider', opts);
    };
    
    var actions = {
        init: function(e, opts){
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
                var items = ul.children().length,
                    itemWidth = ul.children(':first').width(),
                    width = (items + 1) * itemWidth;
                
                opts.totalItem = items;
                opts.slideSize = itemWidth;
                ul.width(width + 'px');
            }
            
            if (opts.showControls) {
                var list = '<li class="sliderActive" />',
                    i = 0,
                    l = opts.totalItem - 1;
                for (; i < l ; i++) {
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
                event = 'next.' + opts.method + '.slider';
            
            opts.interval = setInterval(function(){
                el.trigger(event);
                
                $('li', el).removeClass('sliderActive');
                var active = $('li:nth-child(' + (opts.active + 1) + ')', el);
                if ( active.length < 1 ){
                    active = $('li:first-child', el);
                };
                
                active.addClass('sliderActive');


            }, opts.wait);
            
            el.data('slider', opts);
            
        },
        next: {
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
        prev: function(e){},
        stop: function(e){},
        _goto: function(e, id){},
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
        method: 'circle',   // flat or circle
        auto: true,         // if set up as false you have to start slider by trigger start.slider event. 
        wait: 3000,         // plugin have to wait before go to next slide
        effect: 'slide',    // just support the slide
        duration: 300,      // effect duration
        showControls: true, // Show control buttons,
        active: 0,
        repeat: true,       // TODO: Always repeating for now
        horizontal: false,  // TODO: Horizonal options will add
    };
    
})(jQuery);
