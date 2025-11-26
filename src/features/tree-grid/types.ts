import type { TreeItem } from "@shared/types";

export type RowDataItem = TreeItem & {
  category: "group" | "element";
  path: string[];
  //   order: number;
};
