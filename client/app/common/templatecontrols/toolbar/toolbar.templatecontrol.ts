/// <reference path="../../../../references.d.ts" />

import plat = require('platypus');
import ListPostsViewControl = require('../../../viewcontrols/admin/blog/list/list.viewcontrol');
import ListUsersViewControl = require('../../../viewcontrols/admin/users/list.viewcontrol');
import DashboardViewControl = require('../../../viewcontrols/admin/dashboard/dashboard.viewcontrol');

class Toolbar extends plat.ui.TemplateControl {
	templateString = require('./toolbar.templatecontrol.html');
	hasOwnContext = true;
	context = {
		menuItems: [
			{
				view: DashboardViewControl,
				title: 'Dashboard'
			},
			{
				view: ListPostsViewControl,
				title: 'Blog'
			},
			{
				view: ListUsersViewControl,
				title: 'Users'
			}
		]
	};
}

plat.register.control('toolbar', Toolbar, null, true);