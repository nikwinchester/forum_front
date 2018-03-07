"use strict";

angular.module("forum").controller('homeController',
    ["$scope", "$http", "toastr", "localStorageService", "$uibModal", "$state",
        function ($scope, $http, toastr, localStorageService, $uibModal, $state) {

            //测试
            // $scope.test=function () {
            //     $http.post(SERVER_URL + "/json",{"username":1,"password":2,"gender":"男","realname":123})
            //         .then(function (response) {
            //      console.log(response.data);
            //         }).catch(function (err) {
            //         toastr.error(err.data.err);
            //     })
            // };

            $scope.infoSideBarTemplate = "infoSideBar/infoSideBar.template.html";
            $scope.nowTime = new Date().toISOString();
            $scope.username = localStorageService.get("username");
            $scope.topics = [];
            $scope.tmpTopics = [];


            $scope.getPartialTopics = function (offset) {
                $http.post(SERVER_URL + "/getIndex", {"offset": offset})
                    .then(function (response) {
                        $scope.tmpTopics = response.data;
                        //合并两个数组，两个数组都会变成合并后的数组，concat也可以不过返回不同
                        Array.prototype.push.apply($scope.topics, $scope.tmpTopics);
                    }).catch(function (err) {
                    toastr.error(err.data.err);
                })
            };


            //first load
            $scope.getPartialTopics(null);


            $scope.categorys = [
                {
                    name: "全部",
                    value: ""
                },
                {
                    name: "技术分享",
                    value: "技术分享"
                },
                {
                    name:"问题求助",
                    value:"问题求助"
                },
                {
                    name:"灌水闲聊",
                    value:"灌水闲聊"
                }
            ];


            $scope.categoryFilter=$scope.categorys[0];

            $scope.changeCategoryFilter=function (category) {
                $scope.categoryFilter=category;
            };



            //通过发送页面最后一条帖子的时间戳加载更多
            $scope.loadMore = function () {
                if ($scope.topics.length > 0) {
                    $scope.getPartialTopics($scope.topics[$scope.topics.length - 1].updated_at);
                }
            };



            /*返回间隔天数*/
            $scope.getDateDiff = function (startDate, endDate) {
                var startTime = new Date(startDate).getTime();
                var endTime = new Date(endDate).getTime();
                return parseInt(Math.abs((startTime - endTime)) / (1000 * 60 * 60 ));
            };

            $scope.openTopicEditor = function (topic) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: '/topicEditor/topicEditor.template.html',
                    controller: 'topicEditorController',
                    size: "lg",
                    resolve: {
                        items: function () {          //传值
                            return topic;
                        }
                    }
                });

                //模态框已关闭返回
                modalInstance.result.then(function (item) {
                    if (item === "delete" || item === "modify") {
                        $state.go("home", null, {"reload": true});
                    }
                    //toastr.info("请不要忘记保存修改!");
                }, function () {
                    //alert('Modal dismissed at: ' + new Date());
                });
            };

            $scope.searchTopic=function (searchss) {
                if(searchss) {
                    $http.post(SERVER_URL + "/searchForForum", {"exp": searchss})
                        .then(function (response) {
                            $scope.topics = response.data;
                        })
                        .catch(function (error) {
                            toastr.error(error.data.err);
                        });
                }else{
                    $scope.topics=[];
                    $scope.getPartialTopics(null);
                }

            };


        }]);
