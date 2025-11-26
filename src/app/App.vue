<script setup lang="ts">
import { TreeGrid } from "@features/tree-grid";
import { AppLayout } from "@shared/ui";
import { data } from "./data";
import { ref } from "vue";

const tree = ref(data);
</script>

<template>
  <app-layout>
    <template #header>
      <h1>Tree Grid</h1>
    </template>
    <tree-grid v-model="tree" />
  </app-layout>
</template>

<style>
#app {
  width: 100%;
  height: 100%;

  display: flex;
  place-content: center;

  overflow-x: hidden;
}
</style>
