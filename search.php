<?php
/**
 * The template for displaying Search Results pages.
 */

get_header(); ?>


  <?php if ( have_posts() ) : ?>

    <header class="page-header">
        <h1 class="page-title"><?php printf( __( 'Search Results for: %s', 'shape' ), '<span>' . get_search_query() . '</span>' ); ?></h1>
    </header>

    <?php while ( have_posts() ) : the_post(); ?>

      <?php the_title(); ?>

      <?php the_excerpt(); ?>

    <?php endwhile; ?>

  <?php else : ?>

  <?php endif; ?>


<?php get_sidebar(); ?>
<?php get_footer(); ?>
