/// <reference path="../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../typings/d3/d3.d.ts" />
/// <reference path="../../services/usersService.ts" />
/// <reference path="../../services/coloursService.ts" />
'use strict';

module AnalyticsDirectives{
	export class LineChart implements angular.IDirective {
		restrict: string = 'E';
		templateUrl: string = '../app/directives/lineChart/lineChart.html';
        replace: boolean = true;
		scope = {
            chartHeading: '@', 
			data: '='
		}

        //todo: remove $timeout dependency here and in facvtory() fn
		constructor(
            private $timeout: angular.ITimeoutService,
            private ColoursService: AnalyticsServices.ColoursService
            ){} 
		
		// you can set $scope to implement certain interface that extends angular.IScope, 
		// but then you will tie the directive to one data set and it will not be
		// reusable, therefore use 'any' instead
		link: angular.IDirectiveLinkFn = ($scope: any, el: angular.IAugmentedJQuery, attrs: angular.IAttributes) => {
			
            var elWidth: number, elHeight: number,
                data = $scope.data,
                circleColour = this.ColoursService.chartColours.atlantisCh;
            
            
            if(data){
                convertDates();
                drawChart();
            }
            
            //resize the chart on browser resize
            $scope.$watch(() => {
                elWidth = el.context.clientWidth;
                elHeight = el.context.clientHeight;
                return elWidth * elHeight; 
            }, () => {
                removeChart();
                drawChart(elWidth);
            });

            function removeChart(){
                d3.select('.line-chart svg').remove();
            }
            
            function convertDates(){
                data = data.map((d) => {
                    var formatDate = d3.time.format("%d-%b-%Y");
                    d.date = formatDate.parse(d.date);
                    return d; 
                });
            }
		    
            function drawChart(w: number = 960){    //based on http://bl.ocks.org/mbostock/3883245
                var margin = { top: 50, right: 50, bottom: 50, left: 100 },
                    width = w - margin.left - margin.right,
                    height = w/2 - margin.top - margin.bottom;

                var x = d3.time.scale().range([0, width]),
                    y = d3.scale.linear().range([height, 0]),
                    xAxis = d3.svg.axis().scale(x).orient("bottom"),
                    yAxis = d3.svg.axis().scale(y).orient("left");

                var line = d3.svg.line()
                    .x(function(d: any) { return x(d.date); })
                    .y(function(d: any) { return y(d.users); });

                var svg = d3.select(".line-chart").append("svg")
                    .attr("width", width + margin.left + margin.right)
                    .attr("height", height + margin.top + margin.bottom)
                    .append("g")
                    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
                
                x.domain(d3.extent(data, function(d: any) { return d.date; }));
                y.domain(d3.extent(data, function(d: any) { return d.users; }));

                svg.append("g")
                    .attr("class", "x axis")
                    .attr("transform", "translate(0," + height + ")")
                    .call(xAxis);

                svg.append("g")
                    .attr("class", "y axis")
                    .call(yAxis)
                    .append("text")
                    .attr("transform", "rotate(-90)")
                    .attr("y", 16)
                    .style("text-anchor", "end")
                    .text("Users");

                svg.append("path")
                    .datum(data)
                    .attr("class", "line")
                    .attr("d", line);    
                
                //add tooltip
                var tip = d3.tip()
                    .attr('class', 'd3-tip')
                    .offset([-20, 0]) //top/ left
                    .html((d) => 'Users: ' + d.users);
                    
                svg.call(tip);
                    
                //add circles
                var circle = svg.selectAll('circle')
                  .data(data)
                  .enter().append('circle')
                  //.attr('class', 'line')
                  .style('fill', circleColour) //todo: change
                  .attr('cx', line.x() as any) 
                  .attr('cy', line.y() as any)
                  .attr('r', 7)
                  .on('mouseover', tip.show)
                  .on('mouseout', tip.hide);
            }
		};

		static factory(): angular.IDirectiveFactory {
			var directive: angular.IDirectiveFactory = ($timeout: angular.ITimeoutService, ColoursService: AnalyticsServices.ColoursService) => {
					return new LineChart($timeout, ColoursService);
			};
			directive.$inject = ['$timeout', 'ColoursService'];
			return directive;
		}
	}

	angular.module('analyticsApp').directive('lineChart', LineChart.factory());
}
//