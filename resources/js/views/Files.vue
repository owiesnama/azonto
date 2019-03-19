<script>
    export default {

        props: ['initialFiles'],

        data() {
            return {
                files: []
            }
        },

        computed: {
            fileName() {
                return name => name.replace(/\.[^/.]+$/, "");
            },

            extension() {
                return name => /[^.]+$/.exec(name).first();
            }
        },

        created() {
            this.files = this.initialFiles;
        }

    }
</script>