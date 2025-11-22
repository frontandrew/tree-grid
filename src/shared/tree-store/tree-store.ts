import type { TreeItem } from "../types";

export class TreeStore {
  private items: Map<TreeItem["id"], TreeItem> = new Map();
  private children: Map<TreeItem["id"], TreeItem[]> = new Map();

  constructor(items: TreeItem[]) {
    for (const item of items) {
      //   this.items.set(item.id, item);

      //   if (item.parent) {
      //     if (!this.children.has(item.parent)) {
      //       this.children.set(item.parent, []);
      //     }

      //     this.children.get(item.parent)!.push(item);
      //   }

      this.registerItem(item);
      this.registerCildren(item);
    }
  }

  private registerItem(item: TreeItem) {
    this.items.set(item.id, item);
  }

  private registerCildren(item: TreeItem) {
    if (item.parent) {
      if (!this.children.has(item.parent)) {
        this.children.set(item.parent, []);
      }

      this.children.get(item.parent)!.push(item);
    }
  }

  getAll() {
    return [...this.items.values()];
  }

  getItem(id: TreeItem["id"]) {
    return this.items.get(id);
  }

  getChildren(id: TreeItem["id"]) {
    return this.children.get(id) ?? [];
  }

  getAllChildren(id: TreeItem["id"]) {
    const result: TreeItem[] = [];
    const stack = [...this.getChildren(id)];

    while (stack.length) {
      const node = stack.pop()!;
      result.push(node);
      stack.push(...this.getChildren(node.id));
    }

    return result;
  }

  getAllParents(id: TreeItem["id"]) {
    const target = this.getItem(id);
    const result: TreeItem[] = [];

    if (target && target.parent) {
      let current = this.getItem(target.parent);

      while (current) {
        result.push(current);
        current = current.parent ? this.getItem(current.parent) : undefined;
      }
    }

    return result;
  }

  addItem(item: TreeItem) {
    // if (this.items.has(item.id)) {
    //   throw new Error(`Item with id ${item.id} already exists`);
    // }

    if (this.items.has(item.id)) return false;

    this.registerItem(item);
    this.registerCildren(item);

    return true;

    //     this.items.set(item.id, item);

    //     if (item.parent) {
    //       if (!this.children.has(item.parent)) {
    //         this.children.set(item.parent, []);
    //       }

    //       this.children.get(item.parent)!.push(item);
    //     }
  }

  //   removeItem(id: TreeItem["id"]) {
  //     const toRemoveIds = [id, ...this.getAllChildren(id).map((item) => item.id)];

  //     for (const toRemoveId of toRemoveIds) {
  //       const item = this.items.get(toRemoveId);
  //       if (!item) continue;

  //       const children = this.children.get(item.parent);
  //       if (children) {
  //         this.children.set(
  //           item.parent,
  //           children.filter((c) => c.id !== toRemoveId),
  //         );
  //       }

  //       this.children.delete(toRemoveId);
  //       this.items.delete(toRemoveId);
  //     }
  //   }

  removeItem(id: TreeItem["id"]) {
    const toRemoveItem = this.items.get(id);

    if (toRemoveItem) {
      // Remove item from his parent children list
      if (toRemoveItem.parent) {
        const children = this.children.get(toRemoveItem.parent);

        if (children && children.length > 1) {
          this.children.set(
            toRemoveItem.parent,
            children.filter((item) => item.id !== id),
          );
        } else this.children.delete(toRemoveItem.parent);
      }

      const toRemoveIds = [
        id,
        ...this.getAllChildren(id).map((item) => item.id),
      ];

      for (const id of toRemoveIds) {
        this.children.delete(id);
        this.items.delete(id);
      }
      return true;
    } else return false;
  }
}
