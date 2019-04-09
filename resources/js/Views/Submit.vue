<script>
    export default {
        data(){
            return{
                isLocalVideo:false,
                categories:[],
            }
        },

        created(){
            axios.get("/categories")
                .then(({data}) => this.categories = data).catch(e => {
                this.flashError('Opps, Something goes wrong');
            })
        }
    }
</script>