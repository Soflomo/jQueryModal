(function($) {
    $.fn.form = function(o, d){
        var o = $.extend({}, $.fn.form.defaults, o), d = $.extend({}, d);
        
        $(this).click(function(event) {
            event.preventDefault();
            
            // e element clicked, t template, d dialog config, o options
            var e = $(this);
            
            $.ajax(e.attr('href'), {
                error: function (jqXHR, textStatus, errorThrown) {
                    throw 'Error during request for template';
                },
                success: function (data) {
                    show(e, $('<div>').html(data), o, d);
                }
            });
        });
        
        return this;
    };
    
    function show (element, template, options, dialog) {
        var buttons = {};

        if (options.title === undefined) {
            if (element.data('title') !== undefined) {
                options.title = element.data('title');
            } else {
                options.title  = element.text();
            }
        }

        buttons[options.cancel] = function (){
            template.dialog('close');
        };
        buttons[options.success] = function (){
            var form = template.find('form');
            
            if (options.ajax) {
                $.ajax(form.attr('action'), {
                    type: form.attr('method'),
                    data: form.serialize(),
                    error: function (jqXHR, textStatus, errorThrown) {
                        options.onError(element, jqXHR, textStatus, errorThrown);
                        template.dialog('close');
                    },
                    success: function(data, textStatus, jqXHR) {
                        if (errored(data)) {
                            template.html(data);
                        } else {
                            options.onSuccess(element, data, textStatus, jqXHR);
                            template.dialog('close');
                        }
                    }
                });
            } else {
                form.trigger('submit');
                template.dialog('close');
            }
        };

        if (dialog.title === undefined) {
            dialog.title = options.title;
        }
        
        dialog.buttons = buttons;
        template.dialog(dialog);
    };
    
    function errored (data) {
        var key = $.fn.form.defaults.errored;
        
        if ($(data).find(key).length > 0) {
            return true;
        }
        return false;
    }
    
    $.fn.form.defaults = {
        success: 'Success',
        cancel: 'Cancel',
        ajax:   true,
        method: 'GET',
        errored: 'ul.errors',
        onSuccess: function () {},
        onError: function () {}
    };
})(jQuery);