/// <reference path="../typings/angularjs/angular.d.ts" />
(function (angular) {
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
})(angular);
/// <reference path="../../../typings/angularjs/angular.d.ts" />
(function (angular) {
    'use strict';
    angular.module('analyticsApp').controller('OverviewController', OverViewController);
    function OverViewController() {
        this.test = 'can you see me? Really?!!';
    }
})(angular);
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
