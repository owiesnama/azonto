<script>
    import Carousel from '../components/Carousel'
    export default {
        components: {Carousel},

        methods: {
            changePage(pageNumber){
                location.replace(`?page_number=${pageNumber - 1}`)
            }
        }
    }
</script>