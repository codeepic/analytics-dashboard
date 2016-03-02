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
        
        //constructor(){}
        
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
                
                var tip = d3.tip()
                    .attr('class', 'd3-tip')
                    .offset([-10, 0])
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