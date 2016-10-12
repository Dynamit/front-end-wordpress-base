<?php
  /**
   * Template for a single post.
   */

get_header(); ?>

  <?php if( have_posts() ) : while ( have_posts() ) : the_post(); ?>

    <?php the_title(); ?>

    <?php the_content(); ?>

    <?php comments_template(); ?>

  <?php endwhile; ?>

  <?php else : ?>

  <?php endif; ?>

<?php get_sidebar(); ?>
<?php get_footer(); ?>
