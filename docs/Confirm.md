Confirmation modal
===
The confirmation dialog is for example useful for a link to delete a resource. The resource will be immediately deleted upon request and for a UI the modal to ask for confirmation is a common element. 
The contents of the dialog is called a template and can be placed inside the DOM or requested by an AJAX request. The template can contain variables and the title, success button, cancel button and type of request can be changed if desired.

Example of usage:

    <a href="/user/delete" class="confirm">Delete</a>
    <div id="tmpl" class="hidden">Are you sure you want to delete this user?</div>

    <script>$('.confirm').confirm({template: '#tmpl'});</script>

When the link is clicked, a dialog is shown with "Are you sure you want to delete this user?" as text. The dialog comes with a few defaults for configuration:

1. Title of dialog: by default, this is the text inside the `<a>` element. In case of the example "Delete"
2. Submit button: by default, this is "Submit"
3. Cancel button: by default, this is "Cancel"
4. Type of request: by default, a GET request will be made

All these values can be changed if desired.

AJAX template
---
It is possible to load the template via an XmlHttpRequest. The difference between loading the template from the DOM and via an XHR is the first charater: a hash (`#`) indicates an id of an element in the DOM. Anything else is seen as an uri to load the request from.

Example of usage:

    <a href="/resource/delete" class="confirm" data-template="/resource/confirm">Delete</a>

    <script>$('.confirm').confirm({template: '/resource/confirm'})</script>

An onclick on this element will trigger a GET request to /resource/confirm to load some html, which will be used as template.

Templating variables
---
Templates can contain variables to personalize the message a user sees. It's the best to just show an example:

    <a href="/user/delete" class="confirm" data-name="John Doe">Delete</a>
    <div id="tmpl" class="hidden">Are you sure you want to delete %name%?/div>

    <script>$(".confirm").confirm({template: '#tmpl'});</script>

All keys are placed with the syntax `%key%` where the key is the data attribute: `%name%` will be replaced by the value of the attribute `data-name`. The templating function is accessible to overwrite, when a different behavior is required.

    $.fn.confirm.templator = function (tmpl, vars) {
        // Here custom template code
    }

The signature contains the template as html string and an associative array with key/value pairs.

Modal configuration
---
The modal dialog is created with sane jQuery UI defaults. If you want to change the dialog configuration, it's possible with an argument in the plugin call:

    <script>
    $(".confirm").confirm({
        template: '#tmpl'
    },{
        draggable: false
    });
    </script>

The second object is the standard options object used to instantiate the dialog, so almost all options available for the dialog can be tuned with this object. The only one who will be overwritten it the `buttons` properties.

Plugin configuration
---
The plugin has defaults for button labels and the type of request done after a click on the submit button. Upon plugin initialisation, these options can be set as well. Also, these defaults can be overwritten.

The complete configuration looks like this:

    {
    success: 'Success', // Used to send request to href
    cancel: 'Cancel',   // Used to cancel dialog
    ajax: true,         // If an ajax request is used
    method: 'GET',      // Method for ajax request
    onSuccess: function (element, data, textStatus, jqXHR) {},
    onError: function (element, jqXHR, textStatus, errorThrown) {}
    }

The last two properties are callbacks when the AJAX request returned a response. The first parameter is the `<a>` element clicked, the other parameters are parameters from the $.ajax() calls. The defaults can be set directly too:

    $.fn.confirm.defaults.submit = "Proceed"
    // etc

Compressed version
---
A compressed version is in the repository as well. The YUI Compressor 2.4.6 is used to make the compressed script.
