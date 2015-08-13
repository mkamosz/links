/**
 * Created by kamoszm on 2015-07-14.
 */

app.service('path', function(){
    this.url = function(){
        return {
            img :               "assets/img/",
            imgContent :        "assets/img/content/",
            imgLayout :         "assets/img/layout/",
            userProfile :       "/server/user_guide/_images/",
            newsImages :        "/server/user_guide/_news/",
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
                logout :        "/server/login",
                user :          "/server/user",
                link :          "/server/link",
                tag :           "/server/tag",
                crop :          "/server/crop",
                account :       "/server/account",
                follow :        "/server/follow",
                followed :      "/server/followed",
                userrating:     "/server/userrating",
                page : {
                    contact :   "/server/page/contact",
                    news :      "/server/page/news",
                    faq :      "/server/page/faq"
                }
            },
            template : {
                action :        "core/common/header/action/action.tpl.html",
                loader :        "core/common/loader/loader.tpl.html",
                addlink :       "core/common/addlink/addlink.tpl.html",
                followed :      "core/common/followed/followed.tpl.html",
                listlink :      "core/common/listlink/listlink.tpl.html",
                listtag :       "core/common/listtag/listtag.tpl.html",
                sidebar :       "core/common/sidebar/sidebar.tpl.html",
                notifi :        "core/common/notifi/notifi.tpl.html",
                messages :      "core/common/messages/messages.tpl.html",
                strength :      "core/common/strength/strength.tpl.html",
                userprofile :   "core/common/userprofile/userprofile.tpl.html",
                rated :         "core/common/rated/rated.tpl.html"
            },
            pages : {
                hp :            "#/",
                about :         "#/page/about",
                faq :           "#/page/faq",
                news :          "#/page/news",
                contact :       "#/page/contact",
                signin :        "#/page/signin",
                signup :        "#/page/signup",
                settings :      "#/myprofile/personal",
                dashboard :     "#/myprofile/dashboard",
                addlink:        "#/myprofile/addlink",
                followed:       "#/myprofile/followed",
                notifications:  "#/myprofile/notifications",
                personal :      "#/myprofile/personal",
                social :        "#/myprofile/social",
                password :      "#/myprofile/password"
            }
        };
    }
});