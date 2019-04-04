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
                requestIndex: false,
                pagesCount: 0,
            }
        },

        methods: {

            changePage(pagenumber){
                axios.get(`/videos?page_number=${pagenumber-1}`)
                    .then(({data}) => {
                        this.videosCollection = data.videos
                    })
            },


            getVideoId(url) {
                var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
                var match = url.match(regExp);

                if (match && match[2].length == 11) {
                    return match[2];
                } else {
                    return 'error';
                }
            },


            toggleFeatured(video){
                if (video.isFeatured) {
                    axios.post("/featured_videos", video).then(data => {
                        console.log(data)
                        this.getVideos()

                    })
                } else {
                    axios.delete(`/featured_videos/${video.featured_video.featured_video_id}`).then(data => {
                        console.log(data)
                        this.getVideos()

                    })
                }
            },


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
                return axios.get("/videos")
                    .then(({data}) => {
                        console.log(data)
                        this.videosCollection = data.videos
                        this.pagesCount = data.pages;
                    }).catch(e => {
                        this.flashError('Opps, Something goes wrong');
                    })

            },

        }
        ,


        created()
        {
            this.getVideos()

            axios.get("/categories")
                .then(({data}) => this.categories = data)

        }
    }
</script>