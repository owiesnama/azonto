<script>
    import FeaturedTabel from '../components/FeaturedTabel'
    export default{
        components: {FeaturedTabel},

        data(){
            return {
                featured: []
            }
        },

        created(){
            axios.get("/featured_videos")
                .then(({data}) => {
                    this.featured = data.featured;
                })
        }
    }
</script>
<style scoped>
    .handle {
        float: left;
        padding-top: 8px;
        padding-bottom: 8px;
        cursor: move;
    }
</style>