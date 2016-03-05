angular.module('AngularApp').config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
    function($stateProvider, $urlRouterProvider, $locationProvider) {

        // For unmatched routes
        $urlRouterProvider.otherwise('/');

        // Application routes
        $stateProvider
            .state('index', {
                url: '/',
                templateUrl: 'components/login/login.html'
            })
        ;

        //Use the HTML5 History API
        $locationProvider.html5Mode(true);
    }
]);
