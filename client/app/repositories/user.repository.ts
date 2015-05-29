/// <reference path="../../references.d.ts" />

import plat = require('platypus');
import models = require('../models/user.model');
import UserService = require('../services/user.service');
import BaseRepository = require('../repositories/base.repository');

class UserRepository extends BaseRepository<models.UserFactory, UserService, models.IUser> {
    private __currentUser: models.IUser;
    private __currentUserPromise: plat.async.IThenable<models.IUser>;
    
    create(user: any, password: string) {
        var u = this.Factory.create(user);
        
        return this.service.register(u, password).then((id: number) => {
            user.id = id;
            return id;
        });
    }
    
    current(): plat.async.IThenable<models.IUser> {
        if (this.__currentUser) {
            return this.__currentUserPromise = this._Promise.resolve(this._utils.clone(this.__currentUser, true));
        } else if (this._utils.isPromise(this.__currentUserPromise)) {
            return this.__currentUserPromise.then((user) => {
                this.__currentUser = user;
                this.__currentUserPromise = null;
                return this._utils.clone(this.__currentUser, true);
            });
        }
        
        return this.__currentUserPromise = this.service.loggedInUser()
            .then((user) => {
               this.__currentUser = user;
               return this._utils.clone(this.__currentUser, true); 
            });
    }

    login(user: any): plat.async.IThenable<void> {
        var u = this.Factory.create(user);
        
        return this.service.login(u, user.password).then((user) => {
            this.__currentUser = this.Factory.create(user);
        });
    }

    logout(): plat.async.IThenable<void> {
        return this.service.logout().then(() => {
            this.__currentUser = null;
            this.__currentUserPromise = null;
        });
    }

    isAdmin(): plat.async.IThenable<boolean> {
        return this.service.isAdmin();
    }
}

plat.register.injectable('usersRepository', UserRepository, [
    models.UserFactory,
    UserService
]);

export = UserRepository;
