<script>
    export default {
        props: ['initialCategories'],
        data() {
            return {
                categories: [],
                category: {
                    name: '',
                },
                categoryIndex: false
            }
        },

        methods: {
            edit(category = this.category) {
                this.categoryIndex = this.categories.indexOf(this.category)
                this.category = category;
                this.$modal.show("editCategory")
            },
            confirm(category) {
                this.category = category;

                this.$modal.show('confirmCategory')
            },
            store() {
                axios.post(`/categories`, clone(this.category))
                    .then((data) => {
                        this.$modal.hide('addCategory');
                        console.log(data)
                        this.categories.push(this.category)
                        this.category.name = ""
                    }).catch(e => {
                    this.$modal.hide('addCategory');
                    this.flashError('Opps, Something goes wrong');
                })
            },


            update() {
                axios.put(`/categories/${this.category.category_id}`, clone(this.category))
                    .then((data) => {
                        this.category[this.categoryIndex] = clone(this.category);
                        this.$modal.hide('editCategory')
                    }).catch(e => {
                    this.flashError('Opps, Something goes wrong');
                })
            },

            destroy(category = this.category) {
                axios.delete(`/categories/${this.category.category_id}`)
                    .then(() => {
                        this.categories.splice(this.categories.indexOf(category))
                        this.$modal.hide('confirmCategory')
                    }).catch(e => {
                    this.$modal.hide('confirmCategory')

                    this.flashError('Opps, Something goes wrong');
                })
            }
        },

        created() {
            axios.get("/categories")
                .then(({data}) => this.categories = data)
        }
    }
</script>