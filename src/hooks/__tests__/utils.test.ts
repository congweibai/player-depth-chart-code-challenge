import { insertWithMaxLength, removeItemAtIndex } from "../utils";

describe("insertWithMaxLength", () => {
  it("should put element at first is array is empty", () => {
    const array: number[] = [];
    const element = 4;
    const index = -1;
    const maxLength = 4;
    const result = insertWithMaxLength(array, element, index, maxLength);
    expect(result).toEqual([4]);
  });

  it("should put element at first is array is empty with any length", () => {
    const array: number[] = [];
    const element = 9;
    const index = 100;
    const maxLength = 4;
    const result = insertWithMaxLength(array, element, index, maxLength);
    expect(result).toEqual([9]);
  });

  it("should insert an element at the end of the array", () => {
    const array = [1, 2, 3];
    const element = 4;
    const index = -1;
    const maxLength = 4;
    const result = insertWithMaxLength(array, element, index, maxLength);
    expect(result).toEqual([1, 2, 3, 4]);
  });

  it("should insert an element at a specific index", () => {
    const array = [1, 2, 3, 4];
    const element = 5;
    const index = 2;
    const maxLength = 4;
    const result = insertWithMaxLength(array, element, index, maxLength);
    expect(result).toEqual([1, 2, 5, 3]);
  });

  it("should queue the element if the index is greater than the array length", () => {
    const array = [1, 2];
    const element = 5;
    const index = 4;
    const maxLength = 4;
    const result = insertWithMaxLength(array, element, index, maxLength);
    expect(result).toEqual([1, 2, 5]);
  });

  it("should replace end of element if index is -1", () => {
    const array = [1, 2, 3, 4];
    const element = 5;
    const index = -1;
    const maxLength = 4;
    const result = insertWithMaxLength(array, element, index, maxLength);
    expect(result).toEqual([1, 2, 3, 5]);
  });

  it("should put element end of element if index is -1", () => {
    const array = [1, 2, 6];
    const element = 5;
    const index = -1;
    const maxLength = 4;
    const result = insertWithMaxLength(array, element, index, maxLength);
    expect(result).toEqual([1, 2, 6, 5]);
  });
});

describe("removeItemAtIndex", () => {
  it("should not update array if index is less than 0", () => {
    const array = [1, 2, 3, 4];
    const index = -1;
    const result = removeItemAtIndex(array, index);
    expect(result).toEqual([1, 2, 3, 4]);
  });

  it("should not update array if index is out of bounds", () => {
    const array = [1, 2, 3, 4];
    const index = 5;
    const result = removeItemAtIndex(array, index);
    expect(result).toEqual([1, 2, 3, 4]);
  });

  it("should remove an item at a specific index", () => {
    const array = [1, 2, 3, 4];
    const index = 2;
    const result = removeItemAtIndex(array, index);
    expect(result).toEqual([1, 2, 4]);
  });

  it("should remove an item at the end of the array", () => {
    const array = [1, 2, 3, 4];
    const index = 3;
    const result = removeItemAtIndex(array, index);
    expect(result).toEqual([1, 2, 3]);
  });

  it("should remove an item at the beginning of the array", () => {
    const array = [1, 2, 3, 4];
    const index = 0;
    const result = removeItemAtIndex(array, index);
    expect(result).toEqual([2, 3, 4]);
  });
});
