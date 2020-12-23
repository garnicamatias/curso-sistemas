/*
	Example: UserView Module // CRUD-Development
	Autor: Matías Gastón Santiago
	Versión: 7.0
	Copyright (C) 2020 - Curso de Desarrollo de Sistemas 
	https://educacion.batan.coop/course/view.php?id=9

	This program is free software: you can redistribute it and/or modify
	it under the terms of the GNU General Public License as published by
	the Free Software Foundation, either version 3 of the License, or
	(at your option) any later version.

	This program is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU General Public License for more details.

	You should have received a copy of the GNU General Public License
	along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

import { ApplicationController } from "./ApplicationController.js"
import { LoginView } from "../login/LoginView.js"
import { LoginModel } from "../login/LoginModel.js"

class ApplicationView
{
	constructor( id, model )
	{
		this.id = id;
		this.innerModel = model;

		this.innerController = new ApplicationController(model, this);


		this.show();

	}


	clear()
	{
		document.getElementById('login').innerHTML = '';
		document.getElementById("navbar").innerHTML = '';
		document.getElementById("sidebar").innerHTML = '';
		document.getElementById("body").innerHTML = '';
	}

	normal()
	{ 	
		this.clear();

		let username= sessionStorage.getItem('username');

        let privilegio = this.innerModel.getPrivilegio(username).then(privilegio => privilegio.json());
        privilegio.then( privilegio => 	{ 
        									let user;
        									switch (privilegio[0].idrol)
								        	{
								        		case '0':
								        		console.log('Hola Admin');
								        		break;

								        		case '1':

								        		user = this.innerModel.getUserDocente(username).then(user => user.json());
								        		this.sidebarDocente(user);

								        		break;

								        		case '2':

								        		user = this.innerModel.getUserAlumno(username).then(user => user.json());
								        		this.sidebarAlumno(user);

								        		break;

								        		default:
								        		console.log('No tiene los privilegios para acceder a la página');
								        	}

								          	this.navbar(user);
											this.body(user);
										});
      
	}

	login()
	{
		this.clear();
		
		let loginModel = new LoginModel();
		let loginView = new LoginView('login',loginModel);
		loginView.show();
		loginView.addEventListener('login', event => this.innerController.onlogin() );
	}


    body(user)
    {
    	user.then(id => {

    	let innerHTML=
    	`
    		<div class="w3-main" style="margin-left:200px">
			<div class="w3-container">
  			<h1>COLEGIO SAN CARLOS</h1>
   			<a id="btnPerfil" class="w3-bar-item w3-button"><h4>Hola ${id[0].nombre}! En el panel de la izquierda podrás
   			seleccionar las acciones que desees realizar en tu cuenta</h4></a>
    		</div>
  			</div>
			</div>
		`;
		document.getElementById("body").innerHTML = innerHTML;});
    }

	sidebarDocente(user)
	{
		user.then( docente =>

		{

		let innerHTML=
		`
		<div class="w3-sidebar w3-bar-block w3-collapse w3-card w3-animate-left w3-grey" id="mySidebar">
  			 <button id="btnClose" class="w3-bar-item w3-button w3-large w3-hide-large">Cerrar &times;</button>
  				<a id="btnInicio" class="w3-bar-item w3-button w3-lightgrey">Inicio</a>
	            <a id="btnCursos" class="w3-bar-item w3-button">Mis Cursos</a>
	          	<a id="btnEstudiantes" class="w3-bar-item w3-button">Estudiantes</a>
	          	<a id="btnCalificaciones" class="w3-bar-item w3-button">Calificaciones</a>
	         	<a id="btnBoletines" class="w3-bar-item w3-button">Boletines</a>
				<a id="btnPerfil" class="w3-bar-item w3-button w3-lightgrey">Perfil</a>
  				<a id="btnLogOut" class="w3-bar-item w3-button w3-lightgrey w3-display-bottomleft">Cerrar Sesión (x)</a>
		</div>
		`;

		document.getElementById("sidebar").innerHTML = innerHTML;

		document.getElementById("btnClose").addEventListener('click', event => this.w3_close() );

		document.getElementById("btnInicio").addEventListener('click', event => this.body(user) );
		document.getElementById("btnCursos").addEventListener('click', event => this.innerModel.getCursos(docente[0].dni).then(response => this.bodyCursos(response.json())));
		document.getElementById("btnEstudiantes").addEventListener('click', event => this.innerModel.getEstudiantes(docente[0].dni).then( response => this.bodyAll(response.json())));
		document.getElementById("btnPerfil").addEventListener('click', event => this.bodyPerfil(user));
		});

	}

	sidebarAlumno(user)
	{
		user.then( alumno =>

	    {
		let innerHTML=
		`
		<div class="w3-sidebar w3-bar-block w3-collapse w3-card w3-animate-left w3-grey" id="mySidebar">
  			 <button id="btnClose" class="w3-bar-item w3-button w3-large w3-hide-large">Cerrar &times;</button>
  				<a id="btnInicio" class="w3-bar-item w3-button w3-lightgrey">Inicio</a>
	            <a id="btnMaterias" class="w3-bar-item w3-button">Mis Materias</a>
	          	<a id="btnCalificaciones" class="w3-bar-item w3-button">Mis Calificaciones</a>
	         	<a id="btnBoletín" class="w3-bar-item w3-button">Boletín</a>
				<a id="btnPerfil" class="w3-bar-item w3-button w3-lightgrey">Perfil</a>
  				<a id="btnLogOut" class="w3-bar-item w3-button w3-lightgrey w3-display-bottomleft">Cerrar Sesión (x)</a>
		</div>
		`;

		document.getElementById("sidebar").innerHTML = innerHTML;

		document.getElementById("btnClose").addEventListener('click', event => this.w3_close() );

		document.getElementById("btnInicio").addEventListener('click', event => this.body(user) );
		document.getElementById("btnMaterias").addEventListener('click', event => this.innerModel.getMaterias(alumno[0].dni).then(response => this.bodyMaterias(response.json())));
		document.getElementById("btnCalificaciones").addEventListener('click', event => this.innerModel.getAllCalificaciones(alumno[0].dni).then( response => this.bodyAllCalificaciones(response.json())));
		document.getElementById("btnPerfil").addEventListener('click', event => this.bodyPerfilAlumno(user));
		});

	} 

	/*sidebarAdmin()
	{
		let innerHTML=
		`
		<div class="w3-sidebar w3-bar-block w3-collapse w3-card w3-animate-left w3-grey" id="mySidebar">
  			 <button id="btnClose" class="w3-bar-item w3-button w3-large w3-hide-large">Cerrar &times;</button>
  				<a id="btnInicio" class="w3-bar-item w3-button w3-lightgrey">Inicio</a>
	            <a id="btnEstudiantes" class="w3-bar-item w3-button">Estudiantes</a>
	          	<a id="btnDocentes" class="w3-bar-item w3-button">Docentes</a>
	         	<a id="btnMaterias" class="w3-bar-item w3-button">Materias</a>
				<a id="btnBoletines" class="w3-bar-item w3-button w3-lightgrey">Boletines</a>
  				<a id="btnLogOut" class="w3-bar-item w3-button w3-lightgrey w3-display-bottomleft">Cerrar Sesión (x)</a>
		</div>
		`;

		document.getElementById("sidebar").innerHTML = innerHTML;

		document.getElementById("btnClose").addEventListener('click', event => this.w3_close() );

		document.getElementById("btnInicio").addEventListener('click', event => this.body() );
		document.getElementById("btnEstudiantes").addEventListener('click', event => this.innerModel.getAllEstudiantes().then(response => this.bodyAllEstudiantes(response.json())));
		document.getElementById("btnDocentes").addEventListener('click', event => this.innerModel.getAllDocentes().then(response => this.bodyAllDocentes(response.json())));
		document.getElementById("btnMaterias").addEventListener('click', event => this.innerModel.getAllMaterias().then(response => this.bodyAllMaterias(response.json())));
		//document.getElementById("btnBoletines").addEventListener('click', event => this.innerModel.getAllBoletines('113').then( response => this.bodyAllBoletines(response.json())));

		return innerHTML;
	}
    */

	navbar(user)
    {
    	user.then(id => {

    	let innerHTML=
    	`
    	<div class="w3-main" style="margin-left:200px">
			<div class="w3-teal">
  				<button id="btnOpen2" class="w3-button w3-teal w3-xlarge w3-hide-large">&#9776;</button>
  			<div class="w3-container">
   			<div class="w3-right-align">
   			<a id="btnPerfil2" class="w3-bar-item w3-button"><h4>${id[0].nombre} ${id[0].apellido}</h4></a>
    		</div>
  			</div>
			</div>
		`;
		document.getElementById("navbar").innerHTML = innerHTML;
		document.getElementById("btnOpen2").addEventListener('click', event => this.w3_open());
		document.getElementById("btnPerfil2").addEventListener('click', event => this.bodyPerfil(user));

		});
    }


	bodyCursos( userArrayPromise)
	{
		userArrayPromise.then( userArray =>
		{
			let innerHTML= 
			`
			<div class="w3-main" style="margin-left:200px">
			<div class="w3-container">
  			<h1>Mis Cursos</h1>
			<table id="misCursos">
			<tr>
				<th>Materia</th>
				<th>Año</th>
				<th>Código</th>
			<tr>

			</div>
			</div>`;

			if ( userArray.length > 0 )
			{
				let i=0;
				for( let user of userArray )
				{
					innerHTML += 
					`<tr id='${user.id_materia + user.nombre}'>
						<td >${user.nombre}</td>
						<td>${user.año}</td>
						<td>${user.id_materia}</td>
						<td>
							<button btnIngresarCurso>Ingresar</button>
						</td>
					<tr>`;

					//document.getElementById('btnIngresarCurso').addEventListener('click', event => this.innerModel.getStudentsBySubject(user.id_materia).then(response => this.bodyMateria('Ingles 1ro', response.json())));

				}
			}
			else
			{
				innerHTML += `<tr><td colspan="4">No hay datos disponibles</td></tr>`;
			};
			//<br><button id="${this.id}btnFirstGrade">Ver Alumnos 1ro</button>

			//Incrustation
			document.getElementById( "body" ).innerHTML = innerHTML;

			//document.getElementById('btnIngresarCurso').addEventListener('click', event => this.innerModel.getStudentsBySubject(user.id_materia).then(response => this.bodyMateria('Ingles 1ro', response.json())));


			document.getElementById("misCursos").addEventListener('click', event =>
			{
				if ( event.target.hasAttribute('btnIngresarCurso') )
					this.innerModel.getAlumnosPorMateria(event).then(response=> this.bodyMateriaIndividual(response.json()));
			});
			});
		
	}

	bodyPerfil( userArrayPromise)
	{
		userArrayPromise.then( userArray =>
		{
			let innerHTML= 
			`
			<div class="w3-main" style="margin-left:200px">
			<div class="w3-container">
  			<h1>Perfil</h1>
			<table id="${this.id}perfil">
			<tr>
				<th>Docente</th>
				<th>DNI</th>
				<th>Nro Celular</th>
				<th>Email</th>
				<th>Domicilio</th>
			<tr>

			</div>
			</div>`;

			if ( userArray.length > 0 )
			{
				for( let user of userArray )
				{
					innerHTML += 
					`<tr>
						<td>${user.nombre} ${user.apellido}</td>
						<td>${user.dni}</td>
						<td>Por implementar</td>
						<td>Por implementar</td>
						<td>Por implementar</td>
					<tr>`
				}
			}
			else
			{
				innerHTML += `<tr><td colspan="4">No hay datos disponibles</td></tr>`;


			};

			innerHTML+= ` </table><br><button id="btnInfoContacto">Editar Información</button>`;

			//Incrustation
			document.getElementById( "body" ).innerHTML = innerHTML;
			//document.getElementById("btnInfoContacto").addEventListener('click', event => ventana modal editar)
			});
		
	}
	
	bodyMaterias(userArrayPromise )
	{
		
		userArrayPromise.then( userArray =>
		{
			let innerHTML= 
			`
			<div class="w3-main" style="margin-left:200px">
			<div class="w3-container">
  			<h1>Mis Materias</h1>
			<table id="misMaterias">
			<tr>
				<th>Materia</th>
				<th>Año</th>
				<th>Código</th>
				<th>Docente</th>
			<tr>

			</div>
			</div>`;

			if ( userArray.length > 0 )
			{
				for( let user of userArray )
				{
					innerHTML += 
					`<tr>
						<td>${user.nombre}</td>
						<td>${user.año}</td>
						<td>${user.id_materia}</td>
						<td>${user.apellido}</td>
						<td>
							<button btnIngresarCurso>Ingresar</button>
						</td>
					<tr>`;

					//document.getElementById('btnIngresarCurso').addEventListener('click', event => this.innerModel.getStudentsBySubject(user.id_materia).then(response => this.bodyMateria('Ingles 1ro', response.json())));

				}
			}
			else
			{
				innerHTML += `<tr><td colspan="4">No hay datos disponibles</td></tr>`;
			};
			//<br><button id="${this.id}btnFirstGrade">Ver Alumnos 1ro</button>
			//Incrustation
			document.getElementById( "body" ).innerHTML = innerHTML;

			//document.getElementById('btnIngresarCurso').addEventListener('click', event => this.innerModel.getStudentsBySubject(user.id_materia).then(response => this.bodyMateria('Ingles 1ro', response.json())));


			document.getElementById("misMaterias").addEventListener('click', event =>
			{
				if ( event.target.hasAttribute('btnIngresarCurso') )
					console.log('hola');
			});
			});

	}

	bodyAll( userArrayPromise )
	{
		userArrayPromise.then( userArray =>
		{
			let innerHTML = 
			`
			<div class="w3-main" style="margin-left:200px">
			<div class="w3-container">
  			<h1>Estudiantes</h1>
			<table id="${this.id}estudiantes">
			<tr>
				<th>Username</th>
				<th>Nombre</th>
				<th>Apellido</th>
				<th>Curso</th>
				<th>Acciones</th>
			<tr>

			</div>
			</div>`;

			if ( userArray.length > 0 )
			{
				for( let user of userArray )
				{
					innerHTML += 
					`<tr>
						<td>${user.login_username}</td>
						<td>${user.nombre}</td>
						<td>${user.apellido}</td>
						<td>${user.curso}</td>
						<td>
							<button btnEditUser>Ver Estudiante</button>
						</td>
					<tr>`
				}
			}
			else
			{
				innerHTML += `<tr><td colspan="4">No hay datos disponibles</td></tr>`;
			};

			innerHTML +=
			`</table>
			<br>
			<button id="${this.id}btnNewUser">Nuevo Usuario</button>
			<button id="${this.id}btnDeleteUserById">Borrar Usuario Puntual</button>`;

			//<br><button id="${this.id}btnFirstGrade">Ver Alumnos 1ro</button>



			//Incrustation
			document.getElementById( "body" ).innerHTML = innerHTML;

			//Controller-Attach (Need to be refactored)
			document.getElementById( this.id + 'btnNewUser').addEventListener('click', event => this.innerController.onNewUserButtonClick(event) );
			
			document.getElementById( this.id + 'btnDeleteUserById').addEventListener('click', event => this.innerController.onDeleteByUsernameButtonClick(event) );


			//document.getElementById( this.id + 'btnSecondGrade').addEventListener('click', event => this.innerModel.getGrade(2).then( response => this.updateFrom(response.json())));

			//document.getElementById( this.id + 'btnThirdGrade').addEventListener('click', event => this.innerModel.getGrade(3).then( response => this.updateFrom(response.json())));

			//document.getElementById( this.id + 'btnProfessor').addEventListener('click', event => this.innerModel.getProfessor().then( response => this.updateFrom(response.json())));


			//document.getElementById( this.id + 'btnBoletin').addEventListener('click', event => this.innerModel.getSubjectsByStudent('cgarcia').then( response => console.log(response.json())));

			
			
			
			/*document.getElementById( this.id + 'UserTable').addEventListener('click', event =>
			{
				if ( event.target.hasAttribute('btnEditUser') )
					this.innerController.onEditButtonClick(event);

				if ( event.target.hasAttribute('btnDeleteUser') )
					this.innerController.onDeleteButtonClick(event);
			});*/
		});

	}

	bodyMateriaIndividual( userArrayPromise )
	{
		userArrayPromise.then( userArray =>
		{
			let materia= sessionStorage.getItem('materia');
			let innerHTML = 
			`
			<div class="w3-main" style="margin-left:200px">
			<div class="w3-container">
  			<h1>${materia}</h1>
			<table id="estudiantes">
			<tr>
				<th>Username</th>
				<th>Nombre</th>
				<th>Apellido</th>
				<th>Curso</th>
				<th>Acciones</th>
			<tr>

			</div>
			</div>`;

			if ( userArray.length > 0 )
			{
				for( let user of userArray )
				{
					innerHTML += 
					`<tr id='${user.login_username}'>
						<td>${user.login_username}</td>
						<td>${user.nombre}</td>
						<td>${user.apellido}</td>
						<td>${user.curso}</td>
						<td>
							<button id='${user.nombre} ${user.apellido}' btnCalificaciones>Ver Calificaciones</button>
						</td>
					<tr>`
				}
			}
			else
			{
				innerHTML += `<tr><td colspan="4">No hay datos disponibles</td></tr>`;
			};

		    innerHTML+= ` </table><br><button id="btnPlanilla">Planilla del Curso</button>`;

			//Incrustation
			document.getElementById( "body" ).innerHTML = innerHTML;

			document.getElementById("estudiantes").addEventListener('click', event =>
			{
				if ( event.target.hasAttribute('btnCalificaciones') )
					this.innerModel.getCalificacionesAlumno(event).then(response=> this.bodyCalificacionesIndividual(response.json()));
			});
		});

	}

	bodyCalificacionesIndividual( userArrayPromise )
	{
		let nombre_alumno= sessionStorage.getItem('nombre_alumno');

		userArrayPromise.then( userArray =>
		{
			
			let innerHTML = 
			`
			<div class="w3-main" style="margin-left:200px">
			<div class="w3-container">
  			<h1>Calificaciones de ${nombre_alumno}</h1>
			<table id="estudiantes">
			<tr>
				<th>Nombre</th>
				<th>Nota</th>
			<tr>

			</div>
			</div>`;

			if ( userArray.length > 0 )
			{
				for( let user of userArray )
				{
					innerHTML += 
					`<tr id='${user.idcalificaciones}'>
						<td>${user.nombre}</td>
						<td>${user.nota}</td>
						<td>
							<button btnCalificacion>Editar Calificación</button>
						</td>
					<tr>`
				}
			}
			else
			{
				innerHTML += `<tr><td colspan="4">No hay datos disponibles</td></tr>`;
			};


			//Incrustation
			document.getElementById( "body" ).innerHTML = innerHTML;

			
			document.getElementById("estudiantes").addEventListener('click', event =>
			{
				if ( event.target.hasAttribute('btnCalificacion') )
					this.innerController.onEditCalificacionButtonClick(event)/*.then(response=> this.bodyCalificacionesIndividual(response.json()))*/;
			});

		});

	}
	w3_open()
	{
		document.getElementById("mySidebar").style.display = "block";
	}

	w3_close()
	{
		document.getElementById("mySidebar").style.display = "none";
	}

	show()
	{
		this.login();
	}

	
}

export { ApplicationView };
