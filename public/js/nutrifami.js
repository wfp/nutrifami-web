var usuarioActivo = new Object();   /* Información del usuario logueado */
var familiaObj = new Object();      /* Datos de la familia del usuario logueado, incluidos miembros de la familia*/



var base_url = 'http://127.0.0.1:83/'; /* Direccion del servidor */

var nutrifami = {

    /* nutrifami.usuarioActivoServerInfo */
    usuarioActivoServerInfo: new Object(),


    /*
     * nutrifami.getSessionId(callback);
     */
    getSessionId: function(callback) {
        callback = callback || function() {};
        var serv = base_url + "app/api/get-session-id";
        $.ajax({
            url: serv,
            async: false,
            success: function(data) {
                var objServ = JSON.parse(data);
                usuarioActivo.sesionId = objServ.sid;
                usuarioActivo.isLogin = usuarioActivo.isLogin || false;
                usuarioActivo.login_documento = usuarioActivo.login_documento || '';
                usuarioActivo.login_codigo = usuarioActivo.login_codigo || '';
                usuarioActivo.token = usuarioActivo.token || '';
                callback();
            }
        });
    },

    /*
     * nutrifami.buildToken(callback)
     */
    buildToken: function(callback) {
        callback = callback || function() {};
        if (usuarioActivo.sesionId && usuarioActivo.sesionId != '' && usuarioActivo.login_documento && usuarioActivo.login_documento != '' && usuarioActivo.login_codigo && usuarioActivo.login_codigo != '') {
            var tempSid = usuarioActivo.sesionId;
            var tempLdoc = usuarioActivo.login_documento;
            var tempLcod = usuarioActivo.login_codigo;
            var tokenTemp = tempSid.substring(0, 4) + tempLdoc.substring(0, 4) + tempSid.substring(4, 8) + tempLcod.substring(0, 4) + tempSid.substring(8, 12);
            var tokenTemp = md5(tokenTemp);
            usuarioActivo.token = tokenTemp;

        } else {
            usuarioActivo.token = '';
        }
        callback();
    },

    /*
     * nutrifami.setLoginData(documento, codigo, callback)
     */
    setLoginData: function(documento, codigo, callback) {
        documento = documento || '';
        codigo = codigo || '';
        callback = callback || function() {};
        if (documento != '' && codigo != '') {
            usuarioActivo.login_documento = documento;
            usuarioActivo.login_codigo = codigo;
            this.buildToken(function() {
                callback();
            });
        }
    },

    /*
     * nutrifami.login(callback);
     * 
     * @param {type} documento
     * @param {type} codigo
     * @param {type} callback
     * @returns {undefined}
     */
    login: function(callback) {
        callback = callback || function() {};
        var serv = base_url + "app/api/login?d=" + usuarioActivo.login_documento + "&c=" + usuarioActivo.login_codigo + "&t=" + usuarioActivo.token;
        console.log(serv);
        $.ajax({
            url: serv,
            type: 'POST',
            async: false,
            success: function(data) {
                var objServ = JSON.parse(data);
                if (objServ.response === 1) {

                    /* Información de usuario logueado */
                    usuarioActivo.jefe = objServ.jefe;
                    usuarioActivo.nombre = objServ.nombre;
                    usuarioActivo.apellido = objServ.apellido;
                    usuarioActivo.edad = objServ.edad;
                    usuarioActivo.birthdate = objServ.birthdate;
                    usuarioActivo.genero = objServ.genero;
                    usuarioActivo.etnia = objServ.etnia;
                    usuarioActivo.departamento = objServ.departamento;
                    usuarioActivo.municipio = objServ.municipio;
                    usuarioActivo.comunidad = objServ.comunidad;
                    usuarioActivo.zona = objServ.zona;
                    usuarioActivo.direccion = objServ.direccion;
                    usuarioActivo.telefono = objServ.telefono;
                    usuarioActivo.movil = objServ.movil;
                    usuarioActivo.email = objServ.email;
                    usuarioActivo.avatar = objServ.avatar;
                    usuarioActivo.rango_0a2 = parseInt(objServ.rango_0a2) || 0;
                    usuarioActivo.rango_2a5 = parseInt(objServ.rango_2a5) || 0;
                    usuarioActivo.rango_6a17 = parseInt(objServ.rango_6a17) || 0;
                    usuarioActivo.rango_18a60 = parseInt(objServ.rango_18a60) || 0;
                    usuarioActivo.rango_60mas = parseInt(objServ.rango_60mas) || 0;
                    
                    localStorage.setItem("usuarioActivo", JSON.stringify(usuarioActivo));

                    familiaObj.codigo = '123456';
                    familiaObj.personas = Array();
                    /* Información de la cabeza de hogar*/
                    familiaObj.personas.cabeza = Array();
                    familiaObj.personas.cabeza.nombres = 'Abel Oswaldo';
                    familiaObj.personas.cabeza.apellidos = 'Moreno Acevedo';
                    familiaObj.personas.cabeza.documeto = '999999';
                    familiaObj.personas.cabeza.genero = 'Masculino';
                    familiaObj.personas.cabeza.etnia = 'Mestizo';
                    familiaObj.personas.cabeza.edad = '31';
                    familiaObj.personas.cabeza.nacimiento = '10/12/1984';
                    familiaObj.personas.cabeza.departamento = 'Bogotá';
                    familiaObj.personas.cabeza.municipio = 'Bogotá';
                    familiaObj.personas.cabeza.comunidad = '';
                    familiaObj.personas.cabeza.avatar = '';
                    /* Informacion de cantidad de personas */
                    familiaObj.personas.cantidades = Array();
                    familiaObj.personas.cantidades.rango1 = Array();
                    familiaObj.personas.cantidades.rango1.descripcion = 'Entre 18 y 60 años';
                    familiaObj.personas.cantidades.rango1.cantidad = 2;
                    familiaObj.personas.cantidades.rango2 = Array();
                    familiaObj.personas.cantidades.rango2.descripcion = 'Entre 0 y 2 años';
                    familiaObj.personas.cantidades.rango2.cantidad = 1;
                    /* Infomacion detallada de otras personas */
                    familiaObj.personas.otros = Array();
                    familiaObj.personas.otros[1] = Array();
                    familiaObj.personas.otros[1].nombres = 'Pepito';
                    familiaObj.personas.otros[1].apellidos = 'Moreno';
                    familiaObj.personas.otros[1].documeto = '888';
                    familiaObj.personas.otros[1].genero = 'Masculino';
                    familiaObj.personas.otros[1].etnia = 'Mestizo';
                    familiaObj.personas.otros[1].edad = '1.6';
                    familiaObj.personas.otros[1].nacimiento = '10/12/2015';
                    familiaObj.personas.otros[1].departamento = 'Bogotá';
                    familiaObj.personas.otros[1].municipio = 'Bogotá';
                    familiaObj.personas.otros[1].comunidad = '';
                    familiaObj.personas.otros[1].avatar = '';
                    familiaObj.personas.otros[1].parentezco = 'hijo';



                    this.isloginFlag = true;
                    callback(true, usuarioActivo.token);

                } else {
                    callback(false, 'Documento o Código incorrecto');
                }

            },
            error: function() {
                callback(false, 'Ha ocurrido un error durante la ejecución');

            }

        });

    },

    /*
     * nutrifami.editarUsuarioActivo(data, callback);
     * @param {type} data
     * @param {type} callback
     * @returns {undefined}
     */
    editarUsuarioActivo: function(data, callback) {
        /*
         * data.nombres = 'Abel Oswaldo';
         * data.apellidos = 'Moreno Acevedo';
         * data.documeto = '999999';
         * data.genero = 'Masculino';
         * data.etnia = 'Mestizo';
         * data.edad = '31';
         * data.nacimiento = '10/12/1984';
         * data.departamento = 'Bogotá';
         * data.municipio = 'Bogotá';
         * data.comunidad = '';
         * data.avatar = '';
         * data.sesionId = 'xxxxx';
         * data.token = 'xxxxxx';
         */
        nutrifami.usuarioActivoServerInfo = usuarioActivo;
        usuarioActivo = data;
        callback = callback || function() {};
    },

    /*
     * nutrifami.subirUsuarioActivo(callback);
     */
    subirUsuarioActivo: function(callback) {
        callback = callback || function() {};
        console.log('subirUsuarioActivo');
        /*
         * Funcionalidad Ajax
         */
    },

    /*
     * nutrifami.islogin(callback);
     */
    islogin: function(callback) {
        callback = callback || function() {};
        return this.isloginFlag;
    },
    
    
    
    
    /*
     * Sub elemento training
     * 
     * Manejo de todas las funcionalidades de las capacitaciones
     * 
     */
    training: {
        
        cap_capacitaciones: new Object(),         /* this.cap_capacitacion */
        cap_modulos: new Object(),              /* this.cap_modulos */
        cap_lecciones: new Object(),            /* this.cap_lecciones */
        cap_unidadesinformacion: new Object(),  /* this.cap_unidadesinformacion */
        cap_loadContentProgress: false,         /* this.cap_loadContentProgress */
        
        /*
         *  nutrifami.training.initClient(callback);
         *  
         *  Inicializa los objetos necesarios en la estructura de la capacitacion.
         *  
         */
        initClient: function(callback) {
            callback = callback || function() {};
            
            // this.cap_capacitacion = LocalStorage Si existe;
            // this.cap_modulos = LocalStorage Si existe;
            // this.cap_lecciones = LocalStorage Si existe;
            // this.cap_unidadesinformacion = LocalStorage Si existe;
            // this.cap_loadContentProgress = LocalStorage Si existe;
            
        }, 
        
        /*
         * nutrifami.training.downloadCapacitacion(cid, callback);
         */
        downloadCapacitacion: function(cid, callback) {
            cid = cid || 0;
            callback = callback || function() {};
            
            var serv = base_url + "app/api/get-capacitaciones?cid="+cid;
            $.ajax({
                url: serv,
                async: false,
                success: function(data) {
                    var objServ = JSON.parse(data);
                    /*var capacitacionObj = {
                        id: 3,
                        tipo: {
                            id: 1,
                            alias: 'general',
                            nombre: 'General',
                            descripcion: 'Capacitación para el publico en general'
                        },
                        titulo: 'Participantes PMA',
                        descripcion: 'Capacitacion inicial, para participantes del PMA',
                        fecha: '', 
                        activo: true, 
                        modulos: {  
                            1: 5
                        }, 
                        completo: false
                    };*/
                    $.each(objServ, function(index, value) {
                        var capObj = value;
                        capObj.completo = false;
                        nutrifami.training.cap_capacitaciones[index] = nutrifami.training.cap_capacitaciones[index] || capObj;
                    }); 
                    callback();
                }
            });
                /* Si this.cap_capacitaciones[3] existe y 
                 * this.cap_capacitaciones[3].fecha es igual a la del servidor
                 * No se debe cargar la info de esa capacitacion. 
                 * 
                 * Si cid > 0 se trae la info solo de esa capacitacion,
                 * sino se trae la de todas las capacitaciones activas            
                 * 
                 * Eliminar todos los elementos que no existan en el servidor
                 * al terminar la carga                       
                */
            /* Fin Ajax */
        }, 
        
        /*
         * nutrifami.training.downloadModulo(mid, callback);
         */
        downloadModulo: function(mid, callback) {
            mid = mid || 0;
            callback = callback || function() {};
            
            var serv = base_url + "app/api/get-modulo?mid="+mid;
            $.ajax({
                url: serv,
                async: false,
                success: function(data) {
                    var objServ = JSON.parse(data);
                    /*var moduloObj = {
                        id: 5,
                        titulo: 'Alimentación Saludable y Agua Sana',
                        descripcion: 'Alimentación Saludable y Agua Sana',
                        imagen: {
                            nombre: '201651175223151.jpg',
                            content: Object, // Cargar con otra funcion 
                            loaded: false
                        },
                        fecha: '', 
                        activo: true, 
                        lecciones: {  
                            01: 16,
                            02: 17,
                            03: 18,
                            04: 19,
                            05: 20
                        }, 
                        completo: false
                    } ;*/
                        objServ.completo = false;
                        if (typeof nutrifami.training.cap_modulos[objServ.id] === 'undefined' || nutrifami.training.cap_modulos[objServ.id] === null) {
                            nutrifami.training.cap_modulos[objServ.id] = objServ;
                            if (typeof nutrifami.training.cap_modulos[objServ.id].imagen !== 'undefined') {/* Cargar imgagen desde s3*/
                                nutrifami_aws.s3.downloadFile(objServ.imagen.nombre, nutrifami.training.cap_modulos[objServ.id].imagen, 'content', 'loaded');
                            }
                            callback();
                        }else {
                            callback();
                        }
                }
            });
            /* Fin Ajax */
        }, 
        
         /*
         * nutrifami.training.downloadLeccion(lid, callback);
         */
        downloadLeccion: function(lid, callback) {
            lid = lid || 0;
            callback = callback || function() {};
            
            /* Ajax */
            var serv = base_url + "app/api/get-leccion?lid="+lid;
            $.ajax({
                url: serv,
                async: false,
                success: function(data) {
                    var objServ = JSON.parse(data);
                    /*var leccionObj = {
                        id: 16,
                        titulo: 'Alimentación saludable',
                        descripcion: 'Alimentación saludable',
                        imagen: {
                            nombre: '201651175223151.jpg',
                            content: Object, 
                            loaded: false
                        },
                        fecha: '', 
                        activo: true, 
                        unidades: {  
                            0100: 1,
                            0200: 2,
                            0300: 3,
                            0301: 6,
                            0400: 4,
                            0500: 5
                        }, 
                        completo: false
                    } ;
                    this.cap_lecciones[16] = leccionObj; 
                     */
                        objServ.completo = false;
                        if (typeof nutrifami.training.cap_lecciones[objServ.id] === 'undefined' || nutrifami.training.cap_lecciones[objServ.id] === null) {
                            nutrifami.training.cap_lecciones[objServ.id] = objServ;
                            if (typeof nutrifami.training.cap_lecciones[objServ.id].imagen !== 'undefined') {/* Cargar imgagen desde s3*/
                                nutrifami_aws.s3.downloadFile(objServ.imagen.nombre, nutrifami.training.cap_lecciones[objServ.id].imagen, 'content', 'loaded');
                            }
                            callback();
                            /* Cargar imgagen desde s3*/
                        }else {
                            callback();
                        }
                }
            });
            /* Fin Ajax */
        }, 
        
         /*
         * nutrifami.training.downloadUnidad(uid, callback);
         */
        downloadUnidad: function(uid, callback) {
            uid = uid || 0;
            callback = callback || function() {};
            
            /* Ajax */
            var serv = base_url + "app/api/get-unidadinformacion?uid="+uid;
            $.ajax({
                url: serv,
                async: false,
                success: function(data) {
                    var objServ = JSON.parse(data);
                    /*
                        var unidadObj = {
                            id: 3,
                            tipo: {
                                id: 3,
                                nombre: 'Quiz imagen',
                                alias: 'tipo3', 
                                descripcion: 'Seleccionar una opcion, entre 6, de acuerdo a la pregunta y a la imagen que se muestra.'
                            },
                            titulo: 'Lorem ipsum dolor sit amet',
                            instruccion: 'Lorem ipsum dolor sit amet',
                            audio: {
                                nombre: '194813__unfa__hello-nerds-inspired-by-animaniacs-hello-nurse-6-takes.flac',
                                content: Object, 
                                loaded: false
                            },
                            texto: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ac ante a lorem laoreet facilisis.',
                            imagen: {
                                nombre: '201651175223151.jpg',
                                content: Object, 
                                loaded: false
                            },
                            media: {
                                nombre: '',
                                content: Object, 
                                loaded: false
                            },
                            fecha: '', 
                            activo: true, 
                            from: 0, 
                            opciones: {  
                                9: {
                                    id: 9,
                                    correcta: false,
                                    orden: 0,
                                    fecha: '',
                                    visible: true,
                                    texto: 'Nam',
                                    audio: {
                                        nombre: '',
                                        content: Object, 
                                        loaded: false
                                    },
                                    media: {
                                        nombre: '',
                                        content: Object,
                                        loaded: false
                                    }
                                }
                            }, 
                            completo: false
                        } ; 
                    */
                        objServ.completo = false;
                        if (typeof nutrifami.training.cap_unidadesinformacion[objServ.id] === 'undefined' || nutrifami.training.cap_unidadesinformacion[objServ.id] === null) {
                            nutrifami.training.cap_unidadesinformacion[objServ.id] = objServ;
                            if (typeof nutrifami.training.cap_unidadesinformacion[objServ.id].imagen !== 'undefined') {
                                nutrifami_aws.s3.downloadFile(objServ.imagen.nombre, nutrifami.training.cap_unidadesinformacion[objServ.id].imagen, 'content', 'loaded');
                            }
                            if (typeof nutrifami.training.cap_unidadesinformacion[objServ.id].audio !== 'undefined') {
                                nutrifami_aws.s3.downloadFile(objServ.audio.nombre, nutrifami.training.cap_unidadesinformacion[objServ.id].audio, 'content', 'loaded');
                            }
                            if (typeof nutrifami.training.cap_unidadesinformacion[objServ.id].media !== 'undefined') {
                                nutrifami_aws.s3.downloadFile(objServ.media.nombre, nutrifami.training.cap_unidadesinformacion[objServ.id].media, 'content', 'loaded');
                            }
                            $.each(nutrifami.training.cap_unidadesinformacion[objServ.id].opciones, function(indexopc, opcionun) {
                                if (typeof nutrifami.training.cap_unidadesinformacion[objServ.id].opciones[opcionun.id].audio !== 'undefined') {
                                nutrifami_aws.s3.downloadFile(opcionun.audio.nombre, nutrifami.training.cap_unidadesinformacion[objServ.id].opciones[opcionun.id].audio, 'content', 'loaded');
                                }
                                if (typeof nutrifami.training.cap_unidadesinformacion[objServ.id].opciones[opcionun.id].media !== 'undefined') {
                                nutrifami_aws.s3.downloadFile(opcionun.media.nombre, nutrifami.training.cap_unidadesinformacion[objServ.id].opciones[opcionun.id].media, 'content', 'loaded');
                                }
                            }); 
                            callback();
                        }else {
                            callback();
                        }
                }
            });
            /* Fin Ajax */
        },
        
        /*
         * nutrifami.training.setCapacitacion(callback);
         */
        loadCapacitacion: function(callback){
            callback = callback || function() {};
            nutrifami.training.downloadCapacitacion(0, function(){
                $.each(nutrifami.training.cap_capacitaciones, function(indexcap, capacitaciones) {
                    $.each(capacitaciones.modulos, function(indexmod, id_modulo) {
                        nutrifami.training.downloadModulo(id_modulo, function(){
                            callback();
                        });
                    }); 
                }); 
            });
        },
        
        /*
         * nutrifami.training.loadModulo(mid, callback);
         */
        loadModulo: function(mid, callback) {
            mid = mid || 0;
            callback = callback || function() {};   
            $.each(nutrifami.training.cap_modulos[mid].lecciones, function(indexlec, id_leccion) {
                nutrifami.training.downloadLeccion(id_leccion, function(){
                    if (nutrifami.training.cap_lecciones[id_leccion].unidades) {
                        $.each(nutrifami.training.cap_lecciones[id_leccion].unidades, function(indexuni, id_unidad) {
                            nutrifami.training.downloadUnidad(id_unidad, function(){
                                console.log('Carga unidad '+id_unidad);
                            });
                        }); 
                    }
                });
            }); 
            callback();
        }
        
        
        
    }
    
    
    
    
    
};
