export interface TreeItem {
  id: string | number;
  parent: TreeItem["id"] | null;
  label: string;
}
