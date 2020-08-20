let texto_prueba="Mar del Plata es una ciudad ubicada en el sudeste de la provincia de Buenos Aires, Argentina, sobre la costa del mar argentino. Es la cabecera del partido de General Pueyrredón, un importante puerto y balneario y la segunda urbe de turismo más importante del país tras Buenos Aires, ya que en época de verano su población puede aumentar en alrededor de un 300 %, por lo que cuenta con una gran oferta de infraestructura de hoteles. La autovía 2 la enlaza tras 404 km con Buenos Aires y está ubicada a 365 km de La Plata. Fue fundada con su nombre actual el 10 de febrero de 1874 por Patricio Peralta Ramos, en una estancia de su propiedad, sobre la base de la segunda de las tres extintas misiones jesuitas de la Pampa, fundadas en la segunda mitad del siglo XVIII, denominada Nuestra Señora del Pilar de Puelches, que más tarde recibió el nombre de «Puerto de la Laguna de los Padres». Las principales industrias son la pesquera, la turística y la textil. La pesca, actividad principal del puerto, se complementa también con barcos petroleros y cerealeros. La ciudad cuenta también con una base naval de submarinos. Entre la gran variedad de industrias, se destacan también las derivadas de la horticultura, la construcción, la metalúrgica y la mecánica. La ciudad cuenta con un complejo deportivo que fue subsede del Mundial de Fútbol 1978,2​sede de los Juegos Panamericanos de 1995 y donde se jugó la final de la Copa Davis 2008. El Club Atlético Aldosivi y el Club Atlético Alvarado son los equipos de fútbol más populares que representan a la ciudad. Además, es conocida por su calidad en el básquetbol, donde el Club Atlético Peñarol y el Club Atlético Quilmes representan a este deporte a nivel nacional.";


function extraerPalabrasPorInicial (texto){

let texto_en_array=texto.split(' '); //convierto el texto en un array en el que cada elemento es una palabra

let array_n=[];
let array_d=[];
let array_a=[];
let array_s=[];

let j=0;
let k=0;
let l=0;
let m=0;

//al hacer el array, algunas palabras quedan con la coma y el punto al final, por lo que a continuación elimino esos caracteres
for (var i = 0 ; i < texto_en_array.length ; i++) {
	
	if (texto_en_array[i].substr(-1,1)==","  || texto_en_array[i].substr(-1,1)==".") {

		texto_en_array[i]=texto_en_array[i].slice(0,-1);
	}
}

//reccorro el array y guardo en arrays especiales para cada letra, pensado para que el array final esté ordenado
//podría haber planteado un solo if con todas las condiciones y el array final desordenado
for (var i = 0 ; i < texto_en_array.length ; i++) {

	if (texto_en_array[i].substring(0,1)=='n' || texto_en_array[i].substring(0,1)=='N') {

		array_n[j]=texto_en_array[i];
		j=j+1;
	}

	if (texto_en_array[i].substring(0,1)=='d' || texto_en_array[i].substring(0,1)=='D') {

		array_d[k]=texto_en_array[i];
		k=k+1;
	}

	if (texto_en_array[i].substring(0,1)=='a' || texto_en_array[i].substring(0,1)=='A') {

		array_a[l]=texto_en_array[i];
		l=l+1;
	}

	if (texto_en_array[i].substring(0,1)=='s' || texto_en_array[i].substring(0,1)=='S') {

		array_s[m]=texto_en_array[i];
		m=m+1;
	}

}
//concateno el array
let array_final=array_n.concat(array_d, array_s, array_a);
return array_final;


}

console.log(extraerPalabrasPorInicial(texto_prueba));
