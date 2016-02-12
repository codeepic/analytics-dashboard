/// <reference path="../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../typings/d3/d3.d.ts" />
/// <reference path="../../services/usersService.ts" />

'use strict';

module AnalyticsDirectives{
	export class LineChart implements angular.IDirective {
		restrict: string = 'E';
		templateUrl: string = '../app/directives/lineChart/lineChart.html';
        replace: boolean = true;
		scope = {
			data: '='
		}

		constructor(private $timeout: angular.ITimeoutService){}
		
		// you can set $scope to implement certain interface that extends angular.IScope, 
		// but then you will tie the directive to one data set and it will not be
		// reusable, therefore use 'any' instead
        // el: angular.IAugmentedJQuery
		link: angular.IDirectiveLinkFn = ($scope: any, el: angular.IAugmentedJQuery, attrs: angular.IAttributes) => {
			
            var data = $scope.data,
                elWidth, elHeight,
                that = this;            //todo: how I love these tricks? any way not to use it?
            
            if($scope.data){
                convertDates();
                drawChart();
            }
            
            //resize the chart on browser resize
            $scope.$watch(function(){
                elWidth = el.context.clientWidth;
                elHeight = el.context.clientHeight;
                return elWidth * elHeight; 
            }, resizeChart);

            //how to make sure that drawing is called only once, not for every resize?

            function resizeChart(){
                //elWidth = el.context.clientWidth;
                //elHeight = el.context.clientHeight;
                console.log('resized');
                that.$timeout(() => {   //debounce, so it's not called mid window resize
                    removeChart();
                    drawChart(elWidth);
                }, 3000);
            }

            function convertDates(){
                data = data.map((d) => {
                    var formatDate = d3.time.format("%d-%b-%Y");
                    d.date = formatDate.parse(d.date);
                    return d; 
                });
            }
		    
            function removeChart(){
                d3.select('.line-chart svg').remove();
            }
            
            function drawChart(w: number = 960, h: number = 500){
                console.log('drawing');
                //var margin = { top: 20, right: 20, bottom: 30, left: 50 },
                // var margin = { top: 50, right: 100, bottom: 50, left: 100 },
				// 	width = 960 - margin.left - margin.right,
				// 	height = 500 - margin.top - margin.bottom;
                    
                var margin = { top: 50, right: 100, bottom: 50, left: 100 },
                    width = w - margin.left - margin.right,
                    height = h - margin.top - margin.bottom;

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
                    //.attr("dy", "1.71em")
                    .style("text-anchor", "end")
                    .text("Users");

                svg.append("path")
                    .datum(data)
                    .attr("class", "line")
                    .attr("d", line);    
            }
		};

		static factory(): angular.IDirectiveFactory {
			var directive: angular.IDirectiveFactory = ($timeout: angular.ITimeoutService) => {
					return new LineChart($timeout);
			}

			directive.$inject = ['$timeout'];
			return directive;
		}
	}

	angular.module('analyticsApp').directive('lineChart', LineChart.factory());
}