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
            server : {
                login :         "/server/login",
                logout :        "/server/logout",
                user :          "/server/user",
                link :          "/server/link"
            },
            template : {
                loader :        "core/common/loader/loader.tpl.html",
                addlink :       "core/common/addlink/addlink.tpl.html",
                listlink :      "core/common/listlink/listlink.tpl.html"
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