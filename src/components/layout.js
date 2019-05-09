import React from 'react';
import Header from './header';

class Layout extends React.Component {
  render() {
    const { children } = this.props
    
    return (
      <div className="root">
        <Header></Header>
        <div
          style={{
            marginLeft: `auto`,
            marginRight: `auto`,
            maxWidth: `920px`,
            padding: `16px 32px`,
          }}
        >
          <div style={{textAlign: 'center', marginBottom: '32px'}}>
            <h1>Class101 기술 블로그</h1>
          </div>
          
          <main style={{ paddingBottom: '32px'} }>{children}</main>
          <footer>
            © {new Date().getFullYear()}, Built with
            {` `}
            <a href="https://www.gatsbyjs.org">Gatsby</a>
          </footer>
        </div>
      </div>
    )
  }
}

export default Layout
