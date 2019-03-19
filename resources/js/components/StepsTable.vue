<template>
    <div class="table-responsive">
        <table class="table align-items-center table-flush files--table">
            <thead class="thead-light">
            <tr>
                <th>order</th>
                <th>name</th>
                <th>description</th>
                <th>initiator</th>
                <th>type</th>
                <th></th>
            </tr>
            </thead>


            <draggable v-model="steps"
                       :element="'tbody'"
                       handle=".handle">
                <tr v-for="step in steps" :key="step.order">
                    <td>{{ step.order}}</td>
                    <td>{{ step.name }}</td>
                    <td>{{ step.description}}</td>
                    <td>{{ step.initiator}}</td>
                    <td>{{ step.type}}</td>
                    <td>
                        <i class="fa fa-align-justify handle"></i>
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

        props: [],

        data() {
            return {
                list: [
                    {id: 1, name: "Abby", sport: "basket"},
                    {id: 2, name: "Brooke", sport: "foot"},
                    {id: 3, name: "Courtenay", sport: "volley"},
                    {id: 4, name: "David", sport: "rugby"}
                ],
                steps: [
                    {
                        name: 'prepare',
                        order: 1,
                        description: 'some description',
                        initiator: 'Owiesnama',
                        type: 'condition'
                    },
                    {
                        name: 'review',
                        order: 2,
                        description: 'some fine description',
                        initiator: 'Musab Khiniger',
                        type: 'condition'
                    },
                    {
                        name: 'verify',
                        order: 3,
                        description: 'some awesome description',
                        initiator: 'Faraoq',
                        type: 'condition'
                    },
                    {
                        name: 'order',
                        order: 4,
                        description: 'some great description',
                        initiator: 'Musa',
                        type: 'condition'
                    },
                ],
                dragging: false
            };
        },
    };
</script>
<style scoped>
    .handle {
        float: left;
        padding-top: 8px;
        padding-bottom: 8px;
        cursor:move;
    }
</style>