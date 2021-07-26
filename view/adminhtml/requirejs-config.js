var config = {
    map: {
        '*': {
            'Magento_PageBuilder/template/form/element/html-code.html': 'Jorge_PageBuilderHtmlCodeExtend/template/html-code.html',
            'htmlhint': 'Jorge_PageBuilderHtmlCodeExtend/js/htmlhint'
        }
    },

    shim: {
        "Jorge_PageBuilderHtmlCodeExtend/js/ace/ext-language_tools": ["Jorge_PageBuilderHtmlCodeExtend/js/ace/ace"],
        "Jorge_PageBuilderHtmlCodeExtend/js/ace/ext-emmet": ["Jorge_PageBuilderHtmlCodeExtend/js/ace/ace"]
    },

    config: {
        mixins: {
            'Magento_PageBuilder/js/form/element/html-code': {
                'Jorge_PageBuilderHtmlCodeExtend/js/html-code-mixin': true
            }
        }
    }
}
