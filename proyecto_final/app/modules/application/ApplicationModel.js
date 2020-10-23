/*
	Example: RemoteModelJS // CRUD-Development
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

class ApplicationModel extends EventTarget
{
	constructor()
	{
		super();
	}

	create( userData )
	{
		let message =
		{
			action:'create',
			body: userData
		};

		return fetch( './modules/application/ApplicationModel.php', { method:'POST', body:JSON.stringify(message) } );
	}

	edit( newUserData )
	{
		let message =
		{
			action:'edit',
			body: newUserData
		};

		return fetch( './modules/application/ApplicationModel.php', { method:'POST', body:JSON.stringify(message) } );
	};

	delete( id )
	{
		let message =
		{
			action:'delete',
			body: { username:id }
		};

		return fetch( './modules/application/ApplicationModel.php', { method:'POST', body:JSON.stringify(message) } );
	};



	getAll()
	{
		let message =
		{
			action:'getAll',
			body: null
		};

		return fetch( './modules/application/ApplicationModel.php', { method:'POST', body:JSON.stringify(message) } );
	};

	getGrade( numberGrade ){

		let message =
		{
			action:'getGrade',
			body: {username: numberGrade}
		};
		
		return fetch( './modules/application/ApplicationModel.php', { method:'POST', body:JSON.stringify(message) } );
	}

	getPrivilegio( user ){

		let message =
		{
			action:'getPrivilegio',
			body: {username : user}
		};
		
		return fetch( './modules/application/ApplicationModel.php', { method:'POST', body:JSON.stringify(message) } );
	}
	getUserDocente( user ){

		let message =
		{
			action:'getUserDocente',
			body: {username : user}
		};
		
		return fetch( './modules/application/ApplicationModel.php', { method:'POST', body:JSON.stringify(message) } );
	}

	getUserAlumno( user ){

		let message =
		{
			action:'getUserAlumno',
			body: {username : user}
		};
		
		return fetch( './modules/application/ApplicationModel.php', { method:'POST', body:JSON.stringify(message) } );
	}

	getByDni( numberDni ){

		let message =
		{
			action:'getByDni',
			body: {username: numberDni}
		};
		
		return fetch( './modules/application/ApplicationModel.php', { method:'POST', body:JSON.stringify(message) } );
	}

	getByDni2( numberDni ){

		let message =
		{
			action:'getByDni2',
			body: {username: numberDni}
		};
		
		return fetch( './modules/application/ApplicationModel.php', { method:'POST', body:JSON.stringify(message) } );
	}

	getCursos( userName ){

		let message =
		{
			action:'getCursos',
			body: {username: userName}
		};
		
		return fetch( './modules/application/ApplicationModel.php', { method:'POST', body:JSON.stringify(message) } );
	}

	getMaterias( userName ){

		let message =
		{
			action:'getMaterias',
			body: {username: userName}
		};
		
		return fetch( './modules/application/ApplicationModel.php', { method:'POST', body:JSON.stringify(message) } );
	}

	getEstudiantes( userName ){

		let message =
		{
			action:'getEstudiantes',
			body: {username: userName}
		};
		
		return fetch( './modules/application/ApplicationModel.php', { method:'POST', body:JSON.stringify(message) } );
	}
	
	getSubjectsByStudent( studentUsername ){

		let message =
		{
			action:'getSubjectsByStudent',
			body: {username: studentUsername}
		};
		
		return fetch( './modules/application/ApplicationModel.php', { method:'POST', body:JSON.stringify(message) } );
	}

	getStudentsBySubject( subjectId ){

		let message =
		{
			action:'getStudentsBySubject',
			body: {username: subjectId}
		};
		
		return fetch( './modules/application/ApplicationModel.php', { method:'POST', body:JSON.stringify(message) } );
	}

	getProfessor(){

		let message =
		{
			action:'getProfessor',
			body: null
		};
		
		return fetch( './modules/application/ApplicationModel.php', { method:'POST', body:JSON.stringify(message) } );
	}


	isUsernameAlreadyExists( username )
	{
		//Por implementar...
	};

	isValidUserData( userData )
	{
		let success = true;

		let passwordRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,16})");

		success = ( success && userData.hasOwnProperty('username') && userData.username != null );
		success = ( success && userData.hasOwnProperty('name') && userData.name != null );
		success = ( success && userData.hasOwnProperty('password') && userData.password.match(passwordRegex) );

		return success;
	};
}

export { ApplicationModel };
