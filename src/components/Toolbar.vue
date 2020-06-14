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
      <div class="column actions">
        <div class="toolbar-icon" @click="$emit('toggle-console')">
          <img src="/images/code.svg" height="50px" width="50px" alt="console" />
        </div>
        <div class="dropdown is-up is-right" :class="{'is-active': addingUser }">
          <div class="dropdown-trigger">
            <div
              class="toolbar-icon"
              aria-haspopup="true"
              aria-controls="dropdown-menu"
              @click="toggleEmailInput"
            >
              <img src="/images/add-user.svg" height="50px" width="50px" alt="console" />
            </div>
          </div>
          <div id="dropdown-menu" class="dropdown-menu" role="menu">
            <div class="dropdown-content">
              <div class="dropdown-item">
                <input
                  v-model="guestEmail"
                  type="email"
                  class="input"
                  placeholder="Enter user email"
                />
                <button class="button btn-secondary" @click="handleAdd">Add</button>
              </div>
            </div>
          </div>
        </div>
        <button class="button btn-secondary" @click="run">Run</button>
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
      languages: ['javascript', 'python'],
      addingUser: false,
      guestEmail: ''
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
    },
    run() {
      this.$emit('run')
    },
    toggleEmailInput() {
      this.addingUser = !this.addingUser
    },
    handleAdd() {
      this.addingUser = false
      this.$emit('add-user', this.guestEmail)
      this.guestEmail = ''
    }
  }
}
</script>

<style scoped>
.toolbar {
  margin: 0;
  width: 100%;
  padding: 10px 5px;
  border-top: 1px solid #1f364d;
}
.toolbar .columns {
  margin: 0;
}
.toolbar .column {
  padding: 0;
  margin-left: 15px;
  margin-top: 10px;
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

.actions {
  display: flex;
  justify-content: space-around;
}
.actions .toolbar-icon {
  position: relative;
  border: 2px solid #1f364d;
  width: 40px;
  height: 40px;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 5px;
}
.actions button {
  margin-left: 5px;
}
.dropdown-content {
  background: #1f364d;
  width: 400px;
}
.dropdown-item {
  display: flex;
}
</style>
