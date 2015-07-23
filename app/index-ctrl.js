app.controller('IndexController',['$scope', 'auth', 'path', function($scope, auth, path){
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
            set : "active"
        },
        listLinks : [],
        listTags : [],
        editTag : {
            id : null,
            show : false
        }

    };
    $scope.data.layout.showProfile = $scope.data.userInfo.logged;

}]);