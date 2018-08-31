// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('starter', ['ionic'])
    
.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})




app.config(function($stateProvider, $urlRouterProvider) {

     
    $stateProvider.state('home',{
       cache: false,
      url: '/home',
      templateUrl : 'page/home.html',
      controller: 'TodoController'
    })


     $stateProvider.state('insert',{
       cache: false,
      url: '/insert',
      templateUrl : 'page/insert.html',
      controller: 'TodoController'
 
    })

  
     $urlRouterProvider.otherwise('/home');
});


app.controller('TodoController', function($state, $http, $scope, $ionicPopup) {
  $scope.appTitle = "Daily Task";
  $scope.appHeadline = "This one will save to local storage!";
  $scope.saved = localStorage.getItem('todos');
  $scope.todos = (localStorage.getItem('todos')!==null) ? JSON.parse($scope.saved) : [ {text: 'Learn AngularJS', done: false}, {text: 'Build an Angular app', done: false} ];
  localStorage.setItem('todos', JSON.stringify($scope.todos));

  $scope.addTodo = function() {
    $scope.todos.push({
      text: $scope.todoText,
      int: $scope.todoAmount,
      
      done: false
    });
    $scope.todoText = ''; //clear the input after adding
    $scope.todoAmount = '';
    localStorage.setItem('todos', JSON.stringify($scope.todos));
  
  };

  

  $scope.remaining = function() {
    var count = 0;
    angular.forEach($scope.todos, function(todo){
      count+= todo.done ? 0 : 1;
    });
    return count;
  };

  $scope.archive = function() {
    var oldTodos = $scope.todos;
    $scope.todos = [];
    angular.forEach(oldTodos, function(todo){
      if (!todo.done)
        $scope.todos.push(todo);
    });
    localStorage.setItem('todos', JSON.stringify($scope.todos));
  };
});


    



