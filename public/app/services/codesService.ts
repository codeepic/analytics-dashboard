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
                    date: '20160110',  //year-month-day
                    web: 1242,
                    iphone: 2312,
                    android: 4923
                },
                {
                    date: '20160111',
                    web: 642,
                    iphone: 1812,
                    android: 1923
                },
                {
                    date: '20160112',
                    web: 942,
                    iphone: 3112,
                    android: 2423
                },
                {
                    date: '20160113',
                    web: 1649,
                    iphone: 1114,
                    android: 2323
                },
                {
                    date: '20160114',
                    web: 942,
                    iphone: 1912,
                    android: 3423
                },
                {
                    date: '20160115',
                    web: 2892,
                    iphone: 2427,
                    android: 3323
                },
                {
                    date: '20160116',
                    web: 2332,
                    iphone: 3412,
                    android: 9023
                },
                {
                    date: '20160117',
                    web: 1290,
                    iphone: 7491,
                    android: 3833
                },
                {
                    date: '20160118',
                    web: 833,
                    iphone: 2890,
                    android: 4233
                },
                {
                    date: '20160119',
                    web: 1104,
                    iphone: 5622,
                    android: 4589
                },
                {
                    date: '20160120',
                    web: 894,
                    iphone: 2395,
                    android: 1293
                },
                {
                    date: '20160121',
                    web: 8372,
                    iphone: 4627,
                    android: 8373
                },
                {
                    date: '20160122',
                    web: 5382,
                    iphone: 4745,
                    android: 4748
                }
            ];
            
            q.resolve(codeDeliveriesData);
            
            return q.promise;
        }
    }
    
    angular.module('analyticsApp').service('CodesService', CodesService);
}