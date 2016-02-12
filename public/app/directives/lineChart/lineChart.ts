/// <reference path="../../../typings/angularjs/angular.d.ts" />
'use strict';

module AnalyticsDirectives{
	export class LineChart implements angular.IDirective {
		restrict: string = 'E';
		templateUrl: string = '../app/directives/lineChart/lineChart.html';
		scope = {
			data: '='
		}

		//constructor(){}
		
		// you can set $scope to implement certain interface that extends angular.IScope, 
		// but then you will tie the directive to one data set and it will not be
		// reusable, therefore use 'any' instead
		link: angular.IDirectiveLinkFn = ($scope: any, el: angular.IAugmentedJQuery, attrs: angular.IAttributes) => {
				console.log('line chart directive is loaded, its data: ', $scope.data );

				//set D3 chart here
		};

		static factory(): angular.IDirectiveFactory {
			var directive: angular.IDirectiveFactory = () => {
					return new LineChart();
			}

			directive.$inject = [];
			return directive;
		}
	}

	angular.module('analyticsApp').directive('lineChart', LineChart.factory());
}