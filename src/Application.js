import React, { Component } from 'react';
import NewGrudge from './NewGrudge';
import Grudges from './Grudges';
import './Application.css';

import { API, graphqlOperation } from 'aws-amplify';
import {
         ListGrudges,
	 CreateGrudge,
	 SubscribeToNewGrudges,
	 DeleteGrudge,
	 SubscribeToRemovedGrudges,
	 ToggleGrudge,
	 SubscribeToToggledGrudges
        } from './graphql'

class Application extends Component {
  state = {
    grudges: [],
  };

  componentDidMount() {
    API.graphql(graphqlOperation(ListGrudges))
      .then(response => {
        const grudges = response.data.listGrudges.items;
        this.setState({ grudges });
    }).catch(console.error);

    API.graphql(graphqlOperation(SubscribeToNewGrudges)).subscribe({
      next: (response) => {
        const grudge = response.value.data.onCreateGrudge;
        this.setState({ grudges: [...this.state.grudges, grudge] });
      }
    })

    API.graphql(graphqlOperation(SubscribeToRemovedGrudges)).subscribe({
      next: (response) => {
        const grudge = response.value.data.onDeleteGrudge;
        this.setState({
          grudges: this.state.grudges.filter(other => other.id !== grudge.id),
        });
      }
    })

    API.graphql(graphqlOperation(SubscribeToToggledGrudges)).subscribe({
      next: (response) => {
        const grudge = response.value.data.onUpdateGrudge;
        const otherGrudges = this.state.grudges.filter(
          other => other.id !== grudge.id,
        );
        this.setState({ grudges: [grudge, ...otherGrudges] });
      }
    })

  }

  addGrudge = grudge => {
    API.graphql(graphqlOperation(CreateGrudge, grudge)).then(response => {
      console.log('Added', { grudge });
    }).catch(console.error);
  };

  removeGrudge = grudge => {
    API.graphql(graphqlOperation(DeleteGrudge, grudge)).then(response => {
      console.log('Removed', { response });
    }).catch(console.error);
  };

  toggle = grudge => {
    const updatedGrudge = { ...grudge, avenged: !grudge.avenged };
    API.graphql(graphqlOperation(ToggleGrudge, updatedGrudge))
      .then(response => {
        console.log('Toggled', { response });
      }).catch(console.error);
  };

  render() {
    const { grudges } = this.state;
    const unavengedgrudges = grudges.filter(grudge => !grudge.avenged);
    const avengedgrudges = grudges.filter(grudge => grudge.avenged);

    return (
      <div className="Application">
        <NewGrudge onSubmit={this.addGrudge} />
        <Grudges
          title="Unavenged Grudges"
          grudges={unavengedgrudges}
          onCheckOff={this.toggle}
          onRemove={this.removeGrudge}
        />
        <Grudges
          title="Avenged Grudges"
          grudges={avengedgrudges}
          onCheckOff={this.toggle}
          onRemove={this.removeGrudge}
        />
      </div>
    );
  }
}

export default Application;
