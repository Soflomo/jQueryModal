Confirmation modal
===
The confirmation dialog is for example useful for a link to delete a resource. The resource will be immediately deleted upon request and for a UI the modal to ask for confirmation is a common element. 
The contents of the dialog is called a template and can be placed inside the DOM or requested by an AJAX request. The template can contain variables and the title, success button, cancel button and type of request can be changed if desired.

Example of usage:

    <a href="/user/delete" class="confirm" data-template"#tmpl">Delete</a>
    <div id="tmpl" class="hidden">Are you sure you want to delete this user?/div>

    <script>$(".confirm").confirmation();</script>

When the link is clicked, a dialog is shown with "Are you sure you want to delete this user?" as text. The dialog comes with a few defaults for configuration:

1. Title of dialog: by default, this is the text inside the `<a>` element. In case of the example "Delete"
2. Submit button: by default, this is "Submit"
3. Cancel button: by default, this is "Cancel"
4. Type of request: by default, a GET request will be made

Using data attributes these defaults can be overridden:

1. `data-title="Title"`: to change the title
2. `data-success="Proceed"`: to change the success button
3. `data-cancel="Return"`: to change cancel button
4. `data-method="POST"`: type of request (defaults to GET)

AJAX template
---
It is possible to load the template via an XmlHttpRequest. The difference between loading the template from the DOM and via an XHR is the first charater: a hash (`#`) indicates an id of an element in the DOM. Anything else is seen as an uri to load the request from.

Example of usage:

    <a href="/resource/delete" class="confirm" data-template="/resource/confirm">Delete</a>

An onclick on this element will trigger a GET request to /resource/confirm to load some html, which will be used as template.

Templating variables
---
The templates can contain variables to personalize the message a user sees. It's the best to just show an example:

    <a href="/user/delete" class="confirm" data-template"#tmpl" data-name="John Doe">Delete</a>
    <div id="tmpl" class="hidden">Are you sure you want to delete %name%?/div>

    <script>$(".confirm").confirmation();</script>

All keys are placed with the syntax `%key%` where the key is the data attribute: `%name%` will be replaced by the value of the attribute `data-name`. Please note also the `data-template`, `data-title`, `data-success`, `data-cancel` and `data-method` can be parsed if you need them.

Modal configuration
---
The modal dialog is created with sane jQuery UI defaults. If you want to change the dialog configuration, it's possible with an argument in the plugin call:

    <script>
    $(".confirm").confirmation({
        draggable: false
    });
    </script>

The object is the standard options object used to instantiate the dialog, so almost all options available for the dialog can be tuned with this object. The only two who will be overwritten are the title and buttons properties.