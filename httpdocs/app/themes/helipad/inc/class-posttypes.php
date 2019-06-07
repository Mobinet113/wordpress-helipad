<?php
/**
 * This file contains all our methods to create custom post types within the Helipad theme
 *
 * @package Helipad
 */

new PostTypes();

/**
 * Class containing all our custom post types.
 * Class PostTypes
 */
class PostTypes {

	/**
	 * Construct the post type class.
	 * postTypes constructor.
	 */
	public function __construct() {
		add_action( 'init', array( $this, 'people' ) );
	}

	/**
	 * Register the People custom post type.
	 */
	public function people() {
		register_post_type(
			'people',
			array(
				'labels'      => array(
					'name'          => __( 'People' ),
					'singular_name' => __( 'Person' ),
				),
				'public'      => true,
				'has_archive' => true,
				'supports'    => array( 'title', 'editor', 'excerpt', 'thumbnail', 'revisions', 'custom-fields' ),
				'taxonomies'  => array( 'category' ),
				'menu_icon'   => 'dashicons-media-text',
			)
		);
	}

}
