<script>
    export default {
        props: ['user'],

        data() {
            return {
                files: [],
                folders: [],
                folder: {
                    name: "",
                    description: "folder description",
                    // owner_id : user.id
                }
            }
        },

        methods: {
            addFolder() {
                axios.post('/folders', this.folder)
                    .then(({data}) => {
                        this.folders.push(data.folder);
                        this.folder.name = "";
                        this.$modal.hide('newFolder');
                    })
            },

            open() {

            }
        },

        created() {
            axios.get('/folders')
                .then(({data}) => {
                    this.folders = data.folders
                })
        }
    }
</script>