/**
 * Created by kamoszm on 2015-07-14.
 */

app.service('path', function(){
    this.url = function(){
        return {
            img :               "assets/img/",
            imgContent :        "assets/img/content/",
            imgLayout :         "assets/img/layout/",
            css :               "assets/css/",
            js :                "assets/js/",
            jsLibs :            "assets/js/libs/",
            common :            "common/",
            commonDirectives :  "common/directives/",
            commonFactorys :    "common/factories/",
            commonServices :    "common/services/",
            core :              "core/",
            login :             "/server/login",
            logout :            "/server/login",
            user :              "/server/user",
            template : {
                loader :        "core/common/loader/"
            },
            pages : {
                about :         "#/page/about",
                faq :           "#/page/faq",
                news :          "#/page/news",
                community :     "#/page/community",
                signin :        "#/page/signin",
                signup :        "#/page/signup",
                dashboard :     "#/myprofile/dashboard",
                settings :      "#/myprofile/settings"
            }
        };
    }
});