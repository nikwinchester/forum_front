"use strict";
angular.module("forum").controller("userArticleController",
    ["$scope", "$stateParams", "$http", "toastr", "$state", "localStorageService", function ($scope, $stateParams, $http, toastr, $state, localStorageService) {

        $("#userInfo").height(window.innerHeight);

        $scope.name = $stateParams.username;


        $scope.shows=[];

        $scope.mytopiclist = function () {
            $http.post(SERVER_URL + "/forum/getForumByUser", {"username": $stateParams["username"]})
                .then(function (response) {
                    $scope.articles = response.data;

                    $scope.shows=[];

                        $scope.shows=$scope.articles;


                }).catch(function (error) {
                if (error.data) {
                    toastr.error(error.data.err);
                } else {
                    toastr.error("连接服务器失败!");
                }
            });


        };

        $scope.mytopiclist();



    }
    ]);