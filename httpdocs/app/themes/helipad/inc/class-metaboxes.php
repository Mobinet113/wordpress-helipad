<?php
/**
 * This file contains all the metaboxes for the site
 *
 * @package Helipad
 */

new Metaboxes();

/**
 * The class with methods to setup our custom Metaboxes within this theme.
 * Class Metaboxes
 */
class Metaboxes {

	/**
	 * The unique metabox prefix
	 *
	 * @var string
	 */
	private $prefix = '_cmb2_';

	/**
	 * Construct the Metaboxes class
	 * Metaboxes constructor.
	 */
	public function __construct() {
		add_action( 'cmb2_admin_init', array( $this, 'cmb2_home' ) );
	}

	/**
	 * Home Page Metaboxes
	 */
	public function cmb2_home() {

		$cmb = new_cmb2_box(
			array(
				'id'           => $this->prefix . 'home_metabox',
				'title'        => __( 'Home Page Details', 'cmb2' ),
				'object_types' => array(
					'page',
				), // Post type.
				'show_on'      => array(
					'key'   => 'front-page',
					'value' => '',
				),
				'context'      => 'normal',
				'priority'     => 'high',
				'show_names'   => true,
			)
		);

		$cmb->add_field(
			array(
				'name' => 'Hero Strap Line',
				'desc' => 'The main strap line which appears in the hero (splash)',
				'type' => 'wysiwyg',
				'id'   => $this->prefix . 'home_hero_strapline',
			)
		);

	}

}
