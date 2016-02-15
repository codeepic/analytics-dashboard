/// <reference path="../../typings/angularjs/angular.d.ts" />
/// <reference path="offersService.ts" />
'use strict';

module AnalyticsServices {
    export class ColoursService {
        
        public colours = {
            flamingo: '#e94d5b',        //red
            atlantis: '#89c541',        //green
            sun: '#f47a37',             //orange
            wildBlueYonder: '#8089c2',  //purplish blue
            summerSky: '#1db0e6'        //blue
        };
    }  
    
    angular.module('analyticsApp').service('ColoursService', ColoursService);
}