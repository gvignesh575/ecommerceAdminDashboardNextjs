"use client";

import React, { useState } from "react";
import { Input } from "../ui/input";

interface MultiSelectProps {
  placeholder: string;
  collections: CollectionType[];
  value: string[];
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
}

const MultiSelect: React.FC<MultiSelectProps> = ({
  placeholder,
  collections,
  value,
  onChange,
  onRemove,
}) => {
  const [open, setOpen] = useState(false);
  const [filteredCollections, setFilteredCollections] = useState<any>([]);

  const handleFilter = (e: any) => {
    if (e.target.value === "") {
      setFilteredCollections([]);
    } else {
      let filter = [...collections];
      filter = collections.filter((collection) =>
        collection.title.toLowerCase().includes(e.target.value)
      );
      setFilteredCollections(filter);
    }
  };

  return (
    <div className="overflow-visible">
      <Input
        placeholder={placeholder}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        onChange={handleFilter}
      />
      {open && (
        <div className="relative mt-2">
          <div className="absolute w-full z-30 top-0 overflow-auto border rounded-md shadow-md overflow-y-scroll max-h-[100px] no-scrollbar">
            {filteredCollections.length === 0 &&
              collections.map((collection) => (
                <div
                  key={collection._id}
                  className="px-2 py-2 hover:bg-gray-200 cursor-pointer"
                >
                  {collection.title}
                </div>
              ))}
            {filteredCollections.length > 0 &&
              filteredCollections.map((collection: any) => (
                <div
                  key={collection._id}
                  className="px-2 py-2 hover:bg-gray-200 cursor-pointer"
                >
                  {collection.title}
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MultiSelect;
