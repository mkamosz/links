/**
 * Created by kamoszm on 2015-07-15.
 */

app.directive("required", function() {
    return {
        restrict: "A",
        require: "?ngModel",
        link: function(scope, element, attributes, ngModel) {
            ngModel.$validators.required = function(modelValue) {
                return (modelValue != '' && modelValue !== null)
            };
        }
    };
});

app.directive("url", function() {
    return {
        restrict: "A",
        require: "?ngModel",
        link: function(scope, element, attributes, ngModel) {
            ngModel.$validators.url = function(modelValue) {
                var regEx = /(^|\s)((https?:\/\/)?[\w-]+(\.[\w-]+)+\.?(:\d+)?(\/\S*)?)/gi;
                if (modelValue != '' && modelValue !== null) {
                    return regEx.test(modelValue);
                }
                return true;
            };
        }
    };
});

app.directive("email", function() {
    return {
        restrict: "A",
        require: "?ngModel",
        link: function(scope, element, attributes, ngModel) {
            ngModel.$validators.email = function(modelValue) {
                var regEx = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;

                if (modelValue != '' && modelValue !== null) {
                    return regEx.test(modelValue);
                }
                return true;
            };
        }
    };
});

app.directive("number", function() {
    return {
        restrict: "A",
        require: "?ngModel",
        link: function(scope, element, attributes, ngModel) {
            ngModel.$validators.number = function(modelValue) {
                var regEx = /^\d+$/;
                if (modelValue != '' && modelValue !== null) {
                    return regEx.test(modelValue);
                }
                return true;
            };
        }
    };
});