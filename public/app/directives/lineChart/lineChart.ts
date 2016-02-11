/// <reference path="../../../typings/angularjs/angular.d.ts" />
'use strict';

module AnalyticsDirectives{
	export class LineChart implements angular.IDirective {
		restrict: string = 'E';
		templateUrl: string = '../app/directives/lineChart/lineChart.html';

		//constructor(){}

		link: angular.IDirectiveLinkFn = ($scope: angular.IScope, el: angular.IAugmentedJQuery, attrs: angular.IAttributes) => {
				console.log('line chart directive is loaded');
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