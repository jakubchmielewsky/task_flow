import { useEffect, useState } from 'react';
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

interface SelectDropdownProps {
  options: { id: string; name: string; ownerId: string; members: string[]; }[];
  selected: string | undefined;
  onSelectedChange: (option: string) => void;
}

const SelectDropdown: React.FC<SelectDropdownProps> = ({ options, selected, onSelectedChange }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    if (options.length > 0 && !selected) {
      onSelectedChange(options[0].id);
    }
  }, [options, selected, onSelectedChange]);

  const handleClick = (id: string) => {
    onSelectedChange(id);
    setIsOpen(false);
  };

  return (
    <div className="flex flex-col items-center gap-2 hover:bg-gray-100 py-1 px-2 rounded-full text-sm ml-5">
      <button onClick={() => setIsOpen(!isOpen)} className="flex items-center w-24 justify-between">
        {selected || "Select"}
        {isOpen ? <FiChevronUp /> : <FiChevronDown />}
      </button>
      {isOpen && (
        <ul className="absolute z-10 w-28 mt-9 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
          {options.map((option, index) => (
            <li
              key={index}
              id={option.id}
              onClick={() => handleClick(option.id)}
              className="px-4 py-2 hover:bg-gray-600 hover:text-white cursor-pointer"
            >
              {option.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SelectDropdown;
