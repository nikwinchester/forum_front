"use strict";
angular.module("forum").controller('shareDetailController',
    ["$scope", "$http", "toastr", "$stateParams","$state",
        function ($scope, $http, toastr, $stateParams,$state) {

            $scope.serverurl=SERVER_URL;
            $scope.shareDetail={};
            $scope.fileDetail = function () {
                $http.post(SERVER_URL + "/file/getFileById", {"_id": $stateParams["_id"]})
                    .then(function (response) {
                        $scope.fileDetail = response.data;
                        console.log($scope.fileDetail);

                    })
                    .catch(function (error) {
                        toastr.error(error.data.err);
                    });
            };
            $scope.fileDetail();


        }]);