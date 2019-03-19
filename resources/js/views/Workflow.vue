<script>
    import WorkflowCard from '../components/WorkflowCard'

    export default {
        props: ['initialWorkflows'],

        components: {WorkflowCard},

        data() {
            return {
                workflows: [],
            }
        },

        created() {
            this.workflows = this.initialWorkflows;
        }
    }
</script>