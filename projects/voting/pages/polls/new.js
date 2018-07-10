import React, { Component } from "react";
import Layout from "../../components/Layout";
import {
  Form,
  Message,
  Button,
  Input
} from "../../node_modules/semantic-ui-react";
import factory from "../../ethereum/factory";
import web3 from "../../ethereum/web3";
import {Router} from "../../routes";
export default class PollNew extends Component {
  state = {
    question: "",
    errorMessage: "",
    loading: ""
  };
  onSubmit = async event => {
    event.preventDefault();
    this.setState({ loading: true, errorMessage: "" });
    try {
      const accounts = await web3.eth.getAccounts();
      await factory.methods.createPoll(this.state.question).send({
        from: accounts[0]
      });
      Router.pushRoute("/");
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }
    this.setState({ loading: false });
  };
  render() {
    return (
      <Layout>
        <h1>Create New Poll!</h1>
        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
          <Form.Field>
            <label>Question?</label>
            <Input
              value={this.state.question}
              onChange={event =>
                this.setState({ question: event.target.value })
              }
            />
          </Form.Field>

          <Message error header="Oops!" content={this.state.errorMessage} />
          <Button primary loading={this.state.loading}>
            Create!
          </Button>
        </Form>
      </Layout>
    );
  }
}
