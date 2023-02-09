<?php
add_action('wp_ajax_nopriv_get_api_keys_ajax', 'get_api_keys_ajax');
add_action('wp_ajax_get_api_keys_ajax', 'get_api_keys_ajax');

function get_api_keys_ajax()
{

//  $rapid_api_key = $_POST['rapidApiKey'];
 //  $email_api_key = $_POST['emailApiKey'];

 // INSERTING KEYS
 $rapid_api_key = get_option('rapid_api_key');
 $email_api_key = get_option('email_api_key');

 $response = [
  'rapidApiKey' => $rapid_api_key,
  'emailApiKey' => $email_api_key
 ];

 wp_send_json_success($response);

 wp_die();
}
