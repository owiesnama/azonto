<script>
    export default {

        data() {
            return {
                videosCollection: [],
                video: {
                    name: '',
                },
                categories: [],
                shouldPlayVideo: false,
                requestIndex: false
            }
        },

        methods: {
            playVideo(video){
                this.shouldPlayVideo = video;

                this.$modal.show("videoPlay")
            },

            edit(video) {
                this.shouldPlayVideo = video;
                this.$modal.show("editVideo")
            },
            confirm(video) {
                this.shouldPlayVideo = video;

                this.$modal.show('confirmVideo')
            },
            update() {
                axios.put(`/videos/${this.shouldPlayVideo.video_id}`, clone(this.shouldPlayVideo))
                    .then((data) => {
                        this.shouldPlayVideo[this.requestIndex] = clone(this.shouldPlayVideo);
                        this.$modal.hide('editVideo')
                    }).catch(e => {
                    this.$modal.hide('editVideo')
                    this.flashError('Opps, Something goes wrong');
                })
            },

            destroy(video) {
                axios.delete(`/videos/${this.shouldPlayVideo.video_id}`)
                    .then(() => {
                        this.$modal.hide('confirmVideo')
                        this.getVideos()
                    }).catch(e => {
                    this.$modal.hide('confirmVideo')
                    this.flashError('Opps, Something goes wrong');
                })
            },

            getVideos(){
                axios.get("/videos")
                    .then(({data}) => {
                        console.log(data)
                        this.videosCollection = data.videos
                    }).catch(e => {
                    this.flashError('Opps, Something goes wrong');
                })

            },

        },


        created() {
            this.getVideos();
            axios.get("/categories")
                .then(({data}) => this.categories = data)
        }
    }
</script>