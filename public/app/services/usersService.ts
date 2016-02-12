/// <reference path="../../typings/angularjs/angular.d.ts" />

module AnalyticsServices {
	export class UsersService {
		static $inject = ['$q', '$http'];

		constructor(private $q: angular.IQService, private $http: angular.IHttpService){
				console.log('users service is defined');
		}
		
		public GetMockUsers(): angular.IPromise<{}> {
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

		public GetUsers(): angular.IPromise<Array<IUserData>> {
			var q = this.$q.defer();

			var usersData = [
				{
					date: '10/01/2016',
					users: 0
				},
				{
					date: '11/01/2016',
					users: 7345
				},
				{
					date: '12/01/2016',
					users: 11837
				},
				{
					date: '13/01/2016',
					users: 13892
				},
				{
					date: '14/01/2016',
					users: 16373
				},
				{
					date: '15/01/2016',
					users: 24093
				},
				{
					date: '16/01/2016',
					users: 27932
				},
				{
					date: '17/01/2016',
					users: 35838
				},
				{
					date: '18/01/2016',
					users: 36728
				},
				{
					date: '19/01/2016',
					users: 42748
				},
				{
					date: '20/01/2016',
					users: 46728
				},
				{
					date: '21/01/2016',
					users: 47282
				},
				{
					date: '22/01/2016',
					users: 48372
				}
			];

			q.resolve(usersData);

			return q.promise;
		}
	}

	angular.module('analyticsApp').service('usersService', UsersService);
}

interface IUserData{
	date: string;
	users: number;
}