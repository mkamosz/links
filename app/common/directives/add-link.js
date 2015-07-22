/**
 * Created by kamoszm on 2015-07-15.
 */

app.directive("addLink", ['path', function(path){
    var path = path.url(),
        checkRootScope = true;

    return {
        restrict : "E",
        scope : {
            text : "@"
        },
        templateUrl: path.template.addlink,
        replace : true,
        transclude : false,
        controller : ['$rootScope', '$scope','conn', 'auth', 'loaderService','dataFactory','stringOperation', function($rootScope, $scope, conn, auth, loaderService,dataFactory,stringOperation){
            var checkEdit = function(result){

            };
            $scope.path = path;
            $scope.userInfo = auth.getUserInfo();
            $scope.disabledAddButton = false;
            $scope.linkTmpAdded = false;
            $scope.data = {
                auth : $scope.userInfo,
                check : true,
                all : $scope.hp
            };
            $scope.addedTags = [];

            $scope.back = function(){
                $scope.disabledAddButton = false;
                $scope.linkTmpAdded = false;
            };

            $scope.checkLink = function(){
                $rootScope.$broadcast('loaderActive');
                $scope.disabledAddButton = true;
                conn.getData(path.server.link, { params : $scope.data })
                    .then(function(result){
                        if(result.status == true){
                            $scope.data.title = result.data.title;
                            $scope.linkTmpAdded = true;
                            $rootScope.$broadcast('loaderInactive');

                            $scope.data.tags = (typeof result.data.tags !== "undefined" ? result.data.tags : []);
                            $scope.addedTags = (typeof result.data.tags !== "undefined" ? result.data.tags.split(",") : []);
                        }
                    }, function(msg){
                        console.log(msg);
                    });
            };

            $scope.saveLink = function(){
                $rootScope.$broadcast('loaderActive');
                $scope.data.check = false;
                conn.postData(path.server.link, $scope.data )
                    .then(function(result){
                        if(result.status == true){
                            $scope.linkTmpAdded = false;
                            $scope.data = {
                                auth : $scope.userInfo,
                                check : false
                            };
                            $scope.disabledAddButton = false;

                            conn.getData(path.server.link, { params : $scope.data })
                                .then(function(result){
                                    $rootScope.$broadcast('loaderInactive');

                                    dataFactory.editData("userLinksList", result.data);
                                    $scope.data.check = true;
                                }, function(msg){
                                    console.log(msg);
                                });

                            conn.getData(path.server.tag, { params : $scope.data })
                                .then(function(result){
                                    dataFactory.editData("userTagsList",result.data);
                                    $scope.data.check = true;
                                }, function(msg){
                                    console.log(msg);
                                });
                        }
                    }, function(msg){
                        console.log(msg);
                    });
            };

            $scope.removeAddedTag = function(el) {
                var arr = $scope.addedTags;
                for(var i in arr){
                    if(arr[i]== el){
                        arr.splice(i,1);
                        break;
                    }
                }
                $scope.addedTags = arr;
                $scope.data.tags = $scope.addedTags.join();
            };

            $scope.checkAddedTags = function(e) {
                var $el = $(e.target),
                    val = $el.val(),
                    keyCode = e.keyCode,
                    addTags = function(){
                        if ($scope.addedTags.indexOf(val) < 0 && $scope.addedTags.length < 10 && val != ""){
                            $scope.addedTags.push(val);
                            $scope.data.tags = $scope.addedTags.join();
                        }
                        $el.val("");
                        event.preventDefault();
                    };

                switch(keyCode){
                    case 32 : {
                        event.preventDefault();
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

            $scope.removeWC = function(e){
                var $el = $(e.target),
                    val = $el.val();
                if(val.indexOf(' ') >= 0){
                    $el.val(val.replace(/ /g,''));
                }
            };

            $scope.edit = function(id){

                $rootScope.$broadcast('loaderActive');
                $scope.disabledAddButton = true;
                $scope.data.id = id;
                conn.getData(path.server.link, { params : $scope.data })
                    .then(function(result){
                        if(result.status == true){
                            $scope.data.title = result.data.title;
                            $scope.linkTmpAdded = true;
                            $rootScope.$broadcast('loaderInactive');

                            if(typeof result.data.comment !== "undefined"){
                                $scope.data.comment = result.data.comment;
                            }

                            $scope.data.tags = (typeof result.data.tags !== "undefined" ? result.data.tags : []);
                            $scope.addedTags = (typeof result.data.tags !== "undefined" ? result.data.tags.split(",") : []);
                        }
                    }, function(msg){
                        console.log(msg);
                    });
            };

            if(checkRootScope){
                $rootScope.$on("editLink", function (event, data) {
                    $scope.edit(data.id);

                });
                checkRootScope = false;
            }


        }]
    }
}]);

