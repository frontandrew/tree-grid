import type { TreeItem } from "@shared/types";

/**
 * TreeStore manages a collection of TreeItem nodes and their parent/child relationships.
 *
 * It keeps two internal maps:
 * - items: map of id -> TreeItem
 * - children: map of parentId -> Array<TreeItem> (direct children)
 *
 * The class provides utility methods to query items, direct children, all descendants,
 * all ancestors, and to add/remove items.
 *
 * @constructor Create a new TreeStore instance and register the initial items and their children.
 * @param {TreeItem[]} items - Initial list of tree items to register.
 */
export class TreeStore {
  private items: Map<TreeItem["id"], TreeItem> = new Map();
  private children: Map<TreeItem["id"], TreeItem[]> = new Map();

  constructor(items: TreeItem[]) {
    for (const item of items) {
      this.registerItem(item);
      this.registerCildren(item);
    }
  }

  /**
   * Register a single item in the items map.
   *
   * @private
   * @param {TreeItem} item - The item to register.
   * @returns {void}
   */
  private registerItem(item: TreeItem) {
    this.items.set(item.id, item);
  }

  /**
   * Register an item's relationship as a child of its parent.
   *
   * If the item has a parent id, it is added to the children array for that parent.
   *
   * @private
   * @param {TreeItem} item - The item whose parent/child link should be registered.
   * @returns {void}
   */
  private registerCildren(item: TreeItem) {
    if (item.parent) {
      if (!this.children.has(item.parent)) {
        this.children.set(item.parent, []);
      }

      this.children.get(item.parent)!.push(item);
    }
  }

  /**
   * Return all registered items.
   *
   * @returns {TreeItem[]} Array of all TreeItem instances.
   */
  getAll() {
    return [...this.items.values()];
  }

  /**
   * Get a single item by id.
   *
   * @param {TreeItem["id"]} id - The id of the item to retrieve.
   * @returns {TreeItem | undefined} The item if found, otherwise undefined.
   */
  getItem(id: TreeItem["id"]) {
    return this.items.get(id);
  }

  /**
   * Get direct children of a given item id.
   *
   * @param {TreeItem["id"]} id - Parent item id.
   * @returns {TreeItem[]} Array of direct child items. Returns an empty array if none.
   */
  getChildren(id: TreeItem["id"]) {
    return this.children.get(id) ?? [];
  }

  /**
   * Get all descendant items (recursive) for a given item id.
   *
   * Traverses the tree depth-first and returns all descendants.
   *
   * @param {TreeItem["id"]} id - The id whose descendants should be returned.
   * @returns {TreeItem[]} Array of all descendant items.
   */
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

  /**
   * Get all ancestor items for a given item id, starting from the direct parent
   * up to the root.
   *
   * @param {TreeItem["id"]} id - The id whose ancestors should be returned.
   * @returns {TreeItem[]} Array of ancestor items in order from closest parent to furthest.
   */
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

  /**
   * Add a new item to the store if its id does not already exist.
   *
   * @param {TreeItem} item - The item to add.
   * @returns {boolean} True if the item was added, false if an item with the same id exists.
   */
  addItem(item: TreeItem) {
    if (this.items.has(item.id)) return false;

    this.registerItem(item);
    this.registerCildren(item);

    return true;
  }

  /**
   * Remove an item and all its descendants from the store.
   *
   * This will also remove the item from its parent's children list.
   *
   * @param {TreeItem["id"]} id - The id of the item to remove.
   * @returns {boolean} True if the item was found and removed, false otherwise.
   */
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
