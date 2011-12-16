Form modal
===
The form dialog is useful to insert simple data very fast. Usually a link points to another webpage containing a form. Because the complete page is loaded with all its resources it is usually slower than loading just the form.

This jQuery plugin allows to show a form, submit one and includes several other neat UX features.

Example of usage:

    <a href="/user/new" class="form">New user</a>

    <script>$('.form').form({title: 'Creat a new user'});</script>

When the link is clicked, a dialog is shown. The dialog comes with a few defaults for configuration:

1. Title of dialog: by default, this is the text inside the `<a>` element. In case of the example "New user"
2. Submit button: by default, this is "Submit"
3. Cancel button: by default, this is "Cancel"
4. Type of request to load the dialog contents: by default, a GET request will be made

All these values can be changed if desired.

Modal configuration
---
The modal dialog is created with sane jQuery UI defaults. If you want to change the dialog configuration, it's possible with an argument in the plugin call:

    <script>
    $(".confirm").confirmation({},{
        draggable: false
    });
    </script>

The second object is the standard options object used to instantiate the dialog, so almost all options available for the dialog can be tuned with this object. The only one who will be overwritten it the `buttons` properties.

Plugin configuration
---
The plugin has defaults for button labels and the type of request done after a click on the submit button. Upon plugin initialisation, these options can be set as well. Also, these defaults can be overwritten.

The complete configuration looks like this:

    {
    success: 'Success', // Button to submit form
    cancel: 'Cancel',   // Button to cancel dialog
    ajax:   true,       // If form should be submitted by an ajax request or not
    method: 'GET',      // Method to load the page as contents for the dialog
    errored: 'ul.errors',   // Selector for error validation
    onSuccess: function () {},  // Callback for a successful ajax submit
    onError: function () {}     // Callback for an errorred ajax submit
    }

The last two properties are callbacks when the AJAX request returned a response. The first parameter is the `<a>` element clicked, the other parameters are parameters from the $.ajax() calls. The defaults can be set directly too:

    $.fn.confirm.defaults.submit = "Proceed"
    // etc

Compressed version
---
A compressed version is in the repository as well. The YUI Compressor 2.4.6 is used to make the compressed script.
