import { Component } from 'react';
import React from 'react';
import { Button, Modal } from 'antd';
import './Details.less';
import PropTypes from 'prop-types';
import Resources from '../../Resources/Resources';

class Details extends Component {
  static propTypes = {
    /** array of details */
    details: PropTypes.array,
    /** close modal handler */
    onClose: PropTypes.func
  };

  /**
   * render detail list
   * @param {Array} arr - array of details
   */
  renderDetailList(arr) {
    const listDetail = arr.map((item, key) => (
      <li key={`details_${key}}`} className="detail-row">
        {item.map((itemInner, keyInner) => (
          <div key={`details_column_${keyInner}}`} className="detail-column">
            <span className="detail-title">{itemInner.title}</span>
            <span className="detail-value">{itemInner.value}</span>
          </div>
        ))}
      </li>
    ));
    return <ul className="detail-main">{listDetail}</ul>;
  }

  render() {
    const details = this.props.details && this.props.details.length > 0 ? this.props.details : [];
    const onClose = this.props.onClose ? this.props.onClose : [];
    return (
      <div className="modal-block">
        <Modal
          title={Resources.getResource('details_title')}
          visible={details.length > 0}
          onCancel={onClose}
          footer={[
            <Button key="back" type="primary" onClick={onClose}>
              {Resources.getResource('ok_button')}
            </Button>
          ]}
        >
          {this.renderDetailList(details)}
        </Modal>
      </div>
    );
  }
}

export default Details;
