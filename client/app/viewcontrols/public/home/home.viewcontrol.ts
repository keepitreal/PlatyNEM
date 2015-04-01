/// <reference path="../../../../references.d.ts" />

import plat = require('platypus');
import BaseViewControl = require('../../base.viewcontrol');

class HomeViewControl extends BaseViewControl {
	title = 'Innovation Depot | Business Incubator and Training Center';
 	templateString = require('./home.viewcontrol.html');
 	context = {};
}

plat.register.viewControl('', HomeViewControl);

export = HomeViewControl;