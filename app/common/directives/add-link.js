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
            dataListTags : '=tags'
        },
        templateUrl: path.template.addlink,
        replace : true,
        transclude : false,
        controller : ['$rootScope', '$scope','conn', 'auth', function($rootScope, $scope, conn, auth){

            /* Pseudo global variables $scope.data */

            /* Private variables for this controller - $scope*/
            $scope.add = {
                data : {
                    auth : auth.getUserInfo(),
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
                $scope.loader.set = "active";
                $scope.add.condition.disabledAddButton = true;
                conn.getData(path.server.link, { params : $scope.add.data })
                    .then(function(result){
                        if(result.status == true){
                            $scope.add.data.title = result.data.title;
                            $scope.add.condition.linkTmpAdded = true;
                            $scope.loader.set = "";

                            $scope.add.data.tags = (typeof result.data.tags !== "undefined" ? result.data.tags : []);
                            $scope.add.addedTags = (typeof result.data.tags !== "undefined" ? result.data.tags.split(",") : []);
                        }
                    }, function(msg){
                        console.log(msg);
                    });
            };

            $scope.add.fn.saveLink = function(){
                $scope.loader.set = "active";
                $scope.add.data.check = false;
                conn.postData(path.server.link, $scope.add.data )
                    .then(function(result){
                        if(result.status == true){
                            $scope.add.condition.linkTmpAdded = false;
                            $scope.add.data = {
                                auth : auth.getUserInfo(),
                                check : false
                            };
                            $scope.add.condition.disabledAddButton = false;

                            conn.getData(path.server.link, { params : $scope.add.data })
                                .then(function(result){
                                    $scope.loader.set = "";

                                    $scope.dataListLinks = result.data;
                                    $scope.add.data.check = true;
                                }, function(msg){
                                    console.log(msg);
                                });

                            conn.getData(path.server.tag, { params : $scope.add.data })
                                .then(function(result){
                                    $scope.dataListTags = result.data;
                                    $scope.add.data.check = true;
                                }, function(msg){
                                    console.log(msg);
                                });
                        }
                    }, function(msg){
                        console.log(msg);
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

            $scope.add.fn.removeWC = function(e){
                var $el = $(e.target),
                    val = $el.val();
                if(val.indexOf(' ') >= 0){
                    $el.val(val.replace(/ /g,''));
                }
            };

            $scope.edit = function(id){

                $scope.loader.set = "active";
                $scope.add.condition.disabledAddButton = true;
                $scope.add.data.id = id;
                conn.getData(path.server.link, { params : $scope.add.data })
                    .then(function(result){
                        if(result.status == true){
                            $scope.add.data.title = result.data.title;
                            $scope.add.condition.linkTmpAdded = true;
                            $scope.loader.set = "";

                            if(typeof result.data.comment !== "undefined"){
                                $scope.add.data.comment = result.data.comment;
                            }

                            $scope.add.data.tags = (typeof result.data.tags !== "undefined" ? result.data.tags : []);
                            $scope.add.addedTags = (typeof result.data.tags !== "undefined" ? result.data.tags.split(",") : []);
                        }
                    }, function(msg){
                        console.log(msg);
                    });
            };

            $scope.$watch('editTag.edit', function() {
                if($scope.editTag.edit == true){
                    $scope.edit($scope.editTag.id);
                    $scope.editTag.edit = false;
                }
            });

        }]
    }
}]);

