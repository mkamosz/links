/**
 * Created by kamoszm on 2015-07-14.
 */

app.controller('FaqController', ['$scope','conn','globalData', function($scope,conn,globalData){
    /* Pseudo global variables $scope.data */
    $scope.global = globalData.getData();
    $scope.global.search.show = true;
    $scope.global.search.placeholder = 'search in faq';

    /* Private variables for this controller - $scope*/
    $scope.faq = {
        data : {},
        fn : {}
    };

    /*Functions*/

    if($scope.global.listFaq.length == 0){
        $scope.global.loader.show();
        conn.getData($scope.global.path.server.page.faq).then(function(result){
            $scope.global.loader.hide();
            if(result.status == true){
                $scope.faq.data.list = result.data.faq;
            }
        }, function(msg){
            console.log(msg);
        });
    } else{
        $scope.faq.data.list = $scope.global.listFaq;
    }
}]);