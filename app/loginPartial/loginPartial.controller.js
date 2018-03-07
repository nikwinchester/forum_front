"use strict";

angular.module("forum").controller('loginPartialController',
    ["$scope", "$http", "toastr", "localStorageService", "$uibModal", "$state","$auth","$rootScope",
        function ($scope, $http, toastr, localStorageService, $uibModal, $state,$auth,$rootScope) {

            $scope.username=localStorageService.get("username");
            $scope.logedIn=$auth.isAuthenticated(); //认证登录
            console.log($scope.logedIn);
            $scope.logout=function () {
                $auth.logout();
                //广播用户状态改变
                $rootScope.$broadcast('userStateChange');
                toastr.info("您已退出登录");
            };

        }]);
