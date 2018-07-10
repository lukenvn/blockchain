import React, { Component } from "react";
import Layout from "../../components/Layout";
import {
  Grid,
  Table,
  Button,
  Message
} from "../../node_modules/semantic-ui-react";
import Poll from "../../ethereum/poll";
import OptionRow from "../../components/OptionRow";
import OptionNew from "../../components/OptionNew";
import web3 from "../../ethereum/web3";
import { Router } from "../../routes";

export default class PollView extends Component {
  state = {
    votes: [],
    errorMessage: "",
    loading: false,
    newOption:''
  };
  static async getInitialProps(props) {
    const address = props.query.address;
    const poll = Poll(props.query.address);
    const summary = await poll.methods.getSummary().call();

    const optionsCount = summary[1];
    const options = await Promise.all(
      Array(parseInt(optionsCount))
        .fill()
        .map((element, index) => {
          return poll.methods.options(index).call();
        })
    );
    return {
      poll:poll,
      address: props.query.address,
      question: summary[0],
      options: options,
      optionsCount:optionsCount,
      address: address
    };
  }
  vote = (index, value) => {
    const votes = this.state.votes;
    if (value) {
      votes.push(index);
    } else {
      var position = votes.indexOf(index);
      if (position != -1) {
        votes.splice(position, 1);
      }
    }
    this.setState({
      votes
    });
  };

  addNewOption = async (name) =>{
    const accounts = await web3.eth.getAccounts();
    const poll = Poll(this.props.address);
    try {
     
    await poll.methods.createNewOption(name).send({
      from: accounts[0]
    }); 
    } catch (error) {
      this.setState({
        errorMessage: error.message
      });
    }
  }
  submitVote = async () => {
    const poll = Poll(this.props.address);
    const accounts = await web3.eth.getAccounts();
    const votes = this.state.votes;
    
    this.setState({
      loading: true
    });
    try {
      await poll.methods.vote(votes).send({
        from: accounts[0]
      });
      location.reload();
    } catch (error) {

      this.setState({
        loading: false,
        errorMessage: error.message
      });
    }

    this.setState({
      loading: false
    });
  };

  renderRow() {
    return this.props.options.map((option, index) => {
      return (
        <OptionRow
          option={option}
          key={index}
          id={index}
          vote={this.vote}
          votes={this.state.votes}
        />
      );
    });
  }

  render() {
    const { Body} = Table;
    return (
      <Layout>
        <h1>{this.props.question}</h1>
        <h5>{this.props.address}</h5>
        <Grid>
          <Grid.Row>
            <Grid.Column>
              <Table>
                <Body>
                  {this.renderRow()}
                  <OptionNew addNewOption={this.addNewOption}/>
                </Body>
              </Table>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Message
                error
                hidden={!this.state.errorMessage}
                header="Oops!"
                content={this.state.errorMessage}
              />
              <Button
                primary
                content="Submit"
                onClick={this.submitVote}
                loading={this.state.loading}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Layout>
    );
  }
}
