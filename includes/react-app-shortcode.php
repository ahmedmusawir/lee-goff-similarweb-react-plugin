<?php
 /*
 PROPERTY LIST DISPLAY SHORTCODE
  */

 // If this file is called directly, abort.
 if (!defined('WPINC')) {
  die;
 }

 /**
  *
  * Adding Custom Shortcode for Property or any CPT list
  *
  */

 function lee_goff_lead_plugin($atts)
 {

  // $atts = shortcode_atts(

  //  array(

  //   'width' => 'w-100',
  //   'align' => 'center'

  //  ),

  //  $atts
  // );

  // extract($atts);

  ob_start(); // OUTPUT BUFFERING

 ?>

<main class="LEE-SHORTCODE">

  <?php
   include plugin_dir_path(__FILE__) . 'views/react-app-view.php';
   ?>

</main>


<?php

  $module_contents = ob_get_contents();

  ob_end_clean();

  return $module_contents;
 }

add_shortcode('lee_goff_lead_calculator', 'lee_goff_lead_plugin');