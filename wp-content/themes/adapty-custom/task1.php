<?php
/**
 * The template for task 1
 *
 * Template Name: Task 1
 * Template Post Type: page
 *
 * @package adapty-custom
 */

get_header();
?>

    <main id="primary" class="site-main">
        <?php
        while ( have_posts() ) :
            the_post();
            the_content();
        endwhile; // End of the loop.
        ?>
    </main><!-- #main -->

<?php
//get_footer();
