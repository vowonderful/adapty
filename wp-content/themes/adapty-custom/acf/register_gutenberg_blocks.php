<?php
/**
 * Registration of ACF Blocks
 * added to the post editing page in the Gutenberg editor.
 *
 * When (and if) there are many blocks,
 * the block registration process can be automated
 * by adding a method to connect all directories from /template-parts/blocks/*.
 *
 * @author Vladimir Mihalevich <mihalevich.dev@gmail.com>
 */
function vm_register_acf_blocks(): void
{
    if ( !function_exists('acf_register_block') )
        return;

    $dirs = get_dirs(get_template_directory() . '/template-parts/blocks');
    foreach ($dirs as $dir) {
//        $block_config = json_decode(file_get_contents($dir . '/block.json'), true);
//        acf_register_block($block_config);
        register_block_type($dir);
    }
}
add_action( 'init', 'vm_register_acf_blocks' );
