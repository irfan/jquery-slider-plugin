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
        
        options.totalItem = $('.sliderItems', element).children().length;
        
        if(options.totalItem < 2) {
            return;
        }
        
        element.bind('init.slider', actions.init)
            .bind('start.slider', actions.start)
            .bind('debug.slider', actions.debug)

            .bind('prev.slider', actions.prev)
            .bind('stop.slider', actions.stop)
            
            .bind('next.' + options.method + '.slider', actions.next[options.method])
            
            .trigger('init.slider', options);
    };
    
    
    function initControls(element, options){
        var controls = '<ul class="sliderControl">',
            i = 0,
            l = options.totalItem;

        for (; i < l ; i++) {
            controls += '<li />';
        };

        controls += '</ul>';

        element.append(controls);
    }

    function setActiveIndex(element){
        element.find('.sliderControl').children(':first').addClass('sliderActive');
    }

    /*
     * Change the indicator which number is active
     */
    function nextIndex(element, options) {
        
        var controls = $('.sliderControl', element).children(),
            index = element.find('.sliderControl'),
            active = index.children(':nth-child(' + (options.active + 1) + ')');
        
        controls.removeClass('sliderActive');
        
        if ( active.length < 1 ){
            active = index.find(':first-child');
        }
        
        active.addClass('sliderActive');
    }

    var actions = {
        init: function(event, options){
            var element = $(event.target),
                itemList = $('.sliderItems', element);
            
            if(options.horizontal == false) {
                var itemWidth = itemList.children(':first').width(),
                    width = (options.totalItem + 1) * itemWidth;
                
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
            
            if (options.showControls) {
                initControls(element, options);
                setActiveIndex(element);
            };
 
            if (options.auto) {
                element.trigger('start.slider');
            };

            return;
        },
        start: function(event){
            
            var element = $(event.target),
                options = element.data('slider');
            
            event = 'next.' + options.method + '.slider';
            
            // the loop!
            options.interval = setInterval(function(){
                
                element.trigger(event);
                nextIndex(element, options);

            }, options.wait);
            
            element.data('slider', options);
            
        },
        next: {
            circle: function(event){
                var element = $(event.target),
                    options = element.data('slider'),

                    to = '',
                    duration = options.duration,
                    itemList = $('.sliderItems', element);

                if (options.active < options.totalItem) {
                    to = itemList.position().left - options.slideSize;
                    itemList.animate({left: to}, duration);
                    options.active = options.active + 1;
                }
                else {
                    to = '-' + options.slideSize;
                    itemList.css('left', '0px').animate({left: to}, duration);
                    options.active = 1;
                }
                nextIndex(element, options);
            },
            flat: function(event){
                var element = $(event.target),
                    options = element.data('slider'),
                    to = '',
                    duration = options.duration,
                    itemList = $('.sliderItems', element);

                if (options.active < (options.totalItem -1)) {
                    to = itemList.position().left - options.slideSize;
                    duration = options.duration;
                    options.active = options.active + 1;
                }
                else{
                    to = itemList.position().left + (options.slideSize * (options.totalItem -1));
                    duration = options.duration * options.totalItem;
                    options.active = 0;
                }
                itemList.animate({left: to}, duration);
            }
        },
        prev: function(e){},
        stop: function(event){
            var element = $(event.target),
                options = element.data('slider');
            
            clearInterval(options.interval);
            options.interval=false;
        },
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
        effect: 'slide',    // supporting the slide for now
        duration: 300,      // effect duration
        showControls: true, // Show control buttons,
        active: 0,          // Active item number
        repeat: true,       // TODO: Always repeating for now
        horizontal: false,  // TODO: Horizonal options will add
    };
    
})(jQuery);
