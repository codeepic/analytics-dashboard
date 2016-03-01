/// <reference path="../../typings/angularjs/angular.d.ts" />
/// <reference path="offersService.ts" />
'use strict';

module AnalyticsServices {
    export class ColoursService {
        
        public grey: string= '#807e7e';
        
        public chartColours = {
            // flamingo: '#e94d5b',        //red
            // atlantis: '#89c541',        //green
            // sun: '#f47a37',             //orange
            // wildBlueYonder: '#8089c2',  //purplish blue
            // summerSky: '#1db0e6'        //blue
            ////////////////////
            flamingoCh: '#e64e5a',
            summerSkyCh: '#1baee5',
            mustardCh: '#ffe45f',
            wildBlueYonderCh: '#8088c2',
            atlantisCh: '#90d339',
            crustaCh: '#f28149',
            cornflowerBlueCh: '#5d85f4',
            supernovaCh: '#fcbc2b',
            heliotropeCh: '#d27afc',
            gorseCh: '#eefe38',
            neonPinkCh: '#f95fc5',
            paleGreenCh: '#97f7b0'
        };
        
        public getChartColoursAsArray(): string[]{
            var arr = [];
            
            for(var key in this.chartColours){
                if(this.chartColours.hasOwnProperty(key)){
                    arr.push(this.chartColours[key]);
                }
            }
            
            return arr;
        }
    }  
    
    angular.module('analyticsApp').service('ColoursService', ColoursService);
}