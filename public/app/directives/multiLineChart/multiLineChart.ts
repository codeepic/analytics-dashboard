/// <reference path="../../../typings/angularjs/angular.d.ts" />
'use strict';

module AnalyticsDirectives{
	export class MultiLineChart implements angular.IDirective {
		restrict: string = 'E';
		templateUrl: string = '../app/directives/multiLineChart/multiLineChart.html';
        scope = {
            data: '='
        };
		//constructor(){}
        
        // you can set $scope to implement certain interface that extends angular.IScope, 
		// but then you will tie the directive to one data set and it will not be
		// reusable, therefore use 'any' instead
        
		link: angular.IDirectiveLinkFn = ($scope: any, el: angular.IAugmentedJQuery, attrs: angular.IAttributes) => {
            
            var elWidth: number, elHeight: number, data = $scope.data;
            
            //d3 chart starts
            //based on http://bl.ocks.org/mbostock/3884955
            
            //d3 chart ends
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