/**
 * Created with JetBrains PhpStorm.
 * User: Alexander Galych
 * email: galych@zfort.com
 * Date: 7/24/13
 * Time: 12:04 PM
 * To change this template use File | Settings | File Templates.
 */



//Using jQuery

$(document).ready(function() {

    $('#article').triggerHandler('resize');


    $("#footer").footerPosition({
        'parent' : 'body',
        'content': '#article'
    });

    $(".popup").showPopup({
        'background': '.popup-background',
        'popup' : '.popup-window',
        'popupForm': '#popupForm',
        'calendarItem': new Array('#birthday' , '#from-date' , '#to-date'),
        'popupOkBtn': '#popup-ok-btn',
        'popupCnlBtn': '#popup-cnc-btn',
        'animationTime': 300
    });

    $("#popupForm").popupValidate();

    var listsArray = new Array();
    listsArray['List1'] = new Array('List Item 11', 'List Item 12', 'List Item 13', 'List Item 14', 'List Item 15');
    listsArray['List2'] = new Array('List Item 21', 'List Item 22', 'List Item 23', 'List Item 24', 'List Item 25');
    listsArray['List3'] = new Array('List Item 31', 'List Item 32', 'List Item 33', 'List Item 34', 'List Item 35');
    listsArray['List4'] = new Array('List Item 41', 'List Item 42', 'List Item 43', 'List Item 44', 'List Item 45');


    $('.list-content').lists({
        'arrayItems' : listsArray,
        'showItem': 'List1'
    });


});

// Pure JS

//window.onload = function(e){
//    positionFooter();
//}
//
//function positionFooter(){
//    var article = document.getElementById('article');
//    var height = window.innerHeight || document.documentElement.clientHeight;
//
//    var indentTop = ( height  ? height : document.body.clientHeight ) - article.clientHeight - 100;
//    document.getElementById('footer').style.marginTop = (indentTop > 0 ? indentTop : 0)  +'px';
//}