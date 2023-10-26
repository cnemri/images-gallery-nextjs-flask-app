"use client";

import React from "react";
import { Button } from "./ui/button";

type Props = {
  search: string;
  setSearch: (value: string) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

const Search = ({ search, setSearch, handleSubmit }: Props) => {
  return (
    <div className="flex items-center justify-center space-x-4 p-5">
      <form onSubmit={handleSubmit} className="flex items-center space-x-4">
        <input
          type="text"
          placeholder="Enter search keywords here"
          className="w-96 p-2 border border-gray-400 rounded-md"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button className="w-24 bg-blue-500 text-white">Search</Button>
      </form>
    </div>
  );
};

export default Search;
