/// <reference path="../typings/angularjs/angular.d.ts" />

(function(angular) {
	'use strict';

//add analyticsApp.controllers
// analyticsApp.direcitves
// analyticsApp.services modules as dependencies
	angular.module('analyticsApp', ['ngRoute'])
        .config(config);
    
	function config($routeProvider, $locationProvider) {
		$locationProvider.html5Mode(true);

		$routeProvider
			.when('/', {
				templateUrl: '/app/controllers/overview/overview.html',
				controller: 'OverviewController',
				controllerAs: 'vm'
			})
			.otherwise({
				redirectTo: '/'
			});
	}
    
})(angular);