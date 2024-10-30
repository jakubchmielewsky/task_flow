import { useEffect, useState } from 'react';
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

interface SelectDropdownProps {
  options: string[];
  selected: string | undefined;
  onSelectedChange: (option: string) => void;
}

const SelectDropdown: React.FC<SelectDropdownProps> = ({ options, selected, onSelectedChange }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    if (options.length > 0 && !selected) {
      onSelectedChange(options[0]);
    } else if (options.length === 0) {
      onSelectedChange("select");
    }
  }, [options, selected, onSelectedChange]);

  const handleClick = (option: string) => {
    onSelectedChange(option);
    setIsOpen(false);
  };

  return (
    <div className="flex flex-col items-center gap-2 hover:bg-gray-100 py-1 px-2 rounded-full text-sm ml-5">
      <button onClick={() => setIsOpen(!isOpen)} className="flex items-center w-24 justify-between">
        {selected}
        {isOpen ? <FiChevronUp /> : <FiChevronDown />}
      </button>
      {isOpen && (
        <ul className="absolute z-10 w-28 mt-9 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
          {options.map((option, index) => (
            <li
              key={index}
              onClick={() => handleClick(option)}
              className="px-4 py-2 hover:bg-gray-600 hover:text-white cursor-pointer"
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SelectDropdown;
