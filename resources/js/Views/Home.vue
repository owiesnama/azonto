<script>
    import Carousel from '../components/Carousel'
    export default {
        props: ['pageNumber'],

        components: {Carousel},

        methods: {
            changePage(pageNumber){
                console.log(pageNumber)
                location.replace(`?page_number=${pageNumber - 1}`)
            },

            getVideoId(url) {
                var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
                var match = url.match(regExp);
                if (match && match[7].length == 11) {
                    return match[7];
                } else {
                    return 'error';
                }
            },

            markActiveLink(){
                document.querySelectorAll('.paging li').forEach(element => {
                    if ((this.pageNumber + 1) == element.innerText) {
                        element.classList.add('active')
                    } else {
                        element.classList.remove('active')
                    }

                    this.$refs.pagination.innerValue = this.pageNumber + 1
                })
            }
        },

        mounted(){
            this.markActiveLink()
        }
    }
</script>