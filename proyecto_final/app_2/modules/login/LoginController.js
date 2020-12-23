/*
	Example: LoginViewController Module // CRUD-Development
	Autor: Matías Gastón Santiago
	Versión: 1.0
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

import {LoginModel} from './LoginModel.js';

class LoginViewController
{
	constructor( model, view )
	{
		this.innerView = view;
		this.innerModel = model;

		this.accessKey = null;
	}

	onLoginButtonClick(event)
	{
		let data = this.innerView.getLoginFormData();

		sessionStorage.setItem('username', data.username);

		this.innerModel.login(data).then( response => 
		{
			if(response.key == null){

				window.alert( 'Acceso Inválido');
			}
			else{
			this.accessKey = response.key;
			this.innerView.dispatchEvent( new CustomEvent('login', { 'detail': this.accessKey }) );
			}
		});

		//cortar la propagación del evento.
		event.preventDefault();
	}

	onRegisterButtonClick(event)
	{
		let data = this.innerView.getLoginFormData();
		

		this.innerModel.register(this.accessKey,data).then( response => 
		{
			this.accessKey = response.key;
			window.alert( 'NextAccessKey:'+this.accessKey+' Response:'+ response.body );
		});

		//cortar la propagación del evento.
		event.stopPropagation();
		event.preventDefault();
	}

}

export { LoginViewController };
