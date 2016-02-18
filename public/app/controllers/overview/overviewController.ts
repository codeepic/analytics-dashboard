/// <reference path="../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../services/usersService.ts" />
/// <reference path="../../services/codesService.ts" />
/// <reference path="../../services/offersService.ts" />
/// <reference path="../../services/vendorsService.ts" />

module AnalyticsControllers {
	export class OverviewController {

		static $inject = ['$window', '$scope', 'UsersService', 'CodesService', 'OffersService', 'VendorsService'];

		private usersData: Array<IUserData>;
        private codeDeliveriesData: any; //todo: add interface
        private offersByCategoryData: Array<IByCategoryData>; //todo: add interfaces
        private vendorsByCategoryData: Array<IByCategoryData>; //todo: add interfaces
        private deregistrationsByAgeData: Array<IDeregistrationByAge>; //Array<> //todo: add interfaces
        private deregistrationsByLocationData: Array<IDeregistrationByLocation>; //Array<> //todo: add interfaces
		
        constructor(
            private $window: angular.IWindowService,
            private $scope: angular.IScope,
            private UsersService: AnalyticsServices.UsersService,
            private CodesService: AnalyticsServices.CodesService,
            private OffersService: AnalyticsServices.OffersService,
            private VendorsService: AnalyticsServices.VendorsService
        ) {
			this.GetUsersData();
            this.GetCodeDeliveriesData();
            this.GetOffersByCategoryData();
            this.GetVendorsByCategoryData();
            this.GetDeregistrationsByAgeData();
            this.GetDeregistrationsByLocationData();
            //data="vm.codeDeliveriesData"
            
            //needed to make the chart directives responsive
            angular.element($window).on('resize', () => {
                $scope.$apply();
            });
		}

		private GetUsersData(): void {
			this.UsersService.GetUsers()
				.then((usersData: Array<IUserData>) =>{
					this.usersData = usersData;
				}, (error) => {
					console.log('there was an error fetching users');
				});
		}
        
        private GetCodeDeliveriesData(): void {
			this.CodesService.GetCodeDeliveries()
				.then((codeDeliveriesData: any) =>{ //todo: add interface
					this.codeDeliveriesData = codeDeliveriesData;
				}, (error) => {
					console.log('there was an error fetching code deliveries');
				});
		}
        
        private GetOffersByCategoryData(): void {
            this.OffersService.GetOffersByCategory()
				.then((offersByCategoryData: Array<IByCategoryData>) =>{
					this.offersByCategoryData = offersByCategoryData;
				}, (error) => {
					console.log('there was an error fetching offers by category data');
				});
        }
        
        private GetVendorsByCategoryData(): void {
            this.VendorsService.GetVendorsByCategory()
				.then((vendorsByCategoryData: Array<IByCategoryData>) =>{
					this.vendorsByCategoryData = vendorsByCategoryData;
				}, (error) => {
					console.log('there was an error fetching vendors by category data');
				});
        }
        
        private GetDeregistrationsByAgeData(): void {
            this.UsersService.GetDeregistrationsByAge()
                .then((result: Array<IDeregistrationByAge>) => {
                    this.deregistrationsByAgeData = result;
                }, () => {
                    console.log('there was an error fetching deregistrations by age data');
                })
        }
        
        private GetDeregistrationsByLocationData(): void {
            this.UsersService.GetDeregistrationsByLocation()
                .then((result: Array<IDeregistrationByLocation>) => {
                    this.deregistrationsByLocationData = result;
                }, () => {
                    console.log('there was an error fetching deregistrations by location data');
                })
        }
	}

	angular.module('analyticsApp').controller('OverviewController', OverviewController);
}