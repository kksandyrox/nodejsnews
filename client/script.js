	// create the module and name it scotchApp
	var scotchApp = angular.module('scotchApp', ['ngRoute', 'infinite-scroll']);

	var API_URL = "server/api.php"

	var categories = {
		'technology' 	: 1,
		'general' 		: 2,
		'sports' 		: 3,
		'business' 		: 4,
		'entertainment' : 5,
		'gaming' 		: 6
	};
	// configure our routes
	scotchApp.config(function($routeProvider) {
		$routeProvider

			// route for the home page
			.when('/', {
				templateUrl : 'pages/home.html',
				controller  : 'homeController'
			})

			// route for the about page
			.when('/sources', {
				templateUrl : 'pages/sources.html',
				controller  : 'sourceNewsController'
			})

			// .when('/sources/:id', {
			// 	templateUrl : 'pages/sources.html',
			// 	controller  : 'sourceNewsController'
			// })

			.when('/:name', {
				templateUrl : 'pages/general.html',
				controller  : 'generalController',
			});

	});

	scotchApp.controller('homeController', function($scope, $http, $location) {
		$http.get("http://" + $location.host() + ":8080/carousal")
		.then(function(response) {
			$scope.carousalNews = response.data;
		});
	});

	scotchApp.controller('generalController', function($scope, $http, $route, $location) {
		function getCatIdFromName(categories, name) {
			return categories[name];

		}
		var category_id = getCatIdFromName(categories, $route.current.params.name);
		$http.get("http://" + $location.host() + ":8080/categoryNews/" + category_id)
		.then(function (response) {
			var data = response.data.slice(0);

			$scope.generalNews = data;
			$scope.generalNews.splice(3, data.length);
			$scope.category = $route.current.params.name
			$scope.loadMore = function() {
				var last = $scope.generalNews.length - 1;
			    for(var i = 1; i <= 2; i++) {
			     	$scope.generalNews.push(response.data[last + i]);
			    }
			};			
		});
	});


	scotchApp.controller('sourceNewsController', function($scope, $http, $route, $location) {
		var source_id = 1;
		if($route.current.params.source) {
			source_id = $route.current.params.source;
		}

		$http.get("http://" + $location.host() + ":8080/sources")
		.then(function (response) {
			console.log(response.data);
			$scope.sources = response.data;
		})

		$http.get("http://" + $location.host() + ":8080/sourceNews/" + source_id)
		.then(function (response) {
			$scope.sourceNews = response.data;
			$scope.currentSource = source_id;
			$scope.topNews = _.groupBy(response.data, 'sort_id')['1'];
			$scope.latestNews = _.groupBy(response.data, 'sort_id')['2'];
			$scope.popularNews = _.groupBy(response.data, 'sort_id')['3'];
		})
	});
