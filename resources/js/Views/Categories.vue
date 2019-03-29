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
                    })
            },


            update() {
                axios.put(`/categories/${this.category.category_id}`, clone(this.category))
                    .then((data) => {
                        this.category[this.categoryIndex] = clone(this.category);
                        this.$modal.hide('editCategory')
                    })
            },

            destroy(category = this.category) {
                axios.delete(`/categories/${this.category.category_id}`)
                    .then(() => {
                        this.categories.splice(this.categories.indexOf(category))
                        this.$modal.hide('confirmCategory')
                    })
            }
        },

        created() {
            axios.get("/categories")
                .then(({data}) => this.categories = data)
        }
    }
</script>