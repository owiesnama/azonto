<script>
    export default {
        props: ['initialMessages'],
        data() {
            return {
                messages: [],
                message: false
            }
        },

        methods: {
            preview(message) {
                this.message = message;
                this.$modal.show('messagePreview')
            },
            confirm(message) {
                this.message = message;
                this.$modal.show('confirmMessage')
            },

            destroy(message = this.message) {
                axios.delete(`/messages/${this.message.message_id}`)
                    .then(() => {
                        this.messages.splice(this.messages.indexOf(message))
                        this.$modal.hide('confirmMessage')
                    })
            }
        },

        mounted() {
            this.messages = this.initialMessages;
        }
    }
</script>