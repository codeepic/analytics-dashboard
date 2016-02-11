/// <reference path="../typings/angularjs/angular.d.ts" />
'use strict';
console.log('angular app started');
angular.module('analyticsApp', ['ngRoute'])
    .config(config);
function config($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider
        .when('/', {
        templateUrl: '/app/controllers/overview/overview.html',
        controller: 'OverviewController',
        controllerAs: 'vm'
    })
        .otherwise({
        redirectTo: '/'
    });
}
/// <reference path="../../../typings/angularjs/angular.d.ts" />
'use strict';
var app = angular.module('analyticsApp');
app.controller('OverviewController', function () {
    console.log('overview controller init come onidjidjwegygygewewidjdijdi');
    this.test = 'can you see me? Really?!!';
});
function OverViewController() {
    console.log('overview controller init');
    this.test = 'can you see me? Really?!!';
}
