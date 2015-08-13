/**
 * Created by kamoszm on 2015-07-14.
 */

app.controller('NewsController', ['$scope','globalData','conn', function($scope,globalData, conn){
    /* Pseudo global variables $scope.data */
    $scope.global = globalData.getData();
    $scope.global.search.show = true;
    $scope.global.search.placeholder = 'search in news';

    /* Private variables for this controller - $scope*/
    $scope.news = {
        data : {},
        fn : {}
    };

    /*Functions*/
    $scope.news.fn.createCatList = function(){
        var arrType = [],
            idx = 0,
            newsLength = $scope.news.data.list.length,
            countsType = {},
            removeDuplicates = function(arr){
                var obj = {};
                for (var i = 0; i < arr.length; i++) {
                    obj[arr[i]] = true;
                }
                arr = [];
                for (var key in obj) {
                    arr.push(key);
                }
                return arr;
            };

        for(idx;  idx < newsLength; idx+=1){
            arrType.push($scope.news.data.list[idx].type);
        }

        arrType.forEach(function(x) { countsType[x] = (countsType[x] || 0)+1; });
        arrType = removeDuplicates(arrType);

        $scope.news.data.types = arrType;
        $scope.news.data.typesCount = countsType;

    };

    if($scope.global.listNews.length == 0){
        $scope.global.loader.show();
        conn.getData($scope.global.path.server.page.news).then(function(result){
            $scope.global.loader.hide();
            if(result.status == true){
                $scope.news.data.list = result.data.news;
                $scope.news.fn.createCatList();
            }
        }, function(msg){
            console.log(msg);
        });
    } else{
        $scope.news.data.list = $scope.global.listNews;
        $scope.news.fn.createCatList();
    }


}]);