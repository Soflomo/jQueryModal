(function($) {
    $.fn.confirm = function(options, dialog){
        var options = $.extend({}, $.fn.confirm.defaults, options),
            dialog  = $.extend({}, dialog);
        
        $(this).click(function(event) {
            event.preventDefault();
            
            var element = $(this), template = options.template;
            if (template === undefined) {
                if (element.data('template') === undefined) {
                    throw 'Template required';
                } else {
                    template = element.data('template');
                }
            }
            
            if ('#' === template.charAt(0)) {
                show(element, $(template), options, dialog);
            } else {
                $.ajax(template, {
                    error: function (jqXHR, textStatus, errorThrown) {
                        throw 'Error during request for template';
                    },
                    success: function (data) {
                        show(element, $('<div>').html(data), options, dialog);
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
        if (element.data('cancel') !== undefined) {
            options.cancel = element.data('cancel');
        }
        if (element.data('success') !== undefined) {
            options.success = element.data('success');
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