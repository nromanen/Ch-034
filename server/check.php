<?php
include_once "ResponseError.php";

// database emulation
$login  = ['gnome', 'superman','butterfly'];
$email  = ['gnome@gmail.com', 'i_am_man@mail.ru','easy.fly@yandex.ru'];

var_dump($_POST);

//$db   = (isset($_POST['login']))?$login:((isset($_POST['email']))?$email:'');
//$data = (isset($_POST['login']))?$_POST['login']:((isset($_POST['email']))?$_POST['email']:'');


$response = new ResponseError(ResponseError::STATUS_UNPROCESSABLE_ENTITY);
$response->addMessage('first_name', 'is required');
$response->addMessage('telephone', 'should not exceed 12 characters');
$response->addMessage('telephone', 'is not in the correct format');
if(!empty($data)){
	if(in_array($data, $db)){ 
		echo "false";
	}
	else{  
		echo "true";		
	}	 	
}
else{
   echo "true";
}

?>