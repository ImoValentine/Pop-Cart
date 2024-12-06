<?php
/*
Plugin Name: WooCommerce Quantity Change Alert
Description: Displays an alert box when the quantity of an item in the WooCommerce cart is changed, including both SKU and product name.
Version: 1.3
Author: Imraan Omi Jacobs
*/

if ( ! defined( 'ABSPATH' ) ) {
    exit; // Exit if accessed directly.
}

class WC_Quantity_Change_Alert {

    public function __construct() {
        add_action( 'wp_enqueue_scripts', [ $this, 'enqueue_scripts' ] );
        add_action( 'woocommerce_after_cart', [ $this, 'add_quantity_alert_script' ] );
        add_filter( 'woocommerce_cart_item_name', [ $this, 'add_sku_data_attribute' ], 10, 2 );
    }

    // Enqueue jQuery (WooCommerce includes it by default) and custom JS script
    public function enqueue_scripts() {
        wp_enqueue_script( 'jquery' );
    }

    // Inject SKU as a data attribute on each cart item row
    public function add_sku_data_attribute( $product_name, $cart_item ) {
        $product = wc_get_product( $cart_item['product_id'] );
        $sku = $product->get_sku();

        if ( $sku ) {
            $product_name = '<div class="cart-item-sku" data-sku="' . esc_attr( $sku ) . '">' . $product_name . '</div>';
        }

        return $product_name;
    }

    // Add JavaScript for quantity change alert
    public function add_quantity_alert_script() {
        ?>
        <script type="text/javascript">
            jQuery(document).ready(function($) {
                // Function to show alert when quantity changes
                function showQuantityAlert() {
                    $('.quantity .qty').on('change', function() {
                        var $input = $(this);
                        var qty = $input.val();
                        var $productRow = $input.closest('.cart_item');
                        
                        // Get SKU from data attribute
                        var sku = $productRow.find('.cart-item-sku').data('sku');
                        var productName = $productRow.find('.product-name a').text() || 'this item';

                        if (sku && qty) {
                            alert('You just changed the quantity of ' + productName + ' (SKU: ' + sku + ') to ' + qty);
                        }
                    });
                }

                // Run the function on initial page load
                showQuantityAlert();

                // Re-bind the function after AJAX updates in the cart
                $(document.body).on('updated_cart_totals', function() {
                    showQuantityAlert();
                });
            });
        </script>
        <?php
    }
}

new WC_Quantity_Change_Alert();
