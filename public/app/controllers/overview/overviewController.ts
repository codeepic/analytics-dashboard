/// <reference path="../../../typings/angularjs/angular.d.ts" />

'use strict';
var app = angular.module('analyticsApp');

app.controller('OverviewController', function() {
	console.log('overview controller init come onidjidjwegygygewewidjdijdi');
	this.test = 'can you see me? Really?!!';
});

function OverViewController(){
	console.log('overview controller init');
	this.test = 'can you see me? Really?!!';
}