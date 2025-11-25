<script setup lang="ts">
import { AppLayout } from "@shared/ui";
</script>

<template>
  <app-layout>
    <template #header>
      <h1>Tree Grid</h1>
    </template>
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
