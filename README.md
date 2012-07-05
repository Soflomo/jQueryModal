jQueryModal
===
This repository contains two jQuery plugins for an enhanced dialog UI experience. In two use cases dialogs are a common element in the UI and these two are covered by two plugins from jQueryModal.

1. A confirmation dialog: "Are you sure you want to delete this user?" as an example
2. A form dialog: create a new user with a form inside a popup as an example

Goal of plugins
---
The plugins are created to provide a method to instantiate both types of modals in a DRY principle. Defaults for the modals can be set in a configuration object, upon instantiation the configuration can be tuned and per element several preferences can be set with html5 data attributes.

Confirmation
---
The working can be best shown with a simple example. The hyperlink has an uri to delete a user account, a modal is instantiated to ask for confirmation.

    <a href="/user/delete" class="confirm" data-name="John Doe">Delete</a>
    <div id="tmpl" class="hidden">Are you sure you want to delete %name%</div>

    <script>
    $('.confirm').confirm({
        template: '#tmpl'
    });
    </script>

A detailed page about the documentation for the confirmation can be found [here](https://github.com/Soflomo/jQueryModal/blob/master/docs/Confirm.md).

Forms
---
The form popup performs a XmlHttpRequest to another page to load some html (especially a `<form>`) and inserts that into the contents of a dialog. A submit and cancel button are present and the form can be submitted by a normal request or asynchronous XmlHttpRequest. The response can be parsed to check for form errors: if any present, the form is updated with the given response.

    <a href="/user/new" class="form">New user</a>

    <script>$('.form').form();</script>

A detailed page about the documentation for the form dialog can be found [here](https://github.com/Soflomo/jQueryModal/blob/master/docs/Form.md).

TODO
---

1. Implement callbacks when ajax requests started

For forms:

1. Write better documentation
2. Implement a "add & create new one" button