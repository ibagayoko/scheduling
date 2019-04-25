<script type="text/ecmascript-6">

    export default {

        data() {
            return {
                resources:  [],
                tasks: []
            }
        },
        methods:{
            /**
             * dispatch tasks and resources to be schedule
             */
            handle(){
                let e = new Event("start:scheduling");
                e.tasks = this.tasks
                e.resources = this.resources
                window.dispatchEvent(e)
            },
        },
    }
</script>