/*
	Example: UserViewController Module // CRUD-Development
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

import {ApplicationModel} from './ApplicationModel.js';

class ApplicationController
{
	constructor( model, view )
	{
		this.innerView = view;
		this.innerModel = model;
	}

	onNewUserButtonClick()
	{
		window.alert('Por implementar...');
	}

	onEditCalificacionButtonClick(event)
	{
		let idcalificacion= event.target.parentElement.parentNode.id;
		let nota = window.prompt('Ingrese nueva calificación');
		this.innerModel.editCalificacionAlumno(nota, idcalificacion).then(result => this.innerView.bodyCalificacionesIndividual(result.json()));

		
	}

	onDeleteButtonClick()
	{
		window.alert('Por implementar...');
	}

	onDeleteByUsernameButtonClick()
	{
		let id = window.prompt('Indique el ID del usuario a borrar');
		this.innerModel.delete(id).then( response => this.innerView.body() );
	}

	onlogin()
	{
	   this.innerView.normal();
	}

}

export { ApplicationController };
