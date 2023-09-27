<template>
    <div class="container" style="margin:20px;float:left;margin-left: 160px;">
        <ul class="nav nav-tabs">
        <li class="nav-item active">
            <a class="nav-link" href="#" @click=toggleValues(1)>Informacion Basica</a>
        </li>
        <li class="nav-item active">
            <a class="nav-link" href="#" @click=toggleValues(2)>Cronograma</a>
        </li>
        <li class="nav-item active">
            <a class="nav-link" href="#" @click=toggleValues(3)>Documentacion peticion de Ofertas</a>
        </li>
        </ul>
    </div>
    <br>
    <br>
    <div class="container mt-5" style="margin-left: 160px;">
        <div class="card">
            <div class="card-header">
                <h4>
                    Informacion Basica
                </h4>
            </div>
            <div class="card-body" v-if="model.user.showElement">
                <div class="row">
                    <div class="mb-3 col-xs-4" style="width: 50% !important;">
                        <label for="">Objeto</label>
                        <input type="text" v-model="model.evento.objeto" class="form-control" />
                    </div>
                    <div class="mb-3" style="width: 50% !important;margin-top: 24px;">
                        <select v-model="model.evento.actividad" class="form-select" aria-label="Default select example">
                            <option selected v-for="(user, index) in this.users" :key="index">{{ user.nombre_familia }} -  {{ user.nombre_clase }} - {{ user.nombre_producto }}</option>
                        </select>
                    </div>
                </div>
                <div class="mb-3" style="width: 49% !important;">
                    <label for="">Descripcion / Alcance</label>
                    <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" type="text" v-model="model.evento.descripcion" ></textarea>
                </div>
                <div class="row">
                    <div class="mb-3 col-xs-4" style="width: 25% !important;">
                        <label for="">Moneda</label>
                        <select v-model="model.evento.moneda" class="form-select" aria-label="Default select example">
                            <option selected value="COP">COP</option>
                            <option value="USD">USD</option>
                            <option value="EUR">EUR</option>
                        </select>
                    </div>
                    <div class="mb-3 col-xs-4" style="width: 25% !important;">
                        <label for="">Presupuesto</label>
                        <input type="text" v-model="model.evento.presupuesto" class="form-control" />
                    </div>                    
                </div>

                <div class="alert alert-danger" v-if="model.user.success" role="alert">
                    A simple success alert—check it out!
                </div>

                <div class="mb-3">
                    <button type="button" @click="saveUser" class="btn btn-success">Guardar</button>
                </div>
            </div>

            <div class="card-body" v-if="model.user.showCronogram">
                <div class="row">
                    <div class="mb-3 col-xs-4" style="width: 50% !important;">
                        <label for="">Fecha Inicio</label>
                        <VueDatePicker v-model="model.evento.fecha_inicio"></VueDatePicker>
                    </div>
                    <div class="mb-3 col-xs-4" style="width: 50% !important;">
                        <label for="">Fecha Inicio</label>
                        <VueDatePicker v-model="model.evento.fecha_fin"></VueDatePicker>
                    </div>
                </div>
            </div>


            <div class="card-body" v-if="model.user.documentacion">
                <button to="/" class="btn btn-secondary">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-circle" viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                    </svg>
                    <input type="file">
                </button>
                <br>
                <table class="table table-bordered" style="margin-top: 10px;">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Tipo</th>
                            <th>Titulo</th>
                            <th>Contenido</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <br>

                    <tbody>

                    </tbody>
                </table>
                <div>
                    <button to="/" class="btn btn-success" style="margin-left: 500px;">
                        Guardar
                    </button>
                </div>
            </div>


            
        </div>
        <div>
        
        </div>
    </div>
</template>


<script>
import axios from 'axios';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
export default {
    name: 'usersCreate',
    components: { VueDatePicker },
    data(){
        return {
            users: [],
            model: {
                user:{
                    dni: '',
                    nombre: '',
                    correo: '',
                    telefono: '',
                    token: '6de1d8ccba76def24dc1fa22a2b52317',
                    showElement: true,
                    showCronogram: false,
                    documentacion: false,
                    success: false
                },
                evento:{
                    objeto:'',
                    descripcion:'',
                    moneda:'COP',
                    presupuesto:'',
                    fecha_inicio:'',
                    fecha_fin:'' ,
                    actividad: '',
                    token: '9d1604d3405f15573317d981e70038eb'
                }
            }
        }
    },
    mounted(){
        this.getUsers();
    },
    methods:{
        saveUser(){
            const inputDateString = this.model.evento.fecha_fin
            const inputDateString1 = this.model.evento.fecha_inicio

            const dateObject = new Date(inputDateString);
            const dateObject1 = new Date(inputDateString1);

            const formattedTimestamp = dateObject.toISOString().slice(0, 19).replace("T", " ");
            const formattedTimestamp1 = dateObject1.toISOString().slice(0, 19).replace("T", " ");

            this.model.evento.fecha_fin = formattedTimestamp
            this.model.evento.fecha_inicio = formattedTimestamp1

            axios.post('http://localhost/apirest/eventos', this.model.evento).then(res =>{
                this.$router.push({ name: 'procesosEventosBuscar' });
            })
            .catch(function (error){
                console.log(error);
            })
        },
        toggleValues(num) {
            if(num === 1) {
                this.model.user.showElement = true;
                this.model.user.showCronogram = false;
                this.model.user.documentacion = false;
            }else if(num === 2) {
                this.model.user.showElement = false;
                this.model.user.showCronogram = true;
                this.model.user.documentacion = false;
            }else if(num === 3) {
                this.model.user.showElement = false;
                this.model.user.showCronogram = false;
                this.model.user.documentacion = true;
            }
        },
        getUsers(){
            axios.get('http://localhost/apirest/eventos?clasificadores').then(res =>{
                console.log(res);
                this.users = res.data
            })
        }
    }
}
</script>