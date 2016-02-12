/// <reference path="../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../services/usersService.ts" />

module AnalyticsControllers {
	export class OverviewController {

		static $inject = ['$window', '$scope', 'usersService'];

		private usersData: Array<IUserData>;

		constructor(
            private $window: angular.IWindowService,
            private $scope: angular.IScope,
            private usersService: AnalyticsServices.UsersService
        ) {
			this.GetUsersData();
            
            //needed to make the chart directives responsive
            // angular.element($window).on('resize', () => {
            //     $scope.$apply();
            // });
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