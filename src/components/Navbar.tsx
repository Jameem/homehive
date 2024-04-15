export const Navbar = ({
  account,
  onConnect,
}: {
  account: string;
  onConnect: () => Promise<void>;
}) => {
  return (
    <nav className='navbar'>
      <div className='flex gap-1 align-center'>
        <ul className='navbar__ul'>
          <li>
            <a href='/buy' className='navbar__anchor'>
              Buy
            </a>
          </li>
          <li>
            <a href='/rent' className='navbar__anchor'>
              Rent
            </a>
          </li>
          <li>
            <a href='/sell' className='navbar__anchor'>
              Sell
            </a>
          </li>
        </ul>
      </div>

      <div className='navbar__title'>
        <span>Home</span>
        <img src='logo.svg' width={40} alt='homehive' />
        <span style={{ color: '#6563ff' }}>Hive</span>
      </div>

      <div className='button_wrapper'>
        <button className='button' onClick={onConnect}>
          {account ? account : 'Connect Metamask'}
        </button>
      </div>
    </nav>
  );
};
