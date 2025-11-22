import { describe, expect, test } from "vitest";
import { TreeStore } from "./tree-store";

const tree = [
  { id: 1, parent: null, label: "Item 1" },
  { id: "1234ew", parent: 1, label: "Item 2" },
  { id: 3, parent: 1, label: "Item 3" },
  { id: 4, parent: "1234ew", label: "Item 4" },
  { id: 5, parent: "1234ew", label: "Item 5" },
  { id: 6, parent: 5, label: "Item 6" },
  { id: 7, parent: 4, label: "Item 7" },
  { id: 8, parent: 4, label: "Item 8" },
];
const nonTreeItem = { id: 10, parent: 1, label: "Label 10" };
const likeTreeItem = { id: 4, parent: "1234ew", label: "Item 4" };
const store = new TreeStore(tree);

describe("The instance of TreeStore", () => {
  //getAll
  describe("on call getAll() method", () => {
    test("should return original tree array", () => {
      expect(store.getAll()).is.deep.equal(tree);
    });
  });

  //getItem
  describe("on call getItem() method", () => {
    describe("with a non-existent param 'id'", () => {
      test("should return 'undefined'", () => {
        expect(store.getItem(nonTreeItem.id)).is.equal(undefined);
      });
    });

    describe("with an existing param 'id'", () => {
      describe("witch type is 'number'", () => {
        test("should return tree item with passed id", () => {
          const item = tree[0];
          expect(store.getItem(item.id)).is.deep.equal(item);
        });
      });

      describe("witch type is 'string'", () => {
        test("should return tree item with passed id", () => {
          const item = tree[1];
          expect(store.getItem(item.id)).is.deep.equal(item);
        });
      });
    });
  });

  // getChildren
  describe("on call getChildren() method", () => {
    describe("with a non-existent param 'id'", () => {
      test("should return empty array", () => {
        const expected: ReturnType<TreeStore["getChildren"]> = [];
        expect(store.getChildren(nonTreeItem.id)).is.deep.equal(expected);
      });
    });

    describe("with an existing param 'id', witch item", () => {
      describe("dont have a children", () => {
        test("should return an empty array", () => {
          const item = tree[6];
          const expected: ReturnType<TreeStore["getChildren"]> = [];
          expect(store.getChildren(item.id)).is.deep.equal(expected);
        });
      });

      describe("have a children", () => {
        test("should return an array with direct children", () => {
          const item = tree[1];
          const expected = tree.slice(3, 5);
          expect(store.getChildren(item.id)).is.deep.equal(expected);
        });
      });
    });
  });

  // getAllChildren
  describe("on call getAllChildren() method", () => {
    describe("with a non-existent param 'id'", () => {
      test("should return empty array", () => {
        const expected: ReturnType<TreeStore["getAllChildren"]> = [];
        expect(store.getAllChildren(nonTreeItem.id)).is.deep.equal(expected);
      });
    });

    describe("with an existing param 'id', witch item", () => {
      describe("dont have a children", () => {
        test("should return an empty array", () => {
          const item = tree[6];
          const expected: ReturnType<TreeStore["getAllChildren"]> = [];
          expect(store.getAllChildren(item.id)).is.deep.equal(expected);
        });
      });

      describe("have a children", () => {
        test("should return an array with all children", () => {
          const item = tree[1];
          const expected: ReturnType<TreeStore["getAllChildren"]> =
            tree.slice(3);
          const children = store.getAllChildren(item.id);

          let result = true;
          for (const child of children) {
            if (!expected.includes(child)) {
              result = false;
              break;
            }
          }
          expect(result).is.equal(true);
        });
      });
    });
  });

  // getAllParents
  describe("on call getAllParents() method", () => {
    describe("with a non-existent param 'id'", () => {
      test("should return empty array", () => {
        const expected: ReturnType<TreeStore["getAllChildren"]> = [];
        expect(store.getAllParents(nonTreeItem.id)).is.deep.equal(expected);
      });
    });

    describe("with an existing param 'id', witch item", () => {
      describe("dont have a children", () => {
        test("should return an empty array", () => {
          const item = tree[0];
          const expected: ReturnType<TreeStore["getAllChildren"]> = [];
          expect(store.getAllParents(item.id)).is.deep.equal(expected);
        });
      });

      describe("have a children", () => {
        test("should return an array with all children", () => {
          const item = tree[5];
          const expected = [tree[4], tree[1], tree[0]];
          const parents = store.getAllParents(item.id);

          expect(parents).is.deep.equal(expected);
        });
      });
    });
  });

  //addItem
  describe("on call addItem() method", () => {
    describe("with item witch 'id' is same as existent item", () => {
      const result = store.addItem(likeTreeItem);
      const expected = false;
      test("should not add new item in tree", () => {
        expect(store.getAll().includes(likeTreeItem)).is.equal(expected);
      });
      test("should return 'false'", () => {
        expect(result).is.equal(expected);
      });
    });

    describe.skip("with item witch 'id' is not same as existent items", () => {
      const result = store.addItem(nonTreeItem);
      const expected = true;
      test("should add new item in tree", () => {
        expect(store.getAll().includes(nonTreeItem)).is.equal(expected);
      });
      test("should return 'true'", () => {
        expect(result).is.equal(expected);
      });
    });
  });
});
