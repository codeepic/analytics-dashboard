/// <reference path="../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../typings/d3/d3.d.ts" />
/// <reference path="../../services/coloursService.ts" />
'use strict';

module AnalyticsDirectives{
	export class MultiLineChart implements angular.IDirective {
		restrict: string = 'E';
		templateUrl: string = '../app/directives/multiLineChart/multiLineChart.html';
        replace: boolean = true;
        scope = {
            data: '='
        };
        
		constructor(private ColoursService: AnalyticsServices.ColoursService){}
        
        // you can set $scope to implement certain interface that extends angular.IScope, 
		// but then you will tie the directive to one data set and it will not be
		// reusable, therefore use 'any' instead
        
		link: angular.IDirectiveLinkFn = ($scope: any, el: angular.IAugmentedJQuery, attrs: angular.IAttributes) => {
                
            var parseDate,
                elWidth: number,
                elHeight: number,
                data = $scope.data,
                chartColoursArray = d3.values(this.ColoursService.chartColours);
            
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
                d3.select('.multi-line-chart svg').remove();
            }
            
            function convertDates(){
                parseDate = d3.time.format("%Y%m%d").parse;
                data.forEach((d) => { d.date = parseDate(d.date); });
            }
            
            function drawChart(w: number = 960){       //based on http://bl.ocks.org/mbostock/3884955
                var margin = {top: 20, right: 80, bottom: 30, left: 50},
                    width = w - margin.left - margin.right,
                    height = w/2 - margin.top - margin.bottom;

                var x = d3.time.scale().range([0, width]),
                    y = d3.scale.linear().range([height, 0]),
                    color = d3.scale.ordinal().range(chartColoursArray),
                    xAxis = d3.svg.axis().scale(x).orient("bottom"),
                    yAxis = d3.svg.axis().scale(y).orient("left");
                    
                var line = d3.svg.line()
                    //.interpolate('cardinal') https://github.com/mbostock/d3/wiki/SVG-Shapes#line_interpolate
                    .x(function(d: any) { return x(d.date); })
                    .y(function(d: any) { return y(d.codes); });

                var svg = d3.select(".multi-line-chart").append("svg")
                    .attr("width", width + margin.left + margin.right)
                    .attr("height", height + margin.top + margin.bottom)
                    .append("g")
                    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

                color.domain(d3.keys(data[0]).filter(function(key) { return key !== "date"; }));
                
                var apps: Array<IApp> = color.domain().map(function(name) {
                    return {
                        name: name,
                        values: data.map(function(d) {
                            return {date: d.date, codes: +d[name]};
                        })
                    };
                });

                x.domain(d3.extent(data, function(d: any) { return d.date; }));

                y.domain([
                    d3.min(apps, function(c: IApp) { return d3.min(c.values, function(v) { return v.codes; }); }),
                    d3.max(apps, function(c: IApp) { return d3.max(c.values, function(v) { return v.codes; }); })
                ]);

                svg.append("g")
                    .attr("class", "x axis")
                    .attr("transform", "translate(0," + height + ")")
                    .call(xAxis);

                svg.append("g")
                    .attr("class", "y axis")
                    .call(yAxis)
                    .append("text")
                    .attr("transform", "rotate(-90)")
                    .attr("y", 6)
                    .attr("dy", ".71em")
                    .style("text-anchor", "end")
                    .text("Codes");

                var appLine = svg.selectAll(".app")
                    .data(apps)
                    .enter().append("g");

                appLine.append("path")
                    .attr("class", "line")
                    .attr("d", (d: any) => line(d.values) )
                    .style("stroke", (d: any) => color(d.name) as number );

                //text at the end of each line
                // appLine.append("text")
                //     .datum(function(d) { return {name: d.name, value: d.values[d.values.length - 1]}; })
                //     .attr("transform", function(d: any) { return "translate(" + x(d.value.date) + "," + y(d.value.codes) + ")"; })
                //     .attr("x", 3)
                //     .attr("dy", ".35em")
                //     .text(function(d) { return d.name; });
                
                //add tooltip
                var tip = d3.tip()
                    .attr('class', 'd3-tip')
                    .offset([-20, 0]) //top/ left
                    .html((d) => d.codes);
                    
                svg.call(tip);
                
                //add circles
                appLine.append('g').selectAll('circle')
                    .data((d) => { return d.values; })
                    .enter().append('circle')
                    .attr("fill", function(d: any) { return color(this.parentNode.__data__.name) as number})
                    .attr('cx', (dd: any) => x(dd.date))
                    .attr('cy', (dd: any) => y(dd.codes))
                    .attr('r', 5)
                    .on('mouseover', tip.show)
                    .on('mouseout', tip.hide);
                    
                createLegend(svg, apps);
            }
            
            function createLegend(svg, apps){
                var YPos = -20,
                    XPos = 900,
                    colourSquareHeight = 20,
                    colourSquareWidth = 20;
                
                apps.forEach((app, i) => {
                    
                    var legendItem = svg.append('g')
                        .attr('transform', 'translate(' + XPos + ', ' + YPos + ')');
                        YPos += 30;
                     
                    legendItem.append('rect')
                        .attr('height', colourSquareHeight)
                        .attr('width', colourSquareWidth)
                        .style('fill', chartColoursArray[i]); //chartColoursArray[i]
                        
                    legendItem.append('text')
                        .attr('x', '30')
                        .attr('y', '14')
                        .text(app.name);
                });
            }
		};

		static factory(): angular.IDirectiveFactory {
			var directive: angular.IDirectiveFactory = (ColoursService) => {
					return new MultiLineChart(ColoursService);
			};
			directive.$inject = ['ColoursService'];
			return directive;
		}
	}

	angular.module('analyticsApp').directive('multiLineChart', MultiLineChart.factory());
}

interface IApp {
    name: string;
    values: [{
        date: string,
        codes: number
    }];
};
