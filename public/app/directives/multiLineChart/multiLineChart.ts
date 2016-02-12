/// <reference path="../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../typings/d3/d3.d.ts" />
'use strict';

module AnalyticsDirectives{
	export class MultiLineChart implements angular.IDirective {
		restrict: string = 'E';
		templateUrl: string = '../app/directives/multiLineChart/multiLineChart.html';
        replace: boolean = true;
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
            var margin = {top: 20, right: 80, bottom: 30, left: 50},
                width = 960 - margin.left - margin.right,
                height = 500 - margin.top - margin.bottom;

            var parseDate = d3.time.format("%Y%m%d").parse,
                x = d3.time.scale().range([0, width]),
                y = d3.scale.linear().range([height, 0]),
                color = d3.scale.category10(),
                xAxis = d3.svg.axis().scale(x).orient("bottom"),
                yAxis = d3.svg.axis().scale(y).orient("left");

            var line = d3.svg.line()
                .interpolate("basis")
                .x(function(d: any) { return x(d.date); })
                .y(function(d: any) { return y(d.temperature); });

            var svg = d3.select(".multi-line-chart").append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

            color.domain(d3.keys(data[0]).filter(function(key) { return key !== "date"; }));

            data.forEach(function(d) {
                d.date = parseDate(d.date);
            });
            console.log('data after parsing date: ', data);
            // var cities = color.domain().map(function(name) {
            //var apps: Array<IApp> = color.domain().map(function(name) {
            var apps = color.domain().map(function(name) {
                return {
                    name: name,
                    values: data.map(function(d) {
                        //return {date: d.date, temperature: +d[name]};
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
                .text("Codes"); //Temperature (ºF)

            var city = svg.selectAll(".city")
                .data(apps)
                .enter().append("g")
                .attr("class", "city");

                console.log('line and data ', line);

            city.append("path")
                .attr("class", "line")
                .attr("d", function(d) { return line(d.values); })
                .style("stroke", function(d) { return color(d.name); });

            city.append("text")
                .datum(function(d) { return {name: d.name, value: d.values[d.values.length - 1]}; })
                .attr("transform", function(d) { return "translate(" + x(d.value.date) + "," + y(d.value.codes) + ")"; })
                .attr("x", 3)
                .attr("dy", ".35em")
                .text(function(d) { return d.name; });
            //d3 chart ends
		};

		static factory(): angular.IDirectiveFactory {
			var directive: angular.IDirectiveFactory = () => {
					return new MultiLineChart();
			};
			directive.$inject = [];
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

// interface IApp {
//     name: string;
//     values: {
//         date: string;
//         codes: Array<number>
//     }
// };

// interface IS {
//     date: string;
//     codes: Array<number>
// };

// var apps = color.domain().map(function(name) {
//     return {
//         name: name,
//         values: data.map(function(d) {
//             //return {date: d.date, temperature: +d[name]};
//             return {date: d.date, codes: +d[name]};
//         })
//     };
// });