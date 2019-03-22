<script>
    export default {
        props: ['initialUsers'],
        data() {
            return {
                users: [],
                user: {
                    name: '',
                    email: '',
                    password: '',
                    password_confirmation: ''
                },
                userIndex: false
            }
        },

        methods: {
            edit(user = this.user) {
                user.password = "";
                this.userIndex = this.users.indexOf(this.user)
                this.user = user;
                this.$modal.show("editUser")
            },
            confirm(user) {
                this.user = user;
                console.log(user)
                this.$modal.show('confirmDelete')
            },
            store() {
                axios.post(`/users`, clone(this.user))
                    .then((data) => {
                        this.$modal.hide('addUser');
                        this.users.push(this.user)
                    })
            },

            update() {
                axios.put(`/users/${this.user.user_id}`, clone(this.user))
                    .then((data) => {
                        this.user[this.userIndex] = clone(this.user);
                        this.$modal.hide('editUser')
                    })
            },

            destroy(user = this.user) {
                axios.delete(`/users/${this.user.user_id}`)
                    .then(() => {
                        this.users.splice(this.users.indexOf(user))
                        this.$modal.hide('confirmMessage')
                    })
            }
        },

        mounted() {
            this.users = JSON.parse(this.initialUsers);
            console.log(this.users)
        }
    }
</script>