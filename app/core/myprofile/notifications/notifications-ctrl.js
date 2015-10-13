/**
 * Created by kamoszm on 2015-07-14.
 */

app.controller('NotificationsController', ['$scope','conn', 'globalData', function($scope,conn, globalData){
    /* Pseudo global variables $scope.data */
    $scope.global = globalData.getData();

    /* Private variables for this controller - $scope*/
    $scope.notifications = {
        noResult : false,
        data : {
            auth : globalData.getData('userInfo')
        },
        fn : {}
    };

    globalData.refreshNotifications().then(function(result){
        $scope.notifications.list = result.data;
        if($scope.notifications.list.length === 0){
            $scope.notifications.noResult = true;
        }
    }, function(msg){
        $scope.notifications.list = result.data;
        $scope.global.notifi.show(msg,'danger');
    });

    /*Functions*/
    $scope.notifications.fn.read = function(id,read){
        if(read == 0){
            $scope.notifications.data.readID = id;
            $scope.global.loader.show();
            conn.putData($scope.global.path.server.notifications, $scope.notifications.data)
                .then(function(result){
                    $scope.global.loader.hide();
                    if(result.status == false){
                        $scope.global.notifi.show(result.message,'danger');
                    }
                }, function(msg){
                    $scope.global.notifi.show(msg,'danger');
                })
        }
    };

    $scope.notifications.fn.deleteNotifi = function(id,e){
        var check = confirm("Are you sure you want to delete?");
        if (check == true) {
            $scope.notifications.data.id = id;
            conn.deleteData($scope.global.path.server.notifications, {params : $scope.notifications.data})
                .then(function(result){
                    $scope.global.loader.hide();
                    if(result.status == true){
                        $scope.notifications.list = result.data.list;
                        if($scope.notifications.list.length === 0){
                            $scope.notifications.noResult = true;
                        }
                        $scope.global.listNotifications = result.data.list;
                    } else{
                        $scope.global.notifi.show(result.message,'danger');
                    }
                }, function(msg){
                    $scope.global.notifi.show(msg,'danger');
                })
        }
    }
}]);