/// <reference path="../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../typings/d3/d3.d.ts" />

'use strict';

module AnalyticsDirectives {
    export class HorizontalBarChart {
        restrict: string = 'E';
		replace: boolean = true;
		templateUrl: string = '../app/directives/horizontalBarChart/horizontalBarChart.html';
        scope = {
            chartHeading: '@',
            data: '='    
        };
        
        constructor(){
            console.log('awesome horizontal chart is here');
        }
        
        //angular.IScope
        link: angular.IDirectiveLinkFn = ($scope: any, el: angular.IAugmentedJQuery, attrs: angular.IAttributes) => {
            var elWidth: number, elHeight: number, data = $scope.data;
            
            if(data) { drawChart(); }
            
            $scope.$watch(() => {
                elWidth = el.context.clientWidth;
                elHeight = el.context. clientHeight
                return elWidth * elHeight;
            }, () => {
                removeChart();
                drawChart(elWidth);
            })
            
            function removeChart(){
                d3.select('.horizontal-bar-chart svg').remove();
            }
            
            //based on //http://bl.ocks.org/Caged/6476579
            //or even better https://bost.ocks.org/mike/bar/3/
            // function drawChart(w: number = 640){
            //     var margin = { top: 30, right: 10, bottom: 40, left: 70 },
            //         width = w - margin.left - margin.right,
            //         height = w/2 - margin.top - margin.bottom;
                
            //     var y = d3.scale.linear().range([height, 0]);
            
            //     var chart = d3.select('.horizontal-bar-chart')
            //         .attr('width', width)
            //         .attr('height', height);
                
            //     y.domain([0, d3.max(data, (d: any) => d.deregistrations)])
                
            //     var barWidth = width / data.lentgh;
                
            //     var bar = chart.selectAll('g')
            //         .data(data)
            //         .enter().append('g')
            //         .attr('transform', (d: any, i: number) => 'translate(' + i*barWidth + ', 0)');
                    
            //     bar.append('rect')
            //         .attr('y', (d: any) => y(d.deregistrations))
            //         .attr('height', (d: any) => height - y(d.deregistrations))
            //         .attr('width', barWidth -1);
                    
            //     bar.append('text')
            //         .attr('x', barWidth/2)
            //         .attr('y', (d: any) => y(d.registrations) + 3) //why 3
            //         .attr('dy', '.75em')
            //         .text((d: any) => d.deregistrations);            
            // }
            
            function drawChart(w: number = 640){
                var margin = { top: 30, right: 10, bottom: 40, left: 70 },
                    width = w - margin.left - margin.right,
                    height = w/2 - margin.top - margin.bottom;
                
                var x = d3.scale.linear().range([0, width - 20]),
                    y = d3.scale.ordinal().rangeRoundBands([0, height], 0.15);
                    
                var xAxis = d3.svg.axis()
                    .scale(x)
                    .orient('bottom');
                    
                var yAxis = d3.svg.axis()
                    .scale(y)
                    .orient('left')
                    //.tickSize(2)        //todo: check
                    .tickPadding(6);    //todo: check
                    
                //todo: tip is not showing up
                var tip = d3.tip()
                    .attr('class', 'd3-tip')
                    .offset([-10, 0])
                    //.offset([0, (d: any) => x(d.deregistrations)]) //tried to offset it to the right from the bar - not working
                    .html((d) => "Deregistrations: " + d.deregistrations );
                    
                var svg = d3.select('.horizontal-bar-chart').append('svg')
                    .attr('width', width + margin.left + margin.right)
                    .attr('height', height + margin.top + margin.bottom)
                    .append('g')
                    .attr('transform', 'translate(' + margin.left + ', ' + margin.top+ ')');
                    
                svg.call(tip)
                
                x.domain(d3.extent(data, (d: any) => d.deregistrations)).nice(); //todo: check
                y.domain(data.map((d: any) => d.location ));
                
                svg.append('g')
                    .attr('class', 'x axis')
                    .attr('transform', 'translate(0,' + height + ')')
                    .call(xAxis);
                    
                svg.append('g')
                    .attr('class', 'y axis')
                    .attr('transform', 'translate(' + x(0) + ')')
                    .call(yAxis);
                    
                svg.selectAll('.bar')
                    .data(data)
                    .enter().append('rect')
                    .attr('class', 'bar')
                    .attr('x', (d: any) => x(Math.min(0, d.deregistrations)))
                    .attr('y', (d: any) => y(d.location))
                    .attr('width', (d: any) => x(d.deregistrations)) //check
                    .attr('height', y.rangeBand()) //maybe tweak it to change the height of the bars
                    .on('mouseover', tip.show)
                    .on('mouseout', tip.hide);
                    
            }
        }
        
        static factory(): angular.IDirectiveFactory {
            var directive: angular.IDirectiveFactory = () => {
                return new HorizontalBarChart();    
            }
            directive.$inject = [];
            return directive
        }
    }
    
    angular.module('analyticsApp').directive('horizontalBarChart', HorizontalBarChart.factory());
}

//