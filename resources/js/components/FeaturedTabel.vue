<template>
    <div class="table-responsive">
        <table class="table align-items-center table-flush files--table">
            <thead>
            <tr>
                <th>id</th>
                <th>title</th>
                <th>description</th>
                <th></th>
            </tr>
            </thead>


            <draggable v-model="featured"
                       :tag="'tbody'"
                       handle=".handle">
                <tr v-for="featuredVideo in featured" :key="featuredVideo.order">
                    <td>{{ featuredVideo.video.id}}</td>
                    <td>{{ featuredVideo.video.title }}</td>
                    <td>{{ featuredVideo.video.description}}</td>
                    <td>
                        <span class="handle">
                            <i class="material-icons">drag_handel</i>
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
        components: {draggable},

        props: ['initialFeatured'],

        data() {
            return {
                videos: [],
                featured: [{
                    video: {
                        title: 'some title',
                        description: 'some description',
                        id: '1',
                    },
                    order: 1
                },
                    {
                        video: {
                            title: 'title',
                            description: 'description',
                            id: '2',
                        },
                        order: 2
                    }]
            };
        },


        mounted(){
//            this.featured = this.initialFeatured;
        }
    };
</script>