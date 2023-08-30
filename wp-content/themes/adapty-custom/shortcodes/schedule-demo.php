<?php

function adapty_shortcode_schedule_demo( $atts ) {
    $css_file_path = get_template_directory() . '/assets/styles/schedule-demo-form.css';

    $args = shortcode_atts( array(
        'title' => '',
    ), $atts );

    $title = $args['title'];

    ob_start();

    if (file_exists($css_file_path)) {
        static $display_schedule_demo_style = 0;
        $css_content = file_get_contents($css_file_path);
        if ($css_content !== false && $display_schedule_demo_style < 1) {
            echo '<style id="shortcode-schedule-demo">' . $css_content . '</style>';
            $display_schedule_demo_style++;
        }
    }

    ?>

    <div id="demo-contact-form" class="demo-contact-form">
        <form @submit.prevent="submitForm">
            <?php if (!empty($title)) {
                echo '<div class="form-title">' . esc_html__(trim($title),'adapty-custom') . '</div>';
            } ?>
            <div>
                <input type="text" id="first-name" v-model.lazy.trim="firstName" required
                       :class="{ 'filled': firstName, 'error': fieldErrors.firstName }"
                       @input="validateField('firstName', [$event, /[^A-Za-z.\-]/g])"
                       v-on:blur="validateField('firstName', [$event, /[^A-Za-z.\-]/g], true)">
                <label for="first-name"><?= esc_html__('First name', 'adapty-custom'); ?><span class="r">*</label>
                <span v-if="fieldErrors.firstName" class="error-message">
                    <?= esc_html__('Please enter a valid first name.', 'adapty-custom'); ?>
                </span>
            </div>
            <div>
                <input type="text" id="last-name" v-model.lazy.trim="lastName" required
                       :class="{ 'filled': lastName, 'error': fieldErrors.lastName }"
                       @input="validateField('lastName', [$event, /[^A-Za-z.\-]/g])"
                       v-on:blur="validateField('lastName', [$event, /[^A-Za-z.\-]/g], true)">
                <label for="last-name"><?= esc_html__('Last name', 'adapty-custom'); ?><span class="r">*</label>
                <span v-if="fieldErrors.lastName" class="error-message">
                    <?= esc_html__('Please enter a valid last name.', 'adapty-custom'); ?>
                </span>
            </div>
            <div>
                <input type="email" id="email" v-model.lazy.trim="email" required
                       :class="{ 'filled': email, 'error': fieldErrors.email }"
                       @input="validateField('email', [$event, /[^A-Za-z.\-\d@_]/g])"
                       v-on:blur="validateField('email', [$event, /[^A-Za-z.\-\d@_]/g], true)">
                <label for="email"><?= esc_html__('Work email', 'adapty-custom'); ?><span class="r">*</label>
                <span v-if="fieldErrors.email" class="error-message">
                    <?= esc_html__('Please enter a valid work email.', 'adapty-custom'); ?>
                </span>
            </div>
            <div :class="{ 'field-filled': phoneNumber, 'field-focus': isPhoneFieldFocused, 'field-error': fieldErrors.phoneNumber, 'field-picker': true, 'field-pin': true }">
                <input type="tel" id="phoneNumber" v-model.lazy.trim="phoneNumber" required
                       @focus="isPhoneFieldFocused = true"
                       @blur="isPhoneFieldFocused = false"
                       :class="{ 'filled': phoneNumber, 'error': fieldErrors.phoneNumber }"
                       @input="validateField('phoneNumber', [$event, /[^+\d\s()-]/g])"
                       v-on:blur="validateField('phoneNumber', [$event, /[^+\d\s()-]/g], true)">
                <label for="phoneNumber"><?= esc_html__('Phone number', 'adapty-custom'); ?><span class="r">*</label>
                <span v-if="fieldErrors.phoneNumber" class="error-message">
                    <?= esc_html__('Please enter a valid phone number.', 'adapty-custom'); ?>
                </span>
            </div>
            <div>
                <input type="text" id="company-name" v-model.lazy.trim="companyName" required
                       :class="{ 'filled': companyName, 'error': fieldErrors.companyName }"
                       @input="validateField('companyName', [$event, /[^A-Za-z.\-\d\s(),]/g])"
                       v-on:blur="validateField('companyName', [$event, /[^A-Za-z.\-\d\s(),]/g], true)">
                <label for="company-name"><?= esc_html__('Company name', 'adapty-custom'); ?><span class="r">*</label>
                <span v-if="fieldErrors.companyName" class="error-message">
                    <?= esc_html__('Please enter a valid company name.', 'adapty-custom'); ?>
                </span>
            </div>
            <div>
                <svg class="select-arrow" height="6" width="9" xmlns="http://www.w3.org/2000/svg"><path d="M7.73 0l1 1-4.37 4.36L0 1l1-1 3.36 3.36z" fill="#888"></path></svg>
                <select id="company-size" v-model="companySize" required
                        :class="{ 'filled': companySize, 'error': fieldErrors.companySize }"
                        @change="validateField('companySize', [false, false], true)">
                    <option value="" selected="" hidden=""></option>
                    <option value="1"><?= esc_html__('Solo', 'adapty-custom'); ?></option>
                    <option value="2-10">2-10</option>
                    <option value="11-50">11-50</option>
                    <option value="51-200">51-200</option>
                    <option value="201-500">201-500</option>
                    <option value="501-1000">501-1000</option>
                    <option value="1001+">1001+</option>
                </select>
                <label for="company-size"><?= esc_html__('Company size', 'adapty-custom'); ?><span class="r">*</label>
                <span v-if="fieldErrors.companySize" class="error-message">
                    <?= esc_html__('Please select a valid company size.', 'adapty-custom'); ?>
                </span>
            </div>
            <button type="submit"
                data-success-text="<?= esc_html__('Demo successfully booked', 'adapty-custom'); ?>"
                data-error-text="<?= esc_html__('Error! Repeat?', 'adapty-custom'); ?>"
            >
                <?= esc_html__('Schedule your demo', 'adapty-custom'); ?>
            </button>
            <div class="info">
                <?php
                    $terms = esc_html__('Terms of Service', 'adapty-custom');
                    $privacy = esc_html__('Privacy Notice', 'adapty-custom');

                    $terms_link = '<a class="info__link" href="https://www.pandadoc.com/terms-of-use/" target="_blank" rel="noreferrer">' . $terms . '</a>';
                    $privacy_link = '<a class="info__link" href="https://www.pandadoc.com/privacy-notice/" target="_blank" rel="noreferrer">' . $privacy . '</a>';

                    $string = esc_html__(
                        'By submitting this form, I agree that the %1$s and %2$s will govern the use of services I receive and personal data I provide respectively.',
                    'adapty-custom'
                    );

                    $translated_string = sprintf($string, $terms_link, $privacy_link);

                    echo $translated_string;
                ?>
            </div>
        </form>
    </div>

    <?php
    return ob_get_clean();
}
add_shortcode('adapty-schedule-demo', 'adapty_shortcode_schedule_demo');