import { useState } from 'react';

import { Menu } from './Menu';
import { ToggleMenu } from './ToggleMenu';

export const Navbar = ({
  account,
  onConnect,
}: {
  account?: string;
  onConnect: () => Promise<void>;
}) => {
  const getAccount = () => {
    return `${account?.slice(0, 6)}...${account?.slice(38, 42)}`;
  };
  return (
    <nav className='navbar'>
      <div className='flex gap-1 align-center'>
        <Menu />
        <ToggleMenu />
      </div>

      <div className='navbar__title'>
        <span className='text-white text-[18px] font-bold cursor-pointer flex '>
          Home
        </span>
        <img src='logo.svg' width={40} alt='homehive' />
        <span
          style={{ color: '#6563ff' }}
          className='text-white text-[18px] font-bold cursor-pointer flex '
        >
          Hive
        </span>
      </div>

      <div className='button_wrapper'>
        <button className='button' onClick={onConnect}>
          {account ? getAccount() : 'Connect'}
        </button>
      </div>
    </nav>
  );
};
