let datos_mdp=
[
 {
 	temp_max_media:26.3,
 	temp_media:19.9,
 	temp_min_media:14.3,
 	//completo solo con algunos datos
 	humedad_relativa:76
 },

 {
 	temp_max_media:25.8,
 	temp_media:18.0,
 	temp_min_media:14.1,
 	humedad_relativa:77
 },

 {
 	temp_max_media:23.7,
 	temp_media:14.6,
 	temp_min_media:12.5,
 	humedad_relativa:79
 },

 {
 	temp_max_media:20.5,
 	temp_media:14.6,
 	temp_min_media:9.1,
 	humedad_relativa:81
 },

  {
 	temp_max_media:16.8,
 	temp_media:11.3,
 	temp_min_media:6.4,
 	humedad_relativa:83
 },

 {
 	temp_max_media:13.8,
 	temp_media:8.5,
 	temp_min_media:4.1,
 	humedad_relativa:84
 },

  {
 	temp_max_media:13.1,
 	temp_media:8.1,
 	temp_min_media:3.8,
 	humedad_relativa:81
 },

 {
 	temp_max_media:14.4,
 	temp_media:8.9,
 	temp_min_media:4.0,
 	humedad_relativa:81
 },

  {
 	temp_max_media:16.0,
 	temp_media:10.5,
 	temp_min_media:5.3,
 	humedad_relativa:80
 },

 {
 	temp_max_media:18.5,
 	temp_media:13.1,
 	temp_min_media:7.6,
 	humedad_relativa:80
 },

  {
 	temp_max_media:21.7,
 	temp_media:15.9,
 	temp_min_media:10.1,
 	humedad_relativa:77
 },

 {
 	temp_max_media:24.4,
 	temp_media:18.5,
 	temp_min_media:12.7,
 	humedad_relativa:76
 }
]

function promedio_de_variables (tabla_de_datos){

	let temp_max_aux=0;
	let temp_min_aux=0;
	let hum_rel_aux=0;

	for (var i = 0; i < tabla_de_datos.length; i++) {
		
		temp_max_aux=temp_max_aux+tabla_de_datos[i].temp_max_media;
		temp_min_aux=temp_min_aux+tabla_de_datos[i].temp_min_media;
		hum_rel_aux=hum_rel_aux+tabla_de_datos[i].humedad_relativa;

	}

	let temp_max_anual_prom=temp_max_aux/tabla_de_datos.length;
	let temp_min_anual_prom=temp_min_aux/tabla_de_datos.length;
	let hum_rel_anual_prom=hum_rel_aux/tabla_de_datos.length;

	let array_final=[temp_max_anual_prom, temp_min_anual_prom, hum_rel_anual_prom];

	return array_final;
}

let array_de_promedios=promedio_de_variables(datos_mdp);


console.log("La temperatura máxima promedio anual de Mar del plata es ", array_de_promedios[0].toFixed(1),"°C, la temperatura mínima promedio anual es ", array_de_promedios[1].toFixed(1), "°C y la humedad relativa promedio es ", array_de_promedios[2].toFixed(2),"%");