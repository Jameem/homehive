import { useEffect, useState } from 'react';
import './App.css';
import { Navbar } from './components/Navbar';
import { Properties } from './components/property/Index';

const ethers = require('ethers');

function App() {
  const [account, setAccount] = useState('');
  useEffect(() => {
    const loadData = async () => {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);

        window.ethereum.on('accountsChanged', async () => {
          const accounts = await window.ethereum?.request({
            method: 'eth_requestAccounts',
          });

          const account = ethers.getAddress(accounts[0]);
          setAccount(account);
        });
      } catch (error) {}
    };
    loadData();
  }, [account]);

  const onClickConnect = async () => {
    try {
      if (window?.ethereum) {
        const accounts = await window.ethereum?.request({
          method: 'eth_requestAccounts',
        });
        const account = ethers.getAddress(accounts[0]);
        setAccount(account);
      }
    } catch (error) {}
  };

  return (
    <div className='container px-1'>
      <Navbar account={account} onConnect={onClickConnect} />
      <Properties />
    </div>
  );
}

export default App;
