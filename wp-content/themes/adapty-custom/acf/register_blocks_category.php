<?php
/**
 * Registration Blocks Category for adapty blocks
 *
 * @author Vladimir Mihalevich <mihalevich.dev@gmail.com>
 */
function adapty_blocks_category($categories, $post): array
{
    array_unshift($categories, [
        'slug' => 'adapty',
        'title' => 'Adapty Constructor',
    ]);

    return $categories;
}
add_filter( 'block_categories_all', 'adapty_blocks_category', 10, 2);