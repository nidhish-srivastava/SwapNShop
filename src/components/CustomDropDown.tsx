import React, { useState } from 'react';
import { Check } from 'lucide-react';

type props = {
    options : {
      name : string
      selected : boolean
    }[]
    lowToHigh : ()=>void
    highToLow : ()=>void
    datePublished : ()=>void
}

const CustomDropdown = ({options,lowToHigh,highToLow,datePublished} : props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('Select an option');

  const handleOptionClick = (option : string) => {
    setIsOpen(false);
    if(option=="Price(Low to High)"){
      lowToHigh()
    }
    else if(option=="Price(High to Low)"){
      highToLow()
    }
    else{
      datePublished()
    }
    setSelectedOption(option);
  };

  return (
    <div className="relative inline-block text-left">
      <div>
        <span className="rounded-md shadow-sm">
          <button
            type="button"
            className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:border-blue-300 focus:ring focus:ring-blue-200 active:bg-gray-200"
            onClick={() => setIsOpen(!isOpen)}
          >
            {selectedOption}
            <svg
              className="w-5 h-5 ml-2 -mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
          </button>
        </span>
      </div>

      {isOpen && (
        <div className="absolute z-10 w-full mt-2 origin-top-right bg-white border border-gray-300 rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {options.map((option, index) => (
              <div
                key={index}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                role="menuitem"
                onClick={() => handleOptionClick(option.name)}
              >
                <span className='flex justify-between items-center gap-2 cursor-pointer'>
                {option.name}
                {option.selected ? 
                <Check size={16} strokeWidth={1.5} />
                :null}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;
