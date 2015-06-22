<?php

$api_key = '';
$list_id = '';


list (, $datacentre) = explode ('-', $api_key);

$api_endpoint = 'https://' . $datacentre
                           . '.api.mailchimp.com/2.0/lists/subscribe.json';

$json_data
  = json_encode
      (array
        ('apikey'    => $api_key,
         'id'        => $list_id,
         'email'     => array('email'=>htmlspecialchars ($_REQUEST ['email'])),
//         'merge_vars'        => array('FNAME'=>'Davy',
//                                      'LNAME'=>'Jones'),
         'double_optin'      => false,
         'update_existing'   => true,
         'replace_interests' => false,
         'send_welcome'      => false));

$result
  = file_get_contents
     ($api_endpoint,
      null,
      stream_context_create
        (array
          ('http'
              => array
                   ('protocol_version' => 1.1,
                    'user_agent'  => 'PHP-MCAPI/2.0',
                    'method'      => 'POST',
                    'header'      => "Content-type: application/json\r\n".
                                     "Connection: close\r\n" .
                                     "Content-length: " . strlen ($json_data)
                                                        . "\r\n",
                    'content'     => $json_data))));


if ($result == false)
  print_r (json_encode (false));
else
  print_r ($result);

?>
