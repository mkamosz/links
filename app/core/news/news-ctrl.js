/**
 * Created by kamoszm on 2015-07-14.
 */

app.controller('NewsController', ['$scope','globalData','conn', function($scope,globalData, conn){
    /* Pseudo global variables $scope.data */
    $scope.global = globalData.getData();

    /* Private variables for this controller - $scope*/
    $scope.news = {
        data : {},
        fn : {}
    };

    /*Functions*/

    if($scope.global.listNews.length == 0){
        $scope.global.loader.show();
        conn.getData($scope.global.path.server.page.news).then(function(result){
            $scope.global.loader.hide();
            if(result.status == true){
                $scope.news.data.list = result.data.news
            }
        }, function(msg){
            console.log(msg);
        });
    } else{
        $scope.news.data.list = $scope.global.listNews;
    }


}]);