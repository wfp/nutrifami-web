/*global angular*/
nutrifamiApp.controller('nc_jugarController', function($scope, $anchorScroll, $location, $uibModal, bsLoadingOverlayService, UsuarioService, NutricompraService) {
    'use strict';

    $anchorScroll();


    $scope.usuarioActivo = UsuarioService.getUsuarioActivo();


    /* Overloading*/
    bsLoadingOverlayService.start();
    /* Se apaga cuando el todo el contenido de la vista ha sido cargado*/
    $scope.$on('$viewContentLoaded', function() {
        /* Se le agrega 0,3 segundos para poder verlo ver inicialmente
         * cuando el contenido se demore mucho en cargar se puede quitar el timeout*/
        bsLoadingOverlayService.stop();
    });

    $scope.nutricompra = true;

    var categorias = [
        'azucares', 'carnes', 'cereal', 'frutas', 'grasas', 'inadecuados', 'leche'

    ];

    $scope.productos = [];

    NutricompraService.getProductosVitrina(function(response) {
        $scope.productos = response;
    });


    $scope.verResumen = function() {
        $location.path('/nutricompra/jugar/resumen');

    };

    $scope.salir = function() {
        var data = {
            texto1: '¿Está seguro de salir?',
            texto2: 'Si sale perderá todo el progreso del juego',
            boton1: 'Continuar',
            enlace1: '',
            boton2: 'Salir',
            enlace2: 'nutricompra'
        };

        var modalInstance = $uibModal.open({
            animation: true,
            windowClass: 'nutricompra-salir',
            templateUrl: 'views/nutricompra/nc_salir.modal.html',
            controller: 'nc_salirModalController',
            keyboard: false,
            size: 'sm',
            backdrop: 'static',
            resolve: {
                data: function() {
                    return data;
                }
            }

        });


    };






});
