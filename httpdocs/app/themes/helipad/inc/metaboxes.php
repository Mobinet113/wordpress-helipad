<?php
/*
	This file contains all the metaboxes for the site
*/

new metaboxes();

class metaboxes{

	private $prefix = '_cmb2_';

	function __construct(){
		add_action( 'cmb2_admin_init', array( $this, 'cmb2_home' ) );
	}

	/**
	 * Home Page Metaboxes
	 */
	function cmb2_home() {

		$cmb = new_cmb2_box( array(
		    'id'            => $this->prefix . 'home_metabox',
		    'title'         => __( 'Home Page Details', 'cmb2' ),
		    'object_types'  => array( 'page', ), // Post type
        'show_on'       => array( 'key' => 'front-page', 'value' => '' ),
		    'context'       => 'normal',
		    'priority'      => 'high',
		    'show_names'    => true,
		) );

    $cmb->add_field( array(
      'name' => 'Hero Strap Line',
      'desc' => 'The main strap line which appears in the hero (splash)',
      'type' => 'wysiwyg',
      'id'   => $this->prefix . 'home_hero_strapline'
    ) );

  }


}