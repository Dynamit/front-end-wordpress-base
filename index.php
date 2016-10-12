<?php
/**
 * The template for the Index, or blog roll.
 */

get_header(); ?>

  <?php if ( have_posts() ) : ?>

    <?php while ( have_posts() ) : the_post(); ?>

      <?php the_title(); ?>

      <?php the_excerpt(); ?>

    <?php endwhile; ?>

  <?php else : ?>

  <?php endif; ?>


<?php get_sidebar(); ?>
<?php get_footer(); ?>
