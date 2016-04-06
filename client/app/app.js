'use strict';

angular.module('sL', [
  'sL.searchBar',
  'sL.aboutController',
  'sL.services',
  'sL.auth',
  'sL.resultsController',
  'sL.modal',
  'ui.bootstrap',
  'ui.router',
  'ngAnimate',
  'sL.statechange',
  'ngResource'

])

// spinner for page loading status
.run(function($rootScope, $state, $stateParams) {
  $rootScope.$state = $state;
  $rootScope.$stateParams = $stateParams;

  $rootScope.stateIsLoading = false;
  $rootScope.$on('$routeChangeStart', function() {
    $rootScope.stateIsLoading = true;
  });
  $rootScope.$on('$routeChangeSuccess', function() {
    $rootScope.stateIsLoading = false;
  });
  $rootScope.$on('$routeChangeError', function() {
    //catch error
  });
})


.config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/searchBar');

  $stateProvider
    .state('searchBar', {
      url: '/searchBar',
      templateUrl: 'views/searchBar.html',
      controller: 'SearchBar'
    })
    .state('searchBar.results', {
      url: '/results',
      templateUrl: 'views/searchBar.results.html',
      controller: 'ResultsController',
      resolve: {
        SearchSwap: 'SearchSwap',
        News: 'News',
        Data: 'Data',
        swap: function(SearchSwap, News, Data) {
          console.log('called resolve state');
          return News.getTopTen(Data.input);
        }
      }
    })
    .state('modal', {
      url: '/modal',
      templateUrl: 'views/modal.html',
      controller: 'ModalController'
    })
    .state('signin', {
      url: '/signin',
      templateUrl: 'views/signin.html',
      controller: 'AuthController'
    })
    .state('signup', {
      url: '/signup',
      templateUrl: 'views/signup.html',
      controller: 'AuthController'
    })
    .state('about', {
      url: '/about',
      templateUrl: 'views/about.html',
      controller: 'AboutController'
    });

});
