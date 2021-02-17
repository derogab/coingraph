import React, {Component} from 'react'

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

export default class Footer extends Component {

    render() {

        return (
            <footer className="footer">
                <div className="container-fluid text-center">
                    <span className="text-muted">Coingraph • Made with ❤️ by <a target="_derogab" href="https://github.com/derogab">@derogab</a> • Open Source on <a target="_coingraph" href="https://github.com/derogab/coingraph">GitHub</a></span>    
                </div>
            </footer>
        )   
    }
}