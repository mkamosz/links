/**
 * Created by kamoszm on 2015-07-14.
 */

app.controller('DashboardController', ['$scope','globalData','conn', function($scope,globalData,conn){
    /* Pseudo global variables $scope.data */
    $scope.global = globalData.getData();

    /* Private variables for this controller - $scope*/
    $scope.dashboard = {
        data : {
            auth : globalData.getData('userInfo'),
            check : false
        },
        fn : {}
    };

    if($scope.global.listLinks.length ==  0){
        conn.getData($scope.global.path.server.link, { params : $scope.dashboard.data })
            .then(function(result){
                if(result.status == true) {
                    globalData.setData('listLinks',result.data);
                }
            }, function(msg){
                console.log(msg);
            });

    }
    if($scope.global.listTags.length == 0){
        conn.getData($scope.global.path.server.tag, { params : $scope.dashboard.data })
            .then(function(result){
                if(result.status == true){
                    globalData.setData('listTags',result.data);
                }
            }, function(msg){
                console.log(msg);
            });
    }

    if($scope.global.listNotifications.length == 0){
        $scope.global.loader.show();
        conn.getData($scope.global.path.server.notifications,{params : $scope.dashboard.data})
            .then(function(result){
                $scope.global.loader.hide();
                if(result.status == true){
                    $scope.global.listNotifications = result.data.list;
                }
            }, function(msg){
                $scope.global.notifi.show(msg,'danger');
            })
    }


    /*Functions*/
    globalData.refreshUserData();
    globalData.refreshNotifications();
}]);