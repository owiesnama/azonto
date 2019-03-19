<template>
    <div class="card shadow workflow--card m-1">
        <div class="card-header ">
            <a class="title" :href="path">{{name}}</a>
        </div>
        <div class="card-body">
            <p class="text-muted"> {{description}} ...</p>
        </div>
    </div>
</template>
<script>
    export default {
        props: ['description', 'name', 'id'],

        computed: {
            path() {
                return `/settings/workflow/${this.id}`
            }
        }
    }
</script>