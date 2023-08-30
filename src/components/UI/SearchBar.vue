<template>
  <div class="searchBarWrapper">
    <div>
      <v-text-field
        v-model="inputIp"
        class="pa-2"
        label="Search for any IP address..."
        :rules="rules"
        hide-details="auto"
        @keyup.enter="handleEnterKey"
      ></v-text-field>
    </div>
    <v-btn
      :disabled="inputIp.length === 0 || inputIp.length > 39"
      class="searchButton"
      color="#000000"
      @click="handleSearch"
    >
      <font-awesome-icon class="icon" icon="fa-solid fa-angle-right" />
    </v-btn>

    <v-dialog v-model="dialog" max-width="400">
      <v-card>
        <v-card-title class="text-h5 grey lighten-2">Error!</v-card-title>
        <v-card-text> Such an IP address does not exist. </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="closeDialog"> Close </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  name: "SearchBar",
  components: {},
  props: {
    value: {
      type: String,
      default: "",
    },
    error: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      dialog: false,
      counter: 0,
      inputIp: "",
      rules: [
        (value) => value === "" || value.length <= 39 || "Max 39 characters",
      ],
    };
  },
  methods: {
    handleSearch() {
      this.$emit("searchIp", this.inputIp);
      this.inputIp = "";
    },
    handleEnterKey() {
      if (this.inputIp.length > 0) {
        this.handleSearch();
      }
    },
    closeDialog() {
      this.dialog = false;
      this.counter++;
      this.$emit("closeErrorDialog", this.counter);
    },
  },
  watch: {
    error(newVal) {
      // Gdy wartość 'error' zmieni się, zmienia się także wartość 'dialog'
      this.dialog = newVal;
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../../scss/variables.scss";
@import "../../scss/mixins.scss";
@import "../../scss/breakpoints.scss";
.searchBarWrapper {
  border-radius: 15px;
  background: $whitestalmostwhite;
  box-shadow: 0px 16px 30px -10px rgba(70, 96, 187, 0.2);
  width: 90vw;
  height: 60px;
  flex-shrink: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @include xl {
    width: 24vw;
  }
  .v-text-field ::v-deep label {
    font-size: 0.8em;
    @include xl {
      font-size: 0.8em;
  }
  }
  .v-text-field {
    margin: 0;
    padding: 0;
    padding-left: 4vw;
    width: 68vw;
    @include xl {
    width: 18vw;
  }
  }
  .icon {
    font-size: 20px;
    margin-right: 1vw;
    color: #ffffff;
  }
  .searchButton {
    height: 100%;
    border-radius: 0;
    border-top-right-radius: 15px;
    border-bottom-right-radius: 15px;
  }
}
</style>
