import React, {Component} from 'react';
const {Provider, Consumer} = React.createContext();

class ContextProvider extends Component {
    state = {
        data:[{'name': 'AttainU'}]
    }

    render() {
        return(
            <Provider value={{data: this.state.data}}>
                {this.props.children}
            </Provider>
        )
    }
}

export {ContextProvider, Consumer as ContextConsumer};