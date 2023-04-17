<template>
    <section class="vh-100">
        <div class="container h-100">
            <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col col-xl-5">
                <div class="card shadow border-0">
                <div class="row g-0">
                    <div class="col-12 d-flex align-items-center">
                        <div class="card-body p-4 p-lg-5 text-black">

                            <form action="javascript:void(0)" method="post">

                                <div class="text-center mb-3 pb-1">
                                    <i class="fas fa-user-lock fa-2x me-3 text-primary"></i>
                                </div>

                                <h5 class="fw-normal mb-3 pb-3 text-center" style="letter-spacing: 1px;">Sign into your account</h5>

                                <div class="form-outline mb-4">
                                    <label class="form-label">Email address</label>
                                    <input type="email" v-model="auth.email" name="email" id="email" class="form-control" />
                                </div>

                                <div class="form-outline mb-4">
                                    <label class="form-label">Password</label>
                                    <input type="password" v-model="auth.password" name="password" id="password" class="form-control" />
                                </div>

                                <div class="form-outline d-flex align-items-center justify-content-between">
                                    <!-- Checkbox -->
                                    <div class="form-check mb-3 mb-md-0">
                                        <input class="form-check-input" type="checkbox" value="" id="loginCheck" checked />
                                        <label class="form-check-label" for="loginCheck"> Remember me </label>
                                    </div>
                                    <div>
                                        <a class="small text-muted" href="#!">Forgot password?</a>
                                    </div>
                                </div>

                                <div class="d-grid pt-2 mb-4">
                                    <button class="btn btn-primary btn-lg btn-block" type="button" :disabled="processing" @click="login">
                                        {{ processing ? "Please wait" : "Login" }}
                                    </button>
                                </div>

                                <p class="mb-5 pb-lg-2 text-center">Don't have an account? <router-link :to="{name:'register'}">Register here</router-link></p>
                            </form>
                        </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name:"login",
    data(){
        return {
            auth:{
                email:"",
                password:""
            },
            processing:false
        }
    },
    methods:{
        async login(){
            this.processing = true
            this.$store.dispatch('auth/login',this.auth)
            .then(()=>{
                this.$router.push({ name: 'dashboard' })
            }).catch((err) => {
                console.log(err)
            }).finally(() => {
                this.processing = false
            })
        },
    }
}
</script>

<style>
    textarea:focus, 
    textarea.form-control:focus, 
    input.form-control:focus, 
    input[type=text]:focus, 
    input[type=password]:focus, 
    input[type=email]:focus, 
    input[type=number]:focus, 
    [type=text].form-control:focus, 
    [type=password].form-control:focus, 
    [type=email].form-control:focus, 
    [type=tel].form-control:focus, 
    [contenteditable].form-control:focus 
    {
        box-shadow: inset 0 -1px 0 #ddd;
    }
    a{
        text-decoration: none;
    }
</style>