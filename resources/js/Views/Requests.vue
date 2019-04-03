<script>
    export default {

        data() {
            return {
                requests: [],
                request: {
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


            getVideoId(url) {
                var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
                var match = url.match(regExp);

                if (match && match[2].length == 11) {
                    return match[2];
                } else {
                    return 'error';
                }
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
                        this.$modal.hide('editRequest')
                    }).catch(e => {
                    this.$modal.hide('editRequest')
                    this.flashError('Opps, Something goes wrong');
                })
            },

            put(video){
                video.status_id = 1;
                axios.put(`/videos/${video.video_id}`, clone(video))
                    .then(() => {
                        this.getRequests()
                        this.$modal.hide('approveRequest')
                    })
                    .catch(e => {
                        this.$modal.hide('approveRequest')
                        this.flashError('Opps, Something goes wrong');
                    })
            },

            destroy(video) {
                axios.delete(`/videos/${this.shouldPlayVideo.video_id}`)
                    .then(() => {
                        this.requests.splice(this.requests.indexOf(request))
                        this.$modal.hide('confirmRequest')
                    }).catch(e => {
                    this.$modal.hide('confirmRequest')
                    this.flashError('Opps, Something goes wrong');
                })
            },

            getRequests(){
                axios.get("/videos/requests")
                    .then(({data}) => this.requests = data.videos).catch(e => {
                    this.flashError('Opps, Something goes wrong');
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