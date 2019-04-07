<script>
    export default{
        data(){
            return {
                user: {
                    email: '',
                    password: ''
                },
                errors: [],
            }
        },


        methods: {
            handleRedirct(user){
                if (user.role_id != 1) {
                    return location.pathname = "/admin/requests"
                }
                else {
                    return location.pathname = "/admin"
                }
            },

            login(){
                axios.post('/users/login', this.user)
                    .then(({data}) => {
                        window.user = data.user
                        this.handleRedirct(data.user)
                    }).catch(({response}) => {
                    this.errors.push(response.data.error)
                })
            }
        }
    }
</script>