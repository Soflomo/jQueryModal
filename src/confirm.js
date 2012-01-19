(function($) {
    $.fn.confirm = function(o, d){
        var o = $.extend({}, $.fn.confirm.defaults, o), d = $.extend({}, d);
        
        $(this).click(function(event) {
            event.preventDefault();
            
            // e element clicked, t template, d dialog config, o options
            var e = $(this), t = o.template;
            if (t === undefined) {
                if (e.data('template') === undefined) {
                    throw 'Template required';
                } else {
                    t = e.data('template');
                }
            }
            
            if ('#' === t.charAt(0)) {
                show(e, $(t), o, d);
            } else {
                $.ajax(t, {
                    error: function (jqXHR, textStatus, errorThrown) {
                        throw 'Error during request for template';
                    },
                    success: function (data) {
                        show(e, $('<div>').html(data), o, d);
                    }
                });
            }
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
            options.onClick(element, template);
            
            if (options.ajax) {
                $.ajax(element.attr('href'), {
                    type: options.method,
                    error: function (jqXHR, textStatus, errorThrown) {
                        options.onError(element, jqXHR, textStatus, errorThrown);
                    },
                    success: function(data, textStatus, jqXHR) {
                        options.onSuccess(element, data, textStatus, jqXHR);
                        
                        if (options.closeAfterAjax) {
                            template.dialog('close');
                        }
                    }
                });
            } else {
                window.location.href = element.attr('href');
            }
            
            if (!options.closeAfterAjax) {
                template.dialog('close');
            }
        };

        var html = $.fn.confirm.templator(template.html(), element.data());
        template.html(html);

        if (dialog.title === undefined) {
            dialog.title = options.title;
        }
        
        dialog.buttons = buttons;
        template.dialog(dialog);
    };
    
    $.fn.confirm.templator = function (tmpl, vars) {
        for (var name in vars) {
            var val = vars[name], key = '%'+name+'%';
            
            tmpl = tmpl.replace(key, val);
        }
        return tmpl;
    }
    
    $.fn.confirm.defaults = {
        success: 'Success',
        cancel: 'Cancel',
        ajax:   true,
        closeAfterAjax: true,
        method: 'GET',
        onClick: function () {},
        onSuccess: function () {},
        onError: function () {}
    };
})(jQuery);