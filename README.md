jQueryModal
===
This repository contains two jQuery plugins for an enhanced dialog UI experience. In two use cases dialogs are a common element in the UI and these two are covered by two plugins from jQueryModal.

1. A confirmation dialog: "Are you sure you want to delete this user?" as an example
2. A form dialog: create a new user with a form inside a popup as an example

Goal of plugins
---
The plugins are created to provide a method to instantiate both types of modals in a DRY principle. Defaults for the modals can be set in a configuration object and per element preferences can be tuned with html5 data attributes.

Confirmation
---
The working can be best shown with a simple example. The hyperlink has an uri to delete a user account, a modal is instantiated to ask for confirmation.

    <a href="/user/delete" class="confirm" data-template"#tmpl" data-name="John Doe">Delete</a>
    <div id="tmpl" class="hidden">Are you sure you want to delete %name%</div>

    <script>$(".confirm").confirmation();</script>

A detailed page about the documentation for the confirmation can be found [here](https://github.com/Soflomo/jQueryModal/blob/master/docs/Confirmation.md).

Forms
---
This is work in progress and will be online soon.