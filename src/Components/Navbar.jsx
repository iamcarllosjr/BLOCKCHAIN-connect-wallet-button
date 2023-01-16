import { useState, useEffect } from "react";
import Menu from "../style/Menu.css"

const Nabvar = () => {
  const [walletAddress, setWalletAddress] = useState("");

  useEffect(() => {
    getCurrentWallet();
    addWalletListener();
  });

  //function for connect Wallet
  const connectWallet = async() => {
    if (typeof window != "undefined" && typeof window.ethereum != "undefined"){
      try {
        /* Metamask is Installed */
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts"});
        setWalletAddress(accounts[0]);
        console.log(accounts[0]) //For test
      } catch (err){
        console.error(err.message);
      }
    } else {
      /* Metamask is not installed */
      console.log("Please install Metamask") 
    }
  };

  //function to keep the same account when reloading the page
  const getCurrentWallet = async() => {
    if (typeof window != "undefined" && typeof window.ethereum != "undefined"){
      try {
        
        const accounts = await window.ethereum.request({ method: "eth_accounts"});
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
          console.log(accounts[0]) //For test
        } else {
          console.log("Connect to Metamask using the Connect Button ")
        }
      } catch (err) {
        console.error(err.message);
      }
    } 
  };

  //Function so that when disconnecting from the wallet, change the state of the button on the page
  const addWalletListener = async() => {
    if (typeof window != "undefined" && typeof window.ethereum != "undefined"){
      window.ethereum.on("accountsChanged", (accounts) => {
        setWalletAddress(accounts[0]);
        console.log(accounts[0]);
      });
    } else {
      /* Metamask is not installed */
      setWalletAddress("");
      console.log("Please connect to wallet address")
    };
  };

    return (
        <header className="header">
      <div className="header-container">
        <a href="">
          <h1 className="logo">Logo</h1>
        </a>

        <nav className="navigation">
          <input type="checkbox" id="menu-hamburguer" />

          <label htmlFor="menu-hamburguer">
            <div className="menu">
              <span className="hamburguer"></span>
            </div>
          </label>

          <ul className="links">
            <li><a href="#home">Home</a></li>
            <li><a href="#sobre">About</a></li>
            <li><a href="#contato">Contact</a></li>
          </ul>
          <button className="btn-connect" onClick={connectWallet}>{(walletAddress && walletAddress.length > 0) ? `Connected: ${walletAddress.substring(0, 6)}...${walletAddress.substring(38)}` : "Connect Wallet"}</button>

        </nav>
      </div>
    </header>
    )
}

export default Nabvar;