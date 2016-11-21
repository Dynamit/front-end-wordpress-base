<?php

  // Custom Post Types
  // require( 'inc/cpt/[FILENAME].php' );

  // Custom Fields
  // require( 'inc/custom-fields/[FIELD-GROUP-NAME].php' );

  add_theme_support( 'post-thumbnails' );

  add_action( 'wp_enqueue_scripts', 'initialize_scripts_styles' );
  function initialize_scripts_styles() {
  	wp_enqueue_style( 'theme-style', get_stylesheet_directory_uri() . '/assets/styles/main.css' );

  	wp_enqueue_script( 'main', get_stylesheet_directory_uri() . '/assets/js/main.js', array( 'jquery' ) );
  }

  add_filter( 'wp_default_scripts', 'dequeue_jquery_migrate' );
  function dequeue_jquery_migrate( &$scripts ) {
  	if ( ! is_admin() ) {
  		$scripts->remove( 'jquery' );
  		$scripts->add( 'jquery', false, array( 'jquery-core' ), '1.10.2' );
  	}
  }

  /*
    Disable WordPress XML-RPC
    This is rarely necessary to have enabled and is the cause of many DDoS attacks.
   */
  add_filter('xmlrpc_enabled', '__return_false');

?>
