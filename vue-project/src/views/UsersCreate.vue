<template>
    <br>
    <div class="container mt-5">
        <div class="card">
            <div class="card-header">
                <h4>
                    Add User
                </h4>
            </div>
            <div class="card-body">
                <div class="mb-3">
                    <label for="">Nombre</label>
                    <input type="text" v-model="model.user.nombre" class="form-control" />
                </div>
                <div class="mb-3">
                    <label for="">Cedula</label>
                    <input type="text" v-model="model.user.dni" class="form-control" />
                </div>
                <div class="mb-3">
                    <label for="">Email</label>
                    <input type="text" v-model="model.user.correo" class="form-control" />
                </div>
                <div class="mb-3">
                    <label for="">Telefono</label>
                    <input type="text" v-model="model.user.telefono" class="form-control" />
                </div>
                <div class="mb-3">
                    <button type="button" @click="saveUser" class="btn btn-primary">guardar</button>
                </div>
            </div>
        </div>
        <div>
        
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'usersCreate',
    data(){
        return {
            model: {
                user:{
                    dni: '',
                    nombre: '',
                    correo: '',
                    telefono: '',
                    token: '6de1d8ccba76def24dc1fa22a2b52317'
                }
            }
        }
    },
    mounted(){
        // this.getUsers();
    },
    methods:{
        saveUser(){
            axios.post('http://localhost/apirest/pacientes', this.model.user).then(res =>{
                this.users = res.data

                this.user = {
                    dni: '',
                    nombre: '',
                    correo: '',
                    telefono: '',
                    token: '6de1d8ccba76def24dc1fa22a2b52317'
                }
            })
            .catch(function (error){
                console.log(error);
            })
        }
    }
}
</script>