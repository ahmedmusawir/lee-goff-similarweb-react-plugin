<?php
 // Register the settings
 function custom_settings_page()
 {
  add_menu_page(
   'Custom Settings',
   'Custom Settings',
   'manage_options',
   'custom-settings',
   'custom_settings_page_html',
   null,
   99
  );

  add_action('admin_init', 'custom_settings_init');
 }

 add_action('admin_menu', 'custom_settings_page');

 // Custom html page
 function custom_settings_page_html()
 {
  // Double check user capabilities
  if (!current_user_can('manage_options')) {
   return;
  }
 ?>
<div class="wrap">
  <h1><?php esc_html_e(get_admin_page_title());?></h1>
  <p><?php esc_html_e('Some content.', 'wpplugin');?></p>
  <div id="REACT-CONTENT"></div>
</div>
<?php
 }

 // Create Custom Global Settings
 function custom_settings_init()
 {

  // Register a new setting for "custom-settings" page

  register_setting('custom-settings-group', 'firstname');

  // Register a new section in the "custom-settings" page

  add_settings_section(

   'section-one',

   __('Section One', 'textdomain'),

   null,

   'custom-settings'

  );

  // Register a new field in the "section-one" section, inside the "custom-settings" page

  add_settings_field(

   'firstname', // as of WP 4.6 this value is used only internally

   // use $args' label_for to populate the id inside the callback

   __('First Name', 'textdomain'),

  function () {?> <input type="text" name="firstname" value="<?php echo get_option('firstname'); ?>" /><?php },

   'custom-settings',

   'section-one'

 );}
