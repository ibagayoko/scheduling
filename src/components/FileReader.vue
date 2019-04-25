<template>
    <div class="input-file-container">  
    <input  class="input-file" v-on:change="handleChange" type="file" name="file" id="file">
    
  </div>
</template>
<script>

import YAML from "yaml";

export default {
    
    props:["value"],

// https://codepen.io/silkine/pen/pPxJOX
    data() {
        return {}
    },
    methods:  {
        // Load the yaml file that contains a list of resourc and a list of task to be schedule
        handleChange: function(e) {
            // Get the file proprities
            let file = e.target.files[0]
            // a new file reader
            var reader = new FileReader();

            // Action to after reading th e file
            //  dispatch an event to let other know that a new file has been loaded
            reader.onload = function(e) {
                let result = e.target.result
                let data = YAML.parse(result) 
                let ev = new Event("file:loaded")
                ev.resources= data.resources
                ev.tasks= data.tasks
                window.dispatchEvent(ev)
                console.log("File loaded")
            }
            reader.readAsText(file);
        },
      
    },

    mounted() {
    }
  
  }
</script>

<style>

</style>
