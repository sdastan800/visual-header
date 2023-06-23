<?php
/**
 * Plugin Name: Visual Header
 * Description: You can builder Header and allows you to display a group of mixed content in a responsive and compatible Header.
 * Version: 1.0
 * Author: Dastan
 * Text Domain: visual-header
 * Domain Path: /languages/ 
/* Plugin Framework Version Check */
 
 if( ! function_exists( 'visualheader_install' ) ) {
function visualheader_install() {

     
            do_action( 'visualheader_init' );
}
 
add_action( 'plugins_loaded', 'visualheader_install', 1 );
}

 
if( ! function_exists( 'visualheader_constructor' ) ) {
    function visualheader_constructor() {

        load_plugin_textdomain( 'visualheader', false, dirname( plugin_basename( __FILE__ ) ) . '/languages/' );
 
    }
}
add_action( 'visualheader_init', 'visualheader_constructor' );
/*************************************************************************************************************************************************************************
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 															VISUALHEADER_PATH
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------
**************************************************************************************************************************************************************************/ 
if( !defined('VISUALHEADER_PATH') ){
	define( 'VISUALHEADER_PATH', plugin_dir_path(__FILE__) );
}
if( !defined('VISUALHEADER_DIR') ){
	define( 'VISUALHEADER_DIR', plugin_dir_url(__FILE__)  );
}	
if( !defined('VISUALHEADER_FILE') ){
	define( 'VISUALHEADER_FILE', dirname( __FILE__ ) );
}	
/*************************************************************************************************************************************************************************
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 															Registers Custom Slider Post Type
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------
**************************************************************************************************************************************************************************/  
add_action( 'init', 'visualheader_post_type' );
if( ! function_exists( 'visualheader_post_type' ) ) {

function visualheader_post_type() {
	$labels = array(
		'name' 					=> __('Header Builder','visual-header'),
		'singular_name'			=> __('Header Builder','visual-header'),
		'add_new'				=> __('Add New','visual-header'),
		'add_new_item'			=>__('Add New Header Builder','visual-header'),
		'edit_item'				=> __('Edit Header Builder','visual-header'),
		'new_item'				=> __('New Header Builder','visual-header'),
		'view_item'				=> __('View Header Builder','visual-header'),
 		'all_items'				=>__('All Header Builder','visual-header'),
 		'search_items'			=> __('Search Header Builder','visual-header'),
		'not_found'				=> __('Header Builder not found','visual-header'),
		'not_found_in_trash'	=> __('The Header Builder was found in the trash','visual-header'),
		'parent_item_colon'		=> '',
		'menu_name'				=> __('Header Builder','visual-header')
	);
	
	$args = array(
		'labels'				=> $labels,
		'public'              => true,
		'show_ui'             => true,
		'show_in_menu'        => false,
		'show_in_nav_menus'   => false,
		'exclude_from_search' => true,
		'capability_type'     => 'post',
		'hierarchical'        => false,
		'menu_position'			=> null,
		'supports' => array( 'title' )
	); 

	register_post_type( 'visualheader', $args );
}
}
 
/*************************************************************************************************************************************************************************
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 															Text
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------
**************************************************************************************************************************************************************************/ 
if( ! function_exists( 'visualheader_text' ) ) {
function visualheader_text() {
 	return array(
		'saved'					=>	__('Header is Saved','visual-header'), 
		'visualheader_header'				=>	__('Header','visualheader'), 
		'defaulted'				=>	__('Header is Defaulted','visual-header'), 
		'imported'				=>	__('Header is Imported','visual-header'), 
		'choose'				=>	__('Choose Image','visualheader'), 
		'remove'				=>	__('Remove','visualheader'),
		'uploader_button'		=>	__('Use This Image','visual-header'), 
		'empty'					=>	__('Name is empty!','visual-header'), 
		'change_column'			=>	__('Change the Column','visual-header'), 
		'retry'					=>	__('Name already exist!','visual-header'), 
		'agree'					=>	__('Do you agree?','visual-header'), 
		'error'					=>	__('Error','visual-header'), 
		'general'				=>	__('General','visual-header'), 
		'cancel'				=>	__('Cancel','visual-header'), 
		'update'				=>	__('Update','visual-header'), 
		'addelement'			=>	__('Add Element','visual-header'), 
		'option'			 	=>	__('Options','visualheader'), 
		'export_header'			=>	__('Export Header','visual-header'), 
		'export_json'			=>	__('Copy The Code From The Following Text Area And Save It. You Will Be Able To Import It Later With Our Import Function In The Headers Manager.','visual-header'), 
		'visualheader_import'				=>	__('Import','visual-header'), 
		'import_header'			=>	__('Import Header','visual-header'), 
		'import_json'			=>	__('Paste Your Json Header Export Data Here And Click "Import"','visual-header'),
		'import_library'		=>	__('Import of the Library','visual-header'), 
	);
 }
}
/*************************************************************************************************************************************************************************
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 														Admin  Enqueue scripts
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------
**************************************************************************************************************************************************************************/ 

add_action('admin_enqueue_scripts', 'visualheader_enqueue');
add_action('customize_controls_enqueue_scripts', 'visualheader_enqueue');
if( ! function_exists( 'visualheader_enqueue' ) ) {
function visualheader_enqueue($hook) {
	global $pagenow,$post; 
   	$var='1.0';
	$min ='';
 
  	if (($pagenow == 'post.php' && get_post_type() == 'visualheader') ) {
 		
			wp_enqueue_style('visualvisualheader', VISUALHEADER_DIR .'assets/css/builder.css',$var);
		 
		 
			wp_enqueue_script('visualvisualheader', VISUALHEADER_DIR .'assets/js/builder.js', array('jquery', 'jquery-ui-sortable') ,$var );
			
	 
	   
 	} 
	
 
	wp_enqueue_style('visualheader_hide_customize', VISUALHEADER_DIR .'assets/css/hide_customize.css',$var);
  
	
 
 	  
 }  
}
?>