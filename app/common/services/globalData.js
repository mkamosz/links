/**
 * Created by kamoszm on 2015-07-15.
 */

app.service('globalData', ['conn', '$q', 'path','sidebarNav','$timeout', function(conn, $q, path,sidebarNav,$timeout){
    var staticRefresh = function(){
            data.sidebar.state = (typeof data.userInfo.state !== 'undefined' ? data.userInfo.state : '');
            data.layout.showProfile = data.userInfo.logged;
        },
        data = {
            listLinks : [],
            listTags : [],
            userData : {
                avatar : ''
            },
            listNews : [],
            listFaq : [],
            listCountries : [],
            search : {
                show : false,
                placeholder : 'search',
                text : ''
            },
            userInfo : {"logged" : false},
            layout : {
                showFooter : true,
                showProfile : false,
                showAddLinkForm : false
            },
            loader : {
                show : function(){
                    data.loader.set = "active"
                },
                hide : function(){
                    data.loader.set = ""
                },
                set : "active"
            },
            editTag : {
                id : null,
                show : false
            },
            sidebar : {
                nav : sidebarNav.getNav(),
                state : ''
            },
            notifi : {
                show : function(msg,type){
                    data.notifi.visible = true;
                    data.notifi.msg = msg;
                    data.notifi.state = (typeof type === "undefined" ? data.notifi.state : type);
                    $timeout(function(){
                        data.notifi.hide();
                        data.notifi.state = 'success';
                    },3000);
                },
                hide : function(msg){
                    data.notifi.visible = false;
                    data.notifi.msg = "";
                },
                visible : false,
                state : 'success',
                msg : 'error'
            },
            path : path.url()
        };

    this.getData = function(type){
        staticRefresh();
        if(typeof type === 'undefined'){
           return data;
        } else{
           return data[type];
        }
    };

    this.setData = function(type, d){
        data[type] = d;
    };

    this.setPropData = function(type,prop,d){
        data[type][prop] = d;
    };

    this.refreshUserData = function(){
        var deferred = $q.defer();
        conn.getData(data.path.server.user, {params : {username : data.userInfo.username, access_token : data.userInfo.access_token}}).then(function(result){
            if(result.status == true){
                data.userData = result.data;
                deferred.resolve({userData : data.userData});
            } else{
                clearUserInfo();
                deferred.reject({authenticated: false, userInfo : data.userInfo, message : result.message});
            }
        }, function(result){
            clearUserInfo();
            deferred.reject({authenticated: false, message : result.message});
        });
        return deferred.promise;
    };
}]);