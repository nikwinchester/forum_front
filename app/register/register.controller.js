"use strict";

angular.module("forum").controller("registerController",
    ["$scope", "toastr", "$stateParams", "$auth", "$state", "$http",
        function ($scope, toastr, $stateParams, $auth, $state, $http) {
            $("#wrap").height(window.innerHeight);

            $scope.registerInfo = {};

            $scope.mySubmit = function () {

                console.log($scope.registerInfo);

                $auth.signup($scope.registerInfo, {url: SERVER_URL + "/users/signUp"}).then(
                    function (response) {
                        if (response.data.message != undefined) {
                            toastr.info("注册成功,请登录");
                            $state.go("login");
                        }

                    }, function (error) {
                        if (error.data) {
                            toastr.error(error.data.err);
                        } else {
                            toastr.error("连接服务器失败!");
                        }
                    }
                );

            }
        }
    ]);