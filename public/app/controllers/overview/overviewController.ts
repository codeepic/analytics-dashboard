/// <reference path="../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../services/usersService.ts" />

module AnalyticsControllers {
	export class OverviewController {

		static $inject = ['usersService'];

		private users: any;

		constructor(private usersService: AnalyticsServices.UsersService) {
			console.log('overview controller init in ts sd', this.usersService);
			this.GetUsers();
		}

		public GetUsers() {
			this.usersService.GetUsers()
				.then((usersData) =>{
					console.log('success fetching users');
					this.users = usersData;
				}, (error) => {
					console.log('there was an error fetching users');
				})
		}
	}

	angular.module('analyticsApp').controller('OverviewController', OverviewController);
}