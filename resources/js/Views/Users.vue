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
                    role_id: '',
                    password_confirmation: ''
                },
                userIndex: false
            }
        },

        methods: {

            create(){
                this.$modal.show('addUser');
            },

            edit(user = this.user) {
                user.password_confirmation = user.password
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
                    .then(({data}) => {
                        console.log(data)
                        this.$modal.hide('addUser');
                        this.users.push(data.user)
                    }).catch(e => {
                    this.$modal.hide('addUser');

                    this.flashError('Opps, Something goes wrong');
                })
            },

            update() {
                axios.put(`/users/${this.user.user_id}`, clone(this.user))
                    .then((data) => {
                        this.user[this.userIndex] = clone(this.user);
                        this.$modal.hide('editUser')
                    }).catch(e => {
                    this.$modal.hide('editUser')
                    this.flashError('Opps, Something goes wrong');
                })
            },

            destroy(user = this.user) {
                axios.delete(`/users/${this.user.user_id}`)
                    .then(() => {
                        this.users.splice(this.users.indexOf(user))
                        this.$modal.hide('confirmDelete')
                    }).catch(e => {
                    this.$modal.hide('confirmDelete')
                    this.flashError('Opps, Something goes wrong');
                })
            }
        },

        mounted() {
            this.users = JSON.parse(this.initialUsers);
            console.log(this.users)
        }
    }
</script>