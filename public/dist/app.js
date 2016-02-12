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
        UsersService.prototype.GetMockUsers = function () {
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
        UsersService.prototype.GetUsers = function () {
            var q = this.$q.defer();
            var usersData = [
                {
                    date: '10-Jan-2016',
                    users: 0
                },
                {
                    date: '11-Jan-2016',
                    users: 7345
                },
                {
                    date: '12-Jan-2016',
                    users: 11837
                },
                {
                    date: '13-Jan-2016',
                    users: 13892
                },
                {
                    date: '14-Jan-2016',
                    users: 16373
                },
                {
                    date: '15-Jan-2016',
                    users: 24093
                },
                {
                    date: '16-Jan-2016',
                    users: 27932
                },
                {
                    date: '17-Jan-2016',
                    users: 35838
                },
                {
                    date: '18-Jan-2016',
                    users: 36728
                },
                {
                    date: '19-Jan-2016',
                    users: 42748
                },
                {
                    date: '20-Jan-2016',
                    users: 46728
                },
                {
                    date: '21-Jan-2016',
                    users: 47282
                },
                {
                    date: '22-Jan-2016',
                    users: 48372
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
        function OverviewController($window, $scope, usersService) {
            this.$window = $window;
            this.$scope = $scope;
            this.usersService = usersService;
            this.GetUsersData();
            //needed to make the chart directives responsive
            angular.element($window).on('resize', function () {
                $scope.$apply();
            });
        }
        OverviewController.prototype.GetUsersData = function () {
            var _this = this;
            this.usersService.GetUsers()
                .then(function (usersData) {
                _this.usersData = usersData;
            }, function (error) {
                console.log('there was an error fetching users');
            });
        };
        OverviewController.$inject = ['$window', '$scope', 'usersService'];
        return OverviewController;
    })();
    AnalyticsControllers.OverviewController = OverviewController;
    angular.module('analyticsApp').controller('OverviewController', OverviewController);
})(AnalyticsControllers || (AnalyticsControllers = {}));
/// <reference path="../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../typings/d3/d3.d.ts" />
/// <reference path="../../services/usersService.ts" />
'use strict';
var AnalyticsDirectives;
(function (AnalyticsDirectives) {
    var LineChart = (function () {
        function LineChart($timeout) {
            this.$timeout = $timeout;
            this.restrict = 'E';
            this.templateUrl = '../app/directives/lineChart/lineChart.html';
            this.replace = true;
            this.scope = {
                data: '='
            };
            // you can set $scope to implement certain interface that extends angular.IScope, 
            // but then you will tie the directive to one data set and it will not be
            // reusable, therefore use 'any' instead
            // el: angular.IAugmentedJQuery
            this.link = function ($scope, el, attrs) {
                var elWidth, elHeight, data = $scope.data;
                if ($scope.data) {
                    convertDates();
                    drawChart();
                }
                //resize the chart on browser resize
                $scope.$watch(function () {
                    elWidth = el.context.clientWidth;
                    elHeight = el.context.clientHeight;
                    return elWidth * elHeight;
                }, function () {
                    removeChart();
                    drawChart(elWidth);
                });
                function removeChart() {
                    d3.select('.line-chart svg').remove();
                }
                function convertDates() {
                    data = data.map(function (d) {
                        var formatDate = d3.time.format("%d-%b-%Y");
                        d.date = formatDate.parse(d.date);
                        return d;
                    });
                }
                //based on http://bl.ocks.org/mbostock/3883245
                function drawChart(w) {
                    if (w === void 0) { w = 960; }
                    var margin = { top: 50, right: 50, bottom: 50, left: 100 }, width = w - margin.left - margin.right, height = w / 2 - margin.top - margin.bottom;
                    var x = d3.time.scale().range([0, width]), y = d3.scale.linear().range([height, 0]), xAxis = d3.svg.axis().scale(x).orient("bottom"), yAxis = d3.svg.axis().scale(y).orient("left");
                    var line = d3.svg.line()
                        .x(function (d) { return x(d.date); })
                        .y(function (d) { return y(d.users); });
                    var svg = d3.select(".line-chart").append("svg")
                        .attr("width", width + margin.left + margin.right)
                        .attr("height", height + margin.top + margin.bottom)
                        .append("g")
                        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
                    x.domain(d3.extent(data, function (d) { return d.date; }));
                    y.domain(d3.extent(data, function (d) { return d.users; }));
                    svg.append("g")
                        .attr("class", "x axis")
                        .attr("transform", "translate(0," + height + ")")
                        .call(xAxis);
                    svg.append("g")
                        .attr("class", "y axis")
                        .call(yAxis)
                        .append("text")
                        .attr("transform", "rotate(-90)")
                        .attr("y", 16)
                        .style("text-anchor", "end")
                        .text("Users");
                    svg.append("path")
                        .datum(data)
                        .attr("class", "line")
                        .attr("d", line);
                }
            };
        }
        LineChart.factory = function () {
            var directive = function ($timeout) {
                return new LineChart($timeout);
            };
            directive.$inject = ['$timeout'];
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
