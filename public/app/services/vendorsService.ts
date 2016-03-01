/// <reference path="../../typings/angularjs/angular.d.ts" />
/// <reference path="offersService.ts" />
'use strict';

module AnalyticsServices {
    export class VendorsService {
        static $inject = ['$q','$http'];
        
        constructor(
            private $q: angular.IQService,
            private $http: angular.IHttpService
        ){}
        
        public GetVendorsByCategory(): angular.IPromise<Array<IByCategoryData>> {
            var q = this.$q.defer();
            
            var vendorsByCategoryData = [
                {
                    category: 'Transport & Travel',
                    quantity: 10  
                },
                {
                    category: 'Entertainment',
                    quantity: 20  
                },
                {
                    category: 'Retail & Fashion',
                    quantity: 40  
                },
                {
                    category: 'Food & Drink',
                    quantity: 80  
                },
                {
                    category: 'Finance',
                    quantity: 260  
                },
                {
                    category: 'Tourism',
                    quantity: 56
                },
                {
                    category: 'Fishing',
                    quantity: 33  
                }
            ];
            
            q.resolve(vendorsByCategoryData);
            
            return q.promise;
        }
    }
    
    angular.module('analyticsApp').service('VendorsService', VendorsService);
}