<template>
  <div class="aboutInput">
    <div class="aboutInput-name">{{ name }}</div>
    <div class="aboutInput-input">
      <input :type="type" :value="value" @input="changeFn" />
    </div>
  </div>
</template>

<script>
export default {
  name: "aboutInput",
  props: {
    name: String,
    value: String,
    typeName: String,
    type: {
      type: String,
      default: "text",
    },
  },
  methods: {
    changeFn(e) {
      this.$emit("set-val", { typeName: this.typeName, value: e.target.value });
    },
  },
  mounted() {},
};
</script>
<style scoped>
.aboutInput {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.aboutInput-name {
  width: 30%;
}
.aboutInput-input {
  width: 70%;
}
</style>
