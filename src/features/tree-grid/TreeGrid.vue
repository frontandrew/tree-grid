<script setup lang="ts">
import { computed, ref } from "vue";
import { TreeStore } from "@shared/tree-store";
import type { TreeItem } from "@shared/types";

import { AgGridVue } from "ag-grid-vue3";
import type { ColDef, GetDataPath } from "ag-grid-community";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { RowNumbersModule, TreeDataModule } from "ag-grid-enterprise";

import type { RowDataItem } from "./types";
import { theme } from "./theme";

ModuleRegistry.registerModules([
  AllCommunityModule,
  RowNumbersModule,
  TreeDataModule,
]);

const data = defineModel<TreeItem[]>({ required: true });
const store = ref(new TreeStore(data.value));

const rowData = computed<RowDataItem[]>(() =>
  store.value.getAll().map((item) => {
    const category = store.value.getChildren(item.id).length
      ? "group"
      : "element";
    const path = [item.id.toString()];

    if (item.parent)
      store.value
        .getAllParents(item.id)
        .forEach(({ id }) => path.push(id.toString()));

    return {
      ...item,
      category,
      path: path.reverse(),
    };
  }),
);

const getDataPath: GetDataPath = (data) => data.path;

const columnDefs: ColDef<RowDataItem>[] = [
  {
    headerName: "Name",
    field: "label",
    width: 817,
    cellStyle: ({ data }) => ({
      fontWeight: data?.category === "group" ? "bold" : "normal",
    }),
  },
];

const autoGroupColumnDef: ColDef<RowDataItem> = {
  headerName: "Category",
  field: "id",
  width: 400,
  valueGetter: ({ data }) => (data ? data.category : ""),
  cellRenderer: "agGroupCellRenderer",
  cellRendererParams: { suppressCount: true },
  cellStyle: ({ value }) => ({
    textTransform: "capitalize",
    fontWeight: value === "group" ? "bold" : "normal",
  }),
};
</script>

<template>
  <ag-grid-vue
    :auto-group-column-def="autoGroupColumnDef"
    :column-defs="columnDefs"
    :get-data-path="getDataPath"
    :row-data="rowData"
    :row-numbers="true"
    :suppress-cell-focus="true"
    :tree-data="true"
    :theme="theme"
    style="height: 100%; width: 100%"
    class="tree-grid"
  />
</template>

<style>
.tree-grid {
  .ag-header-cell-resize::after {
    top: 0;
    height: 100%;
  }
}
</style>
