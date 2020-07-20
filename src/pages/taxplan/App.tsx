import React from 'react';
import {renderForm} from "./tval";
import {married2019} from "./TY2019_Married";

class App extends React.Component<{}, {}> {
    render() {
        return (
            <React.Fragment>
                {renderForm(married2019().calculate())}
            </React.Fragment>
        );
    }
}

export default App;
