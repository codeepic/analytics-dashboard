/// <reference path="../../../typings/angularjs/angular.d.ts" />

(function(angular){
	'use strict';
	
	angular.module('analyticsApp').controller('OverviewController', OverViewController);

	function OverViewController() {
		this.test = 'can you see me? Really?!!';
	}
})(angular)