"use strict";

angular.module("forum").controller('infoSideBarController',
    ["$scope", "$http", "toastr", "localStorageService", "$uibModal", "$state", "$auth",
        function ($scope, $http, toastr, localStorageService, $uibModal, $state, $auth) {

            $scope.user = {};


            $scope.selectUserInfo = function () {
                $http.post(SERVER_URL + "/users/getUserInfo", {"username": $scope.username})
                    .then(function (response) {
                        $scope.user = response.data;
                        if ($scope.user.sign!==null||$scope.user.sign!==''){
                            $scope.flag=false;
                        }
                        else {
                            $scope.flag=true;
                        }

                    })
                    .catch(function (error) {
                        toastr.error(error.data.err);
                    });


            };


            $scope.refreshUserInfo = function () {
                if ($scope.logedIn) {
                    $scope.selectUserInfo();
                }
            };

            $scope.refreshUserInfo();

            $scope.getUserState = function () {
                $scope.username = localStorageService.get("username");
                $scope.logedIn = $auth.isAuthenticated();
                $scope.refreshUserInfo();

            };

            $scope.$on('userStateChange', function () {
                $scope.getUserState();
            });


            $scope.getUserState();

            //test
            $scope.announcements = [
                {
                    'title': "这是一个测试1",
                    'content': "test1"
                },
                {
                    'title': "这是一个测试2",
                    'content': "test2"
                },
                {
                    'title': "这是一个测试3",
                    'content': "test3"
                }
            ];


            // $scope.announcements = [];
            // $scope.getAnnouncement = function () {
            //     $http.post(SERVER_URL + "/getAnnouncement", {})
            //         .then(function (response) {
            //             $scope.announcements = response.data;
            //         }).catch(function (err) {
            //         toastr.error(error.data.err);
            //     })
            // };
            // $scope.getAnnouncement();


        }]);
