import React from 'react'
import { Button, Card } from 'semantic-ui-react'
import ROSLIB from 'roslib'

class WayPoint extends React.Component {


    constructor(props) {
        super(props);

        this.state = {
            moving: false,
            goal: null
        }
    }

    setGoal = () => {
        console.log('setting goal... ')

        var goal = new ROSLIB.Goal({
            actionClient: this.props.actionClient,
            
            goalMessage : {
                target_pose : {
                  header : {
                    frame_id : '/map'
                  },
                  pose : this.props.pose.pose
                }
              }
        });

        goal.on('feedback', (feedback) => {
            console.log('Feedback: ' + feedback.sequence);
        });

        goal.on('result', (result) => {
            console.log('Final Result: ' + result.sequence);
            this.setState({ moving: false, goal: null });
        });

        goal.on('cancel', (event) => {
            this.setState({ moving: false, goal: null})
        });

        goal.send();

        this.props.set_goal(goal);

        this.setState({ moving: true, goal: goal });

    }

    cancel = () => {
        this.state.goal.cancel();
    }


    render() {

        return (
            <Card>
                <Card>
                    <Button  color={this.props.color} onClick={this.setGoal}>{this.props.name}</Button>
                </Card>

            </Card>


        )

    }
}

export default WayPoint
