import React, { useEffect, useState } from 'react';
import { getWeb3 } from './utils.js'; 
import Header from './Header.js';
import NewTransfer from './NewTransfer.js';
import TransferList from './TransferList.js';
import Wallet from './contracts/Wallet.json';


function App() {
  const [web3, setWeb3] = useState(undefined);
  const [accounts, setAccounts] = useState(undefined);
  const [contract, setContract] = useState(undefined);
  const [balance, setBalance] = useState(undefined);
  const [approvers, setApprovers] = useState([]);
  const [quorum, setQuorum] = useState(undefined);
  const [transfers, setTransfers] = useState([]);

  useEffect(() => {
    const init = async () => {
      const web3 = await getWeb3();
      const accounts = await web3.eth.getAccounts();
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = Wallet.networks[networkId];
      const contract = new web3.eth.Contract(
        Wallet.abi,
        deployedNetwork && deployedNetwork.address,
      );
      const approvers = await contract.methods.getApprovers().call();
      const quorum = await contract.methods.quorum().call();
      const transfers = await contract.methods.getTransfers().call();
      setWeb3(web3);
      setAccounts(accounts);
      setContract(contract);
      setApprovers(approvers);
      setQuorum(quorum);
      setTransfers(transfers);
    };
    init();
  }, []);

  useEffect(() => {
    if(typeof contract !== 'undefined' && typeof web3 !== 'undefined') {
      updateBalance();
    }
  }, [accounts, contract, web3]);

  async function updateBalance() {
    const balance = await web3.eth.getBalance(contract.options.address);
    setBalance(balance);
  }

  const createTransfer = transfer => {
    contract.methods
      .createTransfer(transfer.amount, transfer.to)
      .send({from: accounts[0]});
  }

  const approveTransfer = transferId => {
    contract.methods
      .approveTransfer(transferId)
      .send({from: accounts[0]});
  }

  // useEffect(() => {
  if(
    typeof web3 === 'undefined'
    || typeof accounts === 'undefined'
    || typeof contract === 'undefined'
    || approvers.length === 0
    || typeof quorum === 'undefined'
  ) {
    // return <div>Loading...</div>;
  }
  // }, [accounts, contract, approvers, quorum, web3]);

  return (
    <div>
      Multisig Dapp 
      <div className="row">
        <div className="col-sm-12">
           <p>Balance: <b>{balance}</b> wei </p>
        </div>
      </div>

      <Header approvers={approvers} quorum={quorum} />
      <NewTransfer createTransfer={createTransfer} />
      <TransferList transfers={transfers} approveTransfer={approveTransfer} />
    </div>
  );
}

export default App;
