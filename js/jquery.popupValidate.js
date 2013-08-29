/**
 * Created with JetBrains PhpStorm.
 * User: galych
 * Date: 7/25/13
 * Time: 12:04 PM
 * To change this template use File | Settings | File Templates.
 */
(function( $ ) {

    $.fn.popupValidate = function(options) {
        var settings = $.extend( {}, options);

        var methods = {
            init : function( formObj) {
                formObj.validate({
                    errorLabelContainer: ".popup-window-fields-errors",
                    wrapper: "li",
                    highlight: function(element){
                        $(element).addClass("errorHighlight");
                    },
                    unhighlight: function(element){
                        $(element).removeClass("errorHighlight");
                    },

                    rules: {
                        fname: "required",
                        lname: "required",
                        birthday: {
                            required: true,
                            date: true

                        },
                        from:{
                            required: true,
                            date: true
                        },
                        to: {
                            required: true,
                            date: true,
                            greaterThanDate: "#from-date"

                        }
                    },
                    messages: {
                        fname: "First Name field is required!",
                        lname: "Last Name field is required!",
                        birthday: {
                            required: "Date Of Birth field is required!",
                            date: "Date Of Birth must be in the format dd/mm/yyyy!"
                        },
                        from: {
                            required: "From field is required!",
                            date: "FieldFrom must be in the format dd/mm/yyyy!"
                        },
                        to: {
                            required: "To field is required!",
                            date: "Field To must be in the format dd/mm/yyyy!",
                            greaterThanDate: "Field To must be greater than From!"
                        }
                    }

                });
            },

            additionalMethods: function(){
                $.validator.addMethod(
                    "date",
                    function(value, element) {
                        return value.match(/^\d\d?\/\d\d?\/\d\d\d\d$/);
                    }
                );

                $.validator.addMethod("greaterThanDate",
                    function(value, element, params) {

                        if (!/Invalid|NaN/.test(new Date(value))) {
                            return new Date(value) >= new Date($(params).val());
                        }

                        return isNaN(value) && isNaN($(params).val())
                            || (Number(value) >= Number($(params).val()));
                    }
                );
            }
        }
        methods.additionalMethods();
        methods.init(this);
    };
})(jQuery);