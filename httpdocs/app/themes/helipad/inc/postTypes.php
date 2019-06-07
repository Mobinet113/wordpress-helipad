<?php
/*
    This file contains all the custom post types for the site
*/

new postTypes();

class postTypes
{

    function __construct()
    {
        add_action('init', array($this, 'people'   ));
    }

    function people()
    {
        register_post_type(
            'people',
            array(
            'labels' => array(
            'name' => __('People'),
            'singular_name' => __('Person')
            ),
            'public' => true,
            'has_archive' => true,
            'supports' => array( 'title', 'editor', 'excerpt', 'thumbnail', 'revisions', 'custom-fields' ),
            'taxonomies'  => array( 'category' ),
            'menu_icon'           => 'dashicons-media-text',
            )
        );
    }

}