/// <reference path="../../../typings/angularjs/angular.d.ts" />
'use strict';

module AnalyticsDirectives{
	export class PieChart implements angular.IDirective {
		restrict: string = 'E';
		templateUrl: string = '../app/directives/pieChart/pieChart.html';

		//constructor(){}

		link: angular.IDirectiveLinkFn = ($scope: angular.IScope, el: angular.IAugmentedJQuery, attrs: angular.IAttributes) => {
				console.log('pie chart directive is loaded');
		};

		static factory(): angular.IDirectiveFactory {
			var directive: angular.IDirectiveFactory = () => {
					return new PieChart();
			}

			directive.$inject = [];
			return directive;
		}
	}

	angular.module('analyticsApp').directive('pieChart', PieChart.factory());
}