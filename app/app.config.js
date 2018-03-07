"use strict";
angular.module("forum").config(["$stateProvider", "$urlRouterProvider", "toastrConfig",
    function ($stateProvider, $urlRouterProvider, toastrConfig) {

        $stateProvider.state("home", {
            url: "/",
            templateUrl: "home/home.template.html",
            controller: "homeController"
        }).state("login", {
            url: "/login",
            templateUrl: "login/login.template.html",
            controller: "loginController"
        }).state("profile", {
            url: "/profile",
            templateUrl: "profile/profile.template.html",
            controller: "profileController"
        }).state("detail", {
            url: "/detail/:id",
            templateUrl: "detail/detail.template.html",
            controller: "detailController"
        }).state("userInfo", {
            url: "/userInfo/:username",
            templateUrl: "userInfo/userInfo.template.html",
            controller: "userInfoController"
        }).state("myarticle", {
            url: "/myarticle/:username",
            templateUrl: "userInfo/myarticle.template.html",
            controller: "userArticleController"
        }).state("myreply", {
            url: "/myreply/:username",
            templateUrl: "userInfo/myreply.template.html",
            controller: "userReplyController"
        }).state("myfile", {
            url: "/myfile/:username",
            templateUrl: "userInfo/myfile.template.html",
            controller: "userFileController"
        }).state("register", {
            url: "/register",
            templateUrl: "register/register.template.html",
            controller: "registerController"
        }).state("share", {
            url: "/share",
            templateUrl: "share/share.template.html",
            controller: "shareController"
        }).state("shareDetail",{
            url:"/shareDetail/:_id",
            templateUrl:"shareDetail/shareDetail.template.html",
            controller:"shareDetailController"
        });

        $urlRouterProvider.otherwise("/");

        angular.extend(toastrConfig, {
            extendedTimeOut: 1000,
            timeOut: 1000
        });


    }]);