export const Menu = () => {
  return (
    <ul className='list-none hidden sm:flex flex-row gap-10'>
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
  );
};
