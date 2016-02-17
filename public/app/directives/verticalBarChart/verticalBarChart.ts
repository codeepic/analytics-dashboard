/// <reference path="../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../typings/d3/d3.d.ts" />

'use strict';

module AnalyticsDirectives {
    export class VerticalBarChart {
        restrict: string = 'E';
		replace: boolean = true;
		templateUrl: string = '../app/directives/verticalBarChart/verticalBarChart.html';
        scope = {
            chartHeading: '@',
            data: '='    
        };
        
        constructor(){
            console.log('awesome vertical chart is here');
        }
        
        //angular.IScope
        link: angular.IDirectiveLinkFn = ($scope: any, el: angular.IAugmentedJQuery, attrs: angular.IAttributes) => {
            var data;
            
            if($scope.data) { data = $scope.data; }
            
            drawChart();
            
            function drawChart(){ //based on //http://bl.ocks.org/Caged/6476579
                console.log('drawing vertical bar chart: ', data);
            }
        }
        
        static factory(): angular.IDirectiveFactory {
            var directive: angular.IDirectiveFactory = () => {
                return new VerticalBarChart();    
            }
            directive.$inject = [];
            return directive
        }
    }
    
    angular.module('analyticsApp').directive('verticalBarChart', VerticalBarChart.factory());
}