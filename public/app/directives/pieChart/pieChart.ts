/// <reference path="../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../typings/d3/d3.d.ts" />
/// <reference path="../../services/coloursService.ts" />
'use strict';

module AnalyticsDirectives{
	export class PieChart implements angular.IDirective {
		restrict: string = 'E';
		replace: boolean = true;
        transclude: boolean = true;
		templateUrl: string = '../app/directives/pieChart/pieChart.html';
        scope = {
            chartName: '@',
            className: '@',
            data: '='    
        };
        
		constructor(private ColoursService: AnalyticsServices.ColoursService){}

        // you can set $scope to implement certain interface that extends angular.IScope, 
		// but then you will tie the directive to one data set and it will not be
		// reusable, therefore use 'any' instead
		link: angular.IDirectiveLinkFn = ($scope: any, el: angular.IAugmentedJQuery, attrs: angular.IAttributes) => {
            var elWidth: number, elHeight: number, data = $scope.data, that = this;
            
            if(data){ drawChart(); }
            
            //resize chart on browser resize
            $scope.$watch(() => {
                elWidth = el.context.clientWidth;
                elHeight = el.context.clientHeight;
                return elWidth * elHeight;
            }, () => {
                removeChart();
                drawChart(elWidth);
            });
            
            function removeChart(){
                d3.select('#' + el.context.id + ' svg').remove();
            }
            
            function drawChart(w: number = 460){
                var width = w,
                    height = w,
                    radius = Math.min(width, height) / 2;
                
                var colourValues = d3.scale.ordinal().range(d3.values(that.ColoursService.colours));
                
                var arc = d3.svg.arc()
                    .outerRadius(radius - 10)
                    .innerRadius(radius - 50); //70 230
                    
                var pie = d3.layout.pie()
                    .sort(null)
                    .value(function(d: any) {return d.quantity});
                        
                var svg = d3.select('#'+ el.context.id).append('svg')
                    .attr('width', width)
                    .attr('height', height)
                    .append('g')
                    .attr('transform', 'translate(' + width / 2 + ',' + height/2 + ')');
                    
                var g = svg.selectAll('.arc')
                    .data(pie(data))
                    .enter().append('g')
                    .attr('class', 'arc');
                    
                g.append('path')
                    .attr('d', <any>arc)
                    .attr('fill', function (d: any): any {
                        return colourValues(d.data.category); 
                    });
                                
            }
		};

		static factory(): angular.IDirectiveFactory {
			var directive: angular.IDirectiveFactory = (ColoursService) => {
					return new PieChart(ColoursService);
			}

			directive.$inject = ['ColoursService'];
			return directive;
		}
	}

	angular.module('analyticsApp').directive('pieChart', PieChart.factory());
}

