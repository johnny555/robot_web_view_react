import React, { Component } from "react";
import PropTypes from "prop-types";

import ReactNipple from "react-nipple";
import DebugView from "react-nipple/lib/DebugView";
import "react-nipple/lib/styles.css";


export default class ReactNippleExample extends Component {
    static propTypes = {
        title: PropTypes.string,
        width: PropTypes.number,
        height: PropTypes.number,
        options: PropTypes.object
    };
    state = {
        data: undefined
    };
    render() {
        return (
            <div className="NippleExample">
                <h2>{this.props.title}</h2>
                <ReactNipple
                    className="joystick"
                    options={this.props.options}
                    style={{
                        outline: `1px dashed ${this.props.options.color}`,
                        width: this.props.width,
                        height: this.props.height
                    }}
                    onStart={this.handleJoystickStart}
                    onEnd={this.handleJoystickEnd}
                    onMove={this.handleJoystickMove}
                    onDir={this.handleJoystickDir}
                    onPlain={this.handleJoystickPlain}
                    onShown={this.handleJoystickShown}
                    onHidden={this.handleJoystickHidden}
                    onPressure={this.handleJoystickPressure}
                />
               
            </div>
        );
    }

    handleJoystickStart = (evt, data) => {
        this.setState({ data });
    };
    handleJoystickEnd = (evt, data) => {
        this.setState({ data });
    };
    handleJoystickMove = (evt, data) => {
        if (data && data.direction && data.distance && data.angle) {
        var dx = data.distance/200; // how much joystick is moved from centre... 
        var theta = (data.angle.radian - 1.57);

        dx = Math.cos(theta) * dx;

        var dt = theta/4;
        //dt = 0;
        this.props.cmd_vel(dx, dt);
        }

        this.setState({ data });
    };
    handleJoystickDir = (evt, data) => {
        this.setState({ data });
    };
    handleJoystickPlain = (evt, data) => {
        this.setState({ data });
    };
    handleJoystickShown = (evt, data) => {
        this.setState({ data });
    };
    handleJoystickHidden = (evt, data) => {
        this.setState({ data });
    };
    handleJoystickPressure = (evt, data) => {
        this.setState({ data });
    };
}