"use strict";
angular.module("forum").controller("userFileController",
    ["$scope", "$stateParams", "$http", "toastr", "$state", "localStorageService", function ($scope, $stateParams, $http, toastr, $state, localStorageService) {

        $("#userInfo").height(window.innerHeight);

        $scope.name = $stateParams.username;



        $scope.shows=[];


        $scope.toggleFile = function () {


            $http.post(SERVER_URL + "/file/getFileByUser", {"username": $stateParams["username"]})
                .then(function (response) {
                    $scope.files = response.data;
                        $scope.shows= $scope.files;

                })
                .catch(function (error) {
                    if (error.data) {
                        toastr.error(error.data);
                    } else {
                        toastr.error("连接服务器失败!");
                    }
                });
        };


        $scope.toggleFile();

    }
    ]);