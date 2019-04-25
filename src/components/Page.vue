<script type="text/ecmascript-6">

    export default {

        props: ['models'],

        data() {
            return {
                search: '',
                resources:  [],
                tasks: []
            }
        },
        methods:{
            handle(){
                let e = new Event("start:scheduling");
                e.tasks = this.tasks
                e.resources = this.resources
                window.dispatchEvent(e)
            },
        },
        

        computed: {
            /**
             * Filter tags by their name.
             *
             * @source https://codepen.io/AndrewThian/pen/QdeOVa
             */
            filteredList() {
                return this.tagList.filter(tag => {
                    return tag.name.toLowerCase().includes(this.search.toLowerCase())
                })
            }
        },
    }
</script>