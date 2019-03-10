import { Component } from 'react';
import React from 'react';
import { Icon, Input, Button } from 'antd';
import './SubjectsList.less';
import Resources from '../../Resources/Resources';
import Settings from '../../Resources/Settings';
import PropTypes from 'prop-types';

class SubjectsList extends Component {
  static propTypes = {
    /** array of subjects */
    subjects: PropTypes.array,
    /** name of object's field */
    titleSubjectField: PropTypes.string,
    /** title page */
    title: PropTypes.string,
    /** show/hide pagination button */
    isPaginationButton: PropTypes.bool,
    /** search value */
    searchValue: PropTypes.string,
    /** event for search field */
    onChangeSearch: PropTypes.func,
    /** handler to set pagination div */
    setPaginationDiv: PropTypes.func,
    /** pagination handler */
    onPagination: PropTypes.func,
    /** click item handler */
    onClickItem: PropTypes.func,
    /** reset search value */
    onResetSearchValue: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.subjectDiv = React.createRef();

    this.onPaginationScroll = this.onPaginationScroll.bind(this);
  }

  componentDidMount() {
    this.props.setPaginationDiv(this.subjectDiv);
  }

  /**
   * pagination with scroll
   */
  onPaginationScroll() {
    const offsetHeight = this.subjectDiv.current.offsetHeight;
    const scrollHeight = this.subjectDiv.current.scrollHeight;
    const scrollTop = this.subjectDiv.current.scrollTop;
    if (scrollTop + offsetHeight > scrollHeight - Settings.getSettings('scrollOffset')) {
      this.props.onPagination();
    }
  }

  /**
   * render list of title
   * @param {Array} arr - array of subjects
   * @param {String} titleSubjectField - title of field
   * @return {Object}
   */
  renderMenu(arr, titleSubjectField) {
    const listItems = arr.map((item, key) => (
      <li key={`item_list_${key})`}>
        <div>
          <a
            href={`#list_${key}`}
            onClick={() => {
              this.props.onClickItem(key);
            }}
          >
            {item[titleSubjectField]}
          </a>
        </div>
      </li>
    ));

    if (listItems.length === 0) {
      return <div className="list-subjects-none">{Resources.getResource('none_list')}</div>;
    } else {
      return <ul className="list-subjects">{listItems}</ul>;
    }
  }

  render() {
    const subjects =
      this.props.subjects && this.props.subjects.length > 0 ? this.props.subjects : [];
    const titleSubjectField = this.props.titleSubjectField ? this.props.titleSubjectField : null;
    const title = this.props.title ? this.props.title : null;
    const onChangeSearch = this.props.onChangeSearch ? this.props.onChangeSearch : null;
    const isPaginationButton = this.props.isPaginationButton ? this.props.isPaginationButton : null;
    const onPagination = this.props.onPagination ? this.props.onPagination : null;
    const searchValue = this.props.searchValue ? this.props.searchValue : null;
    const onResetSearchValue = this.props.onResetSearchValue ? this.props.onResetSearchValue : null;

    return (
      <div ref={this.subjectDiv} className="list-subject-menu" onScroll={this.onPaginationScroll}>
        <h2>{title}</h2>
        <div className="search-input-block">
          <Input
            className="search-input"
            size="large"
            placeholder={Resources.getResource('search_button')}
            maxLength={60}
            onChange={onChangeSearch}
            value={searchValue}
            suffix={
              searchValue ? (
                <Icon
                  className="search-input-icon"
                  type="close-circle"
                  onClick={onResetSearchValue}
                />
              ) : (
                <span className="search-input-icon" />
              )
            }
          />
        </div>
        {this.renderMenu(subjects, titleSubjectField)}

        <div
          className="pagination-block"
          style={{ display: isPaginationButton ? 'block' : 'none' }}
        >
          <Button
            block
            type="primary"
            icon="down"
            size="large"
            title={Resources.getResource('show_more')}
            onClick={onPagination}
          />
        </div>
      </div>
    );
  }
}

export default SubjectsList;
