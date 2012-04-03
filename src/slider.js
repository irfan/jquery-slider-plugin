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
    
    $.fn.slider = function(userOptions){
        
        // extend user defined and default options 
        var options = $.extend(true, {}, defaults, userOptions),
            element = $(this);
        
        if (options.method == 'flat') {
            element.bind('next.flat.slider', actions.next.flat);
        }
        else {
            element.bind('next.circle.slider', actions.next.circle);
        }
        
        element.bind('init.slider', actions.init)
            .bind('start.slider', actions.start)
            .bind('debug.slider', actions.debug)

            .bind('prev.slider', actions.prev)
            .bind('stop.slider', actions.stop)

            .trigger('init.slider', options);
    };
    

    function initControls (element, options) {
        var controls = '<ul class="sliderControl">',
            i = 0,
            l = options.totalItem;

        for (; i < l ; i++) {
            controls += '<li />';
        };

        controls += '</ul>';

        element.append(controls);
        
        element.bind('next.slider', function(){
            console.log('next slider');
        });
    }


    var actions = {
        init: function(event, options){
            var element = $(event.target),
                itemList = $('.sliderItems', element);
            
            if(options.horizontal == false) {
                var items = itemList.children().length,
                    itemWidth = itemList.children(':first').width(),
                    width = (items + 1) * itemWidth;
                
                options.totalItem = items;
                options.slideSize = itemWidth;
                itemList.width(width + 'px');
            }
            else {
                itemList.children().css('float','none');
                // TODO
            }
                       
            element.data('slider', options);
            
            // clone first element for circle
            if (options.method == 'circle') {
                itemList.children(':first').clone().appendTo(itemList);
            };
            
            if (options.auto) {
                element.trigger('start.slider');
            };

            if (options.showControls) {
                // initControls(element, options);
            };
 
            return;
        },
        start: function(event){
            
            var element = $(event.target),
                options = element.data('slider'),
                event = 'next.' + options.method + '.slider';
            
            options.interval = setInterval(function(){
                element.trigger(event);
                
                $('.sliderControl', element).removeClass('sliderActive');
                var active = $('li:nth-child(' + (options.active + 1) + ')', element);
                if ( active.length < 1 ){
                    active = $('li:first-child', el);
                };
                
                active.addClass('sliderActive');


            }, options.wait);
            
            element.data('slider', options);
            
        },
        next: {
            circle: function(event){
                var el = $(event.target),
                    options = el.data('slider'),

                    to = '',
                    duration = options.duration,
                    ul = $('.sliderItems', el);

                if (options.active < options.totalItem) {
                    to = ul.position().left - options.slideSize;
                    ul.animate({left: to}, duration);
                    options.active = options.active + 1;
                }
                else {
                    to = '-' + options.slideSize;
                    ul.css('left', '0px').animate({left: to}, duration);
                    options.active = 1;
                }
            },
            flat: function(e){
                var el = $(event.target),
                    options = el.data('slider'),

                    to = '',
                    duration = options.duration,
                    ul = $('.sliderItems', el);

                if (options.active < (options.totalItem -1)) {
                    to = ul.position().left - options.slideSize;
                    duration = options.duration;
                    options.active = options.active + 1;
                }
                else{
                    to = ul.position().left + (options.slideSize * (options.totalItem -1));
                    duration = options.duration * options.totalItem;
                    options.active = 0;
                }
                ul.animate({left: to}, duration);
            }
        },
        prev: function(e){},
        stop: function(e){},
        _goto: function(e, id){},
        debug:function(event){
            console.group('slider debugging');
                var item = $(event.target).data('slider');
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
        active: 0,          // Active item number
        repeat: true,       // TODO: Always repeating for now
        horizontal: false,  // TODO: Horizonal options will add
    };
    
})(jQuery);
