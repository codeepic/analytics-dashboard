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
            var elWidth: number, elHeight: number, data = $scope.data;
            
            if(data) { drawChart(); }
            
            //based on //http://bl.ocks.org/Caged/6476579
            //or even better https://bost.ocks.org/mike/bar/3/
            function drawChart(w: number = 640){ 
                console.log('drawing vertical bar chart: ', data);
                
                var margin = { top: 30, right: 10, bottom: 40, left: 70 },
                    width = w - margin.left - margin.right,
                    height = w/2 - margin.top - margin.bottom;
                
                //todo: investigate
                var x = d3.scale.ordinal().rangeRoundBands([0, width], .15);
                //var x = d3.scale.linear().range([0, width]);
                var y = d3.scale.linear().range([height, 0]);
                
                var xAxis = d3.svg.axis()
                    .scale(x)
                    .orient('bottom');
                    
                var yAxis = d3.svg.axis()
                    .scale(y)
                    .orient('left')
                    //.tickFormat(); //check
                    
                var tip = d3.tip()
                    .attr('class', 'd3-tip')
                    .offset([-10, 0])
                    .html((d) => {
                       return "Deregistrations: " + d.deregistrations; 
                    });
                    
                var svg = d3.select('.vertical-bar-chart').append('svg')
                    .attr('width', width + margin.left + margin.right)
                    .attr('height', height + margin.top + margin.bottom)
                    .append('g')
                    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
                    
                svg.call(tip);
                
                x.domain(data.map((d) => {return d.age}));
                y.domain([0, d3.max(data, (d: any) => { return d.deregistrations; })])
                
                svg.append('g')
                    .attr('class', 'x axis')
                    .attr('transform', 'translate(0,' + height + ')')
                    .call(xAxis);
                    
                svg.append('g')
                    .attr('class', 'y axis')
                    .call(yAxis)
                    .append('text')
                    .attr('transform', 'rotate(-90)')
                    .attr('y', 6)
                    .attr('dy', '.71em');
                    //.style('text-anchor', 'end')
                    //.text('Deregistrations')
                    
                svg.selectAll('.bar')
                    .data(data)
                    .enter().append('rect')
                    .attr('class', 'bar')
                    .attr('x', (d: any) => { return x(d.age); })
                    .attr('width', x.rangeBand())
                    .attr('y', (d: any) => { return y(d.deregistrations); })
                    .attr('height', (d: any) => { return height - y(d.deregistrations); })
                    .on('mouseover', tip.show)
                    .on('mouseout', tip.hide);
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

//