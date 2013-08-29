/**
 * Created with JetBrains PhpStorm.
 * User: galych
 * Date: 7/25/13
 * Time: 12:04 PM
 * To change this template use File | Settings | File Templates.
 */
(function( $ ) {

    $.fn.lists = function(options) {
        var settings = $.extend( {
            'arrayItems': new Array(),
            'createButton': '.new-item-button',
            'createInput': '#new-item-input-id',
            'createNewList' : '.new-list-button',
            'listName': '',
            'showItem': ''
        }, options);

        var listObj = this;
        var methods = {



            init : function( settings ,handleObj) {
                var html =
                    '<div class="top">' +
                        '<div class="name">Lists</div>'+
                        '<div class="hide-all"></div>' +
                    '</div> '+
                    '<div class="bottom">'+
                        '<div class="accordion-container">';
                for (var key in settings['arrayItems']) {
                    html += '<div class="list" style="'+ (( settings['showItem'] == key )?'background-color: #EFEFEF;':'') +'">\n\
                                <div class="list-name">\
                                    <div class="name">'+key+'</div>\n\
                                    <div class="list-name-controls">\n\
                                        <div class="list-name-controls-done"><img src="img/done.png"></div>\n\
                                        <div class="list-name-controls-edit"><img src="img/edit.png"></div>\n\
                                        <div class="list-name-controls-delete"><img src="img/delete.png"></div>\n\
                                    </div>';
                    if(settings['showItem'] == key){
                        html += '<div class="hide-list"></div>'+
                            '</div>'+
                            '<div class="list-items">';
                    }else{
                        html += '<div class="show-list"></div>'+
                            '</div>'+
                            '<div class="list-items" style="display: none">';
                    }
                    html += '<div class="list-container">';

                    $.each(settings['arrayItems'][key], function( key1, value1 ) {
                        html += '<div class="list-item">\n\
                            <div class="list-item-text">'+value1+'</div>\n\
                            <div class="list-item-controls">\n\
                                <div class="list-item-controls-done"><img src="img/done.png"></div>\n\
                                <div class="list-item-controls-edit"><img src="img/edit.png"></div>\n\
                                <div class="list-item-controls-delete"><img src="img/delete.png"></div>\n\
                            </div>\n\
                         </div>';
                    });

                    html += '</div>\n\
                            <div class="new-item">\n\
                                <div class="new-item-button">Create New</div>\n\
                                <div class="new-item-input">\n\
                                    <input type="text" maxlength="50" />\n\
                                </div>\n\
                            </div>\n\
                        </div>\n\
                    </div>';
                }

                html +=     '</div>'+
                            '<div class="new-list">'+
                                '<div class="new-list-button">Create New List</div>'+
                                '<div class="new-list-input">'+
                                    '<input type="text" maxlength="50">'+
                                '</div>'+
                            '</div>'+
                        '</div>'+
                    '</div>';

                $(handleObj).html(html);
            },




            add: function(itemName ,handleObj){
                var html = '<div class="list-item">\n\
                        <div class="list-item-text">'+itemName+'</div>\n\
                        <div class="list-item-controls">\n\
                            <div class="list-item-controls-done"><img src="img/done.png"></div>\n\
                            <div class="list-item-controls-edit"><img src="img/edit.png"></div>\n\
                            <div class="list-item-controls-delete"><img src="img/delete.png"></div>\n\
                        </div>\n\
                     </div>';
                $(handleObj).append(html);
            },




            addList: function(itemName ,handleObj){
                var html = '<div class="list">\n\
                                <div class="list-name">\
                                    <div class="name">'+itemName+'</div>\n\
                                    <div class="list-name-controls">\n\
                                        <div class="list-name-controls-done"><img src="img/done.png"></div>\n\
                                        <div class="list-name-controls-edit"><img src="img/edit.png"></div>\n\
                                        <div class="list-name-controls-delete"><img src="img/delete.png"></div>\n\
                                    </div>\n\
                                    <div class="show-list"></div>\n\
                                </div>\n\
                                <div class="list-items" style="display: none;">\n\
                                    <div class="list-container"></div>\n\
                                    <div class="new-item">\n\
                                        <div class="new-item-button">Create New</div>\n\
                                        <div class="new-item-input">\n\
                                            <input type="text" maxlength="50" />\n\
                                        </div>\n\
                                    </div>\n\
                                </div>\n\
                            </div>';
                $(handleObj).append(html);
            },



            edit: function( handleObj, element) {
                var value = $(handleObj).parent().parent().find(element).html();
                if(element == '.list-item-text'){
                    var doneBtn = $(handleObj).parent().find('.list-item-controls-done');
                }else{
                    var doneBtn = $(handleObj).parent().find('.list-name-controls-done');

                }
                $(handleObj).hide();
                $(doneBtn).show();
                $(handleObj).parent().parent().find(element).html('<input type="text" value="'+value+'" maxlength="50"/>');
            },



            deleteItem: function( handleObj,type) {
                if(type == '.list-item-text' ){
                    $(handleObj).parent().parent().remove();
                }else{
                    $(handleObj).parent().parent().parent().remove();
                }
            },



            done: function( handleObj, element) {
                var value = $(handleObj).parent().parent().find(element+' :input').val();
                if( element == '.list-item-text'){
                    var editBtn = $(handleObj).parent().find('.list-item-controls-edit');
                }else{
                    var editBtn = $(handleObj).parent().find('.list-name-controls-edit');
                }
                if(typeof  value != "undefined" && value != ""){
                    $(handleObj).hide();
                    $(editBtn).show();
                    $(handleObj).parent().parent().find(element).html(value);
                }else{
                    alert('Empty value!');
                }
            },



            showList: function(handleObj){
               methods.hideList($(handleObj).parent().parent().parent().find('.hide-list'));
               $(handleObj).parent().parent().find('.list-items').slideDown(200,function(){
                   $(handleObj).removeClass('show-list').addClass('hide-list');
               });

            },




            hideList: function(handleObj){
                $(handleObj).parent().parent().find('.list-items').slideUp(200,function(){
                    $(handleObj).parent().parent().find('.list-name').css('background-color','#d7d7d7');
                    $(handleObj).removeClass('hide-list').addClass('show-list');
                });
            },



            showAll: function(handleObj){
                $(handleObj).parent().parent().find('.bottom').slideDown(500,function(){
                    $(handleObj).removeClass('show-all').addClass('hide-all');
                });
            },



            hideAll: function(handleObj){
                $(handleObj).parent().parent().find('.bottom').slideUp(500,function(){
                    $(handleObj).removeClass('hide-all').addClass('show-all');
                });
            }
        };

        methods.init(settings, listObj);

        $('.accordion-container').on("click",settings['createButton'],function(){
            if(typeof $(this).parent().find(' :input').val() != "undefined"
                && $(this).parent().find(' :input').val() != ""){
                var container = $(this).parent().parent().find('.list-container');
                methods.add($(this).parent().find(' :input').val(), container);
                $(this).parent().find(' :input').val('');
            }else{
                alert('Empty List Item Name!');
            }
            return false;
        });

        $('.list-content').on("click",settings['createNewList'],function(){
            if(typeof $(this).parent().find(' :input').val() != "undefined"
                && $(this).parent().find(' :input').val() != ""){
                var container = $(this).parent().parent().find('.accordion-container');
                console.log(container);
                methods.addList($(this).parent().find(' :input').val(), container);
                $(this).parent().find(' :input').val('');
            }else{
                alert('Empty List Item Name!');
            }
            return false;
        });

        $(".list-content").on("click",".list-item-controls-delete",function(){
            if( confirm('Are you sure you want to delete this item?') ){
                methods.deleteItem(this,'.list-item-text');
            }
            return false;
        }).on("click",'.list-item-controls-edit',function(){
            methods.edit(this,'.list-item-text');
            return false;
        }).on("click",'.list-item-controls-done',function(){
            methods.done(this,'.list-item-text');
            return false;
        }).on("click",".list-name-controls-delete",function(){
            if( confirm('Are you sure you want to delete this list?') ){
                methods.deleteItem(this,'.name');
            }
            return false;
        }).on("click",'.list-name-controls-edit',function(){
            methods.edit(this,'.name');
            return false;
        }).on("click",'.list-name-controls-done',function(){
            methods.done(this,'.name');
            return false;
        });

        $('.list-content').on('click','.list-name',function(){
            if($(this).find('.hide-list').length){
                methods.hideList($(this).find('.hide-list'));
                $(this).css('backgroundColor','#d7d7d7');
            }else{
                methods.showList($(this).find('.show-list'));
                $(this).css('backgroundColor','#EFEFEF');
            }
            return false;
        });

        $('.list-content').on('click','.top',function(){
            if($(this).find('.hide-all').length){
                methods.hideAll($(this).find('.hide-all'));
                $(this).css('backgroundColor','#d7d7d7');
            }else{
                methods.showAll($(this).find('.show-all'));
                $(this).css('backgroundColor','#EFEFEF');
            }
            return false;
        });

        $('.list-content').on('click',':input',function(){
            return false;
        })
    };
})(jQuery);