import {App, routing, web, Utils, events, register} from 'platypus';
import AdminViewControl from '../controls/cms/viewcontrols/admin/main/main.viewcontrol';
import AuthViewControl from '../controls/cms/viewcontrols/auth/main/main.viewcontrol';
import PublicViewControl from '../controls/public/viewcontrols/main/main.viewcontrol';
import UserRepository from '../repositories/user.repository';
import Helpers from '../injectables/helpers.injectable';

export default class Blogstarter extends App {
    constructor(router: routing.Router,
        config: web.IBrowserConfig,
        repository: UserRepository,
        private helpers: Helpers,
        private utils: Utils,
        private browser: web.Browser) {
        super();

        router.configure([
            { pattern: '', view: PublicViewControl },
            { pattern: 'admin', view: AdminViewControl },
            { pattern: 'auth', view: AuthViewControl }
        ]);

        config.routingType = config.STATE;

        router.intercept((info) => {
            return repository.isAdmin();
        }, AdminViewControl);
    }

    ready(ev: events.LifecycleEvent) {
        var defer = this.utils.defer;

        this.on('urlChanged', (ev: events.DispatchEvent, utils?: web.UrlUtils) => {
            this.clearScripts();

            defer(() => {
                this.doTracking(utils.pathname);
            }, 2000)
        });

        this.clearScripts();

        var utils = this.browser.urlUtils();

        defer(() => {
            this.doTracking(utils.pathname);
        }, 2000);
    }

    error(ev: events.ErrorEvent<Error>) {
        var stack: string = (<any>ev.error).stack;

        if (!stack) {
            stack = '';
        }

        if (!!(<any>window).ga) {
            var description = ev.error.message + stack;

            description = description.slice(0, 100);
            (<any>window).ga('send', 'exception', {
               exDescription: description
            });
        }
    }

    doTracking(path: string) {
        path = this.normalizePath(path);

        if (!!(<any>window).ga) {
            (<any>window).ga('send', 'pageview', {
               page: path
            });
        }
    }

    normalizePath(path: string) {
        if (path[0] !== '/') {
            path = '/' + path;
        }

        return path;
    }

    clearScripts() {
        var helpers = this.helpers;

        helpers.removeScript('www.google-analytics.com');
    }
}

register.app('blogstarter', Blogstarter, [
    routing.Router,
    web.IBrowserConfig,
    UserRepository,
    Helpers,
    Utils,
    web.Browser
]);
