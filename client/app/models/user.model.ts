/// <reference path="../../references.d.ts" />
/// <reference path="./server.model.d.ts" />

import plat = require('platypus');
import base = require('./base.model');

export class UserFactory extends base.BaseFactory<IUser> {
	_instantiate(user: server.IUser): IUser {
		return {
			id: user.id,
			firstname: user.firstname,
			lastname: user.lastname,
			email: user.email
		}
	}
}

export interface IUser extends base.IBaseModel {
	firstname?: string;
	lastname?: string;
	email: string;
}

plat.register.injectable('userFactory', UserFactory, null, plat.register.injectable.FACTORY);