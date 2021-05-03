import React, {Component} from 'react'

import ReactModal from 'react-modal';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.scss';


export default class Settings extends Component {

    constructor () {
      super();
      this.state = {
        showModal: false
      };
      
      this.handleOpenModal = this.handleOpenModal.bind(this);
      this.handleCloseModal = this.handleCloseModal.bind(this);
    }
    
    handleOpenModal () {
      this.setState({ showModal: true });
    }
    
    handleCloseModal () {
      this.setState({ showModal: false });
    }
    
    render () {
      return (
        <div>
            <button className="settings-trigger text-muted" onClick={this.handleOpenModal}>Settings</button>
            <ReactModal
                id="settings-modal" 
                contentLabel="Settings"
                isOpen={this.state.showModal}                
            >
                <h1>Settings</h1>


                <div className="footer-buttons">
                    
                    <button className="btn btn-primary" onClick={this.handleCloseModal}>Close</button>

                </div>
          
          </ReactModal>
        </div>
      );
    }
}