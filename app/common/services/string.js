/**
 * Created by kamoszm on 2015-07-19.
 */

app.service('stringOperation',function(){
   this.stringToArray = function(str){
       return str.split(",");
   }
    this.decodeSpecialCharacters = function(str){
        var arr = {
            "\\u0105" : "ą",
            "\\u0104" : "Ą",
            "\\u0119" : "ę",
            "\\u0118" : "Ę",
            "\\u00f3" : "ó",
            "\\u00d3" : "Ó",
            "\\u015b" : "ś",
            "\\u015a" : "Ś",
            "\\u0142" : "ł",
            "\\u0141" : "Ł",
            "\\u017c" : "ż",
            "\\u017b" : "Ż",
            "\\u017a" : "ź",
            "\\u0179" : "Ź",
            "\\u0107" : "ć",
            "\\u0106" : "Ć",
            "\\u0144" : "ń",
            "\\u0143" : "Ń"

        };

        for (var key in arr) {
            if (arr.hasOwnProperty(key)) {
                str = str.replace(/key/g, arr[key]);
            }
        }
        return str
    }
});
