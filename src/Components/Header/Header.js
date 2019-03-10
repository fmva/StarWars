import { Component } from 'react';
import React from 'react';
import { Button, Drawer } from 'antd';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Header.less';
import Logo from './Img/Star-Wars-Logo.png';

class Header extends Component {
  static propTypes = {
    /** list menu*/
    menu: PropTypes.array,
    /** menu click handler */
    onClickMenu: PropTypes.func,
    /** show/hide drawer menu */
    isDrawerMenu: PropTypes.bool
  };

  constructor(props) {
    super(props);
    this.handlerClickMenu = this.handlerClickMenu.bind(this);
  }

  /**
   * render list of menu
   * @param {Array} arr - array of menu
   * @param {String} className - class name of ul element
   * @return {Object}
   */
  renderMenu(arr, className) {
    const listItems = arr.map((item, key) => (
      <li key={key}>
        <div>
          <Link to={`/${item.path}`}>{item.title}</Link>
        </div>
      </li>
    ));

    return <ul className={className}>{listItems}</ul>;
  }

  /**
   * click drawer menu
   */
  handlerClickMenu() {
    this.props.onClickMenu();
  }

  render() {
    const menu = this.props.menu && this.props.menu.length > 0 ? this.props.menu : [];
    const isDrawerMenu = this.props.isDrawerMenu > 0 ? this.props.isDrawerMenu : false;

    return (
      <header>
        <div className="main-size header-menu">
          {this.renderMenu(menu, 'menu-list phone-visible-none')}

          <div className="icon-bars-block phone-visible-block">
            <i className="icon-bars" title="Menu" onClick={this.handlerClickMenu} />
          </div>
          <img className="sw-logo" src={Logo} alt="StarWars" />
        </div>
        <Drawer
          className="list-drawer"
          placement="left"
          closable={false}
          onClose={this.handlerClickMenu}
          visible={isDrawerMenu}
        >
          <div className="menu-close-block">
            <Button
              className="menu-close-icon"
              type="primary"
              icon="arrow-left"
              onClick={this.handlerClickMenu}
            />
          </div>
          {this.renderMenu(menu, 'menu-list-drawer')}
        </Drawer>
      </header>
    );
  }
}

export default Header;
