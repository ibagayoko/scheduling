// https://codepen.io/silkine/pen/pPxJOX



Vue.component("resource", {
    name:"resource",
    template:`
    <div>
    <div style="height:500px;overflow-y: scroll;">

    <label htmlFor="value">
        Dynamic styled Inputfields with React!
    </label>
    <br />
    <br />Hit "Enter" to confirm, Click a pill to remove
    <br />
    <br />

    <li class="" v-for="(listitem, index) in this.myItems" 
        v-bind:key="listitem.id"
        v-on:click="handleClick"
                    v-bind:data-item="listitem.id"
                    v-bind:style='detStyle(index, listitem)'
                >
                    {{listitem.content}}
        </li>

    </div>
<input
        id="add"
        type="text"
        name="initvalue"
        autoComplete="off"
      maxLength="70"
      v-on:focus="handleFocus"
      v-on:change="handleChange"
      v-on:keyup.enter="handleKeypress"
      v-on:Blur="handleBlur"
        v-bind:value="content_add"
        v-bind:style="{ width: width }"
    />


    <span id="helperspan" ref="helperspan" >
        {{ content_add}}

        
    </span>

</div>
  `,
    data: function() {
        // this.handleFocus = this.handleFocus.bind(this);
		// this.handleChange = this.handleChange.bind(this);
		// this.handleKeypress = this.handleKeypress.bind(this);
		// this.handleBlur = this.handleBlur.bind(this);
		// this.handleClick = this.handleClick.bind(this);

		// this.helperspan = null; // is set via ref
		
        return {
            currentcolor: [
				"#531CB3",
				"#7149EE",
				"#B754FF1",
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
            helperspan: null
        }
    },
    watch:  {
      lines: function () {
        this.blockRemoval = this.lines.length <= 1
      }
    },
    methods:  {
        detStyle: function(index, listitem){
            return `background-color: ${this.currentcolor[
                    index % this.currentcolor.length]};
                    width: ${listitem.itemWidth}px;
                    vertical-align: bottom; 
                    border-radius: 40px;
                    transition: translate .2s;
                    color: #fff;
                    list-style-type: none;
                    position: relative;
                    cursor: pointer;
                    font-weight: 200;
                    user-select: none;
                    line-height: 40px;
                    margin-top: 15px;
                    padding: 0 50px 0 20px;
                    display: inline-block;
                    font-size: 24px;
                    font-family: 'Raleway', sans-serif;
                    font-weight: 400;
                    text-align: left;
                    letter-spacing: 2px;
                    max-width: 80vw!important;
                    overflow: hidden; 
                    text-overflow: ellipsis;
                    `;
                    // white-space: pre;
                    // margin: auto auto;
        },
        handleFocus: function(event) {
            this.content_add = "";
        },
        handleChange: function(event) {
            const usr_input = event.target.value;
            this.content_add=usr_input;
        },
    
        handleKeypress: function(event) {
            console.log(event)
            if (event.key == "Enter") {
                var newArray = this.myItems;
                var currentcontent = this.content_add.trim();
                if (!currentcontent) {
                    return; 
                }
                
                var currentWidth = this.$refs.helperspan.offsetWidth;
                newArray.push({
                    content: currentcontent, 
                    id: ++this.lastId, 
                    itemWidth: currentWidth + 2
                });
               
                    this.myItems= newArray
                    this.content_add = ""
                
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
        
        
    
        componentDidUpdate: function (prevProps, prevState) {
            if (prevState.content_add != this.state.content_add) {
                console.log('did update, content:', this.helperspan.textContent, 'width', this.helperspan.offsetWidth);
                const helperWidth = this.helperspan.offsetWidth;
                this.setState({ width: Math.max(50, helperWidth + 1) });
            }
        },
    
      
    },
    watch:{
        'content_add': function(val, oldVal) {
            this.$nextTick(function() {
                if (val != oldVal) {
                    console.log('did update, content:', this.$refs.helperspan.textContent, 'width', this.$refs.helperspan.offsetWidth);
                    const helperWidth = this.$refs.helperspan.offsetWidth;
                    this.width = Math.max(50, helperWidth + 1) ;
                }
                // this.$el.scrollTop = this.$el.scrollHeight;
            });
        }
    },

    mounted: function () {
    //   this.addLine()
    // this.componentDidUpdate()
    }
  })
  
  console.log("ressouce")