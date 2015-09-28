<?php

// database emulation
$login  = ['gnome', 'superman','butterfly'];
$email  = ['gnome@gmail.com', 'i_am_man@mail.ru','easy.fly@yandex.ru'];

$db   = (isset($_POST['login']))?$login:((isset($_POST['email']))?$email:'');
$data = (isset($_POST['login']))?$_POST['login']:((isset($_POST['email']))?$_POST['email']:'');

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