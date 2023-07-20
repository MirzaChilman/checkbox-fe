import { inputKeywordsAtom, searchedKeywordsAtom } from "@/atoms/Search";
import { useAtom } from "jotai";
import { Button, TextInput } from "flowbite-react";
import useSearchUser from "@/hooks/useSearchUser";
import React, { useEffect, useRef } from "react";

const Form = () => {
  const [inputKeywords, setInputKeywords] = useAtom(inputKeywordsAtom);
  const [searchedKeywords, setSearchedKeywords] = useAtom(searchedKeywordsAtom);
  const { refetch } = useSearchUser();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFetchUser = () => {
    setSearchedKeywords(inputKeywords);
  };

  useEffect(() => {
    if (Boolean(searchedKeywords)) {
      refetch();
    }
  }, [refetch, searchedKeywords]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const isInputFocused = inputRef.current === document.activeElement;
    if (event.key.toLowerCase() === "enter" && isInputFocused) {
      handleFetchUser();
    }
  };

  return (
    <div className="mt-10">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <TextInput
            id="username"
            type="text"
            placeholder="Username"
            onKeyDown={handleKeyDown}
            onChange={(e) => setInputKeywords(e.target.value.toLowerCase())}
            ref={inputRef}
          />
        </div>
        <div className="flex items-center justify-between">
          <Button type="button" onClick={handleFetchUser}>
            Search
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Form;
