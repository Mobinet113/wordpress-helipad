<?php
/**
 * The header for our theme.
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package Helipad
 */
?>
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
  <meta charset="<?php bloginfo('charset'); ?>">

  <meta name="theme-color" content="#F44336">
  <meta name="msapplication-navbutton-color" content="#F44336">
  <meta name="apple-mobile-web-app-status-bar-style" content="#F44336">

  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="profile" href="http://gmpg.org/xfn/11">

  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
        integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">

  <meta name="description" content="<?php bloginfo('description'); ?>">


  <?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>

<div id="page" class="site">
  <header id="masthead" class="site-header" role="banner">
    <?php get_template_part('template-parts/layout/layout', 'main-nav'); ?>
  </header>
