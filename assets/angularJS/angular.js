/*Lancement du module*/
var cool = angular.module('cool', []);
/*Détermination des tableaux rootscope*/
cool.run(function($rootScope){
  $rootScope.basket = {};
  $rootScope.quantity = {};
  $rootScope.totalAmount = 0;
  $rootScope.products = [];
});
/*Récupération des données du fichiers product.json pour les afficher*/
cool.controller('productCtrl', function($scope , $http){
  $http.get('assets/angularJS/products.json').then(function(response){
    /*console.log(response.data)*/
    $scope.products = response.data;
    $scope.changeSupport = function(support) {
      $scope.filterChange = support;
    };
    $scope.changeOrder = function(order){
      $scope.orderby = order;
    };
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
$(function(){
   $('#scrollTop').click(function(){
   $("html, body").animate({scrollTop: 0},"slow");
 });
});
