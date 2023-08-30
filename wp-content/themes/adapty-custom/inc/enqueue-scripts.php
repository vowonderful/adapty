<?php

/**
 * Adapty Custom Scripts
 *
 * @return void
 */
function adapty_scripts() {
    wp_enqueue_script('vue', get_template_directory_uri() . '/assets/js/vue.global.min.js', ['jquery'], _S_VERSION, '');
    wp_enqueue_script('jquery-phone-mask', get_template_directory_uri() . '/assets/js/jquery.mask.min.js', ['jquery', 'intlTelInput'], '1.14.11', '');
    wp_enqueue_script('intlTelInput', get_template_directory_uri() . '/assets/js/intlTelInput.min.js', ['jquery'], '18.2.1', '');
    wp_enqueue_script('schedule-demo-app', get_template_directory_uri() . '/assets/js/schedule-demo.js', ['jquery', 'jquery-phone-mask', 'vue'], _S_VERSION, '');
}
add_action('wp_enqueue_scripts', 'adapty_scripts');


function adapty_admin_scripts() {
    $screen = get_current_screen();

    if ($screen && ($screen->id === 'page' || $screen->id === 'post')) {
        wp_enqueue_script('vue', get_template_directory_uri() . '/assets/js/vue.global.min.js', [], _S_VERSION, '');
        wp_enqueue_script('jquery-phone-mask', get_template_directory_uri() . '/assets/js/jquery.mask.min.js', ['jquery', 'intlTelInput'], '1.14.11', '');
        wp_enqueue_script('intlTelInput', get_template_directory_uri() . '/assets/js/intlTelInput.min.js', ['jquery'], '18.2.1', '');
        wp_enqueue_script('schedule-demo-app', get_template_directory_uri() . '/assets/js/schedule-demo.js', ['jquery', 'jquery-phone-mask', 'vue'], _S_VERSION, '');
    }
}
add_action('admin_enqueue_scripts', 'adapty_admin_scripts');