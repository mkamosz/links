/**
 * Created by kamoszm on 2015-07-14.
 */

app.controller('ContactController', ['$scope', 'googleMap','globalData','conn', function($scope,googleMap,globalData,conn){
    /* Pseudo global variables $scope.data */
    $scope.global = globalData.getData();

    /* Private variables for this controller - $scope*/
    $scope.contact = {
        data : {},
        error : {
            show : false
        },
        fn : {}
    };

    /*Functions*/

    googleMap.init();

    $scope.contact.fn.send = function(check){

        if(check){
            $scope.global.loader.show();
            conn.getData($scope.global.path.server.page.contact, {params: $scope.contact.data }).then(function(result){
                $scope.global.loader.hide();
                if(result.status == true){
                    $scope.global.notifi.show(result.message);
                    $scope.contact.data = {};
                } else{
                    $scope.global.notifi.show(result.message);
                }
            }, function(msg){
               console.log(msg);
            });
        } else{
            $scope.contact.error.show = true;
        }
    };


}]);