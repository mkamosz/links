/**
 * Created by kamoszm on 2015-07-15.
 */

app.directive("listLinks", ['path', function(path){
    var path = path.url();

    return {
        restrict : "AE",
        scope : {
            popularLinks : '@popularLinks',
            dataListLinks : '=list',
            editTag : '=editTag',
            userView : '@user',
            loader : '=loader',
            tagsSearch : '=tagsSearch'
        },
        templateUrl: path.template.listlink,
        replace : true,
        transclude : false,
        controller : ['$scope','conn','$location','globalData', function($scope, conn,$location,globalData){

            /* Pseudo global variables $scope.data */

            /* Private variables for this controller - $scope*/
            $scope.popularLinks = (typeof $scope.popularLinks === "undefined" ? false : $scope.popularLinks);
            $scope.userInfo = globalData.getData('userInfo');
            $scope.list = {
                data : {
                    auth : globalData.getData('userInfo'),
                    check : false,
                    all : $scope.popularLinks
                },
                fn : {}
            };
            $scope.path = path;

            $scope.userView = (typeof $scope.userView === 'undefined' ? false : $scope.userView);

            /* Functions */

            $scope.list.fn.edit = function(id){
                if(!$scope.userView){
                    globalData.setPropData('editTag','id', id);
                    globalData.setPropData('editTag','edit', true);
                    $location.path(path.pages.addlink.substr(2));
                }
            };

            $scope.list.fn.delete = function(id){
                if(!$scope.userView){
                    var check = confirm("Are you sure you want to remove?");
                    if (check == true) {
                        $scope.loader.show();
                        conn.deleteData(path.server.link, {"params": {auth: globalData.getData('userInfo'), id: id}})
                            .then(function (result) {
                                $scope.loader.hide();
                                globalData.setData('listLinks', result.data.links);
                                globalData.setData('listTags', result.data.tags);

                            }, function (msg) {
                                console.log(msg);
                            });
                    }
                }
            };

        }]
    }
}]);