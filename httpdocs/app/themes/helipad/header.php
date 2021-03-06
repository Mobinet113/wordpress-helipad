<?php
/**
 * The header for our theme.
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package Helipad
 * @author Benjamin Roffe
 */

?>

<!DOCTYPE html>
<html <?php language_attributes(); ?> lang="en">
<head>
    <meta charset="<?php bloginfo( 'charset' ); ?>">

    <meta name="theme-color" content="#F44336">
    <meta name="msapplication-navbutton-color" content="#F44336">
    <meta name="apple-mobile-web-app-status-bar-style" content="#F44336">

    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="profile" href="http://gmpg.org/xfn/11">

    <meta name="description" content="<?php bloginfo( 'description' ); ?>">

	<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>

<div id="page" class="site">
    <header id="masthead" class="site-header" role="banner">
		<?php get_template_part( 'template-parts/layout/layout', 'main-nav' ); ?>
    </header>
