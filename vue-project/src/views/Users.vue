<template>
    <br>
    <div class="container">
        <div class="">
            <div class="card">
                    <div class="card-header">
                        <h4>
                            Users
                            <RouterLink to="users/create" class="btn btn-primary float-end">
                                Add User
                            </RouterLink>
                        </h4>
                    </div>
                </div>
            </div>
            <div class="card-body">
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th>cedula</th>
                            <th>nombre</th>
                            <th>correo</th>
                            <th>telefono</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(user, index) in this.users" :key="index">
                            <td>{{ user.DNI }}</td>
                            <td>{{ user.Nombre }}</td>
                            <td>{{ user.Correo }}</td>
                            <td>{{ user.Telefono }}</td>
                            <td>
                                <RouterLink :to="{ path: 'users/'+user.PacienteId+'/edit'}" class="btn btn-success " style="margin-right: 15px;">
                                    Edit
                                </RouterLink>
                                <button to="/" class="btn btn-danger">
                                    Delete
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
export default {
    name: 'users',
    data(){
        return {
            users: []
        }
    },
    mounted(){
        this.getUsers();
    },
    methods:{
        getUsers(){
            axios.get('http://localhost/apirest/pacientes?page=1').then(res =>{
                this.users = res.data
            })
        }
    }
}
</script>