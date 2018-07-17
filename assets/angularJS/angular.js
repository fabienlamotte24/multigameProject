/*Lancement du module*/
var product = angular.module('product', []);
/*Détermination des tableaux rootscope*/
product.run(function($rootScope){
  $rootScope.basket = {};
  $rootScope.quantity = {};
  $rootScope.totalAmount = 0;
  $rootScope.products = [];
});
/*Récupération des données du fichiers product.json pour les afficher*/
product.controller('productCtrl', function($scope , $http){
  $http.get('assets/angularJS/products.json').then(function(response){
    $scope.products = response.data;
  });
  /*Fonction pour sauvegarder au click les données du produit voulu*/
  $scope.saveItem = function(product){
    if(product.id in $scope.quantity){
    $scope.quantity[product.id] += 1;
  } else {
    $scope.quantity[product.id] = 1;
    $scope.basket[product.id] = product;
  }
  $scope.totalAmountCalc();
  };
  /*Création fonction calcul du montant total*/
  $scope.totalAmountCalc = function(){
    $scope.totalAmount = 0;
    for(var key in $scope.quantity){
      $scope.totalAmount += $scope.basket[key].price*$scope.quantity[key];
    }
  }
  /*Création fonction de suppression de ligne au clic de la croix*/
  $scope.removeLine = function(product){
    delete $scope.quantity[product.id];
    delete $scope.basket[product.id];
    $scope.totalAmountCalc();
  }
  /*Création fonction d'ajout de 1 quantité*/
  $scope.addQuantity = function(product){
    $scope.quantity[product.id] ++;
    $scope.totalAmountCalc();
  }
  /*Création fonction de suppression de 1 quantité*/
  $scope.remQuantity = function(product){
    $scope.quantity[product.id] --;
    $scope.totalAmountCalc();
  }
});
