"use strict";
angular.module("forum").controller("userReplyController",
    ["$scope", "$stateParams", "$http", "toastr", "$state", "localStorageService", function ($scope, $stateParams, $http, toastr, $state, localStorageService) {

        $("#userInfo").height(window.innerHeight*1.2);

        $scope.name = $stateParams.username;

        $scope.shows=[];

        $scope.toggleReply = function () {


            $http.post(SERVER_URL + "/comment/getCommentByUser", {"username": $stateParams["username"]})
                .then(function (response) {
                    $scope.replys = response.data;

                    $scope.shows=[];

                        $scope.shows=$scope.replys;

                })
                .catch(function (error) {
                    if (error.data) {
                        toastr.error(error.data);
                    } else {
                        toastr.error("连接服务器失败!");
                    }
                });




        };


        $scope.toggleReply();


    }
    ]);
