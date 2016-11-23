<?php
/*
Plugin Name: Hunt Issue
Plugin URI:  https://github.com/arnaudmanaranche/Hunt_Issue
Description: Hunt Issue is a WordPress plugin. You will be able to create new issues, fixe it and clear all completed issues !  
Version:     1.0
Author:      Arnaud Manaranche
Author URI:  https://github.com/arnaudmanaranche
License:     GPL2
License URI: https://www.gnu.org/licenses/gpl-2.0.html
Text Domain: test
*/

defined( 'ABSPATH' )
 or die ( 'No direct load !' );

define( 'HuntDIR',  plugin_dir_path( __FILE__ ) );
define( 'HuntURL',  plugin_dir_url( __FILE__ ) );

/* Add a new tab in the admin side menu */
function tab_huntissue() {
  add_menu_page( 
  	// Page title
  	__( 'Hunt Issue', 'test' ), 
  	// menu title
  	__( 'Hunt Issue', 'test' ), 
  	// capa
  	'manage_options', 

  	'huntissue', 
  	// function
  	'hunt_issue', 
  	'dashicons-hammer'
  	);
}

add_action( 'admin_menu', 'tab_huntissue' );

/* Include */

function hunt_issue(){

  wp_register_style('css', plugins_url('css/style.css',__FILE__));
  wp_enqueue_style('css');
  wp_register_script( 'firebase', plugins_url('js/firebase.js',__FILE__ ));
  wp_enqueue_script('firebase');
  wp_register_script( 'script', plugins_url('js/main.js',__FILE__ ));
  wp_enqueue_script('script');
 require_once ( HuntDIR . '/app/view/index.php' );

}

function translate_ht() {
    load_plugin_textdomain( 
    	'test', 
    	false, 
    	dirname( plugin_basename( __FILE__ ) ) . '/languages/' 
    );
}

add_action( 'plugins_loaded', 'translate_ht' );