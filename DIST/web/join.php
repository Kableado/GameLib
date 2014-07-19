<?php

// split -b 1024 -a 4 -d game.js game.js
$filelist=array();
$fileout="game.js";
for($i=0;$i<564;$i++){
	$filelist[]=sprintf("game.js%04d",$i);
}

// Quitar el limite de tiempo
set_time_limit(0);

// Fusionar ficheros
$out=fopen($fileout,"wb") or die("error creating/opening merged file");
foreach($filelist as $file){
	$size=filesize($file);
	$in=fopen($file,"rb") or die("error opening file");
	$data=fread($in, $size) or die("error reading file");
	fclose($in);
	fwrite($out,$data,$size) or die("error writing to merged file");
}
fclose($out);


// Limpiar
foreach($filelist as $file){
	unlink($file);
}
unlink("join.php");

?>
<html>
<body>
<h1>OK!</h1>
</body>
</html>