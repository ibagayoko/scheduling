<template>
<div style="height:100vh;overflow-y: scroll;overflow-x: hidden;">
    <div class="row">
  <p>Ajoute des taches avec des ressoure</p>
  <P>E pour execution normal</P>
  <p>Pour utiliser une ressource, elle doit etre ajouter a la liste a droite &#x27A1;</p>
</div>

<div class="row">

  <span>
    <input v-bind:class="[classname]"  type="text" v-model="curItem.name" placeholder="Name" /><label for="name">Name</label>
  </span>
  <span>
    <input v-bind:class="[classname]"  type="text" v-on:input="handleKeypress" v-model="curItem.seq" placeholder="Seq" /><label>Seq</label>
  </span>
  <span>
    <input v-bind:class="[classname]" type="number" min="0" v-model="curItem.release" placeholder="Release" /><label>Release</label>
  </span>
  <span>
    <input v-bind:class="[classname]" type="number" min="1" v-model="curItem.priority" placeholder="Priority" /><label>Priority</label>
  </span>

</div>
<div class="row">
<button class="button" v-on:click="addTask">Add Task</button>
<h3>La liste taches a ordonnee {{ this.items.length }}</h3>

    <table style="width:100%; text-align:center;" align="top">
        <thead>
            <tr><th>Tasks</th><th>Sequence</th><th>priority</th><th>realease</th></tr>
        </thead>
    <tbody>
        
    <tr v-for="(item) in items" :key="item.id"><td>{{ item.name }}</td><td>{{ item.seq }}</td><td>{{ item.priority }}</td><td>{{ item.release }}</td></tr>
    </tbody>
    </table>
</div>
</div>
</template>

<script>
    export default {
        props:["value", "resources"],
        data(){
            let listeRes = [];
            return {
                classname:"clean-slide",
                sequence:"",
                lastId:-1,
                resVal:[],
                items: [],
                curItem: {name:"", seq:"", release:0, priority:1},
                classes: ["balloon", "swing", "card-slide", "basic-slide", "clean-slide", "slide-up", "gate", "skinny" ]

            }
        },
        mounted() {
            console.log('Component mounted.')
        },
        methods:{
            handleKeypress: function(event) {
                let seq = event.target.value 
                
                let seqq = ""
                for (let i = 0; i < seq.length; i++) {
                    let key = seq[i];
                    if (key.toUpperCase()==="E" || this.resources.filter(e => e.name.toUpperCase() === key.toUpperCase()).length > 0) {
                            seqq+=key
                    }
                    
                }
                this.curItem.seq = seqq.toUpperCase();
                
            },
            addRes(newTag){
            },
            addTask(){
                var newArray = this.items;
                var name = this.curItem.name.trim();
                var seq = this.curItem.seq.trim();
                var prio = this.curItem.priority;
                var res = this.curItem.release;

                if(!name || !seq) return
                if (this.items.filter(e => e.name === name).length > 0)  return

                
                newArray.push({
                    name: name, 
                    priority: Number(prio), 
                    id: ++this.lastId, 
                    seq: seq ,
                    release:Number(res)
                });
               
                    this.items= newArray
                    this.$emit('input', newArray)

                    this.curItem =  {name:"", seq:"", release:0, priority:1}
                    let x = Math.floor((Math.random() * 10) );
                    // this.classname = this.classes[x]
            },
            fileloaded(e){
                console.log("tasks list update from file", e)
                let temp = []
                for (let i = 0; i < e.tasks.length; i++) {
                    let tas = e.tasks[i];
                    temp.push(Object.assign( tas, {id:i}))
                }
                this.items = temp
                this.$emit('input', temp)
            }

        },
        created: function () {
            window.addEventListener('file:loaded', this.fileloaded)
        },
    }
</script>
