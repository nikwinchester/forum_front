
"use strict";

//app.directive

angular.module("forum").directive("onScrollToBottom", ["$document", function ($document) {
    //This function will fire an event when the container/document is scrolled to the bottom of the page
    return {
        restrict: "A",
        link: function (scope, element, attrs) {

            var doc = angular.element($document)[0].body;

            $document.bind("scroll", function () {
                //scrollTop 滚动条垂直距离  scrollHeight，可滚动高度
                if (doc.scrollTop + window.innerHeight >= doc.scrollHeight) {
                    //手动调$scope方法，使dom重绘。
                    scope.$apply(attrs.onScrollToBottom);
                }
            });
        }
    };
}]);
