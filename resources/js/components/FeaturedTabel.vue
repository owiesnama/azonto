<template>
    <div class="table-responsive">
        <flash-message></flash-message>

        <table class="table align-items-center table-flush files--table">
            <thead>
            <tr>
                <th>id</th>
                <th>title</th>
                <th>description</th>
                <th>order</th>
                <th></th>
            </tr>
            </thead>


            <draggable v-model="featuredList"
                       :tag="'tbody'"
                       @end="updateOrder"
                       handle=".handle">
                <tr v-for="featuredVideo in featuredList" :key="featuredVideo.featured_video_id">
                    <td>{{ featuredVideo.video.video_id}}</td>
                    <td>{{ featuredVideo.video.title }}</td>
                    <td>{{ featuredVideo.video.description}}</td>
                    <td>{{ featuredVideo.order}}</td>
                    <td>
                        <span class="handle">
                            <i class="material-icons">drag_handle</i>
                        </span>
                    </td>
                </tr>
            </draggable>


        </table>
    </div>
</template>
<script>
    import draggable from "vuedraggable"

    export default {
        props: ['featured'],

        components: {draggable},

        data() {
            return {
                featuredList: [],
            };
        },

        methods: {
            updateOrder(){
                this.featuredList.forEach((video, index) => {
                    video.order = index + 1
                })

                axios.put('/featured_videos/update_order', this.featuredList)
                    .then(() => {

                    }).catch(e => {
                    this.flashError('Opps, Something goes wrong');
                })
            }
        },

        created(){
            axios.get("/featured_videos")
                .then(({data}) => {
                    this.featuredList = data.featured;
                    this.featuredList.sort(function (pre, next) {
                        return pre.order - next.order
                    });
                })
        }
    };
</script>