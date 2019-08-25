import React, {Component} from 'react';

class TokenHeader extends Component {
  constructor(props) {
    super(props);
  }

  showButtons(){
    return <div>
            <button className='btn btn-primary' style={{backgroundColor: 'rgb(52, 68, 91)', borderColor: '#4e5d71' }} onClick={() => {this.props.showSend(this.props.tokenName, this.props.totalBalance, this.props.tokenInfo)}} >Send</button>
            
          </div>
  }

  render() {
    return (
      <div className="row mt-3" style={{border: '1px solid rgba(0,0,0,.125)', borderRadius: '6px', backgroundColor:'#fff', boxShadow: 'rgba(0, 0, 0, 0.25) 0px 5px 15px'}}>
        <div className="col-3">
          <div
            className='font-weight-bold'
            style={{
              
              height: '60px',
              color: '#4e5d71',
              paddingRight: '20px',
              paddingTop: '20px',
            }}>
            {this.props.tokenName}
          </div>
        </div>
        <div className="col-6" style={{textAlign: 'right'}}>
          <div
            style={{              
              height: '60px',
              color: '#4e5d71',
              paddingRight: '20px', paddingTop: '12px'              
            }}>
                
            {this.showButtons()}
        
          </div>
        </div>
        <div className="col-3" style={{textAlign: 'right'}}>
          <div
            style={{              
              height: '60px',
              color: '#4e5d71',
              paddingRight: '20px',
              paddingTop: '20px'
            }}>
            {this.props.totalBalance}
          </div>
        </div>
      </div>
    );
  }
}

export default TokenHeader;
