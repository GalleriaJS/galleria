(function($) {
    
    var test = $('#test').length ? $('#test') : $('<div id="test">');
    $(function() {
        test.prependTo(document.body)
    })
    
    var text = function(content, color) {
        test.append('<div class="'+color+'">'+content+'</div>');
    }
    
    var T = window.Test = function() {
        var a = arguments;
        if (a.length == 1 && typeof a[0] == 'string') {
            text(a[0],'white');
        } else if(a.length == 2 && typeof a[1] == 'boolean') {
            text(a[0], a[1] ? 'green' : 'red');
        }
    }
    
    T.head = function(h3) {
        text('<h3>'+h3+'</h3>');
    }
    
})(jQuery);