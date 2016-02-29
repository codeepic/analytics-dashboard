/// <reference path="../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../typings/d3/d3.d.ts" />
/// <reference path="../../services/coloursService.ts" />
'use strict';

module AnalyticsDirectives{
	export class PieChart implements angular.IDirective {
		restrict: string = 'E';
		replace: boolean = true;
        transclude: boolean = true; //todo: check if needed and remove
		templateUrl: string = '../app/directives/pieChart/pieChart.html';
        scope = {
            chartHeading: '@', 
            chartName: '@',
            data: '='    
        };
        
		constructor(private ColoursService: AnalyticsServices.ColoursService){}

        // you can set $scope to implement certain interface that extends angular.IScope, 
		// but then you will tie the directive to one data set and it will not be
		// reusable, therefore use 'any' instead
		link: angular.IDirectiveLinkFn = ($scope: any, el: angular.IAugmentedJQuery, attrs: angular.IAttributes) => {
            var elWidth: number, elHeight: number, data = $scope.data,
            chartColours = this.ColoursService.chartColours;
            
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
                        height = w * 2, //was w
                        radius = Math.min(width, height) / 2;
                    
                    var colourValues = d3.scale.ordinal().range(d3.values(chartColours));
                    
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

                //arc numbers                    
                g.append('text')
                    .attr('transform', function(d: any) { return 'translate(' + arc.centroid(d) + ')'})
                    .attr('dy', '0.5em')
                    .attr('class', 'white')
                    .text(function(d: any){ return d.data.quantity})
                    
                var quantitySumText = d3.sum(data, (d: any) =>  d.quantity );
                
                // svg.append('text')
                //     .attr('transform', 'translate(' + width/2 + ',' + height/2 + ')')
                //     .attr('transform', 'translate(-100, 0)')
                //     .attr('font-size', '44')
                //     .attr('fill', '#999999')
                //     .text(total + '' + $scope.chartName.toUpperCase());
                
                var text = svg.append('text')
                    .attr('font-weight', 'bold');
                
                text.append('tspan')
                    .attr('font-size', '72')
                    .attr('x', '-8%')
                    .attr('dy','0')
                    .text(quantitySumText);
                    
                text.append('tspan')
                    .attr('font-size', '40')
                    .attr('x', '-20%')
                    .attr('dy','40')
                    .text($scope.chartName.toUpperCase());
                    
                //http://zeroviscosity.com/d3-js-step-by-step/step-3-adding-a-legend
                // var legend = svg.append('g')
                //     .attr('class', 'legend')
                //     .attr('tranform', 'translate(50, 30)')
                //     .style('font-size', '12px')
                //     .call(d3.legend);
                
                //todo: get all this crap into one neat function using loop
                var yPos = 330;
                var legend1 = svg.append('g')
                    .attr('class', 'legend')
                    .attr('transform', 'translate(-230, ' + yPos + ')') //was 50,30 //now its out of chart area
                    .attr('height', '50')
                    .attr('width', '50');
                    
                    legend1.append('rect')
                        .attr('width', '20')
                        .attr('height', '20')
                        .style('fill', 'rgb(57, 59, 121)');
                        //.style('stroke', 'rgb(57, 59, 121)');
                        
                    legend1.append('text')
                        .attr('x', '30')
                        .attr('y', '14')
                        .text('kakakak');
                        
                var legend2 = svg.append('g')
                    .attr('class', 'legend')
                    .attr('transform', 'translate(-230, '+ (yPos + 30) + ')') //30 + 20 rect height + 10 padding
                    .attr('height', '50')
                    .attr('width', '50');
                    
                    legend2.append('rect')
                        .attr('width', '20')
                        .attr('height', '20')
                        .style('fill', 'rgb(23, 159, 221)');
                        //.style('stroke', 'rgb(57, 59, 121)');
                        
                    legend2.append('text')
                        .attr('x', '30')
                        .attr('y', '14')
                        .text('omomom');
                        
                var legend3 = svg.append('g')
                    .attr('class', 'legend')
                    .attr('transform', 'translate(-230, '+ (yPos + 60) + ')') //30 + 20 rect height + 10 padding
                    .attr('height', '50')
                    .attr('width', '50');
                    
                    legend3.append('rect')
                        .attr('width', '20')
                        .attr('height', '20')
                        .style('fill', 'rgb(123, 239, 121)');
                        //.style('stroke', 'rgb(57, 59, 121)');
                        
                    legend3.append('text')
                        .attr('x', '30')
                        .attr('y', '14')
                        .text('karramba');
                        
                        //right column
                var xPosRight = 30
                var legend1 = svg.append('g')
                    .attr('class', 'legend')
                    .attr('transform', 'translate(' + xPosRight + ', ' + yPos + ')') //was 50,30 //now its out of chart area
                    .attr('height', '50')
                    .attr('width', '50');
                    
                    legend1.append('rect')
                        .attr('width', '20')
                        .attr('height', '20')
                        .style('fill', 'rgb(90, 78, 221)');
                        //.style('stroke', 'rgb(57, 59, 121)');
                        
                    legend1.append('text')
                        .attr('x', '30')
                        .attr('y', '14')
                        .text('nahfs');
                        
                var legend2 = svg.append('g')
                    .attr('class', 'legend')
                    .attr('transform', 'translate(' + xPosRight + ', ' + (yPos + 30) + ')') //30 + 20 rect height + 10 padding
                    .attr('height', '50')
                    .attr('width', '50');
                    
                    legend2.append('rect')
                        .attr('width', '20')
                        .attr('height', '20')
                        .style('fill', 'rgb(223, 23, 121)');
                        //.style('stroke', 'rgb(57, 59, 121)');
                        
                    legend2.append('text')
                        .attr('x', '30')
                        .attr('y', '14')
                        .text('rukusj');
                        
                    
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

/*
<g class="legend" transform="translate(-36,-44)">
  <rect width="18" height="18" style="fill: rgb(57, 59, 121); stroke: rgb(57, 59, 121);"></rect>
  <text x="22" y="14">Abulia</text>
</g>
<g class="legend" transform="translate(-36,-22)">
  <rect width="18" height="18" style="fill: rgb(82, 84, 163); stroke: rgb(82, 84, 163);"></rect>
  <text x="22" y="14">Betelgeuse</text>
</g>
<g class="legend" transform="translate(-36,0)">
  <rect width="18" height="18" style="fill: rgb(107, 110, 207); stroke: rgb(107, 110, 207);"></rect>
  <text x="22" y="14">Cantaloupe</text>
</g>
<g class="legend" transform="translate(-36,22)">
  <rect width="18" height="18" style="fill: rgb(156, 158, 222); stroke: rgb(156, 158, 222);"></rect>
  <text x="22" y="14">Dijkstra</text>
</g>
 */