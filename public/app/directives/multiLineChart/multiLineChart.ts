/// <reference path="../../../typings/angularjs/angular.d.ts" />
'use strict';

module AnalyticsDirectives{
	export class MultiLineChart implements angular.IDirective {
		restrict: string = 'E';
		templateUrl: string = '../app/directives/multiLineChart/multiLineChart.html';

		//constructor(){}

		link: angular.IDirectiveLinkFn = ($scope: angular.IScope, el: angular.IAugmentedJQuery, attrs: angular.IAttributes) => {
				console.log('multi line chart directive is loaded');
		};

		static factory(): angular.IDirectiveFactory {
			var directive: angular.IDirectiveFactory = () => {
					return new MultiLineChart();
			}

			directive.$inject = [];
			return directive;
		}
	}

	angular.module('analyticsApp').directive('multiLineChart', MultiLineChart.factory());
}
//