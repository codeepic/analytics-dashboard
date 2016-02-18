/// <reference path="../../typings/angularjs/angular.d.ts" />

module AnalyticsServices {
	export class UsersService {
		static $inject = ['$q', '$http'];

		constructor(private $q: angular.IQService, private $http: angular.IHttpService){}
		
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
		}
        
        public GetDeregistrationsByAge(): angular.IPromise<Array<IDeregistrationByAge>> { //todo: add interface
            var q = this.$q.defer();
            
            var data = [
                {
                    deregistrations: 55123,
                    age: '18-23'
                },
                {
                    deregistrations: 36514,
                    age: '24-29'
                },
                {
                    deregistrations: 13456,
                    age: '30-35'
                },
                {
                    deregistrations: 25903,
                    age: '36-40'
                },
                {
                    deregistrations: 72832,
                    age: '41-45'
                },
                {
                    deregistrations: 46322,
                    age: '46-51'
                },
                {
                    deregistrations: 25376,
                    age: '52-57'
                },
                {
                    deregistrations: 23742,
                    age: '58-63'
                },
                {
                    deregistrations: 28739,
                    age: '64-69'
                },
                {
                    deregistrations: 23830,
                    age: '70-75'
                },
                {
                    deregistrations: 1332,
                    age: '76-81'
                },
                {
                    deregistrations: 823,
                    age: '82-87'
                }
            ];
            
            q.resolve(data);
            
            return q.promise
        }
        
        public GetDeregistrationsByLocation(): angular.IPromise<Array<IDeregistrationByLocation>> { //todo: add interface
            var q = this.$q.defer();
            
            var data = [
                {
                    deregistrations: 55123,
                    location: 'Dublin'
                },
                {
                    deregistrations: 36514,
                    location: 'Cork'
                },
                {
                    deregistrations: 13456,
                    location: 'Derry'
                },
                {
                    deregistrations: 25903,
                    location: 'Leitrim'
                },
                {
                    deregistrations: 72832,
                    location: 'Louth'
                },
                {
                    deregistrations: 46322,
                    location: 'Donegal'
                },
                {
                    deregistrations: 25376,
                    location: 'Meath'
                },
                {
                    deregistrations: 23742,
                    location: 'Derry'
                },
                {
                    deregistrations: 28739,
                    location: 'Down'
                },
                {
                    deregistrations: 23830,
                    location: 'Antrim'
                },
                {
                    deregistrations: 1332,
                    location: 'Mayo'
                },
                {
                    deregistrations: 823,
                    location: 'Limerick'
                }
            ];
            
            q.resolve(data);
            
            return q.promise
        }
	}

	angular.module('analyticsApp').service('UsersService', UsersService);
}

interface IUserData{
	date: string;
	users: number;
}

interface IDeregistrationByAge{
    deregistrations: number;
    age: string;
}

interface IDeregistrationByLocation{
    deregistrations: number;
    location: string;
}