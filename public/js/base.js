;(function(){
	'use strict';

    window.his = {
        id: parseInt($('html').attr('user-id'))
    }
    console.log('his', his);
	
	angular.module('xiaohu', [
    'ui.router',
    'common',
    'question',
    'user',
    'answer',
    ])
  .config([
    '$interpolateProvider',
    '$stateProvider',
    '$urlRouterProvider', 
    function($interpolateProvider, 
             $stateProvider, 
             $urlRouterProvider)
    {
      $interpolateProvider.startSymbol('[:');
      $interpolateProvider.endSymbol(':]');
  
      $urlRouterProvider.otherwise('/home');
  
      $stateProvider
         .state('home', {
            url: '/home',
            templateUrl: '/tpl/page/home'
         })
         .state('signup', {
            url: '/signup',
            templateUrl: '/tpl/page/signup'
         })
         .state('login', {
            url: '/login',
            templateUrl: '/tpl/page/login'
         })
         .state('question', {
            abstract: true,
            url: '/question',
            template: '<div ui-view></div>'
         })
         .state('question.add', {
            url: '/add',
            templateUrl: '/tpl/page/question_add'
         })
         .state('user', {
            url: '/user/:id',
            templateUrl: '/tpl/page/user'
         })
    }])

  
})();