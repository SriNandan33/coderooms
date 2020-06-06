<template>
  <div class="toolbar">
    <div class="columns">
      <div class="column">
        <input type="text" class="input room-title" :value="name" @input="editName" />
      </div>
      <div class="column">
        <multiselect
          :value="language"
          class="languages"
          :options="languages"
          :show-labels="false"
          placeholder="Select a language"
          @input="changeLanguage"
        ></multiselect>
      </div>
      <div class="column">
        <button class="button btn-secondary" @click="save">Save</button>
      </div>
    </div>
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect'

export default {
  components: { Multiselect },
  props: {
    language: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      languages: ['javascript', 'python']
    }
  },
  methods: {
    changeLanguage(language) {
      this.$emit('change-language', language)
    },
    editName(event) {
      this.$emit('edit-name', event.target.value)
    },
    save() {
      this.$emit('save')
    }
  }
}
</script>

<style scoped>
.toolbar {
  margin: 0;
  width: 100%;
  height: 64px;
  padding: 10px 0;
  border-top: 1px solid #1f364d;
}
.toolbar .columns {
  margin: 0;
}
.toolbar .column {
  padding: 0;
  margin-left: 15px;
}
.toolbar .room-title,
.toolbar .room-title:focus {
  background: #0e2439;
  color: #fff;
  border: none;
  border-bottom: 1px solid #1f364d;
  border-radius: 4px;
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
  border: none;
}
.languages >>> .multiselect__option {
  text-transform: capitalize;
}
</style>
