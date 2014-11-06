'use strict';

/**
* @ngdoc function
* @name humanSynthApp.controller:MainCtrl
* @description
* # MainCtrl
* Controller of the humanSynthApp
*/
angular.module('humanSynthApp').controller('MainCtrl', ['$scope', '$rootScope', '$timeout', 'contentfulClient', 'brightcove', function ($scope, $rootScope, $timeout, contentfulClient, brightcove){
	
	$scope.data = {};
	$scope.data.title = '';
	$scope.data.body = '';
	$scope.data.ready = false;
	$scope.video = false;
	$scope.intro = true;

	//instantiate video player
	brightcove.init();


	//drop spinner after video is ready
	$rootScope.$on('playerready', function(data, player){
		$scope.player = player;
		$timeout(function(){
			$scope.video = true;
		},500);

	});

	//get data
	contentfulClient.entries({'sys.id': '1twzxxkiC4wMWWyWEGuecq', 'include':10}).then(function(data){
		$scope.data = data[0];
		$scope.data.ready = true;
		console.log($scope.data);
	});

	$scope.dropIntro = function(){
		$scope.intro = false;
	};

	$scope.dropBody = function(){
		$scope.intro = true;

	};


}]);
