import React from 'react'
import { Grid, Image, Icon, Header, Button, List, Card } from 'semantic-ui-react'
import Waypoint from "./waypoint";

class Panel extends React.Component {

    constructor(props)
    {
        super(props)
        this.state = {locations: []}
    }

    componentDidMount() {
        fetch('/api/locations')
        .then(res => res.json())
        .then((data) => {
            this.setState({ locations: data })
        })
        .catch(console.log)
    }


    render() {

       const elements = []

       for (const [index, value] of this.state.locations.entries() ) {
           elements.push(<Waypoint 
                    name={value.name} 
                    key={index} 
                    actionClient={this.props.actionClient}
                    pose={value.pose}
                    set_goal={this.props.set_goal}
                    ></Waypoint>)
       }


       return ( 
           <div>
            {elements}     
          </div>
           )
       
    }
   }


export default Panel
