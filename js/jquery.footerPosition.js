/**
 * Created with JetBrains PhpStorm.
 * User: galych
 * Date: 7/25/13
 * Time: 12:04 PM
 * To change this template use File | Settings | File Templates.
 */
(function( $ ) {

    $.fn.footerPosition = function(options) {
        var settings = $.extend( {
            'parent' : 'body',
            'content': '#article'
        }, options);

        var domElem = this;

        var methods = {
            init : function( settings ,footerObj) {
                if( $(settings['parent']).height()
                    <  $(settings['content']).outerHeight(true) + footerObj.height() ){
                    footerObj.removeClass('footer-bottom');
                }else{
                    footerObj.addClass('footer-bottom');
                }

            }
        };
        $(window).on('resize', function() {
            methods.init(settings, domElem);
        });
        $(window).on('scroll', function() {
            methods.init(settings, domElem);
        });


        $('#article').resize( function() {
            methods.init(settings, domElem);
        });

        methods.init(settings, domElem);
        setInterval(function(){
            methods.init(settings, domElem);
        }, 10);
    };
})(jQuery);