import { Component } from 'react';
import React from 'react';
import { Badge, Button, Form, Input, Icon } from 'antd';
import PropTypes from 'prop-types';
import Mobile from '../../Utils/Mobile';
import Resources from '../../Resources/Resources';
import Utils from '../../Utils/Utils';

import './Filter.less';

class Filter extends Component {
  static propTypes = {
    /** show/hide filter fields for mobiles */
    mobileShowFilter: PropTypes.bool,
    /** header filter click handler */
    onClickMobileHeader: PropTypes.func,
    /** data for filter inputs */
    filterInputs: PropTypes.array,
    /** admitted data for filter inputs */
    filterAdmitted: PropTypes.array,
    /** admit button handler*/
    onClickAdmit: PropTypes.func,
    /** save filter input data to state*/
    saveFilterData: PropTypes.func,
    /** reset handler*/
    onClickReset: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.handlerClickFilter = this.handlerClickFilter.bind(this);
    this.handlerFilterChange = this.handlerFilterChange.bind(this);
    this.handlerSubmitForm = this.handlerSubmitForm.bind(this);
    this.countFullInputs = this.countFullInputs.bind(this);
  }

  /**
   * handler for click of header filter
   */
  handlerClickFilter() {
    if (!Mobile.mobileCheck()) {
      return;
    }
    this.props.onClickMobileHeader();
  }

  /**
   * handler for submitting form
   * @param {Object} e
   */
  handlerSubmitForm(e) {
    e.preventDefault();
    this.props.onClickAdmit();
  }

  /**
   * render filter inputs
   * @param {Array} arr - array of inputs
   */
  renderInputs(arr) {
    const listInputs = arr.map((item, key) => (
      <Input
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
        key={key}
        className="filter-input"
        size="large"
        placeholder={item.title}
        name={item.name}
        value={item.value}
        maxLength={60}
        data-id={key}
        onChange={this.handlerFilterChange}
      />
    ));

    return <div>{listInputs}</div>;
  }

  /**
   * check all inputs. If all inputs are empty the function return false
   */
  countFullInputs() {
    const filterInputs =
      this.props.filterInputs && this.props.filterInputs.length > 0 ? this.props.filterInputs : [];

    return filterInputs.reduce((previousValue, currentValue) => {
      return currentValue.value !== '' ? ++previousValue : previousValue;
    }, 0);
  }

  /**
   * handler for change filter
   */
  handlerFilterChange(evt) {
    this.props.saveFilterData(parseInt(evt.target.getAttribute('data-id'), 10), evt.target.value);
  }

  render() {
    const mobileShowFilter = this.props.mobileShowFilter ? this.props.mobileShowFilter : null;
    const filterInputs =
      this.props.filterInputs && this.props.filterInputs.length > 0 ? this.props.filterInputs : [];
    const onClickReset = this.props.onClickReset ? this.props.onClickReset : null;
    const filterAdmitted =
      this.props.filterAdmitted && this.props.filterAdmitted.length > 0
        ? this.props.filterAdmitted
        : [];

    return (
      <aside className={'filter-menu ' + (mobileShowFilter ? 'filter-menu-mobile-open' : '')}>
        <div className="filter-header-block">
          <div className="filter-header-title" onClick={this.handlerClickFilter}>
            <h2 className="filter-header">{Resources.getResource('filter_title')}</h2>
            <span className="phone-visible_inline">
              {mobileShowFilter ? (
                <Icon type="caret-up" theme="filled" />
              ) : (
                <Icon type="caret-down" theme="filled" />
              )}
            </span>
          </div>
          <div
            className={
              'filter-header-reset ' + (this.countFullInputs() === 0 ? '' : 'phone-visible-block')
            }
          >
            <Badge count={this.countFullInputs()}>
              <Button
                type="primary"
                shape="circle"
                icon="close"
                onClick={onClickReset}
                className="filter-button"
              />
            </Badge>
          </div>
        </div>
        <Form
          onSubmit={this.handlerSubmitForm}
          className={'filter-fields ' + (!mobileShowFilter ? 'phone-visible-none' : '')}
        >
          {this.renderInputs(filterInputs)}
          <div className="filter-button-block">
            <Button
              className="filter-button"
              type="primary"
              htmlType="submit"
              disabled={Utils.isEqualAdmittedFilter(filterInputs, filterAdmitted)}
            >
              {Resources.getResource('admit_button')}
            </Button>

            <Button
              onClick={onClickReset}
              className="filter-button phone-visible-inline-none"
              disabled={this.countFullInputs() === 0}
            >
              {Resources.getResource('reset_button')}
            </Button>
          </div>
        </Form>
      </aside>
    );
  }
}

export default Filter;
