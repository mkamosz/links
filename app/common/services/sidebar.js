/**
 * Created by kamoszm on 2015-07-18.
 */

app.service('sidebarNav',['path', function(path){
    var nav = {},
        path = path.url();

    nav.Profile = [
        {
            title : 'Dashboard',
            url : path.pages.dashboard,
            icon : 'glyphicon-user'
        },
        {
            title : 'Add link',
            url : path.pages.addlink,
            icon : 'glyphicon-plus'
        },
        {
            title : 'Followed user',
            url : path.pages.followed,
            icon : 'glyphicon-heart'
        },
        {
            title : 'Notifications',
            url : path.pages.notifications,
            icon : 'glyphicon-bell'
        }
    ];

    nav.Settings = [
        {
            title : 'Personal data',
            url : path.pages.personal,
            icon : 'glyphicon-cog'
        },
        {
            title : 'Social',
            url : path.pages.social,
            icon : 'glyphicon-globe'
        },
        {
            title : 'Password',
            url : path.pages.password,
            icon : 'glyphicon-floppy-disk'
        }
    ];

    this.getNav = function(){
        return nav;
    };
}]);