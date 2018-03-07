"use strict";
angular.module("forum").controller('shareController',
    ["$scope", "$http", "toastr", "localStorageService", "$uibModal", "$stateParams", "$state","Upload",
        function ($scope, $http, toastr, localStorageService, $uibModal, $stateParams, $state,Upload) {
            $scope.serverurl=SERVER_URL;

            $scope.username=localStorageService.get("username");
            $scope.downloads=[];
            $scope.hotFiles=[];
            $scope.getDownloadList = function () {
                $http.post(SERVER_URL + "/file/getFileList", {})
                    .then(function (response) {
                            $scope.downloads=response.data;

                    })
                    .catch(function (error) {
                        toastr.error(error.data.err);
                    });

            };


            $scope.getHotFiles = function () {
                $http.post(SERVER_URL + "/file/getHotFiles", {})
                    .then(function (response) {
                        $scope.hotFiles=response.data;
                    })
                    .catch(function (error) {
                        toastr.error(error.data.err);
                    });

            };


            $scope.getDownloadList();
            $scope.getHotFiles();


            $scope.openFileEditor=function (file) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: '/shareEditor/shareEditor.template.html',
                    controller: 'shareEditorController',
                    size: "lg",
                    resolve: {
                        items: function () {
                            return file;
                        }
                    }
                });

                modalInstance.result.then(function (item) {
                    if(item==="delete" || item==="modify"){
                        //$state.go("home",null,{"reload":true});
                    }
                    
                    $scope.getDownloadList();
                    $scope.getHotFiles();
                    
                    //toastr.info("请不要忘记保存修改!");
                }, function () {
                    //alert('Modal dismissed at: ' + new Date());
                });
            };

            $scope.searchFile=function (searchss) {
                if(searchss) {
                    $http.post(SERVER_URL + "/searchForFile", {"exp": searchss})
                        .then(function (response) {
                            $scope.downloads = response.data;
                        })
                        .catch(function (error) {
                            toastr.error(error.data.err);
                        });
                }else{
                    $scope.getDownloadList();
                }

            };

        }]);

