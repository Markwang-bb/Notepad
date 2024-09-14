import React from 'react';

interface ButtonProps {
  onClick: () => void;
  disabled: boolean;
  children: React.ReactNode;
  tooltip: string;
  shortcut?: string;
}

const Button: React.FC<ButtonProps> = ({ onClick, disabled, children, tooltip, shortcut }) => {
  return (
    <div className="relative inline-block">
      <button 
        onClick={onClick} 
        className={`bg-gradient-to-r from-blue-500 to-purple-500 text-white p-2 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={disabled}
      >
        {children}
      </button>
      <span className="tooltip-text absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-700 text-white text-sm rounded opacity-0 transition-opacity duration-300">
        {tooltip} {shortcut && <span className="text-gray-400 ml-2">({shortcut})</span>}
      </span>
    </div>
  );
};

export default Button;
