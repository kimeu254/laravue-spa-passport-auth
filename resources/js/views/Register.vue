<template>
    <section class="vh-100">
        <div class="container h-100">
            <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col col-xl-5">
                <div class="card shadow border-0">
                <div class="row g-0">
                    <div class="col-12 d-flex align-items-center">
                        <div class="card-body p-4 p-lg-5 text-black">

                            <form action="javascript:void(0)" @submit="register" method="post">

                                <div class="text-center mb-3 pb-1">
                                    <i class="fas fa-user-plus fa-2x me-3 text-primary"></i>
                                </div>

                                <h5 class="fw-normal mb-3 pb-3 text-center" style="letter-spacing: 1px;">Create an account</h5>

                                <div class="form-outline mb-4">
                                    <label class="form-label">Name</label>
                                    <input type="text" v-model="user.name" name="name" id="name" class="form-control" />
                                </div>

                                <div class="form-outline mb-4">
                                    <label class="form-label">Email address</label>
                                    <input type="email" v-model="user.email" name="email" id="email" class="form-control" />
                                </div>

                                <div class="form-outline mb-4">
                                    <label class="form-label">Password</label>
                                    <input type="password" v-model="user.password" name="password" id="password" class="form-control" />
                                </div>

                                <div class="d-grid pt-2 mb-4">
                                    <button class="btn btn-primary btn-lg btn-block" type="submit" :disabled="processing">
                                        {{ processing ? "Please wait" : "Register" }}
                                    </button>
                                </div>

                                <p class="mb-5 pb-lg-2 text-center">Already have an account? <router-link :to="{name:'login'}">Login here</router-link></p>
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
    name:'register',
    data(){
        return {
            user:{
                name:"",
                email:"",
                password:"",
                password_confirmation:""
            },
            processing:false
        }
    },
    methods:{
        async register(){
            this.processing = true
            this.$store.dispatch('auth/register',this.user)
            .then(()=>{
            }).catch(({err}) => {
            }).finally(() => {
                this.processing = false
            })
        }
    }
}
</script>