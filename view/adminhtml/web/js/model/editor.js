define([
    "jquery",
    "jquery/ui",
    "Jorge_PageBuilderHtmlCodeExtend/js/ace/ace",
    "Jorge_PageBuilderHtmlCodeExtend/js/ace/ext-language_tools",
    "Jorge_PageBuilderHtmlCodeExtend/js/ace/ext-emmet",
    "Jorge_PageBuilderHtmlCodeExtend/js/extra/emmet"
], function($) {
    'use strict';

    var editor = null

    return {
        createEditor: function(element){
            editor = ace.edit(element, {
                mode: "ace/mode/html",
                theme: "ace/theme/monokai",
            });

            editor.setOptions({
                minLines: 30,
                maxLines: 30,
                autoScrollEditorIntoView: true,
                fontSize: "16px",
                enableEmmet: true,
                enableBasicAutocompletion: true,
                enableSnippets: true,
                enableLiveAutocompletion: false,
            });

            editor.container.style.lineHeight = 1.4;

            // Add padding.
            editor.renderer.setScrollMargin(10, 10, 10, 10);

            // Remove <!DOCTYPE html> info message.
            var session = editor.getSession();
            session.on("changeAnnotation", function () {
                var annotations = session.getAnnotations() || [];
                var len = annotations.length;
                var i = annotations.length;

                while (i--) {
                    if (
                        /doctype first\. Expected/.test(annotations[i].text)
                    ) {
                        annotations.splice(i, 1);
                    }
                }
                if (len > annotations.length) {
                    session.setAnnotations(annotations);
                }
            });

            this.overrideUpdateElementAtCursor();
            this.overrideMediabrowser();
        },

        setText: function(text){
            editor.getSession().setValue(text);
        },

        getText: function(){
            return editor.getSession().getValue();
        },

        addTextOnCursor: function(text){
            editor.session.insert(editor.getCursorPosition(), text);
        },

        manualRenderUpdate: function(){
            editor.renderer.updateFull();
        },

        on: function(event, callback){
            editor.on(event, callback);
        },

        trigger: function(event){
            editor.session._emit(event);
        },

        overrideUpdateElementAtCursor: function(){
            var $this = this;
            var oldFunction = window.updateElementAtCursor;

            window.updateElementAtCursor = function(el, value, win) {
                oldFunction(el, value, win);

                $this.addTextOnCursor(value);
                editor.focus();
            }
        },

        overrideMediabrowser: function(){
            var $this = this;

            $.widget('mage.mediabrowser', $.mage.mediabrowser, {
                insertAtCursor: function (element, value) {
                    this._super(element, value);

                    $this.addTextOnCursor(value);
                    editor.focus();
                }
            });
        }
    }
});
