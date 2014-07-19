/***********************************************
 *    Copyright (c) 2010 Valeriano Alfonso     *
 ***********************************************/
/*
	NOTA DE DOMINIO PUBLICO
	-----------------------
	ImgView es Dominio Publico. Esto significa que se puede hacer con el
	lo que se quiera sin haber ninguna garantia de reembolso o idoneidad.
	Se aprecia que la fuente sea citada.
*/


/*
	Historial de cambios
	--------------------
	1.0 2010-1-3 :
		* Version inicial.
	1.1 2010-1-5 :
		* Corregida necesidad de cargar el script en la seccion head.
		* Funcionalidad basica de album implementada.
	1.2 2010-5-18 :
		* Asimilado de todos los enlaces a imagenes en un album general.
		* Iconos de anterior y siguiente de los albums, nuevos.
*/

/////////////////////////
// Configuracion
//
var imgview_prefix = "";			// Se atoconfigura
var imgview_border = 10;		// Tambien ajustar en el CSS.
var imgview_control_alto = 32;	// Tambien ajustar en el CSS.




///////////////////////
// Globales
//
var imgview_nombre_album="";
var imgview_href_anterior="";
var imgview_href_siguiente="";
var imgview_preloader=false;

/////////////////////////////////////
// ImgView_ShowImage
//

function ImgView_ShowImage(href,is_album){
	var elemFondo = document.getElementById('imgview_fondo');
	var elemImgview = document.getElementById('imgview');
	var elemImgviewControl = document.getElementById('imgview_control');
	var elemImgCargando = document.getElementById('imgview_imgcargando');
	var elemEnlace = document.getElementById('imgview_enlace');
	var elemImg = document.getElementById('imgview_img');
	var elemAnt = document.getElementById('imgview_anterior');
	var elemSig = document.getElementById('imgview_siguiente');
	var preloader;
	var max_horiz, max_vert;
	var ventana_ancho, ventana_alto;
	var pagina_ancho, pagina_alto;
	var pos_horiz = 0, pos_vert = 0;


	if(is_album){
		var enlaces;
		var imgview_RegExp;
		var nombre_temp;
		var i,j;

		// Buscar imagenes anterior y siguientes
		enlaces = document.getElementsByTagName("a");
		for(i=0;i<enlaces.length;i++){
			if(enlaces[i].getAttribute("href")==href &&
				enlaces[i].getAttribute("imgview_albumid")==imgview_nombre_album)
			{
				// Encontrado el actual

				// Buscar Anterior
				imgview_href_anterior="";
				if(i>0){
					j=i-1;
					while(j>=0){
						if(enlaces[j].getAttribute("imgview_albumid")==
							imgview_nombre_album)
						{
							imgview_href_anterior=enlaces[j].getAttribute("href");
							break;
						}
						j--;
					}
				}

				// Buscar Siguiente
				imgview_href_siguiente="";
				if(i<(enlaces.length-1)){
					j=i+1;
					while(j<enlaces.length){
						if(enlaces[j].getAttribute("imgview_albumid")==
							imgview_nombre_album)
						{
							imgview_href_siguiente=enlaces[j].getAttribute("href");
							break;
						}
						j++;
					}
				}
			}
		}
	}



	// Obtener maximos de scroll
	if(window.innerHeight && window.scrollMaxY) {
		max_horiz = document.body.scrollWidth;
		max_vert = window.innerHeight + window.scrollMaxY;
	}else if(document.body.scrollHeight > document.body.offsetHeight){
		// all but Explorer Mac
		max_horiz = document.body.scrollWidth;
		max_vert = document.body.scrollHeight;
	}else{
		// Explorer Mac...would also work in Explorer 6 Strict, Mozilla and Safari
		max_horiz = document.body.offsetWidth;
		max_vert = document.body.offsetHeight;
	}

	// Obtener tamanho de la ventana
	if(window.innerHeight) {
		// Todos excepto Explorer
		ventana_ancho = window.innerWidth;
		ventana_alto = window.innerHeight;
	}else if(document.documentElement && document.documentElement.clientHeight){
		// Explorer 6 Strict
		ventana_ancho = document.documentElement.clientWidth;
		ventana_alto = document.documentElement.clientHeight;
	}else if(document.body){
		// Resto de Explorers
		ventana_ancho = document.body.clientWidth;
		ventana_alto = document.body.clientHeight;
	}

	// HACK: reducir el tamaho de ventana_ancho. Hace que no sobrepase los bordes
	ventana_ancho-=20;

	// Obtener el tamanho de la pagina
	if(max_vert < ventana_alto){
		pagina_alto = ventana_alto;
	}else{
		pagina_alto = max_vert;
	}
	if(max_horiz < ventana_ancho){
		pagina_ancho = ventana_ancho;
	}else{
		pagina_ancho = max_horiz;
	}

	// Obtener posicion del los scrolls
	if( typeof( window.pageYOffset ) == 'number' ) {
		// La mayoria de navegadores
		pos_vert = window.pageYOffset;
		pos_horiz = window.pageXOffset;
	} else if( document.body && ( document.body.scrollLeft || document.body.scrollTop ) ) {
		// Explorer
		pos_vert = document.body.scrollTop;
		pos_horiz = document.body.scrollLeft;
	} else if( document.documentElement && ( document.documentElement.scrollLeft || document.documentElement.scrollTop ) ) {
		// Explorer 6 Strict
		pos_vert = document.documentElement.scrollTop;
		pos_horiz = document.documentElement.scrollLeft;
	}



	// Centrar y hacer visible la imagen de cargando
	if(elemImgCargando){
		elemImgCargando.style.top =
			(pos_vert +
				((ventana_alto - elemImgCargando.height) / 2)) + 'px';
		elemImgCargando.style.left =
			(pos_horiz +
				((ventana_ancho - elemImgCargando.width) / 2)) + 'px';
		elemImgCargando.style.display = 'block';
	}

	// Hacer que el fondo ocupe la pagina y sea visible
	elemFondo.style.height = (pagina_alto + 'px');
	elemFondo.style.display = 'block';

	// Carga de la imagen
	imgview_preloader=new Image();
	imgview_preloader.onload=function(){

		// Mostrar imgview, necesario para que los tamanhos sean correctos
		elemImgview.style.display = 'block';

		// Mostrar/Ocultar control de albums
		if(is_album){
			elemImgviewControl.style.display = 'block';
			ventana_alto-=imgview_control_alto;
			if(imgview_href_anterior.length==0){
				elemAnt.style.display = 'none';
			}else{
				elemAnt.style.display = 'block';
			}
			if(imgview_href_siguiente.length==0){
				elemSig.style.display = 'none';
			}else{
				elemSig.style.display = 'block';
			}
		}else{
			elemImgviewControl.style.display = 'none';
		}

		// Establecer la imagen precargada
		elemImg.src = href;
		elemImg.width = imgview_preloader.width;
		elemImg.height = imgview_preloader.height;

		// Ajustar el tamanho de la imagen
		var relacion=elemImg.width/elemImg.height;
		if((elemImg.height+imgview_border*2)>ventana_alto){
			elemImg.height=ventana_alto-imgview_border*2;
			elemImg.width=elemImg.height*relacion;
		}
		if((elemImg.width+imgview_border*2)>ventana_ancho){
			elemImg.width=ventana_ancho-imgview_border*2;
			elemImg.height=elemImg.width/relacion;
		}

		// Centrar imgview
		elemImgview.style.top =
			(pos_vert +
				((ventana_alto - elemImg.height) / 2) - imgview_border) + 'px';
		elemImgview.style.left =
			(pos_horiz +
				((ventana_ancho - elemImg.width) / 2) - imgview_border) + 'px';


		// Oclultar imagen de cargar y mostrar imgview
		if(elemImgCargando) {
			elemImgCargando.style.display = 'none';
		}

		return false;
	}
	imgview_preloader.src = href;
	elemEnlace.href = href;
}









