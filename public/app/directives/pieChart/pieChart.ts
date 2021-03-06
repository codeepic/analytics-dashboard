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
            chartColoursObj = this.ColoursService.chartColours,
            chartColoursArray = d3.values(chartColoursObj);
            
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
                    height = w * 1.5, //was w
                    radius = Math.min(width, height) / 2;
                
                var colourValues = d3.scale.ordinal().range(chartColoursArray);
                
                var arc = d3.svg.arc()
                    .outerRadius(radius - 30)
                    .innerRadius(radius - 80);
                    
                var arcOver = d3.svg.arc()
                    .innerRadius(radius - 20)
                    .outerRadius(radius - 80);
                    
                var pie = d3.layout.pie()
                    .sort(null)
                    .value(function(d: any) {return d.quantity});
                        
                var svg = d3.select('#'+ el.context.id).append('svg')
                    .attr('width', width)
                    .attr('height', height)
                    .append('g')
                    //.attr('transform', 'translate(' + width / 2 + ',' + height/2 + ')');
                    .attr('transform', 'translate(' + width / 2 + ',' + height/3 + ')');
                
                var g = svg.selectAll('.arc')
                    .data(pie(data))
                    .enter().append('g')
                    .attr('class', 'arc');
                    
                g.append('path')
                    .attr('d', <any>arc)
                    .attr('fill', function (d: any): any {
                        return colourValues(d.data.category); 
                    })
                    .on('mouseover', function(d){
                        d3.select(this).transition()
                            .duration(300)
                            .attr('d', arcOver); 
                    })
                    .on("mouseout", function(d) {
                        d3.select(this).transition()
                            .duration(300)
                            .attr("d", arc);
                    });

                //arc numbers                    
                g.append('text')
                    .attr('transform', function(d: any) { return 'translate(' + arc.centroid(d) + ')'})
                    .attr('dy', '0.5em')
                    .attr('class', 'white')
                    .text(function(d: any){ return d.data.quantity})
                    
                var quantitySumText = d3.sum(data, (d: any) =>  d.quantity );
                
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
                    
                createLegend(svg);
            }
            
            function createLegend(svg){
                var leftColumnYPos = 300,
                    rightColumnYPos = 300,
                    leftColumnXPos = -230,
                    rightColumnXPos = 30,
                    colourSquareHeight = 20,
                    colourSquareWidth = 20;
                    
                data.forEach((d, i) => {
                    var legendItem = svg.append('g');
                    
                    //var half = Math.ceil((data.length-1) /2);
                    var half = Math.ceil(data.length/2);
                    
                    if(i < half){
                        legendItem.attr('transform', 'translate(' + leftColumnXPos + ', ' + leftColumnYPos + ')');
                        leftColumnYPos += 30;    
                    }else{
                        legendItem.attr('transform', 'translate(' + rightColumnXPos + ', ' + rightColumnYPos + ')');
                        rightColumnYPos += 30;    
                    }
                    
                    legendItem.append('rect')
                        .attr('height', colourSquareHeight)
                        .attr('width', colourSquareWidth)
                        .style('fill', chartColoursArray[i]);
                        
                    legendItem.append('text')
                        .attr('x', '30')
                        .attr('y', '14')
                        .text(data[i].category + ' ' + data[i].quantity);
                        
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