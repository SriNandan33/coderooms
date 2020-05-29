<template>
  <section>
    <div class="container is-fluid toolbar">
      <div class="columns">
        <div class="column is-one-fifth">
          <input v-model="room.name" type="text" class="input room-title" />
        </div>
        <div class="column">
          <multiselect
            v-model="room.language"
            class="languages"
            :options="languages"
            @input="setLanguageMode"
          ></multiselect>
        </div>
        <div class="column">
          <button class="button btn-secondary" @click="updateRoom">Save</button>
        </div>
      </div>
    </div>
    <div class="container is-fluid dashboard">
      <div class="columns">
        <div class="column is-half">
          <codemirror
            ref="cmEditor"
            :value="room.code"
            :options="cmOptions"
            @input="onCmCodeChange"
          />
        </div>
        <div class="column is-half">
          <DrawingBoard />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import DrawingBoard from '../components/DrawingBoard'
import Multiselect from 'vue-multiselect'
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
    Multiselect,
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
      languages: ['javascript', 'python'],
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
.dashboard .columns .column {
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
.toolbar {
  padding: 10px;
  margin: 0;
  width: 100%;
}
.toolbar .room-title,
.toolbar .room-title:focus {
  background: #0e2439;
  color: #fff;
  border: none;
  border-bottom: 1px solid #1f364d;
  border-radius: 0;
  outline: none;
}
.languages {
  color: #fff;
}
.languages >>> .multiselect__tags,
.languages >>> .multiselect__tags .multiselect__single,
.languages >>> .multiselect__tags .multiselect__input,
.languages >>> .multiselect__content-wrapper {
  background: #0e2439;
  text-transform: capitalize;
}
.languages >>> .multiselect__tags,
.languages >>> .multiselect__content-wrapper {
  border: 1px solid #1f364d;
}
.languages >>> .multiselect__option {
  text-transform: capitalize;
}
</style>
