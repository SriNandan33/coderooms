<template>
  <section>
    <div class="container is-fluid dashboard">
      <div class="columns">
        <div class="column is-half">
          <codemirror
            ref="cmEditor"
            :value="room.code"
            :options="cmOptions"
            @ready="onCmReady"
            @focus="onCmFocus"
            @input="onCmCodeChange"
          />
          <div class="button is-primary" @click="updateRoom">Save</div>
        </div>
        <div class="column is-half">
          <div>Drawing Board ( coming soon )</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from 'axios'
// import language js
import { codemirror } from 'vue-codemirror'

// import base style
import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/javascript/javascript.js'

// import theme style
import 'codemirror/theme/monokai.css'

// import more 'codemirror/some-resource...'

export default {
  components: {
    codemirror
  },
  props: {
    roomId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      room: {
        code: ''
      },
      cmOptions: {
        tabSize: 4,
        mode: 'text/javascript',
        theme: 'monokai',
        lineNumbers: true,
        line: true
        // more CodeMirror options...
      }
    }
  },
  computed: {
    codemirror() {
      return this.$refs.cmEditor.codemirror
    }
  },
  async created() {
    console.log('in created', this.roomId)
    const response = await axios.get(
      `${process.env.VUE_APP_API_BASE_URL}rooms/${this.roomId}`
    )
    this.room = { ...this.room, ...response.data.room }
    console.log('the current CodeMirror instance object:', this.codemirror)
    // you can use this.codemirror to do something...
  },
  async mounted() {},
  methods: {
    onCmReady(cm) {
      console.log('the editor is readied!', cm)
    },
    onCmFocus(cm) {
      console.log('the editor is focused!', cm)
    },
    onCmCodeChange(newCode) {
      console.log('this is new code', newCode)
      this.room.code = newCode
    },
    async updateRoom() {
      const response = await axios.put(
        `${process.env.VUE_APP_API_BASE_URL}rooms/${this.roomId}`,
        this.room
      )
      console.log(response)
    }
  }
}
</script>
<style scoped>
.dashboard {
  padding: 0;
}
.dashboard .columns {
  width: 100%;
  margin: 0;
}
.vue-codemirror {
  height: 80vh;
  border: 3px solid #1f364d;
  border-radius: 4px;
}
.vue-codemirror >>> .CodeMirror {
  height: 100% !important;
}
.vue-codemirror >>> .cm-s-monokai.CodeMirror,
.vue-codemirror >>> .cm-s-monokai .CodeMirror-gutters {
  background: #001528 !important;
}
</style>
