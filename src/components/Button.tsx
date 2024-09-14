import React from 'react';

interface ButtonProps {
  onClick: () => void;
  disabled: boolean;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ onClick, disabled, children }) => {
  return (
    <button 
      onClick={onClick} 
      className={`bg-gradient-to-r from-blue-500 to-purple-500 text-white p-2 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
