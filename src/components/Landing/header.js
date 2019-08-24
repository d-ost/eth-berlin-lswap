import React , {Component} from 'react';
import { Link } from 'react-router-dom';
import ls from "../../../src/lib/localStorage";


class Header extends Component {

    constructor(props){
        super(props);
        this.state = {
            noUser : true
        }
        ls.getItem("id_current_user").then(( res )=>{
            this.setState({ noUser : !res})  
        })
    }

    render(){
        return (
            <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                <div className="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <Link className="nav-link" to="/">
                                DOST WALLET
                            </Link>
                        </li>
                    </ul>
                </div>
               
                    <div className="navbar-collapse collapse w-100 order-3 dual-collapse2">
                    <ul className="navbar-nav ml-auto">
                            
                        {this.state.noUser && (   
                            <React.Fragment>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/create-wallet">
                                        Create Wallet
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/recover-wallet">
                                            Recover Wallet
                                        </Link>
                                </li>
                                    
                                <li className="nav-item">
                                    <Link className="nav-link" to="/friends">
                                    Friends
                                    </Link>
                                </li>
                            </React.Fragment>
                         )} 

                        {!this.state.noUser && (   
                            <li className="nav-item">
                                    <Link className="nav-link" to="/create-wallet">
                                    QR
                                    </Link>
                            </li>
                        )}
                    </ul>
                </div>
            </nav>
        )
    }

}

    

export default Header;
