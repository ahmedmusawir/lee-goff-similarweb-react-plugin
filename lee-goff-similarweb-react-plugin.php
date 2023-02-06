<?php
/*
Plugin Name: Lee Goff Lead Calculator Plugin
Plugin URI: https://cyberizegroup.com/
Description: This can be used as plugin dev starter kit
Version: 1.0
Author: The Moose
Author URI: https://linkedin.com/ahmedmusawir
License: GPLv2 or later
Text Domain: cyberizeframework
 */

// If this file is called directly, abort.
if (!defined('WPINC')) {
 die;
}

// THE FOLLOWING VARIABLE NEEDS TO BE CHANGED TO SOMETHIGN UNIQUE FOR EACH PLUGIN
define('LEE_GOFF_REACT_PLUGIN_URL', plugin_dir_url(__FILE__));

/**
 * ALL CSS AND JS SCRIPTS
 */
// Enqueue Plugin CSS
include plugin_dir_path(__FILE__) . 'includes/cyberize-styles.php';

// Enqueue Plugin JavaScript
include plugin_dir_path(__FILE__) . 'includes/cyberize-scripts.php';

/*
 * THE CALCULATOR CODE
 */

// Removing & Replacing Default Welcome Widgets
include plugin_dir_path(__FILE__) . 'includes/react-app-shortcode.php';