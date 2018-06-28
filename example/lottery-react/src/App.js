import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import web3 from "./web3";
import lottery from "./lottery";
class App extends Component {
  state = {
    manage: "",
    players: [],
    balance: "",
    value: "",
    message: ""
  };

  async componentDidMount() {
    const manager = await lottery.methods.manager().call();
    const players = await lottery.methods.getPlayers().call();
    const balance = await web3.eth.getBalance(lottery.options.address);
    this.setState({ manager, players, balance });
  }
  onSubmit = async event => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();
    this.setState({ message: "waiting on transaction success...." });
    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei(this.state.value, "ether")
    });

    this.setState({ message: "you have been entered!" });
  };
  onClick = async event => {
    const accounts = await web3.eth.getAccounts();
    this.setState({message:'waitting on transaction success...'});
      await lottery.methods.pickWinner().send({
        from:accounts[0]
      });
      this.setState({message:'Winner already picked!'});
      this.setState();

  };
  render() {
    console.log("start");
    web3.eth.getAccounts().then(console.log);
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Lottery Contract</h1>
        </header>
        <p>
          The contract is manage by <code>{this.state.manager}</code> <br />
          There are currently {this.state.players.length} people enter the
          competing to win {web3.utils.fromWei(this.state.balance, "ether")}{" "}
          ether!
        </p>
        <hr />

        <form onSubmit={this.onSubmit}>
          <h4>Want to try your luck?</h4>
          <div>
            <label> Amount of ether to enter</label>
            <input
              value={this.state.value}
              onChange={event => this.setState({ value: event.target.value })}
            />
          </div>
          <button>Enter</button>
        </form>
        <hr />
        <h4>Ready to pick a winner?</h4>
        <button onClick={this.onClick}>Pick a winner!</button>
        <hr />
        <h1>{this.state.message}</h1>
      </div>
    );
  }
}

export default App;
