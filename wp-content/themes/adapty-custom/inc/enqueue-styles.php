<?php

/**
 * Adapty Custom Styles
 *
 * @return void
 */
function adapty_styles() {
//    wp_enqueue_style('normalize', get_template_directory_uri() . '/assets/styles/normalize.css', [], _S_VERSION, 'all');
    wp_enqueue_style('reset', get_template_directory_uri() . '/assets/styles/reset.css', [], _S_VERSION, 'all');
    wp_enqueue_style('adapty-global', get_template_directory_uri() . '/assets/styles/adapty.css', ['adapty-custom-style'], _S_VERSION, 'all');
    wp_enqueue_style('intlTelInput', get_template_directory_uri() . '/assets/styles/intlTelInput.css', [], '17.0.12', 'all');
}
add_action('wp_enqueue_scripts', 'adapty_styles');

function adapty_admin_styles() {
    $screen = get_current_screen();

    if ($screen && ($screen->id === 'page' || $screen->id === 'post')) {
        wp_enqueue_style('adapty-global', get_template_directory_uri() . '/assets/styles/adapty.css', [], _S_VERSION, 'all');
        wp_enqueue_style('reset', get_template_directory_uri() . '/assets/styles/reset.css', [], _S_VERSION, 'all');
        wp_enqueue_style('intlTelInput', get_template_directory_uri() . '/assets/styles/intlTelInput.css', [], '17.0.12', 'all');
    }
}
add_action('admin_enqueue_scripts', 'adapty_admin_styles');