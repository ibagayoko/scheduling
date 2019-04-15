<template>
    <div style="height:100vh;overflow-y: scroll;overflow-x: hidden;">
    <div>

    <label htmlFor="value">
        La liste des ressouces disponible
    </label>
    <br />
    <br />Hit "Enter" to confirm, Click a res to remove
    <br />

    <li class="" v-for="(listitem, index) in this.myItems" 
        v-bind:key="listitem.id"
        v-on:click="handleClick"
                    v-bind:data-item="listitem.id"
                    v-bind:style='getStyle(index, listitem)'
                >{{listitem.name}}</li>

    </div>
<input
        id="add"
        type="text"
        name="initvalue"
        autoComplete="off"
      
      v-on:focus="handleFocus"
      v-on:change="handleChange"
      v-on:keyup.enter="handleKeypress"
      v-on:Blur="handleBlur"
        :value="content_add"
        v-bind:style="{ 'width': width }"
    />
    <span id="helperspan" ref="helperspan" >{{ content_add}}</span>

</div>
</template>
<script>

export default {
    
    props:["value"],

// https://codepen.io/silkine/pen/pPxJOX
    data() {
		
        return {
            currentcolor: [
				"#531CB3",
				"#7149EE",
				"#B054FF1",
				"#ED4FEF",
				"#ED49AB",
				"#ED4FEF",
				"#B754FF",
				"#7149EE"
			],
			content_add: "add +",
			width: 100,
            myItems: [],
            lastId:-1,
            helperspan: null,
            itemString:""
        }
    },
    methods:  {
        // get style for resource
        getStyle: function(index, listitem){
            return `background-color: ${this.currentcolor[index % this.currentcolor.length]};
                    width: ${listitem.itemWidth+70}px;
                    `;
        },
        handleFocus: function(event) {
            this.content_add = "";
        },
        handleChange: function(event) {
            const usr_input = event.target.value;
            this.content_add=usr_input;
        },

        // Check and add a new resource
        handleKeypress: function(event) {
            if (event.key == "Enter") {
                var newArray = this.myItems;
                var curContent = this.content_add.trim().toUpperCase();
                
                // We don't accepte empty string
                if (!curContent) return; 
                
                // Not more than 1 char
                if (curContent.length>1) return; 
                // E and B can't not be use as resource name
                if (curContent==="E" || curContent==="B") return; 

                // and we don't accept duplicate
                if(this.itemString.includes(curContent)) return



                var currentWidth = this.$refs.helperspan.offsetWidth;
                newArray.push({
                    name: curContent, 
                    id: ++this.lastId, 
                    itemWidth: currentWidth + 2
                });
                    this.itemString += `; ${curContent}`
                    this.myItems= newArray
                    this.$emit('input', newArray)
                    this.content_add = ""
                    console.log("add new ressource")
                
            }
        },
    
        handleBlur: function (event) {
            this.content_add= "add +" ;
        },
    
        handleClick: function(event) {
            const idToRemove = Number(event.target.dataset["item"]);
            const newArray = this.myItems.filter((listitem) => {return listitem.id !== idToRemove});
            this.myItems= newArray ;
        },
         fileloaded(e){
                console.log("new file from ress", e)
                let res = []
                for (let i = 0; i < e.resources.length; i++) {
                    const r = e.resources[i];
                    res.push({name:r, id:i, itemWidth:r.length+12})
                    
                }
                this.myItems = res
                this.$emit('input', res)

            }
        
      
    },
    watch:{
        'content_add': function(val, oldVal) {
                    const helperWidth = this.$refs.helperspan.offsetWidth;
                    this.width = Math.max(50, helperWidth + 1) ;
        }
    },
    created: function () {
        // If file uploaded update resources liste
            window.addEventListener('file:loaded', this.fileloaded)
    },

    mounted() {
    }
  
  }
</script>

<style scoped>

label {
 font-weight: 100;
 font-size: 60px;
 letter-spacing: .03em;
 color: #9b87fd;
}


input, li, #helperspan { 
 display: inline-block;
 font-size: 24px;
 font-family: 'Raleway', sans-serif;
 font-weight: 400;
 text-align: left;
 letter-spacing: 2px;
}

input, li {
 vertical-align: bottom; 
 margin-right: 10px;
 margin-top: 15px;
 border-radius: 40px;
 transition: translate .2s;
}

#helperspan {
 white-space: pre; 
 visibility: hidden;
 position: absolute;
 pointer-events: none;
 
}

input {
 background-color: #2a2734;
 border: 2px solid #7149ee;
 color: #7149ee;
 width: auto;
 height: 48px;
 padding: 0 20px; 
}

li {
 color: #fff;
 padding: 0 50px 0 20px;
 list-style-type: none;
 line-height: 50px;
 font-weight: 300;
 position: relative;
 cursor: pointer;
 user-select: none;
 white-space: pre;
}


li, input { max-width: 80vw; }
li { overflow: hidden; text-overflow: ellipsis; }

li:hover {
 transform: scale(1.05);
}

li:after {
 content: " ×";
 color: #333;
 font-weight: 400;
 opacity: .6;
 font-size: 30px;
 line-height: 20px;
 position: absolute;
 right: 20px;
 top: 14px;
}

li:hover::after {
 opacity: 1;
}

input:focus,
input#add:focus {
 outline: none;
 width: 130px;
}

div {
 display: inline-block;
}

#container {
 min-height: 80vh;
	max-width: 1000px;
}


.tim {
 color: #6c6783;
 bottom: 2%;
 left: 0;
 width: 100%;
 text-align: center;
 margin-top: 5vh;
}

.tim a {
 color: #6c6783;
}

.item-transition-enter {
 opacity: 0.01;
}

.item-transition-enter.item-transition-enter-active {
 opacity: 1;
 transition: opacity 500ms ease-out;
}

.item-transition-leave {
 opacity: 1;
 transform-origin: left center;
}

.item-transition-leave.item-transition-leave-active {
 opacity: 0.01;
 width: 0 !important;
 color: rgba(42, 39, 52, 0);
 padding: 0;
 transition: .2s padding ease-out, color .2s ease-in, opacity .2s ease-out, width .2s ease-out, translate .2s ease-out;
}

@media (max-width: 600px) {
 body {
  font-size: 14px;
 }
 label {
  font-weight: 300;
  font-size: 40px;
 }
 .tim {
  display: none;
 }
}
</style>
