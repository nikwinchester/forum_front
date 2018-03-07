"use strict";
angular.module("forum").controller("userInfoController",
    ["$scope", "$stateParams", "$http", "toastr", "$state", "localStorageService", function ($scope, $stateParams, $http, toastr, $state, localStorageService) {

        $("#userInfo").height(window.innerHeight*1.5);

        $scope.name = $stateParams.username;
        $scope.loginname = localStorageService.get("username");


        
        
        $scope.user = {};
        $scope.userinfo = function () {


            $http.post(SERVER_URL + "/users/getUserInfo", {"username": $stateParams["username"]})
                .then(function (response) {
                    $scope.user = response.data;
                })
                .catch(function (error) {
                    toastr.error(error.data.err);
                });
        };
        $scope.visible = true;
        $scope.toggle = function () {
            $scope.visible = !$scope.visible;
            $("#update").toggle();
        };

        $scope.update = function () {
            $http.post(SERVER_URL + "/users/updateUserInfo", $scope.user)
                .then(function (response) {
                    if (response.data.message == "OK") {
                        toastr.info("用户信息修改成功");
                        $scope.toggle();
                        $scope.userinfo();
                    }
                }).catch(function (error) {
                        $scope.userinfo();
                if (error.data) {
                    toastr.error(error.data.err);
                } else {
                    toastr.error("连接服务器失败!");
                }
            });
        };

        $scope.cancel = function () {
            $scope.toggle();
            $scope.selectUserInfo();
        };

        $scope.userinfo();

        $scope.postImg = function(img){



            var reader= new FileReader();

            var file =img.files[0];//获得input选择的图片文件
            console.log(file.size);
            if(file.size/1024<=256){
                reader.readAsDataURL(file);// base64 编码

                reader.addEventListener("load", function(e) {

                    document.getElementById("img").src  = e.target.result;
                    $scope.user.user_img = e.target.result;

                });
            }
            else{
                toastr.error("头像不得大于256KB");
            }




        }

    }
    ]);