/**
 * Created by kamoszm on 2015-07-15.
 */

app.directive("addLink", ['path', function(path){
    var path = path.url();

    return {
        restrict : "AE",
        scope : {
            editTag : '=editTag',
            loader : '=loader',
            dataListLinks : '=list',
            dataListTags : '=tags',
            notifi : '=notifi'
        },
        templateUrl: path.template.addlink,
        replace : true,
        transclude : false,
        controller : ['$rootScope', '$scope','conn', 'auth','$location','$q','globalData', function($rootScope, $scope, conn, auth, $location,$q,globalData){

            /* Pseudo global variables $scope.data */

            /* Private variables for this controller - $scope*/
            $scope.add = {
                data : {
                    auth : globalData.getData('userInfo'),
                    check : true,
                    all : $scope.popularLinks
                },
                tags : [],
                condition : {
                    disabledAddButton : false,
                    linkTmpAdded : false
                },
                addedTags : [],
                fn : {}
            };

            /* Functions */

            $scope.add.fn.back = function(){
                $scope.add.condition.disabledAddButton = false;
                $scope.add.condition.linkTmpAdded = false;
            };

            $scope.add.fn.checkLink = function(){
                $scope.loader.show();
                $scope.add.condition.disabledAddButton = true;
                conn.getData(path.server.link, { params : $scope.add.data })
                    .then(function(result){
                        if(result.status == true){
                            $scope.add.data.title = result.data.title;
                            $scope.add.condition.linkTmpAdded = true;
                            $scope.loader.hide();

                            $scope.add.data.tags = [];
                            $scope.add.suggestedTags = (typeof result.data.tags !== "undefined" ? result.data.tags.split(",") : []);
                        }
                    }, function(msg){
                        $scope.notifi.show(msg,'danger');
                    });
            };

            $scope.add.fn.saveLink = function(){
                $scope.loader.show();
                $scope.add.data.check = false;
                conn.postData(path.server.link, $scope.add.data )
                    .then(function(result){
                        $scope.add.data.id = -1;
                        var promise1 = conn.getData(path.server.link, { params : $scope.add.data }),
                            promise2 = conn.getData(path.server.tag, { params : $scope.add.data });

                        if(result.status == true){
                            $scope.add.condition.linkTmpAdded = false;
                            $scope.add.data = {
                                auth : globalData.getData('userInfo'),
                                check : false
                            };
                            $scope.add.condition.disabledAddButton = false;

                            $scope.notifi.show(result.message);

                            $q.all([promise1, promise2]).then(function(data){
                                $scope.loader.hide();
                                $scope.dataListLinks = data[0].data;
                                $scope.dataListTags = data[1].data;
                                $scope.add.data.check = true;
                                $location.path(path.pages.dashboard.substr(2));
                            });
                        } else{
                            $scope.notifi.show(result.message,'danger');
                        }
                    }, function(msg){
                        $scope.notifi.show(msg,'danger');
                    });
            };

            $scope.add.fn.removeAddedTag = function(el) {
                var arr = $scope.add.addedTags;
                for(var i in arr){
                    if(arr[i]== el){
                        arr.splice(i,1);
                        break;
                    }
                }
                $scope.add.addedTags = arr;
                $scope.add.data.tags = $scope.add.addedTags.join();
            };

            $scope.add.fn.checkAddedTags = function(e) {
                var $el = $(e.target),
                    val = $el.val(),
                    keyCode = e.keyCode,
                    addTags = function(){
                        if ($scope.add.addedTags.indexOf(val) < 0 && $scope.add.addedTags.length < 10 && val != ""){
                            $scope.add.addedTags.push(val);
                            $scope.add.data.tags = $scope.add.addedTags.join();
                        }
                        $el.val("");
                        e.preventDefault();
                    };

                switch(keyCode){
                    case 32 : {
                        e.preventDefault();
                        break;
                    }
                    case 13 : {
                        addTags();
                        break;
                    }
                    case 188 : {
                        addTags();
                        break;
                    }
                }

                if(e.type == "blur"){
                    addTags();
                }

            };

            $scope.add.fn.removeWC = function(e){
                var $el = $(e.target),
                    val = $el.val();
                if(val.indexOf(' ') >= 0){
                    $el.val(val.replace(/ /g,''));
                }
            };

            $scope.add.fn.addTag = function(item){
                if($scope.add.addedTags.indexOf(item) < 0 && $scope.add.addedTags.length < 10) {
                    $scope.add.addedTags.push(item);
                    $scope.add.data.tags = $scope.add.addedTags.join();
                }
            };


            $scope.edit = function(id){
                $scope.loader.show();
                $scope.add.condition.disabledAddButton = true;
                $scope.add.data.id = id;
                conn.getData(path.server.link, { params : $scope.add.data })
                    .then(function(result){
                        if(result.status == true){
                            $scope.add.data.title = result.data.title;
                            $scope.add.data.link = result.data.url;
                            $scope.add.data.rating = result.data.rating;
                            $scope.add.condition.linkTmpAdded = true;
                            $scope.loader.hide();

                            if(typeof result.data.comment !== "undefined"){
                                $scope.add.data.comment = result.data.comment;
                            }

                            $scope.add.data.tags = (typeof result.data.tags !== "undefined" ? result.data.tags : []);
                            $scope.add.addedTags = (typeof result.data.tags !== "undefined" ? result.data.tags.split(",") : []);

                        }
                    }, function(msg){
                        $scope.notifi.show(msg,'danger');
                    });
            };

            $scope.$watch('editTag.edit', function() {

                if(globalData.getData('editTag').edit == true){
                    $scope.edit(globalData.getData('editTag').id);
                    globalData.setPropData('editTag','edit', false);
                }
            });

        }]
    }
}]);

