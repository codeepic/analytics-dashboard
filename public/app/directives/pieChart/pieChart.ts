/// <reference path="../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../typings/d3/d3.d.ts" />
/// <reference path="../../services/coloursService.ts" />
'use strict';

module AnalyticsDirectives{
	export class PieChart implements angular.IDirective {
		restrict: string = 'E';
		replace: boolean = true;
		templateUrl: string = '../app/directives/pieChart/pieChart.html';
        scope = {
            data: '='    
        };
        
		constructor(private ColoursService: AnalyticsServices.ColoursService){
            console.log('chartColours service: ', this.ColoursService.colours);
        }

        // you can set $scope to implement certain interface that extends angular.IScope, 
		// but then you will tie the directive to one data set and it will not be
		// reusable, therefore use 'any' instead
		link: angular.IDirectiveLinkFn = ($scope: any, el: angular.IAugmentedJQuery, attrs: angular.IAttributes) => {
            var data = $scope.data, that = this;
            
            if(data){
                drawChart();    
            }
            
            //resize chart on browser resize
            //fn goes here
            
            function drawChart(){
                var width = 960,
                    height = 500,
                    radius = Math.min(width, height) / 2;
                //DEBUG                    
                //var colourValuesArr = d3.values(that.ColoursService.colours);
                //var colour = d3.scale.ordinal().range(colourValuesArr);
                //console.log('colourValuesArr: ', colourValuesArr, ' colour: ', colour);
                
                var colourValues = d3.scale.ordinal().range(d3.values(that.ColoursService.colours));
                //var colourValues = d3.scale.ordinal().range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);
                
                var arc = d3.svg.arc()
                    .outerRadius(radius - 10)
                    .innerRadius(radius - 70);
                    
                var pie = d3.layout.pie()
                    .sort(null)
                    .value(function(d: any) {return d.quantity});
                    
                var svg = d3.select('.pie-chart').append('svg')
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
                    //.style('fill', function(d) {return colour(d.data.category)});
                    .style('fill', function(d: any) {
                        //console.log('i: ', i, 'colour: ', colour, 'colour i: ', colour[i]);
                        //return colour[i];
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