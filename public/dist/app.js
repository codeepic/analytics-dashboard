/// <reference path="../typings/angularjs/angular.d.ts" />
(function (angular) {
    'use strict';
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
'use strict';
var AnalyticsServices;
(function (AnalyticsServices) {
    var CodesService = (function () {
        function CodesService($q, $http) {
            this.$q = $q;
            this.$http = $http;
        }
        CodesService.prototype.GetCodeDeliveries = function () {
            var q = this.$q.defer();
            var codeDeliveriesData = [
                {
                    date: '20160110',
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
                    web: 3382,
                    iphone: 7745,
                    android: 5748
                }
            ];
            q.resolve(codeDeliveriesData);
            return q.promise;
        };
        CodesService.$inject = ['$q', '$http'];
        return CodesService;
    })();
    AnalyticsServices.CodesService = CodesService;
    angular.module('analyticsApp').service('CodesService', CodesService);
})(AnalyticsServices || (AnalyticsServices = {}));
/// <reference path="../../typings/angularjs/angular.d.ts" />
'use strict';
var AnalyticsServices;
(function (AnalyticsServices) {
    var OffersService = (function () {
        function OffersService($q, $http) {
            this.$q = $q;
            this.$http = $http;
        }
        OffersService.prototype.GetOffersByCategory = function () {
            var q = this.$q.defer();
            var offersByCategoryData = [
                {
                    category: 'Transport &amp; Travel',
                    quantity: 12
                },
                {
                    category: 'Entertainment',
                    quantity: 9
                },
                {
                    category: 'Retail &amp; Fashion',
                    quantity: 2
                },
                {
                    category: 'Food &amp; Drink',
                    quantity: 14
                },
                {
                    category: 'Finance',
                    quantity: 8
                }
            ];
            q.resolve(offersByCategoryData);
            return q.promise;
        };
        OffersService.$inject = ['$q', '$http'];
        return OffersService;
    })();
    AnalyticsServices.OffersService = OffersService;
    angular.module('analyticsApp').service('OffersService', OffersService);
})(AnalyticsServices || (AnalyticsServices = {}));
/// <reference path="../../typings/angularjs/angular.d.ts" />
/// <reference path="offersService.ts" />
'use strict';
var AnalyticsServices;
(function (AnalyticsServices) {
    var ColoursService = (function () {
        function ColoursService() {
            this.colours = {
                flamingo: '#e94d5b',
                atlantis: '#89c541',
                sun: '#f47a37',
                wildBlueYonder: '#8089c2',
                summerSky: '#1db0e6' //blue
            };
        }
        return ColoursService;
    })();
    AnalyticsServices.ColoursService = ColoursService;
    angular.module('analyticsApp').service('ColoursService', ColoursService);
})(AnalyticsServices || (AnalyticsServices = {}));
/// <reference path="../../typings/angularjs/angular.d.ts" />
var AnalyticsServices;
(function (AnalyticsServices) {
    var UsersService = (function () {
        function UsersService($q, $http) {
            this.$q = $q;
            this.$http = $http;
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
    angular.module('analyticsApp').service('UsersService', UsersService);
})(AnalyticsServices || (AnalyticsServices = {}));
// 
/// <reference path="../../typings/angularjs/angular.d.ts" />
/// <reference path="offersService.ts" />
'use strict';
var AnalyticsServices;
(function (AnalyticsServices) {
    var VendorsService = (function () {
        function VendorsService($q, $http) {
            this.$q = $q;
            this.$http = $http;
        }
        VendorsService.prototype.GetVendorsByCategory = function () {
            var q = this.$q.defer();
            var vendorsByCategoryData = [
                {
                    category: 'Transport &amp; Travel',
                    quantity: 10
                },
                {
                    category: 'Entertainment',
                    quantity: 20
                },
                {
                    category: 'Retail &amp; Fashion',
                    quantity: 40
                },
                {
                    category: 'Food &amp; Drink',
                    quantity: 80
                },
                {
                    category: 'Finance',
                    quantity: 260
                }
            ];
            q.resolve(vendorsByCategoryData);
            return q.promise;
        };
        VendorsService.$inject = ['$q', '$http'];
        return VendorsService;
    })();
    AnalyticsServices.VendorsService = VendorsService;
    angular.module('analyticsApp').service('VendorsService', VendorsService);
})(AnalyticsServices || (AnalyticsServices = {}));
/// <reference path="../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../typings/d3/d3.d.ts" />
/// <reference path="../../services/usersService.ts" />
'use strict';
var AnalyticsDirectives;
(function (AnalyticsDirectives) {
    var LineChart = (function () {
        //todo: remove $timeout dependency here and in facvtory() fn
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
/// <reference path="../../../typings/d3/d3.d.ts" />
'use strict';
var AnalyticsDirectives;
(function (AnalyticsDirectives) {
    var MultiLineChart = (function () {
        function MultiLineChart() {
            this.restrict = 'E';
            this.templateUrl = '../app/directives/multiLineChart/multiLineChart.html';
            this.replace = true;
            this.scope = {
                data: '='
            };
            //constructor(){}
            // you can set $scope to implement certain interface that extends angular.IScope, 
            // but then you will tie the directive to one data set and it will not be
            // reusable, therefore use 'any' instead
            this.link = function ($scope, el, attrs) {
                var parseDate, elWidth, elHeight, data = $scope.data;
                if (data) {
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
                    d3.select('.multi-line-chart svg').remove();
                }
                function convertDates() {
                    parseDate = d3.time.format("%Y%m%d").parse;
                    data.forEach(function (d) {
                        d.date = parseDate(d.date);
                    });
                }
                function drawChart(w) {
                    if (w === void 0) { w = 960; }
                    var margin = { top: 20, right: 80, bottom: 30, left: 50 }, width = w - margin.left - margin.right, height = w / 2 - margin.top - margin.bottom;
                    var x = d3.time.scale().range([0, width]), y = d3.scale.linear().range([height, 0]), color = d3.scale.category10(), xAxis = d3.svg.axis().scale(x).orient("bottom"), yAxis = d3.svg.axis().scale(y).orient("left");
                    var line = d3.svg.line()
                        .interpolate("basis")
                        .x(function (d) { return x(d.date); })
                        .y(function (d) { return y(d.codes); });
                    var svg = d3.select(".multi-line-chart").append("svg")
                        .attr("width", width + margin.left + margin.right)
                        .attr("height", height + margin.top + margin.bottom)
                        .append("g")
                        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
                    color.domain(d3.keys(data[0]).filter(function (key) { return key !== "date"; }));
                    var apps = color.domain().map(function (name) {
                        return {
                            name: name,
                            values: data.map(function (d) {
                                return { date: d.date, codes: +d[name] };
                            })
                        };
                    });
                    x.domain(d3.extent(data, function (d) { return d.date; }));
                    y.domain([
                        d3.min(apps, function (c) { return d3.min(c.values, function (v) { return v.codes; }); }),
                        d3.max(apps, function (c) { return d3.max(c.values, function (v) { return v.codes; }); })
                    ]);
                    svg.append("g")
                        .attr("class", "x axis")
                        .attr("transform", "translate(0," + height + ")")
                        .call(xAxis);
                    svg.append("g")
                        .attr("class", "y axis")
                        .call(yAxis)
                        .append("text")
                        .attr("transform", "rotate(-90)")
                        .attr("y", 6)
                        .attr("dy", ".71em")
                        .style("text-anchor", "end")
                        .text("Codes");
                    var city = svg.selectAll(".city")
                        .data(apps)
                        .enter().append("g")
                        .attr("class", "city");
                    city.append("path")
                        .attr("class", "line")
                        .attr("d", function (d) { return line(d.values); }) //check line fn above
                        .style("stroke", function (d) { return color(d.name); });
                    city.append("text")
                        .datum(function (d) { return { name: d.name, value: d.values[d.values.length - 1] }; })
                        .attr("transform", function (d) { return "translate(" + x(d.value.date) + "," + y(d.value.codes) + ")"; })
                        .attr("x", 3)
                        .attr("dy", ".35em")
                        .text(function (d) { return d.name; });
                }
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
;
// interface IApp {
//     name: string;
//     values: {
//         date: string;
//         codes: Array<number>
//     }
// };
// interface IS {
//     date: string;
//     codes: Array<number>
// };
// var apps = color.domain().map(function(name) {
//     return {
//         name: name,
//         values: data.map(function(d) {
//             //return {date: d.date, temperature: +d[name]};
//             return {date: d.date, codes: +d[name]};
//         })
//     };
// }); 
/// <reference path="../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../typings/d3/d3.d.ts" />
/// <reference path="../../services/coloursService.ts" />
'use strict';
var AnalyticsDirectives;
(function (AnalyticsDirectives) {
    var PieChart = (function () {
        function PieChart(ColoursService) {
            var _this = this;
            this.ColoursService = ColoursService;
            this.restrict = 'E';
            this.replace = true;
            this.transclude = true;
            this.templateUrl = '../app/directives/pieChart/pieChart.html';
            this.scope = {
                chartHeading: '@',
                chartName: '@',
                chartNameColour: '@',
                data: '='
            };
            // you can set $scope to implement certain interface that extends angular.IScope, 
            // but then you will tie the directive to one data set and it will not be
            // reusable, therefore use 'any' instead
            this.link = function ($scope, el, attrs) {
                var elWidth, elHeight, data = $scope.data, that = _this;
                if (data) {
                    drawChart();
                }
                //resize chart on browser resize
                $scope.$watch(function () {
                    elWidth = el.context.clientWidth;
                    elHeight = el.context.clientHeight;
                    return elWidth * elHeight;
                }, function () {
                    removeChart();
                    drawChart(elWidth);
                });
                function removeChart() {
                    d3.select('#' + el.context.id + ' svg').remove();
                }
                function drawChart(w) {
                    if (w === void 0) { w = 460; }
                    var width = w, height = w, radius = Math.min(width, height) / 2;
                    var colourValues = d3.scale.ordinal().range(d3.values(that.ColoursService.colours));
                    var arc = d3.svg.arc()
                        .outerRadius(radius - 10)
                        .innerRadius(radius - 50); //70 230
                    var pie = d3.layout.pie()
                        .sort(null)
                        .value(function (d) { return d.quantity; });
                    var svg = d3.select('#' + el.context.id).append('svg')
                        .attr('width', width)
                        .attr('height', height)
                        .append('g')
                        .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');
                    var g = svg.selectAll('.arc')
                        .data(pie(data))
                        .enter().append('g')
                        .attr('class', 'arc');
                    g.append('path')
                        .attr('d', arc)
                        .attr('fill', function (d) {
                        return colourValues(d.data.category);
                    });
                    //arc numbers                    
                    g.append('text')
                        .attr('transform', function (d) { return 'translate(' + arc.centroid(d) + ')'; })
                        .attr('dy', '0.5em')
                        .text(function (d) { return d.data.quantity; });
                    var quantitySumText = d3.sum(data, function (d) { return d.quantity; });
                    // svg.append('text')
                    //     .attr('transform', 'translate(' + width/2 + ',' + height/2 + ')')
                    //     .attr('transform', 'translate(-100, 0)')
                    //     .attr('font-size', '44')
                    //     .attr('fill', '#999999')
                    //     .text(total + '' + $scope.chartName.toUpperCase());
                    var text = svg.append('text')
                        .attr('font-size', '40')
                        .attr('fill', $scope.chartNameColour);
                    text.append('tspan')
                        .attr('x', '-7%')
                        .attr('dy', '0')
                        .text(quantitySumText);
                    text.append('tspan')
                        .attr('x', '-20%')
                        .attr('dy', '40')
                        .text($scope.chartName.toUpperCase());
                }
            };
        }
        PieChart.factory = function () {
            var directive = function (ColoursService) {
                return new PieChart(ColoursService);
            };
            directive.$inject = ['ColoursService'];
            return directive;
        };
        return PieChart;
    })();
    AnalyticsDirectives.PieChart = PieChart;
    angular.module('analyticsApp').directive('pieChart', PieChart.factory());
})(AnalyticsDirectives || (AnalyticsDirectives = {}));
/// <reference path="../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../services/usersService.ts" />
/// <reference path="../../services/codesService.ts" />
/// <reference path="../../services/offersService.ts" />
/// <reference path="../../services/vendorsService.ts" />
var AnalyticsControllers;
(function (AnalyticsControllers) {
    var OverviewController = (function () {
        function OverviewController($window, $scope, UsersService, CodesService, OffersService, VendorsService) {
            this.$window = $window;
            this.$scope = $scope;
            this.UsersService = UsersService;
            this.CodesService = CodesService;
            this.OffersService = OffersService;
            this.VendorsService = VendorsService;
            this.GetUsersData();
            this.GetCodeDeliveriesData();
            this.GetOffersByCategoryData();
            this.GetVendorsByCategoryData();
            //data="vm.codeDeliveriesData"
            //needed to make the chart directives responsive
            angular.element($window).on('resize', function () {
                $scope.$apply();
            });
        }
        OverviewController.prototype.GetUsersData = function () {
            var _this = this;
            this.UsersService.GetUsers()
                .then(function (usersData) {
                _this.usersData = usersData;
            }, function (error) {
                console.log('there was an error fetching users');
            });
        };
        OverviewController.prototype.GetCodeDeliveriesData = function () {
            var _this = this;
            this.CodesService.GetCodeDeliveries()
                .then(function (codeDeliveriesData) {
                _this.codeDeliveriesData = codeDeliveriesData;
            }, function (error) {
                console.log('there was an error fetching code deliveries');
            });
        };
        OverviewController.prototype.GetOffersByCategoryData = function () {
            var _this = this;
            this.OffersService.GetOffersByCategory()
                .then(function (offersByCategoryData) {
                _this.offersByCategoryData = offersByCategoryData;
            }, function (error) {
                console.log('there was an error fetching offers by category data');
            });
        };
        OverviewController.prototype.GetVendorsByCategoryData = function () {
            var _this = this;
            this.VendorsService.GetVendorsByCategory()
                .then(function (vendorsByCategoryData) {
                _this.vendorsByCategoryData = vendorsByCategoryData;
            }, function (error) {
                console.log('there was an error fetching vendors by category data');
            });
        };
        OverviewController.$inject = ['$window', '$scope', 'UsersService', 'CodesService', 'OffersService', 'VendorsService'];
        return OverviewController;
    })();
    AnalyticsControllers.OverviewController = OverviewController;
    angular.module('analyticsApp').controller('OverviewController', OverviewController);
})(AnalyticsControllers || (AnalyticsControllers = {}));
