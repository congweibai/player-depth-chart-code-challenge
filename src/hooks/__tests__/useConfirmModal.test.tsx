import { act, renderHook } from "@testing-library/react";
import { useConfirmModal } from "../useConfirmModal";

describe("useConfirmModal", () => {
  it("should return the default values", () => {
    const { result } = renderHook(() => useConfirmModal());
    expect(result.current).toEqual({
      showDeleteConfirmation: false,
      handleClose: expect.any(Function),
      handleOpenConfirmModal: expect.any(Function),
    });
  });

  it("should handle the open and close confirmation modal", () => {
    const { result } = renderHook(() => useConfirmModal());
    act(() => {
      result.current.handleOpenConfirmModal();
    });
    expect(result.current.showDeleteConfirmation).toBe(true);
    act(() => {
      result.current.handleClose();
    });
    result.current.handleClose();
    expect(result.current.showDeleteConfirmation).toBe(false);
  });
});
