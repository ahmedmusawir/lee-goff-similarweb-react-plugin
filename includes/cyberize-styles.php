<?php
// REPLACE THE FOLLOWING CONSTANT WHEN STARTING A NEW PLUGIN
// LEE_GOFF_REACT_PLUGIN_URL
// ALSO UPDATE THE FOLLOWING PREFIX WHEN STARTING A NEW PLUGIN
$PREFIX = 'LEE_GOFF';
define('BACKEND_STYLE_ID', $PREFIX . '_backend');
define('FRONTEND_STYLE_ID', $PREFIX . '_frontend');

// Conditionally load CSS on plugin settings pages only
add_action('admin_enqueue_scripts', function ($hook) {

 // LOADING MAIN PLUGIN ADMIN SIDE STYLES

 wp_register_style(
  BACKEND_STYLE_ID,
  LEE_GOFF_REACT_PLUGIN_URL . 'admin/assets/dist/css/admin.min.css',
  [],
  time()
 );

 // ENABLE BACKEND ADMIN STYLES BY UNCOMMENTING THE FOLLOWING LINE
 wp_enqueue_style(BACKEND_STYLE_ID);
});

// Load CSS on the frontend
add_action('wp_enqueue_scripts',

 function () {

  // LOADING CUSTOM FRONEND STYLES
  wp_register_style(
   FRONTEND_STYLE_ID,
   LEE_GOFF_REACT_PLUGIN_URL . 'frontend/assets/dist/css/frontend.min.css',
   [],
   time()
  );

  wp_enqueue_style(FRONTEND_STYLE_ID);
 }, 100);