define([
    'jquery',
    'underscore',
    'jquery/ui',
    'jquery/jquery.parsequery'
], function ($, _) {
    'use strict';
    return function (widget) {

        $.widget('mage.SwatchRenderer', widget, {

            /**
             * Event for swatch options
             *
             * @param {Object} $this
             * @param {Object} $widget
             * @private
             */
            _OnClick: function ($this, $widget) {

                $widget._super($this, $widget);

                $widget._UpdateDetailProduct();

            },

            /**
             * Event for select
             *
             * @param {Object} $this
             * @param {Object} $widget
             * @private
             */
            _OnChange: function ($this, $widget) {

                $widget._super($this, $widget);

                $widget._UpdateDetailProduct();

            },

            _UpdateDetailProduct: function () {
                var $widget = this,
                    index = '',
                    options = _.object(_.keys($widget.optionsMap), {}),
                    childProductSku = this.options.jsonConfig.skus,
                    childProductName = this.options.jsonConfig.names,
                    childProductDescription = this.options.jsonConfig.descriptions;

                $widget.element.find('.' + $widget.options.classes.attributeClass + '[data-option-selected]').each(function () {
                    var attributeId = $(this).attr('data-attribute-id');
                    options[attributeId] = $(this).attr('data-option-selected');
                });

                /* CUSTOM CODE START */
                if (jQuery('[data-ui-id="page-title-wrapper"]').length && this.options.jsonConfig.names) {

                    if (this.getProduct()) {
                        var iname = this.options.jsonConfig.names[this.getProduct()][0].name
                        if (iname != '') {
                            jQuery('[data-ui-id="page-title-wrapper"]').html(iname);
                        }
                    }
                    else {
                        var productName = this.options.jsonConfig.productName
                        if (productName) {
                            jQuery('[data-ui-id="page-title-wrapper"]').html(productName);
                        }
                    }
                }
                if (jQuery('.description > div.value').length && this.options.jsonConfig.descriptions) {
                    if (this.getProduct()) {
                        var description = this.options.jsonConfig.descriptions[this.getProduct()][0].description
                        if (description) {
                            jQuery('.description > div.value').html(description);
                        }
                    } else {
                        var productDescription = this.options.jsonConfig.productDescription
                        if (productDescription) {
                            jQuery('.description > div.value').html(productDescription);
                        }
                    }
                }
                if (jQuery('.sku > div.value').length && this.options.jsonConfig.skus) {
                    if (this.getProduct()) {
                        var sku = this.options.jsonConfig.skus[this.getProduct()][0].sku
                        if (sku) {
                            jQuery('.sku > div.value').html(sku);
                        }
                    } else {
                        var productSku = this.options.jsonConfig.productSku
                        if (productSku) {
                            jQuery('.sku > div.value').html(productSku);
                        }
                    }
                }
                if (jQuery('.estimate-delivery-time > div.value').length && this.options.jsonConfig.estimated_times) {
                    if (this.getProduct()) {
                        var estimated_time = this.options.jsonConfig.estimated_times[this.getProduct()][0].estimated_time
                        if (estimated_time) {
                            jQuery('.estimate-delivery-time > div').show();
                            jQuery('.estimate-delivery-time > div.value').html(estimated_time);
                        }else {
                            console.log('estimated_time else');
                            jQuery('.estimate-delivery-time > div').hide();
                        }
                    } else {
                        var productEstimatedTime = this.options.jsonConfig.productEstimatedTime
                        if (productEstimatedTime) {
                            jQuery('.estimate-delivery-time > div').show();
                            jQuery('.estimate-delivery-time > div.value').html(productEstimatedTime);
                        } else {
                            jQuery('.estimate-delivery-time > div').hide();
                        }
                    }
                }
                /* CUSTOM CODE END */
            },
        });
        return $.mage.SwatchRenderer;
    }
});
