var app = angular.module('metaCoinApp', []);

app.config(function($locationProvider) {
  $locationProvider.html5Mode(true);
});

app.controller("metaCoinController", ['$scope', '$location', '$http', '$q', '$window', '$timeout', function($scope, $location, $http, $q, $window, $timeout) {

  $scope.accounts = [];
  $scope.account = "";
  $scope.balance = "";

  $scope.refreshBalance = function() {
    var meta = MetaCoin.deployed();

    meta.balance.call($scope.account, { from: $scope.account })
    .then(function(value) {
      $timeout(function() {
        $scope.balance = value.valueOf();
      });
    }).catch(function(e) {
      console.log(e);
      setStatus("Error refreshing balance; see log.")
    });
  };

$scope.sendCoin= function(amount, receiver) {
  var meta = MetaCoin.deployed();

  setStatus("Initiating transaction... (please wait)");

  meta.sendCoin(receiver, amount, {from: account}).then(function() {
    setStatus("Transaction complete!");
    refreshBalance();
  }).catch(function(e) {
    console.log(e);
    setStatus("Error sending coin; see log.");
  });
};

  }]);
