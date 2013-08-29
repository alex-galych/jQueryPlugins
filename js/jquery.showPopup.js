/**
 * Created with JetBrains PhpStorm.
 * User: galych
 * Date: 7/25/13
 * Time: 12:04 PM
 * To change this template use File | Settings | File Templates.
 */
(function( $ ) {

    $.fn.showPopup = function(options) {
        var settings = $.extend( {
            'background': '.popup-background',
            'popup' : '.popup-window',
            'popupForm': '#popupForm',
            'calendarItem': new Array(),
            'popupOkBtn': '#popup-ok-btn',
            'popupCnlBtn': '#popup-cnc-btn',
            'animationTime': 300
        }, options);

        var methods = {
            dateFileds : function( settings ) {
                $.each( settings['calendarItem'], function( key, value ) {
                    $( value ).datepicker({
                        onClose: function ()
                        {
                            this.focus();
                        }
                    });
                });
            },

            show: function( settings ) {
                $( settings['background'] + "," + settings['popup'] ).fadeIn(settings['animationTime']);
            },

            okBtn: function( settings ) {
                valid = $( settings['popupForm'] ).valid();
                if(valid) {
                    $(settings['background']+","+settings['popup']).fadeOut(settings['animationTime']);
                }
            },

            cancelBtn: function( settings ) {
                $(settings['background']+","+settings['popup']).fadeOut(settings['animationTime'],function(){
                    $(settings['popupForm'] + " :input").val('');
                    $(settings['popupForm']).validate().resetForm();
                    $(settings['popupForm'] + " :input").removeClass("errorHighlight");
                });
            }
        };

        this.click(function(){
            methods.show(settings);
        });

        $( settings['popupCnlBtn'] ).click(function(){
            methods.cancelBtn(settings);
        });

        $( settings['popupOkBtn'] ).click(function() {
            methods.okBtn(settings);
        });

        methods.dateFileds(settings);
    };
})(jQuery);