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
    <template #footer>
      <div class="footer">
        <p>Contacts:</p>
        <a target="_blank" href="https://github.com/frontandrew/tree-grid">
          <svg viewBox="0.5 0.5 22.8 22.8">
            <path
              d="M12 1C5.923 1 1 5.923 1 12c0 4.867 3.149 8.979 7.521 10.436.55.096.756-.233.756-.522 0-.262-.013-1.128-.013-2.049-2.764.509-3.479-.674-3.699-1.292-.124-.317-.66-1.293-1.127-1.554-.385-.207-.936-.715-.014-.729.866-.014 1.485.797 1.691 1.128.99 1.663 2.571 1.196 3.204.907.096-.715.385-1.196.701-1.471-2.448-.275-5.005-1.224-5.005-5.432 0-1.196.426-2.186 1.128-2.956-.111-.275-.496-1.402.11-2.915 0 0 .921-.288 3.024 1.128a10.193 10.193 0 0 1 2.75-.371c.936 0 1.871.123 2.75.371 2.104-1.43 3.025-1.128 3.025-1.128.605 1.513.221 2.64.111 2.915.701.77 1.127 1.747 1.127 2.956 0 4.222-2.571 5.157-5.019 5.432.399.344.743 1.004.743 2.035 0 1.471-.014 2.654-.014 3.025 0 .289.206.632.756.522C19.851 20.979 23 16.854 23 12c0-6.077-4.922-11-11-11Z"
            />
          </svg>
        </a>

        <a target="_blank" href="https://t.me/frontandrew">
          <svg viewBox="-10 -10 530 530">
            <path
              d="M512 256C512 114.62 397.38 0 256 0S0 114.62 0 256s114.62 256 256 256 256-114.62 256-256zm-396.12-2.7c74.63-32.52 124.39-53.95 149.29-64.31 71.1-29.57 85.87-34.71 95.5-34.88 2.12-.03 6.85.49 9.92 2.98 2.59 2.1 3.3 4.94 3.64 6.93.34 2 .77 6.53.43 10.08-3.85 40.48-20.52 138.71-29 184.05-3.59 19.19-10.66 25.62-17.5 26.25-14.86 1.37-26.15-9.83-40.55-19.27-22.53-14.76-35.26-23.96-57.13-38.37-25.28-16.66-8.89-25.81 5.51-40.77 3.77-3.92 69.27-63.5 70.54-68.9.16-.68.31-3.2-1.19-4.53s-3.71-.87-5.3-.51c-2.26.51-38.25 24.3-107.98 71.37-10.22 7.02-19.48 10.43-27.77 10.26-9.14-.2-26.72-5.17-39.79-9.42-16.03-5.21-28.77-7.97-27.66-16.82.57-4.61 6.92-9.32 19.04-14.14z"
            />
          </svg>
        </a>
      </div>
    </template>
  </app-layout>
</template>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.footer {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 1rem;
  transition: filter ease-in-out 0.25s;

  a {
    width: 2rem;
    height: 2rem;
    cursor: pointer;
  }

  a:hover {
    filter: drop-shadow(0 0 0.2rem var(--accent-color));
  }

  svg {
    fill: var(--color);
    width: 2rem;
    height: 2rem;
  }
}
</style>
