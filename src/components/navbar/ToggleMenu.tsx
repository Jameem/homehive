import { useState } from 'react';

import close from '../../assets/close.svg';
import menu from '../../assets/menu.svg';

export const ToggleMenu = () => {
  const [toggle, setToggle] = useState(false);

  return (
    <div className='sm:hidden flex flex-1 justify-start items-center'>
      <img
        src={toggle ? close : menu}
        alt='menu'
        className='w-[28px] h-[28px] object-contain cursor-pointer'
        onClick={() => setToggle(!toggle)}
      />

      <div
        className={`${
          !toggle ? 'hidden' : 'flex'
        } p-6 black-gradient absolute top-16 left-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl`}
      >
        <ul className='list-none flex justify-end items-start flex-1 flex-col gap-4'>
          <li>
            <a href='/buy' className=''>
              Buy
            </a>
          </li>
          <li>
            <a href='/rent' className=''>
              Rent
            </a>
          </li>
          <li>
            <a href='/sell' className=''>
              Sell
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};
