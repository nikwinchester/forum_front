
"use strict";

angular.module("forum",
    ['ngAnimate', 'ngResource', 'ui.router', "ngSanitize", 'toastr', 'satellizer', 'ui.bootstrap',"ngFileUpload", 'angular-loading-bar', 'LocalStorageModule', 'angular-carousel', 'monospaced.qrcode', 'colorpicker.module']);


//CONST
var SERVER_URL = "http://127.0.0.1:9000";
var ONLINE_MODE = true;

angular.module("forum").controller("appController",
    ["$scope",
        function ($scope) {

            var getLoginPartial = function () {
                //为了让这个html刷新有时候它不刷新
                var random = Math.random();
                return "loginPartial/loginPartial.template.html?r=" + random;
            };
            $scope.loginPartial = getLoginPartial();

            $scope.$on('userStateChange', function () {
                $scope.loginPartial = getLoginPartial();
            });


            $(".nav > li").on("click",function () {

                $(this).addClass("active").siblings("li").removeClass('active');

            });



        }]);
