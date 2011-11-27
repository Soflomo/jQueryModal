$.fn.confirmation = function(o){
    jQuery(this).click(function() {
        // e element clicked, t template, o options from user
        var e = jQuery(this), t = e.data('template');
        if (t !== undefined) {
            if ('#' === t.charAt(0)) {
                show(e, jQuery(t), o);
            } else {
                $.get(t, function (data) {
                    show(e, jQuery('<div>').html(data), o);
                });
            }
            
            return false;
        }
    });
    
    function show (e, t, o) {
        var dialog = $.extend({}, o), buttons = {}, method  = 'GET',
            submit = 'Submit', cancel = 'Cancel', title = e.text();

        if (e.data('submit') !== undefined) {
            submit = e.data('submit');
        }
        if (e.data('cancel') !== undefined) {
            cancel = e.data('cancel');
        }
        if (e.data('method') !== undefined) {
            method = e.data('method');
        }
        if (e.data('title') !== undefined) {
            title = e.data('title');
        }
        
        buttons[submit] = function (){
            $.ajax(e.attr('href'), {
                type: method
            });
            t.dialog('close');
        };
        buttons[cancel] = function (){
            t.dialog('close');
        };
        
        var changed = false, html = t.html();
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
        
        dialog.title   = title;
        dialog.buttons = buttons;
        t.dialog(dialog);
    }
};