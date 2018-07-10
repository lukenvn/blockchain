import React, { Component } from "react";
import { Table, Checkbox, Label, Icon } from "../node_modules/semantic-ui-react";

export default class OptionRow extends Component {
  handleChange = (e, { checked }) => {
    this.props.vote(this.props.id, checked);
  };
  render() {
    const { Row, Cell } = Table;
    const { option} = this.props;
    return (
      <Row>
        <Cell width={11}>
          <Checkbox onChange={this.handleChange} label={option.name}/>
        </Cell>
        <Cell width={1}>
          <Label color="green" ><Icon name='check' /> {option.votedCount}</Label> 
        </Cell>
      </Row>
    );
  }
}
