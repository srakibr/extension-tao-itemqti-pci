/*global define*/
define([
    'taoQtiItem/qtiCreator/widgets/interactions/customInteraction/Widget',
    'textReaderInteraction/creator/widget/states/states',
    'textReaderInteraction/runtime/js/renderer',
    'tpl!textReaderInteraction/creator/tpl/pages',
    'tpl!textReaderInteraction/creator/tpl/navigation'
], function (Widget, states, Renderer, pagesTpl, navigationTpl) {
    'use strict';

    var TextReaderInteractionWidget = Widget.clone();

    TextReaderInteractionWidget.initCreator = function () {
        this.registerStates(states);
        Widget.initCreator.call(this);
    };

    TextReaderInteractionWidget.beforeStateInit(function (event, pci, state) {
        if (pci.typeIdentifier && pci.typeIdentifier === "textReaderInteraction") {
            if (!pci.widgetRenderer) {
                pci.widgetRenderer = new Renderer({
                    serial : pci.serial,
                    $container : state.widget.$container,
                    templates : {
                        pages : pagesTpl,
                        navigation : navigationTpl
                    }
                });
            }
            pci.widgetRenderer.setState(state.name);
            pci.widgetRenderer.renderAll(pci.properties);
        }
    });

    return TextReaderInteractionWidget;
});