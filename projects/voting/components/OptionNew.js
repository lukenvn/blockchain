import {
  Table,
  Icon,
  Input,
  Button,
  Label
} from "../node_modules/semantic-ui-react";
import React, { Component } from "react";

export default class OptionNew extends Component {
  state={
    name:'',
    loading:false
  }
  onChange = async () => {
    this.setState({loading:true});
    await this.props.addNewOption(this.state.name);
    this.setState({loading:false});
    location.reload();
  }
  render() {
    const { Row, Cell } = Table;
    return (
      <Row>
        <Cell width={11}>
          <Input fluid
            style={{
              marginLeft: 25
            }}
            placeholder="New option..."
            type="text" onChange={event=>{this.setState({name:event.target.value})}}
          />
        </Cell>
        <Cell width={1}>
        <Button color="blue" onClick={this.onChange} disabled={!this.state.name || (this.state.name && this.state.loading)} loading={this.state.loading}>
           <Icon name='add'/>
          </Button>
        </Cell>
          
      </Row>
    );
  }
}
