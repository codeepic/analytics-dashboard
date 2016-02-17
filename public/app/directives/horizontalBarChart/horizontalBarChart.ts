/// <reference path="../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../typings/d3/d3.d.ts" />

'use strict';

module AnalyticsDirectives {
    export class HorizontalBarChart {
        restrict: string = 'E';
		replace: boolean = true;
		templateUrl: string = '../app/directives/horizontalBarChart/horizontalBarChart.html';
        scope = {
            data: '='    
        };
        
        constructor(){
            console.log('HorizontalBarChart directive init');
        }
        
        //angular.IScope
        link: angular.IDirectiveLinkFn = ($scope: any, el: angular.IAugmentedJQuery, attrs: angular.IAttributes) => {
            var data;
            
            if($scope.data) { data = $scope.data; }
        }
        
        static factory(): angular.IDirectiveFactory {
            var directive: angular.IDirectiveFactory = () => {
                return new HorizontalBarChart();
            };
            directive.$inject = [];
            return directive
        }
        
    }
    
    angular.module('analyticsApp').directive('horizontalBarChart', HorizontalBarChart.factory());
}