/////////////////////////////////////
// ImgView_Show
//
function ImgView_Show(obj){
	imgview_nombre_album=obj.getAttribute("imgview_albumid");
	if(imgview_nombre_album){
		ImgView_ShowImage(obj.getAttribute("href"),true);
	}else{
		ImgView_ShowImage(obj.getAttribute("href"),false);
	}
}





/////////////////////////////////////
// ImgView_Hide
//
function ImgView_Hide(){
	var elemFondo = document.getElementById('imgview_fondo');
	var elemImgview = document.getElementById('imgview');
	var elemImgCargando = document.getElementById('imgview_imgcargando');
	var elemEnlace = document.getElementById('imgview_enlace');
	elemFondo.style.display = 'none';
	elemImgview.style.display = 'none';
	elemImgCargando.style.display = 'none';
	imgview_preloader.onload=function(){return false;}
	imgview_preloader.src = "";
	elemEnlace.href = "";
}





/////////////////////////////////////
// ImgView_ShowAnterior
//
function ImgView_ShowAnterior(obj){
	if(imgview_href_anterior.length){
		ImgView_ShowImage(imgview_href_anterior,true);
	}
}




/////////////////////////////////////
// ImgView_ShowSiguiente
//
function ImgView_ShowSiguiente(obj){
	if(imgview_href_siguiente.length){
		ImgView_ShowImage(imgview_href_siguiente,true);
	}
}





