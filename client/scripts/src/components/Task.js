
Vue.component("task-list", {
  name:"task-list",
  template:`
  <div>
  <div v-for="(line, index) in lines" v-bind:key="index" class="row">
    <div class="col-lg-6">
      <div class="row">
        <div class="col-2">
          <select
            v-model="line.countryCode"
            float-label="Country Code"
            :options="countryPhoneCodes"
          ></select>
        </div>
        <div class="col-10">
          
            <input
              v-model="line.number"
              float-label="Phone Number"
              numeric-keyboard-toggle
              placeholder="5551234567"
              type="text"
              value=""
            />
         
        </div>
      </div>
    </div>

    <div class="col-lg-4">
      <select
        v-model="line.phoneUsageType"
        float-label="Type of Usage"
        :options="phoneUsageTypes"
      ></select>
    </div>

    <div class="col-lg-2">
      <div class="block float-right">
        <button @click="removeLine(index)" icon="delete" round ></button>
        <button v-if="index + 1 === lines.length" @click="addLine" icon="playlist-plus" round< </button>
      </div>
    </div>
  </div>
</div>
`,
  data: function() {
    return {
      lines: [],
      blockRemoval: true,
      phoneUsageTypes: [
        {
          label: 'Home', value: 'home'
        }, {
          label: 'Work', value: 'work'
        }, {
          label: 'Mobile', value: 'mobile'
        }, {
          label: 'Fax', value: 'fax'
        }
      ],
      countryPhoneCodes: [
        {
          label: '+90',
          value: '+90'
        }, {
          label: '+1',
          value: '+1'
        }
      ]
    }
  },
  watch:  {
    lines: function () {
      this.blockRemoval = this.lines.length <= 1
    }
  },
  methods:  {
    addLine: function () {
      let checkEmptyLines = this.lines.filter(line => line.number === null)

      if (checkEmptyLines.length >= 1 && this.lines.length > 0) return

      this.lines.push({
        countryCode: null,
        number: null,
        phoneUsageType: null
      })
    },

    removeLine: function (lineId) {
      if (!this.blockRemoval) this.lines.splice(lineId, 1)
    }
  },
  mounted: function () {
    this.addLine()
  }
})

console.log("coucou")