jQueryModal
===
This repository contains two jQuery plugins for an enhanced dialog UI experience. Often dialogs are created to ask for a confirmation before the hyperlink is followed. A second use case is for forms, where the dialog mitigates the pitfall of going to specific pages to fill in a small form.

Goal of plugins
---
The plugins are created to provide a method to instantiate both types of modals in a DRY principle. With help of html5 data attributes, the modals can be configured.

Confirmation
---
The confirmation dialog is for example useful for a link to delete a resource. The resource will be immediately deleted upon request and for a UI the modal to ask for confirmation is a common element.

The contents of the dialog is called a template and can be placed inside the DOM or requested by an AJAX request. The template can contain variables and the title, success button, cancel button and type of request can be changed if desired.

Example of usage:

    <a href="/resource/delete" class="confirm" data-template="#template">Delete</a>

    <div id="template" style="display:none;">Are you sure you want to delete this resource?</div>
    <script>$('.confirm').confirm();</script>

When the link is clicked, a dialog is shown with "Are you sure you want to delete this resource?" as text. By default, the dialog has a title "Delete" (text in `<a>` element) and has a button "Cancel" to close the dialog and "Success" to perform a request to the uri.

Available data attributes:

1. `data-title="Title"`: to change the title
2. `data-success="Proceed"`: to change the success button
3. `data-cancel="Return"`: to change cancel button
4. `data-method="POST"`: type of request (defaults to GET)


### AJAX template
It is possible to load the template via an XmlHttpRequest. The difference between loading the template from the DOM and via an XHR is the first charater: a hash (`#`) indicates an id of an element in the DOM. Anything else is seen as an uri to load the request from.

Example of usage:

    <a href="/resource/delete" class="confirm" data-template="/resource/confirm">Delete</a>

An onclick on this element will trigger a GET request to /resource/confirm to load some html, which will be used as template.

### Templating variables
The templates can contain variables to personalize the message a user sees. It's the best to just show an example:

    <a href="/resource/delete" class="confirm" data-template="template" data-name="John Doe">Delete</a>

    <div id="template" style="display:none;">Are you sure to delete %name%?</div>

All keys are placed with the syntax %key% where the key is the data attribute: %name% will be replaced by the value of the attribute data-name. Please note also the data-template, data-title, data-success, data-cancel and data-method can be parsed if you need them.

Forms
---
Not complete yet
