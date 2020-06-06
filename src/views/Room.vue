<template>
  <section>
    <div class="container is-fluid dashboard">
      <div class="columns">
        <div class="column is-half code-editor">
          <codemirror
            ref="cmEditor"
            :value="room.code"
            :options="cmOptions"
            @input="onCmCodeChange"
          />
          <Toolbar
            :language="room.language"
            :name="room.name"
            @change-language="changeLanguage"
            @edit-name="updateName"
            @save="updateRoom"
          />
        </div>
        <div class="column is-half drawing-board">
          <DrawingBoard />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Toolbar from '../components/Toolbar'
import DrawingBoard from '../components/DrawingBoard'
import { codemirror } from 'vue-codemirror'

// import base style
import 'codemirror/lib/codemirror.css'
// import language js
import 'codemirror/mode/javascript/javascript.js'
import 'codemirror/mode/python/python.js'

// import theme style
import 'codemirror/theme/monokai.css'

export default {
  components: {
    codemirror,
    Toolbar,
    DrawingBoard
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
        code: '',
        language: ''
      },
      cmOptions: {
        tabSize: 4,
        mode: 'text/javascript',
        theme: 'monokai',
        lineNumbers: true,
        line: true
      },
      languageModes: {
        python: 'x-python',
        javascript: 'javascript'
      }
    }
  },
  computed: {
    codemirror() {
      return this.$refs.cmEditor.codemirror
    }
  },
  async created() {
    const response = await this.$http.get(`rooms/${this.roomId}`)
    this.room = { ...this.room, ...response.data.room }
    this.setLanguageMode()
  },
  async mounted() {},
  methods: {
    onCmCodeChange(newCode) {
      this.room.code = newCode
    },
    async updateRoom() {
      await this.$http.put(`rooms/${this.roomId}`, this.room)
    },
    setLanguageMode() {
      this.cmOptions.mode = `text/${this.languageModes[this.room.language]}`
    },
    // toolbar event handlers
    changeLanguage(language) {
      this.room.language = language
      this.setLanguageMode()
    },
    updateName(name) {
      this.room.name = name
    }
  }
}
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style scoped>
/* TODO: refactor it into scss (need to learn :D) */
.dashboard {
  padding: 0;
}
.dashboard .columns {
  width: 100%;
  margin: 0;
}
.dashboard .columns .code-editor,
.dashboard .columns .drawing-board {
  padding: 0;
  border: 3px solid #1f364d;
  background: #001528;
}
.vue-codemirror {
  height: 80vh;
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
