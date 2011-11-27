(function($) {
    $.fn.confirmation = function(o){
        $(this).click(function(event) {
            event.preventDefault();
            // e element clicked, t template, o options from user
            var e = $(this), t = e.data('template');
            if (t !== undefined) {
                if ('#' === t.charAt(0)) {
                    show(e, $(t), o);
                } else {
                    $.get(t, function (data) {
                        show(e, $('<div>').html(data), o);
                    });
                }
            }
        });
    };
    
    function show (e, t, o) {
        var dialog = $.extend({}, o), buttons = {}, options = $.extend({}, $.fn.confirmation.defaults),
        changed = false, html = t.html(); options.title  = e.text();

        if (e.data('submit') !== undefined) {
            options.submit = e.data('submit');
        }
        if (e.data('cancel') !== undefined) {
            options.cancel = e.data('cancel');
        }
        if (e.data('method') !== undefined) {
            options.method = e.data('method');
        }
        if (e.data('title') !== undefined) {
            options.title = e.data('title');
        }

        buttons[options.submit] = function (){
            if (options.ajax) {
                $.ajax(e.attr('href'), {type: options.method});
            } else {
                window.location.href = e.attr('href');
            }
            t.dialog('close');
        };
        buttons[options.cancel] = function (){
            t.dialog('close');
        };

        for (var name in e.data()) {
            var val = e.data(name), key = '%'+name+'%';

            if (html.indexOf(key) != -1) {
                changed = true;
                html = html.replace(key, val);
            }
        }
        if (changed) {
            t.html(html);
        }

        dialog.title   = options.title;
        dialog.buttons = buttons;
        t.dialog(dialog);
    };
    
    $.fn.confirmation.defaults = {
        submit: 'Submit',
        cancel: 'Cancel',
        ajax:   true,
        method: 'GET'
    };
})(jQuery);