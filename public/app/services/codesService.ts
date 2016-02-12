/// <reference path="../../typings/angularjs/angular.d.ts" />
'use strict';

module AnalyticsServices {
    export class CodesService {
        static $inject = ['$q','$http'];
        
        constructor(
            private $q: angular.IQService,
            private $http: angular.IHttpService
        ){}
        
        public GetCodeDeliveries(): angular.IPromise<{}> { //todo: add interface
            var q = this.$q.defer();
            
            var codeDeliveriesData = [
                {
                    date: '23-Jan-2016',
                    codes: 34242
                }
            ];
            
            q.resolve(codeDeliveriesData);
            
            return q.promise;
        }
    }
    
    angular.module('analyticsApp').service('CodesService', CodesService);
}