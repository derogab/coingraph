import React, {Component} from 'react'

import Settings from '../Settings'

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.scss';

export default class Footer extends Component {

    render() {

        return (
            <footer className="footer">
                <div className="container-fluid">
                    <div className="row">
                        <div class="col-md-6">
                            <span className="text-muted">Coingraph • Made with ❤️ by <a target="_derogab" href="https://github.com/derogab">@derogab</a> • Open Source on <a target="_coingraph" href="https://github.com/derogab/coingraph">GitHub</a></span>
                        </div>
                        <div class="col-md-6">
                            <div className="settings-right">
                                <Settings/>
                            </div>
                            
                        </div>
                    </div>  
                </div>
            </footer>
        )   
    }
}