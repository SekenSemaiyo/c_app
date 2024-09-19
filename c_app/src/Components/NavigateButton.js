import React from 'react';
import { useNavigate } from 'react-router-dom';

function NavigateButton({ label, path }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(path);
  };

  return <button className="btn btn-danger btn-block mt-4" onClick={handleClick}>{label}</button>;
}

export default NavigateButton;
