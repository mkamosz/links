/**
 * Created by kamoszm on 2015-07-18.
 */

app.service('loaderService',function(){
    this.active = function(){
        return {
            message : "Loading....",
            active : "active"
        }
    };
    this.inactive = function(){
        return {
            message : "",
            active : ""
        }
    };
});