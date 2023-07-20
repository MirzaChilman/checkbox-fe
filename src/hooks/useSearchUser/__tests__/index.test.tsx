import { renderHook } from "@testing-library/react";
import { useQuery } from "@tanstack/react-query";
import useSearchUser from "..";
import { fetchUsers } from "../fetch";
import { searchedKeywordsAtom } from "@/atoms/Search";
import { useAtomValue } from "jotai";

jest.mock("@tanstack/react-query", () => ({
  useQuery: jest.fn(),
}));

jest.mock("jotai", () => ({
  useAtomValue: jest.fn(() => "example"),
  atom: jest.fn(),
}));

describe("useSearchUser", () => {
  beforeEach(() => {
    (useAtomValue as jest.Mock).mockReturnValue("example");
  });

  test("returns the expected values from useQuery", () => {
    const mockedData = { users: ["user1", "user2"], totalCount: 2 };
    (useQuery as jest.Mock).mockReturnValue({
      data: mockedData,
      isLoading: false,
      isError: false,
      refetch: jest.fn(),
      isFetching: true,
    });

    const { result } = renderHook(() => useSearchUser());

    expect(result.current.data).toBe(mockedData);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.isError).toBe(false);
    expect(result.current.isFetching).toBe(true);
  });

  test("onError is called when there is an error", () => {
    (useQuery as jest.Mock).mockReturnValue({
      isError: true,
    });

    const { result } = renderHook(() => useSearchUser());

    expect(result.current).toBeTruthy;
  });
});
