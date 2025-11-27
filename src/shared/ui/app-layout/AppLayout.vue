<script setup lang="ts"></script>

<template>
  <div class="app-layout">
    <header v-show="$slots.header" class="header">
      <slot name="header"></slot>
    </header>
    <main class="main">
      <slot></slot>
    </main>
    <footer v-show="$slots.footer" class="footer">
      <slot name="footer"></slot>
    </footer>
  </div>
</template>

<style scoped>
.app-layout {
  max-width: 1280px;
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.header {
  width: 100%;
  padding: 1rem 0;
}

.main {
  width: 100%;
  flex-grow: 1;
}

.footer {
  width: 100%;
  padding: 1rem;
}
</style>
