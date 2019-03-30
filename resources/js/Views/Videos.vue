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

            approve(video){
                this.shouldPlayVideo = video;
                this.$modal.show("approveRequest")
            },

            edit(video) {
                this.shouldPlayVideo = video;
                this.$modal.show("editRequest")
            },
            confirm(video) {
                this.shouldPlayVideo = video;

                this.$modal.show('confirmRequest')
            },
            update() {
                axios.put(`/videos/${this.shouldPlayVideo.video_id}`, clone(this.shouldPlayVideo))
                    .then((data) => {
                        this.shouldPlayVideo[this.requestIndex] = clone(this.shouldPlayVideo);
                        this.$modal.hide('editCategory')
                    })
            },

            put(video){
                video.status_id = 1;
                axios.put(`/videos/${video.video_id}`, clone(video)).then(() => this.getRequests)
            },

            destroy(video) {
                axios.delete(`/videos/${this.shouldPlayVideo.video_id}`)
                    .then(() => {
                        this.videos.splice(this.videos.indexOf(request))
                        this.$modal.hide('confirmRequests')
                    })
            },

            getRequests(){
                axios.get("/videos")
                    .then(({data}) => {
                        console.log(data)
                        this.videosCollection = data.videos
                    })

            },

        },


        created() {
            this.getRequests();
            axios.get("/categories")
                .then(({data}) => this.categories = data)
        }
    }
</script>