<?php
/**
 * Sections Block Template.
 *
 * @param   array $block The block settings and attributes.
 * @param   string $section The block inner HTML (empty).
 * @param   bool $is_preview True during AJAX preview.
 * @param   (int|string) $post_id The post ID this block is saved to.
 *
 * @var $block
 */

include_once (get_template_directory() . '/template-parts/blocks/content/layouts/view.php');

$_ = 'vm-sections';
$_fc = '_vm-fc';
$data = [];

$collection = get_field($_);
$data['left'] = $collection['left' . $_fc];
$data['right'] = $collection['right' . $_fc];

// Create id attribute allowing for custom "anchor" value.
$id = 'section-' . $block['id'];
if( !empty($block['anchor']) ) {
    $id = $block['anchor'];
    $data['id'] = $id;
}

// Create class attribute allowing for custom "className" and "align" values.
$data['classes'] = [];
$data['classes'][] = 'section';
$data['classes'][] = 'a-recurring-section';

if ( !empty($block['className']) ) {
    $data['classes'][] = $block['className'];
}
if ( !empty($block['align']) ) {
    $data['classes'][] = 'align--' . $block['align'];
}
if ( !empty($block['align_content']) ) {
    $data['classes'][] = 'align-content--' . $block['align_content'];
}
if ( !empty($collection['inverse-on-mobile']) ) {
    $data['classes'][] = 'inverse-on-mobile';
}

$data['classes_attr'] = !empty($data['classes']) ? 'class="' . implode(' ', $data['classes']) . '"' : '';

// $is_one_column = str_contains($data['classes'], "is-style-full");
$is_one_column = in_array("is-style-full", $data['classes']);

?>
<section id="<?= $data['id'] ?>" <?= $data['classes_attr'] ?>>
    <div class="a-recurring-block">
        <?php if ($is_one_column) : ?>
            <div class="a-recurring-block--full">
                <?php view($data['left']); ?>
                <?php view($data['right']); ?>
            </div>
        <?php else : ?>
            <div class="a-recurring-block--left">
                <?php view($data['left']); ?>
            </div>
            <div class="a-recurring-block--right">
                <?php view($data['right']); ?>
            </div>
        <?php endif; ?>
    </div>
</section>
