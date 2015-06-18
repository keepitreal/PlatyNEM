/// <reference path="../../../../../references.d.ts" />

import plat = require('platypus');
import PostRepository = require('../../../../repositories/post.repository');
import AdminBaseViewControl = require('../../base.viewcontrol');
import ManagePostViewControl = require('../manage/manage.viewcontrol');

class ListPostsViewControl extends AdminBaseViewControl {
    title = 'List Blog Posts';
    templateString = require('./list.viewcontrol.html');
    context = {
        manageView: ManagePostViewControl,
        posts: <Array<models.IPost>>null,
        deleteModal: false
    };
    
    toDeleteId: string;
    
    constructor(private postRepository: PostRepository) {
        super();
    }
    
    navigatedTo() {
        this.refreshPosts();
    }
    
    toggleDeleteModal(id?: string) {
        var context = this.context;
        context.deleteModal = !context.deleteModal;
        
        if (!this.utils.isNull(id)) {
            this.toDeleteId = id;
        }
    }
    
    refreshPosts() {
        this.postRepository.all().then((posts: Array<models.IPost>) => {
            this.context.posts = posts;
        });
    }
    
    confirmDelete() {
        this.postRepository.destroy(this.toDeleteId).then((result) => {
           this.toDeleteId = null;
           this.context.deleteModal = false;
           this._globalAlert.setAlerts('Post has been deleted', 'success');
           this.refreshPosts();
        });
    }
}

plat.register.viewControl('adminlistposts-vc', ListPostsViewControl, [
    PostRepository
]);

export = ListPostsViewControl;
