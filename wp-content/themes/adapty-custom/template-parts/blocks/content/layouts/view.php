<?php

function view($data): void {
    $_layout = 'acf_fc_layout';

    if( !empty($data) ):
        foreach ($data as $box) {
            switch ($box[$_layout]) {
                case 'text':
                    $text = __($box['text'], 'adapty-custom');
                    echo "<{$box['tag']} class=\"{$box['classes']}\">{$text}</{$box['tag']}>";
                    //include '../content/layouts/text.php';
                    break;
                case 'button':
                    $classes = 'btn ';
                    $classes .= 'btn__size--' . $box['size'] . ' ';
                    $classes .= 'btn__style--' . $box['style'] . ' ';
                    if ($box['outline']) {
                        $classes .= 'btn--outline ';
                    }
                    if ($box['hover']) {
                        $classes .= 'btn--hover ';
                    }
                    if ($box['icon'] !== 'disable') {
                        $classes .= 'btn__with-icon ';
                    }
                    if (!empty($classes)) {
                        $classes = trim('class="' . $classes . '"');
                    }

                    $left_img = $box['icon'] === "img-left" && !empty($box['icon-image']) ? '<img src="' . $box['icon-image'] . '" />' : "";
                    $right_img = $box['icon'] === "img-right" && !empty($box['icon-image']) ? '<img src="' . $box['icon-image'] . '" />' : "";

                    $left_svg = $box['icon'] === "svg-left" && !empty($box['icon-text']) ? $box['icon-text'] : "";
                    $right_svg = $box['icon'] === "svg-right" && !empty($box['icon-text']) ? $box['icon-text'] : "";

                    $target = !empty($box['link']['target']) ? 'target="' . $box['link']['target'] . '"' : '';

                    $title = __($box['link']['title'], 'adapty-custom');
                    echo "<a href=\"{$box['link']['url']}\" {$classes} {$target}>{$left_img}{$left_svg}{$title}{$right_svg}{$right_img}</a>";
                    //include '../content/layouts/button.php';
                    break;
                case 'image':
                    $is_image_aline =
                        (empty($box['image--desktop']) && !empty($box['image--mobile']))
                        || (empty($box['image--mobile']) && !empty($box['image--desktop']));

                    if (!empty($box['image--desktop'])) {
                        $class_name = $is_image_aline ? 'image' : 'image image--desktop';
                        echo wp_get_attachment_image(
                            $box['image--desktop'],
                        'full',
                        false,
                            ['class' => $class_name]
                        );
                    }
                    if (!empty($box['image--mobile'])) {
                        $class_name = $is_image_aline ? 'image' : 'image image--mobile';
                        echo wp_get_attachment_image(
                            $box['image--mobile'],
                            'full',
                            false,
                            ['class' => $class_name]
                        );
                    }
                    //include '../content/layouts/image.php';
                    break;
                default: {} break;
            }
        }
    endif;
}