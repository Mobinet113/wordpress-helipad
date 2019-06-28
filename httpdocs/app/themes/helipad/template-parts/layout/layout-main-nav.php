<?php
/**
 * This file contains our layout template for the main navigation, normally found in the header
 *
 * @package Helipad
 */

?>

<nav id="main-nav" class="container-fluid">
  <div class="row">
    <div class="logo col-2">
      <a href="/">
        <img src="<?php echo esc_html( get_header_image() ); ?>"
             alt="<?php echo esc_attr( get_bloginfo( 'title' ) ); ?>"/>
      </a>
    </div>

    <div class="menu col-10">
      <?php wp_nav_menu(); ?>
    </div>
  </div>
</nav>

