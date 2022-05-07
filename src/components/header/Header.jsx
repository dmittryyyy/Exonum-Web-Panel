import {Component, React, useContext} from 'react';
import {ThemeContext} from "../../index";
import {Client} from "../../services/Client";

export class Header extends Component {
    state = {
        actualNode: "",
        height: ""
    }

    async componentDidMount() {
        try {
            const client = new Client();
            const res = await client.GetCurentHight();

            this.setState({
                actualNode: client.GetActiveNode(),
                height: res,
            })
        } catch (e) {
            console.log(e);
        }
    }

    render() {
      return (
        <header>
            <div className="activeNode">
                {this.state.actualNode}
            </div>
            <div className="hight">
                {this.state.height}
            </div>
        </header>
      )
    }
}
