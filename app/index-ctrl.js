app.controller('IndexController',['$scope', 'auth', 'path','sidebarNav','$timeout','$window', function($scope, auth, path, sidebarNav, $timeout,$window){
    /* IndexController - main controller
    *  with set pseudo global variables for rest controllers
    * */

    $scope.data = {
        userInfo : auth.getUserInfo(),
        layout : {
            showFooter : true,
            showProfile : false,
            showAddLinkForm : false
        },
        path : path.url(),
        loader : {
            show : function(){
                $scope.data.loader.set = "active"
            },
            hide : function(){
                $scope.data.loader.set = ""
            },
            set : "active"
        },
        listLinks : [],
        listTags : [],
        sidebar : {
            nav : sidebarNav.getNav(),
            state : (typeof auth.getUserInfo().state !== 'undefined' ? auth.getUserInfo().state : '')
        },
        editTag : {
            id : null,
            show : false
        },
        notifi : {
            show : function(msg,type){
                $scope.data.notifi.visible = true;
                $scope.data.notifi.msg = msg;
                $scope.data.notifi.state = (typeof type === "undefined" ? $scope.data.notifi.state : type);
                $timeout(function(){
                    $scope.data.notifi.hide();
                    $scope.data.notifi.state = 'success';
                },3000);
            },
            hide : function(msg){
                $scope.data.notifi.visible = false;
                $scope.data.notifi.msg = "";
            },
            visible : false,
            state : 'success',
            msg : 'error'
        }

    };
    $scope.data.layout.showProfile = $scope.data.userInfo.logged;

}]);