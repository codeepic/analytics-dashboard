/// <reference path="../../typings/angularjs/angular.d.ts" />

module AnalyticsServices {
	export class UsersService {
		static $inject = ['$q', '$http'];

		constructor(private $q: angular.IQService, private $http: angular.IHttpService){
				console.log('users service is defined');
		}
		
		public GetUsers(): angular.IPromise<{}> {
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
		}	
	}

	angular.module('analyticsApp').service('usersService', UsersService);
}