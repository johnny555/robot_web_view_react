import React from 'react';
import logo from './logo.svg';
import './App.css';

import { Container, Grid, Image, Header, List, Icon } from 'semantic-ui-react';
import Panel from "./panel";
import ROSWrapper from "./rosWrapper.js";

function App() {
  return (
    <div className="App">
   <Container style={{ margin: 20 }}>

   <Grid centered columns={3}>
                    <Grid.Column></Grid.Column>

     <Grid.Column>           
    <Header as='h2' icon>
      <Icon name="coffee" />
      KRYTN CONTROL PANEL
    </Header>
    
    <ROSWrapper />
    </Grid.Column>

    <Grid.Column></Grid.Column>

</Grid>
  </Container>

  </div>
  );
}

export default App;
