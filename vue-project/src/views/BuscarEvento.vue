<template>
    <br>
    <div class="container">
        <div class="">
            <div class="card">
                    <div class="card-header">
                        <h4>
                            Eventos
                        </h4>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="mb-3 col-xs-4" style="width: 50% !important;">
                    <label style="margin-top: 10px;" for="search">Buscar</label><br>
                    <input style="margin-top: 10px;" v-model="searchQuery" type="text" class="form-control" id="search" />
                </div>
                <div class="col-xs-4"  style="width: 49% !important;">
                    <button @click="exportToExcel" class="btn btn-outline-success" style="float: right;     margin-top: 45px;">
                        Export to Excel
                    </button>
                </div>
            </div>
            <div class="card-body" style="margin-top: 20px;">
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>Objeto</th>
                            <th>Descripcion</th>
                            <th>Actividad</th>
                            <th>Moneda</th>
                            <th>Presupuesto</th>
                            <th>Fecha Inicio</th>
                            <th>Fecha Fin</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(user, index) in this.filteredUsers" :key="index">
                            <td>{{ user.id }}</td>
                            <td>{{ user.objeto }}</td>
                            <td>{{ user.descripcion }}</td>
                            <td>{{ user.actividad }}</td>
                            <td>{{ user.presupuesto }}</td>
                            <td>{{ user.moneda }}</td>
                            <td>{{ user.fecha_inicio }}</td>
                            <td>{{ user.fecha_fin }}</td>
                            <td>{{ user.estado }}</td>
                            <td>
                                <button @click="postularEvento(user)" class="btn btn-success " style="margin-right: 15px;">
                                    PUBLICAR / EVALUAR
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <tr></tr>
            </div>
    </div>
</template>

<script>
import axios from 'axios';
import * as XLSX from 'xlsx';
export default {
    name: 'users',
    data(){
        return {
            users: [],
            searchQuery: '',
            flag : true,
            msg: 'Activo'
        }
    },
    mounted(){
        this.getUsers();
    },
    methods:{
        getUsers(){
            axios.get('http://localhost/apirest/eventos?page=1').then(res =>{
                this.users = res.data
            })
        },
        postularEvento(user){
            user.token = '9d1604d3405f15573317d981e70038eb'

            var date = new Date(user.fecha_inicio);
            var date_end = new Date(user.fecha_fin);

            var currentDate = new Date();
            
            if (user.estado == "ACTIVO") {
                if (date < currentDate) {
                    axios.get('http://localhost/apirest/eventos?publicar='+user.id).then(res =>{
                        user.estado = "PUBLICADO";
                    })
                    .catch(function (error){
                        console.log(error);
                    })
                } else if (date > currentDate) {
                    alert('aun no se cumple la fecha para publicacion');
                }
            }if (user.estado == "PUBLICADO") {
                if (date_end < currentDate) {
                    axios.get('http://localhost/apirest/eventos?evaluacion='+user.id).then(res =>{
                        user.estado = "EVALUACION";
                    })
                    .catch(function (error){
                        console.log(error);
                    })
                } else if (date_end > currentDate) {
                    alert('aun no se cumple la fecha para evaluacion');
                }
            }
        },
        exportToExcel() {
        // Filtered users to be exported
        const filteredUsers = this.filteredUsers;

        // Create a worksheet
        const ws = XLSX.utils.json_to_sheet(filteredUsers);

        // Create a workbook
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

        // Save the workbook as an Excel file
        XLSX.writeFile(wb, 'table_data.xlsx');
        },
    },
    computed: {
    filteredUsers() {
            return this.users.filter((user) => {
            const search = this.searchQuery.toLowerCase();
            return (
                user.objeto.toLowerCase().includes(search) ||
                user.descripcion.toLowerCase().includes(search) ||
                user.actividad.toLowerCase().includes(search) ||
                user.moneda.toLowerCase().includes(search) ||
                user.presupuesto.toLowerCase().includes(search)
            );
            });
        },
    },
}
</script>