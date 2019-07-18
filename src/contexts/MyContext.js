import React from 'react';

export const MyContext = React.createContext();

export class MyProvider extends React.Component {
    state = {
        selectTournament: (tournament) => {
            this.setState({tournament})
        }
    };

    render() {
        return (
            <MyContext.Provider value={{
                ...this.state,
            }}>
                {this.props.children}
            </MyContext.Provider>
            )
    }
}
