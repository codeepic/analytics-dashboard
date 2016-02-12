/// <reference path="../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../services/usersService.ts" />
/// <reference path="../../services/codesService.ts" />

module AnalyticsControllers {
	export class OverviewController {

		static $inject = ['$window', '$scope', 'UsersService', 'CodesService'];

		private usersData: Array<IUserData>;
        private codeDeliveriesData: any; //todo: add interface
        
		constructor(
            private $window: angular.IWindowService,
            private $scope: angular.IScope,
            private UsersService: AnalyticsServices.UsersService,
            private CodesService: AnalyticsServices.CodesService
        ) {
			this.GetUsersData();
            this.GetCodeDeliveriesData();
            //data="vm.codeDeliveriesData"
            
            //needed to make the chart directives responsive
            angular.element($window).on('resize', () => {
                $scope.$apply();
            });
		}

		private GetUsersData() {
			this.UsersService.GetUsers()
				.then((usersData: Array<IUserData>) =>{
					this.usersData = usersData;
				}, (error) => {
					console.log('there was an error fetching users');
				})
		}
        
        private GetCodeDeliveriesData() {
			this.CodesService.GetCodeDeliveries()
				.then((codeDeliveriesData: any) =>{ //todo: add interface
					this.codeDeliveriesData = codeDeliveriesData;
				}, (error) => {
					console.log('there was an error fetching code deliveries');
				})
		}
	}

	angular.module('analyticsApp').controller('OverviewController', OverviewController);
}