import React, { Component } from "react";
import factory from "../ethereum/factory";
import { Card, Button } from "semantic-ui-react";
import Layout from "../components/Layout";
import { Link } from "../routes";

class VotingIndex extends Component {
  static async getInitialProps() {
    const polls = await factory.methods.getDeployedPolls().call();
    console.log(polls);
    return { polls };
  }
  renderPolls() {
    const items = this.props.polls.map(address => {
      return {
        header: address,
        description: (
          <Link route={`/polls/${address}`}>
            <a>View</a>
          </Link>
        ),
        fluid: true
      };
    });
    return <Card.Group items={items} />;
  }
  render() {
    return (
      <Layout>
        <div>
          <h3>Open polls</h3>
          <Link route="/polls/new">
            <a>
              <Button
                floated="right"
                content="Create Poll"
                icon="add circle"
                primary
              />
            </a>
          </Link>
          {this.renderPolls()}
        </div>
      </Layout>
    );
  }
}
export default VotingIndex;
