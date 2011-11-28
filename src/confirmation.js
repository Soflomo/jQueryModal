(function($) {
    $.fn.confirmation = function(d, o){
        $(this).click(function(event) {
            event.preventDefault();
            
            // e element clicked, t template, d options for dialog
            var e = $(this), t = e.data('template');
            if (t !== undefined) {
                if ('#' === t.charAt(0)) {
                    show(e, $(t), d, o);
                } else {
                    $.get(t, function (data) {
                        show(e, $('<div>').html(data), d, o);
                    });
                }
            }
        });
        
        return this;
    };
    
    function show (e, t, d, o) {
        var dialog = $.extend({}, d), options = $.extend({}, $.fn.confirmation.defaults, o), buttons = {};

        if (options.title === undefined) {
            if (e.data('title') !== undefined) {
                options.title = e.data('title');
            } else {
                options.title  = e.text();
            }
        }

        buttons[options.submit] = function (){
            if (options.ajax) {
                $.ajax(e.attr('href'), {
                    type: options.method,
                    error: function (jqXHR, textStatus, errorThrown) {
                        options.callback.error(e, jqXHR, textStatus, errorThrown)
                    },
                    success: function(data, textStatus, jqXHR) {
                        options.callback.success(e, data, textStatus, jqXHR)
                    }
                });
            } else {
                window.location.href = e.attr('href');
            }
            t.dialog('close');
        };
        buttons[options.cancel] = function (){
            t.dialog('close');
        };

        var html = $.fn.confirmation.templator(t.html(), e.data());
        t.html(html);

        dialog.title   = options.title;
        dialog.buttons = buttons;
        t.dialog(dialog);
    };
    
    $.fn.confirmation.templator = function (tmpl, vars) {
        for (var name in vars) {
            var val = vars[name], key = '%'+name+'%';

            if (tmpl.indexOf(key) != -1) {
                tmpl = tmpl.replace(key, val);
            }
        }
        return tmpl;
    }
    
    $.fn.confirmation.defaults = {
        submit: 'Submit',
        cancel: 'Cancel',
        ajax:   true,
        method: 'GET',
        callback: {
            success: function () {},
            error: function () {}
        }
    };
})(jQuery);