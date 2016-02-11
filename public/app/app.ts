/// <reference path="../typings/angularjs/angular.d.ts" />

(function(angular) {
	'use strict';

	console.log('angular app started');

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