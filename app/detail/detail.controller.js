"use strict";
angular.module("forum").controller('detailController',
    ["$scope", "$http", "toastr", "localStorageService", "$uibModal", "$stateParams","$state",
        function ($scope, $http, toastr, localStorageService, $uibModal, $stateParams,$state) {

            $scope.changeableComment={};
            $scope.infoSideBarTemplate="infoSideBar/infoSideBar.template.html";

            $scope.nowTime=new Date().toISOString();
            $scope.topic = {};
            $scope.username = localStorageService.get("username");
            $scope.comments = [];


            $scope.getTopicDetail=function () {
                $http.post(SERVER_URL + "/forum/getForumById", {"f_id": $stateParams["id"]})
                    .then(function (response) {
                        $scope.topic = response.data;
                        $scope.comments = response.data.comments;


                        $scope.changeableComment.f_id=$scope.topic.f_id;

                    })
                    .catch(function (error) {
                        toastr.error(error.data.err);
                    });
            };
            $scope.getTopicDetail();



            $scope.quill = new Quill('#topic-new-editor', {
                modules: {
                    toolbar: {
                        container: '#topic-new-toolbar'
                    }
                },
                theme:"snow"
            });


            $scope.submitComment=function(){



                if($scope.status.edit===false){
                    $scope.changeableComment.content=$scope.quill.root.innerHTML;
                    $http.post(SERVER_URL+"/comment/createComment",$scope.changeableComment)
                        .then(function(response){
                            toastr.info("发表成功");
                            $scope.getTopicDetail();
                        })
                        .catch(function(error){
                            toastr.error(error.data.err);
                        });
                }else{
                    $scope.changeableComment.comment=$scope.quill.root.innerHTML;
                    $http.post(SERVER_URL+"/comment/updateComment",$scope.changeableComment)
                        .then(function(response){
                            toastr.info("修改成功");
                            $scope.getTopicDetail();
                            $scope.status.edit=false;
                        })
                        .catch(function(error){
                            toastr.error(error.data.err);
                        });
                }



            };

            /**
             * @return {number}
             */
            $scope.getDateDiff=function (startDate,endDate)
            {
                var startTime = new Date(startDate).getTime();
                var endTime = new Date(endDate).getTime(); //返回毫秒数
                return  parseInt(Math.abs((startTime - endTime)) / (1000 * 60 * 60 ));
            };



            $scope.status={
                edit:false
            };


            $scope.editComment=function (comment) {

                $scope.changeableComment.c_id=comment.c_id;
                $scope.quill.root.innerHTML=comment.comment;
                $scope.status.edit=true;
                $($scope.quill.root).focus();
            };




            $scope.deleteComment=function (id) {
                $http.post(SERVER_URL+"/comment/deleteComment",{"c_id":id})
                    .then(function(response){
                        toastr.info("删除成功");
                        $scope.getTopicDetail();
                    })
                    .catch(function(error){
                        toastr.error(error.data.err);
                    });

            };


            $scope.openTopicEditor=function (topic) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: '/topicEditor/topicEditor.template.html',
                    controller: 'topicEditorController',
                    size: "lg",
                    resolve: {
                        items: function () {
                            return topic;
                        }
                    }
                });

                modalInstance.result.then(function (item) {
                    if(item==="delete"){
                        $state.go("home");
                    }else if(item==="modify"){
                        $scope.getTopicDetail();
                    }
                    //toastr.info("请不要忘记保存修改!");
                }, function () {
                    //alert('Modal dismissed at: ' + new Date());
                });
            }


        }]);

