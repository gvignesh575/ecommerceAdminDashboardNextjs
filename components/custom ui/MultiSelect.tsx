import React, { useState, useRef, useEffect } from "react";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { X } from "lucide-react";

interface CollectionType {
  _id: string;
  title: string;
}

interface MultiSelectProps {
  placeholder: string;
  collections: CollectionType[];
  value: string[]; // Assuming value is an array of selected _id values
  onChange: (values: string) => void; // onChange function should accept an array of values
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
  const [filteredCollections, setFilteredCollections] = useState<
    CollectionType[]
  >([]);
  const multiSelectRef = useRef<HTMLDivElement>(null); // Provide explicit type

  const textInput = useRef<HTMLInputElement>(null); // Provide explicit type

  let selected: CollectionType[];

  if (value.length === 0) {
    selected = [];
  } else {
    selected = value.map(
      (id) =>
        collections.find(
          (collection) => collection._id === id
        ) as CollectionType
    );
  }

  let selectables: CollectionType[];

  if (
    filteredCollections.length === 0 &&
    textInput.current &&
    textInput.current.value.trim() === ""
  ) {
    selectables = collections.filter(
      (collection) => !selected.includes(collection)
    );
  } else {
    selectables = filteredCollections.filter(
      (collection) => !selected.includes(collection)
    );
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        multiSelectRef.current &&
        !multiSelectRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [multiSelectRef]);

  const handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.toLowerCase();
    if (inputValue === "") {
      setFilteredCollections([]);
    } else {
      const filtered = selectables.filter((collection) =>
        collection.title.toLowerCase().includes(inputValue)
      );
      setFilteredCollections(filtered);
    }
  };

  const handleItemClick = (id: string) => {
    onChange(id);
    if (textInput.current) textInput.current.value = "";
    setOpen(false);
  };

  return (
    <div
      className="overflow-visible"
      ref={multiSelectRef}
      onFocus={() => setOpen(true)}
    >
      <div className="flex gap-1 flex-wrap border rounded-md">
        {selected.map((collection) => (
          <React.Fragment key={collection._id}>
            {" "}
            {/* Changed to React.Fragment */}
            <Badge>{collection.title}</Badge>
            <button
              type="button"
              className="ml-1 hover:text-red-1"
              onClick={() => onRemove(collection._id)}
            >
              <X className="h-3 w-3" />
              {""}
            </button>
          </React.Fragment>
        ))}

        <Input
          ref={textInput}
          placeholder={placeholder}
          onChange={handleFilter}
        />
      </div>
      {open && (
        <div className="relative mt-2">
          <div className="absolute w-full z-30 top-0 overflow-auto border rounded-md shadow-md overflow-y-scroll max-h-[100px] no-scrollbar">
            {filteredCollections.length === 0 &&
              selectables.map((collection) => (
                <div
                  key={collection._id}
                  className={`px-2 py-2 hover:bg-gray-200 cursor-pointer`}
                  onClick={() => handleItemClick(collection._id)}
                >
                  {collection.title}
                </div>
              ))}
            {filteredCollections.length > 0 &&
              selectables.map((collection: CollectionType) => (
                <div
                  key={collection._id}
                  className={`px-2 py-2 hover:bg-gray-200 cursor-pointer`}
                  onClick={() => handleItemClick(collection._id)}
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
