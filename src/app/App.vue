<script setup lang="ts">
import { ref } from "vue";

import { TreeGrid } from "@features/tree-grid";
import { ThemeToggler } from "@features/theme-toggler";
import { AppLayout } from "@shared/ui";

import { data } from "./data";

const tree = ref(data);
const header = `<TreeGrid />`;
</script>

<template>
  <app-layout>
    <template #header>
      <div class="header">
        <h1>{{ header }}</h1>
        <theme-toggler />
      </div>
    </template>
    <tree-grid v-model="tree" />
  </app-layout>
</template>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
