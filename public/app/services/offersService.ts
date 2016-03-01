/// <reference path="../../typings/angularjs/angular.d.ts" />
'use strict';

module AnalyticsServices {
    export class OffersService {
        static $inject = ['$q','$http'];
        
        constructor(
            private $q: angular.IQService,
            private $http: angular.IHttpService
        ){}
        
        public GetOffersByCategory(): angular.IPromise<Array<IByCategoryData>> {
            var q = this.$q.defer();
            
            var offersByCategoryData = [
                {
                    category: 'Transport & Travel',
                    quantity: 12  
                },
                {
                    category: 'Entertainment',
                    quantity: 9  
                },
                {
                    category: 'Retail & Fashion',
                    quantity: 2  
                },
                {
                    category: 'Food & Drink',
                    quantity: 14  
                },
                {
                    category: 'Finance',
                    quantity: 8  
                }
            ];
            
            q.resolve(offersByCategoryData);
            
            return q.promise;
        }
    }
    
    angular.module('analyticsApp').service('OffersService', OffersService);
}

interface IByCategoryData{
    category: string;
    quantity: number;
}