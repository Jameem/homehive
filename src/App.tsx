import { useEffect, useState } from 'react';
import './App.css';
import { Navbar } from './components/navbar/Navbar';
import { Properties } from './components/property/Index';
import { Banner } from './components/Banner';
import { Search } from './components/Search';

const ethers = require('ethers');

function App() {
  const [account, setAccount] = useState('');
  useEffect(() => {
    const loadData = async () => {
      try {
        // const provider = new ethers.BrowserProvider(window.ethereum);

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
    <div className='app-container '>
      <Navbar account={account} onConnect={onClickConnect} />
      <Banner />
      <Search />
      <Properties />
    </div>
  );
}

export default App;
