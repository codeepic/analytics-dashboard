/// <reference path="../typings/angularjs/angular.d.ts" />
(function (angular) {
    'use strict';
    console.log('angular app started');
    //add analyticsApp.controllers
    // analyticsApp.direcitves
    // analyticsApp.services modules as dependencies
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
})(angular);
/// <reference path="../../typings/angularjs/angular.d.ts" />
var AnalyticsServices;
(function (AnalyticsServices) {
    var UsersService = (function () {
        function UsersService($q, $http) {
            this.$q = $q;
            this.$http = $http;
            console.log('users service is defined');
        }
        UsersService.prototype.GetUsers = function () {
            var q = this.$q.defer();
            //todo: mock data for other charts	
            var usersData = [
                {
                    name: 'Mark',
                    age: 33,
                    profession: 'web dev'
                },
                {
                    name: 'Dave',
                    age: 27,
                    profession: 'ui des'
                },
                {
                    name: 'Tom',
                    age: 29,
                    profession: 'ps guru'
                },
                {
                    name: 'Rado',
                    age: 35,
                    profession: 'CTO'
                }
            ];
            q.resolve(usersData);
            return q.promise;
        };
        UsersService.$inject = ['$q', '$http'];
        return UsersService;
    })();
    AnalyticsServices.UsersService = UsersService;
    angular.module('analyticsApp').service('usersService', UsersService);
})(AnalyticsServices || (AnalyticsServices = {}));
/// <reference path="../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../services/usersService.ts" />
var AnalyticsControllers;
(function (AnalyticsControllers) {
    var OverviewController = (function () {
        function OverviewController(usersService) {
            this.usersService = usersService;
            console.log('overview controller init in ts sd', this.usersService);
            this.GetUsers();
        }
        OverviewController.prototype.GetUsers = function () {
            var _this = this;
            this.usersService.GetUsers()
                .then(function (usersData) {
                console.log('success fetching users');
                _this.users = usersData;
            }, function (error) {
                console.log('there was an error fetching users');
            });
        };
        OverviewController.$inject = ['usersService'];
        return OverviewController;
    })();
    AnalyticsControllers.OverviewController = OverviewController;
    angular.module('analyticsApp').controller('OverviewController', OverviewController);
})(AnalyticsControllers || (AnalyticsControllers = {}));
/// <reference path="../../../typings/angularjs/angular.d.ts" />
'use strict';
var AnalyticsDirectives;
(function (AnalyticsDirectives) {
    var LineChart = (function () {
        function LineChart() {
            this.restrict = 'E';
            this.templateUrl = '../app/directives/lineChart/lineChart.html';
            //constructor(){}
            this.link = function ($scope, el, attrs) {
                console.log('line chart directive is loaded');
            };
        }
        LineChart.factory = function () {
            var directive = function () {
                return new LineChart();
            };
            directive.$inject = [];
            return directive;
        };
        return LineChart;
    })();
    AnalyticsDirectives.LineChart = LineChart;
    angular.module('analyticsApp').directive('lineChart', LineChart.factory());
})(AnalyticsDirectives || (AnalyticsDirectives = {}));
/// <reference path="../../../typings/angularjs/angular.d.ts" />
'use strict';
var AnalyticsDirectives;
(function (AnalyticsDirectives) {
    var MultiLineChart = (function () {
        function MultiLineChart() {
            this.restrict = 'E';
            this.templateUrl = '../app/directives/multiLineChart/multiLineChart.html';
            //constructor(){}
            this.link = function ($scope, el, attrs) {
                console.log('multi line chart directive is loaded');
            };
        }
        MultiLineChart.factory = function () {
            var directive = function () {
                return new MultiLineChart();
            };
            directive.$inject = [];
            return directive;
        };
        return MultiLineChart;
    })();
    AnalyticsDirectives.MultiLineChart = MultiLineChart;
    angular.module('analyticsApp').directive('multiLineChart', MultiLineChart.factory());
})(AnalyticsDirectives || (AnalyticsDirectives = {}));
// 
/// <reference path="../../../typings/angularjs/angular.d.ts" />
'use strict';
var AnalyticsDirectives;
(function (AnalyticsDirectives) {
    var PieChart = (function () {
        function PieChart() {
            this.restrict = 'E';
            this.replace = true;
            //transclude: boolean = true;
            this.templateUrl = '../app/directives/pieChart/pieChart.html';
            //constructor(){}
            this.link = function ($scope, el, attrs) {
                console.log('pie chart directive is loaded');
            };
        }
        PieChart.factory = function () {
            var directive = function () {
                return new PieChart();
            };
            directive.$inject = [];
            return directive;
        };
        return PieChart;
    })();
    AnalyticsDirectives.PieChart = PieChart;
    angular.module('analyticsApp').directive('pieChart', PieChart.factory());
})(AnalyticsDirectives || (AnalyticsDirectives = {}));
