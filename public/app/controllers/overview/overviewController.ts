/// <reference path="../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../services/usersService.ts" />

module AnalyticsControllers {
	export class OverviewController {

		static $inject = ['usersService'];

		private usersData: Array<IUserData>;

		constructor(private usersService: AnalyticsServices.UsersService) {
			this.GetUsersData();
		}

		public GetUsersData() {
			this.usersService.GetUsers()
				.then((usersData: Array<IUserData>) =>{
					this.usersData = usersData;
				}, (error) => {
					console.log('there was an error fetching users');
				})
		}
	}

	angular.module('analyticsApp').controller('OverviewController', OverviewController);
}