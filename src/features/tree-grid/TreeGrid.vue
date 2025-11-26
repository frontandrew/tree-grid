<script setup lang="ts">
import { computed, ref } from "vue";
import { TreeStore } from "@shared/tree-store";

import { AgGridVue } from "ag-grid-vue3";
import type { ColDef, GetDataPath } from "ag-grid-community";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { RowNumbersModule, TreeDataModule } from "ag-grid-enterprise";

import type { TreeItem } from "@shared/types";
import type { RowDataItem } from "./types";

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
      //   order: index + 1,
    };
  }),
);

const getDataPath: GetDataPath = (data) => data.path;

const columnDefs: ColDef<RowDataItem>[] = [
  //   {
  //     headerName: "Order",
  //     field: "order",
  //     width: 30,
  //     cellStyle: {
  //       fontWeight: "bold",
  //     },
  //     sort: "asc"
  //   },
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
    :tree-data="true"
    style="height: 100%"
  />
</template>

<style scoped></style>
