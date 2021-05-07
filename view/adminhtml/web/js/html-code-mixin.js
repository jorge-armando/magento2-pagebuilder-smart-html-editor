define([
    "ko",
    "Jorge_PageBuilderHtmlCodeExtend/js/model/editor"
], function (ko, editor) {
    "use strict";

    return function (HtmlCode) {
        return HtmlCode.extend({
            defaults: {
                newEditorMode: ko.observable(false)
            },

            initEditor: function (element) {
                var $this = this;

                editor.createEditor(element);

                editor.setText(this.value());

                document.getElementById(this.uid).addEventListener("blur", function(event){
                    editor.setText(event.target.value);
                });

                editor.on('blur', function(){
                    $this.value(editor.getText());
                });
            },

            clickChangeEditor: function () {
                var newState = !this.newEditorMode();

                this.newEditorMode(newState);
                editor.manualRenderUpdate();
            }
        });
    };
});
