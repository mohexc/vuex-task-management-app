<template>
  <div>
    Filter Todos:
    <select @change="filterTodos($event)">
      <option v-for="item in selecterList" v-bind:key="item">{{ item }}</option>
    </select>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "FilterTodos",
  data() {
    return {
      selecterList: [200, 100, 50, 20, 10, 5],
    };
  },
  methods: mapActions(["filterTodos"]),
};
</script>

<style>
</style>