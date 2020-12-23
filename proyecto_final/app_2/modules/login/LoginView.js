/*
	Example: Login Module // CRUD-Development
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

import { LoginViewController } from "./LoginController.js"

class LoginView extends EventTarget
{
	constructor( id, model )
	{
		super();
		
		this.id = id;
		this.innerModel = model;

		this.innerController = new LoginViewController(model, this);

		this.show();

		
	}

	show()
	{
		let innerHTML = 
		`<div class="w3-container">  
      		<div class="w3-center"><br>
        		<img src="./modules/login/resources/avatar.png" alt="Avatar" style="width:30%" class="w3-circle w3-margin-top">
      		</div>

			<form id="${this.id}loginFrm" class="w3-container">
				<div class="w3-section">
					<label><b>Username</b></label>
					<input class="w3-input w3-border w3-margin-bottom" type="text" placeholder="Enter Username" name="username" required>
					<label><b>Password</b></label>
					<input class="w3-input w3-border" type="password" placeholder="Enter Password" name="password" required>
					<button id="${this.id}btnLogin" class="w3-button w3-block w3-green w3-section w3-padding">Login</button>
					<button id="${this.id}btnRegister" class="w3-button w3-block w3-green w3-section w3-padding">Register</button>
				</div>
			</form>
		</div>`;

		document.getElementById(this.id).innerHTML = innerHTML;

		//Controller-attach
		document.getElementById(this.id+'btnLogin').addEventListener('click', event => this.innerController.onLoginButtonClick(event));
		document.getElementById(this.id+'btnRegister').addEventListener('click', event => this.innerController.onRegisterButtonClick(event));
	}

	getLoginFormData()
	{
		let formViewData = new FormData( document.getElementById( this.id +'loginFrm') );
		let formLoginData = Object.fromEntries(formViewData);

		return formLoginData;
	}


}

export { LoginView };
