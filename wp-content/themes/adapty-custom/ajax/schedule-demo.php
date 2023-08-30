<?php

function register_ajax_handler() {
    add_action('wp_ajax_submit_schedule_demo', 'submit_schedule_demo');
    add_action('wp_ajax_nopriv_ssubmit_schedule_demo', 'submit_schedule_demo');
}
add_action('init', 'register_ajax_handler');

/**
 * TODO: Тут можем обработать полученные данные и делать дальше с ними что надо:
 * сначала дополнительно провалидировать на бэке и сообщить результат клиенту,
 * и если всё ок -- данные в БД, на почту, в мессенджер, google-таблицы и т.д.
 *
 * @return void
 */
function submit_schedule_demo() {
    if (
        isset($_POST['first_name']) &&
        isset($_POST['last_name']) &&
        isset($_POST['email']) &&
        isset($_POST['phone_number']) &&
        isset($_POST['company_name']) &&
        isset($_POST['company_size'])
    ) {
        $first_name = sanitize_text_field($_POST['first_name']);
        $last_name = sanitize_text_field($_POST['last_name']);
        $email = sanitize_email($_POST['email']);
        $phone_number = sanitize_text_field($_POST['phone_number']);
        $company_name = sanitize_text_field($_POST['company_name']);
        $company_size = sanitize_text_field($_POST['company_size']);

        $to = 'mihalevich.vladimir@gmail.com';
        $subject = 'Заявка на демо';
        $message = "От: $first_name $last_name\n";
        $message .= "Email: $email\n";
        $message .= "Номер телефона: $phone_number\n";
        $message .= "Название компании: $company_name\n";
        $message .= "Размер компании: $company_size\n";

        $sent = wp_mail($to, $subject, $message);

        if ($sent) {
            echo 'success';
        } else {
            echo 'error';
        }
    } else {
        echo 'error';
    }

    wp_send_json_success();
}