/////////////////////////////////////
// ImgView_Init
//
// Asociar al evento "onclick" la funcion "ImgView_Show" a los links con rel="imgview".
// Anhadir el markup necesario para mostrar imagenes.
function ImgView_Init(){
	var i;
	var enlaces;
	var scripts;
	var imgview_RegExp;
	var isimage_RegExp;

	if (!document.getElementsByTagName){
		return;
	}

	// HACK: Obtener el path donde de este mismo script
	scripts=document.getElementsByTagName("script");
	imgview_RegExp = /imgview\.js$/i;
	for(i=0;i<scripts.length;i++){
		if(imgview_RegExp.test(scripts[i].getAttribute("src"))){
			imgview_prefix=scripts[i].getAttribute("src").
				replace(imgview_RegExp,"");
		}
	}
	if(imgview_prefix.length<1){
		imgview_prefix=".";
	}



	// Iterar los enlaces
	enlaces = document.getElementsByTagName("a");
	imgview_RegExp = /^imgview\./i;
	isimage_RegExp = /\.gif$|\.jpg$|\.jpeg$|\.png$/i;
	for(i=0;i<enlaces.length;i++){
		link_href=enlaces[i].getAttribute("href");
		if(link_href && isimage_RegExp.test(link_href)){
			link_rel = enlaces[i].getAttribute("rel")
			// Enlace a imagen
			if(link_rel == "imgview"){
				// Imagen Normal
				enlaces[i].onclick =
					function () {
						ImgView_Show(this);
						return false;
					}
			}else{
				if(imgview_RegExp.test(link_rel)){
					// Imagen de Album
					nombre_album=link_rel.replace(imgview_RegExp,"");
					enlaces[i].setAttribute("imgview_albumid",nombre_album);
					enlaces[i].onclick =
						function () {
							ImgView_Show(this);
							return false;
						}
				}else{
					// Anhadir en el album global
					enlaces[i].setAttribute("imgview_albumid","imgview");
					enlaces[i].onclick =
						function () {
							ImgView_Show(this);
							return false;
						}
				}
			}
		}
	}

	// Inyectar el link de la hoja de estilo
	var LinkHoja=document.createElement('link');
	LinkHoja.rel="stylesheet";
	LinkHoja.type="text/css";
	LinkHoja.href=imgview_prefix+"/imgview.css";
	document.getElementsByTagName("head")[0].appendChild(LinkHoja);

	var elemCuerpo = document.body;

	// Inyectar markup del fondo con la animacion de carga
	var elemFondo = document.createElement("div");
	elemFondo.setAttribute('id','imgview_fondo');
	elemFondo.onclick =
		function () {
			ImgView_Hide();
			return false;
		}
	elemFondo.style.display = 'none';
	elemFondo.style.position = 'absolute';
	elemFondo.style.top = '0';
	elemFondo.style.left = '0';
	elemFondo.style.zIndex = '90';
 	elemFondo.style.width = '100%';
	elemCuerpo.insertBefore(elemFondo, elemCuerpo.firstChild);


	var elemImgCargando = document.createElement("img");
	elemImgCargando.src = imgview_prefix+"/cargando.gif";
	elemImgCargando.setAttribute('id','imgview_imgcargando');
	elemImgCargando.style.position = 'absolute';
	elemImgCargando.style.zIndex = '150';
	elemImgCargando.style.display = 'none';
	elemImgCargando.onclick =
		function () {
			ImgView_Hide();
			return false;
		}
	elemCuerpo.insertBefore(elemImgCargando, elemCuerpo.firstChild);

	// Inyectar markup de imgview
	var elemImgview = document.createElement("div");
	elemImgview.setAttribute('id','imgview');
	elemImgview.style.display = 'none';
	elemImgview.style.position = 'absolute';
	elemImgview.style.zIndex = '100';
	elemCuerpo.insertBefore(elemImgview, elemFondo.nextSibling);
	var elemEnlace = document.createElement("a");
	elemEnlace.setAttribute('href','#');
	elemEnlace.setAttribute('id','imgview_enlace');
	elemEnlace.setAttribute('title','Click para cerrar');
	elemEnlace.onclick =
		function () {
			ImgView_Hide();
			return false;
		}
	elemImgview.appendChild(elemEnlace);
	var elemImg = document.createElement("img");
	elemImg.setAttribute('id','imgview_img');
	elemEnlace.appendChild(elemImg);
	var elemImgviewControl = document.createElement("div");
	elemImgviewControl.setAttribute('id','imgview_control');
	elemImgviewControl.style.display = 'none';
	elemImgview.appendChild(elemImgviewControl);


	var elemImgviewAnterior = document.createElement("div");
	elemImgviewAnterior.setAttribute('id','imgview_anterior');
	elemImgviewControl.appendChild(elemImgviewAnterior);
	elemImgviewAnterior.onclick =
		function () {
			ImgView_ShowAnterior(this);
			return false;
		}


	var elemImgviewSiguiente = document.createElement("div");
	elemImgviewSiguiente.setAttribute('id','imgview_siguiente');
	elemImgviewControl.appendChild(elemImgviewSiguiente);
	elemImgviewSiguiente.onclick =
		function () {
			ImgView_ShowSiguiente(this);
			return false;
		}


	// Deshabilitar seleccion de la imagen
	elemImgview.onselectstart=function () {return false;}
	elemImgview.style.MozUserSelect="none";
	elemImg.onselectstart=function () {return false;}
	elemImgview.style.MozUserSelect="none";
}







// Asociar la funcion de inciado al evento "onload"
// sin evitar la ejecucion de lo que pudiera estar antes
var imgview_oldonload = window.onload;
if (typeof(imgview_oldonload)!='function'){
	window.onload = ImgView_Init;
}else{
	window.onload = function(){
		imgview_oldonload();
		ImgView_Init();
	}
}
