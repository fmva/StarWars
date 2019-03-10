import React, { Component } from 'react';
import './App.less';
import PropTypes from 'prop-types';
import Server from '../../Utils/Server';
import MenuList from '../../Resources/Menu';
import AppData from '../../Resources/AppData';
import Resources from '../../Resources/Resources';
import Settings from '../../Resources/Settings';
import Header from '../Header/Header';
import SubjectsList from '../SubjectsList/SubjectsList';
import Filter from '../Filter/Filter';
import Details from '../Details/Details';
import Mobile from '../../Utils/Mobile';
import Utils from '../../Utils/Utils';
import { Spin, Modal } from 'antd';

const defaultState = {
  loading: false,
  errorMessage: '',
  isDrawerMenu: false,
  isMobileShowFilter: false,
  filter: [],
  filterAdmitted: [],
  subjectList: [],
  titleSubjectField: '',
  titleSubject: '',
  isPaginationButton: false,
  nextPage: null,
  details: [],
  modalDetails: [],
  searchValue: ''
};

let timeoutPrinting = null;

class App extends Component {
  static propTypes = {
    /** name of page */
    namePage: PropTypes.string
  };

  constructor(props) {
    super(props);
    this.state = defaultState;

    this.showDrawerMenu = this.showDrawerMenu.bind(this);
    this.mobileShowFilter = this.mobileShowFilter.bind(this);
    this.admitFilter = this.admitFilter.bind(this);
    this.resetFilter = this.resetFilter.bind(this);
    this.saveFilterData = this.saveFilterData.bind(this);
    this.search = this.search.bind(this);
    this.setPaginationDiv = this.setPaginationDiv.bind(this);
    this.paginationData = this.paginationData.bind(this);
    this.showDetails = this.showDetails.bind(this);
    this.resetSearchValue = this.resetSearchValue.bind(this);
    this.error = this.error.bind(this);
  }

  async componentDidUpdate(prevProps) {
    if (this.props.namePage !== prevProps.namePage) {
      await this.setState({ isDrawerMenu: false });
      await this.loadData(this.props.namePage);
    }
  }

  async componentDidMount() {
    await this.loadData(this.props.namePage);
  }

  /**
   * fetch data from server
   * @param {String} url - url name
   */
  async fetch(url) {
    const result = await Server.fetch(url);

    if (result.error.status) {
      await this.setState({ errorMessage: result.error.text });
      this.error();
    }
    return result;
  }

  /**
   * create new array filter
   * @param {String} filterObject - object with filter property
   */
  createNewFilter(filterObject) {
    return filterObject.filter.map(item => {
      return Object.assign({}, item);
    });
  }

  /**
   * get data from REST API and set state
   * @param {String} namePage - name of page
   */
  async loadData(namePage) {
    this.setState({ loading: true });
    this.scrollableDiv.current.scrollTop = 0;
    const result = await this.fetch(AppData[namePage].path);

    if (result.error.status) {
      await this.setState(defaultState);
      return;
    }

    const state = Object.assign(defaultState, {
      loading: false,
      filter: this.createNewFilter(AppData[namePage]),
      filterAdmitted: this.createNewFilter(AppData[namePage]),
      subjectList: result.data.results,
      details: AppData[namePage].details,
      titleSubjectField: AppData[namePage].titleSubjectField,
      titleSubject: AppData[namePage].title,
      nextPage: result.data.next
    });

    await this.setState(state);
    await this.setState({
      isPaginationButton: this.isPaginationButtonShow(!!result.data.next)
    });
  }

  /**
   * is show/hide pagination button
   * @param {Boolean} isShow - show/hide param
   */
  isPaginationButtonShow(isShow) {
    const offsetHeight = this.scrollableDiv.current.offsetHeight;
    const scrollHeight = this.scrollableDiv.current.scrollHeight;

    if (!isShow) {
      return false;
    }

    return scrollHeight <= offsetHeight + Settings.getSettings('scrollOffset');
  }

  /**
   * save div with pagination
   * @param {Object} scrollableDiv - scrollable div
   */
  setPaginationDiv(scrollableDiv) {
    this.scrollableDiv = scrollableDiv;
  }

  /**
   * show/hide drawer menu
   */
  showDrawerMenu() {
    this.setState({ isDrawerMenu: !this.state.isDrawerMenu });
  }

  /**
   * show/hide filter fields for mobile version
   */
  async mobileShowFilter() {
    if (!Utils.isEqualAdmittedFilter(this.state.filter, this.state.filterAdmitted)) {
      await this.admitFilter();
    } else {
      this.setState({ isMobileShowFilter: !this.state.isMobileShowFilter });
    }
  }

  /**
   * handler admit button
   */
  async admitFilter() {
    await this.setState({
      loading: true
    });
    const listFiltered = await this.getFilterData('');

    await this.setState({
      filterAdmitted: this.createNewFilter(this.state),
      subjectList: listFiltered.data.results,
      nextPage: listFiltered.data.next,
      isMobileShowFilter: Mobile.mobileCheck()
        ? !this.state.isMobileShowFilter
        : this.state.isMobileShowFilter
    });
    await this.setState({
      isPaginationButton:
        listFiltered.data.results.length > 0 &&
        this.isPaginationButtonShow(!!listFiltered.data.next),
      loading: false
    });
  }

  /**
   * handler reset button
   */
  async resetFilter() {
    const filter = this.createNewFilter(AppData[this.props.namePage]);

    if (
      !this.state.filterAdmitted.some(item => {
        return item.value !== '';
      })
    ) {
      await this.setState({
        filter: filter,
        filterAdmitted: this.createNewFilter(AppData[this.props.namePage])
      });
      return;
    }

    await this.setState({
      loading: true,
      filter: filter
    });

    const listFiltered = await this.getFilterData('');

    this.setState({
      filterAdmitted: this.createNewFilter(this.state),
      subjectList: listFiltered.data.results,
      nextPage: listFiltered.data.next
    });
    await this.setState({
      isPaginationButton:
        listFiltered.data.results.length > 0 &&
        this.isPaginationButtonShow(!!listFiltered.data.next),
      loading: false
    });
  }

  /**
   * filter data
   * @param {Array} arr - array of main data
   * @param {Array} filterDescription - array of filter datd
   */
  filterListArray(arr, filterDescription) {
    return arr.filter(itemSubject => {
      return filterDescription.every(itemFilter => {
        return (
          itemSubject[itemFilter.name] &&
          itemSubject[itemFilter.name].toString().includes(itemFilter.value.trim())
        );
      });
    });
  }

  /**
   * take data from server and filtering their
   * @param {String} nextPage - url for nest request
   */
  async getFilterData(nextPage) {
    let localSubjects = [];
    let localNextPage = nextPage
      ? nextPage
      : this.state.searchValue !== undefined && this.state.searchValue !== null
      ? this.getSearchUrl()
      : AppData[this.props.namePage].path;

    while (localSubjects.length < Settings.getSettings('countSubjectItems') && localNextPage) {
      const result = await this.fetch(localNextPage);
      if (result.error.status) {
        await this.setState({ loading: false });
        return;
      }
      localSubjects = localSubjects.concat(
        this.filterListArray(result.data.results, this.state.filter)
      );
      localNextPage = result.data.next;
    }

    return {
      data: {
        results: localSubjects.slice(0, Settings.getSettings('countSubjectItems')),
        next: localNextPage
      }
    };
  }

  /**
   * handler for changing data in a fields
   * @param {Number} id - id of filter array
   * @param {String} value - value of filter field
   */
  saveFilterData(id, value) {
    const filter = this.createNewFilter(this.state);

    filter[id].value = value;
    this.setState({ filter: filter });
  }

  /**
   * get url with search value
   */
  getSearchUrl() {
    const namePage = this.props.namePage;
    const value = this.state.searchValue;

    return AppData[namePage].path + '?' + Settings.getSettings('search') + '=' + value;
  }

  /**
   * request when user scroll down or click button pagination
   */
  async paginationData() {
    if (!this.state.nextPage) {
      return;
    }

    this.scrollableDiv.current.scrollTop =
      this.scrollableDiv.current.scrollHeight - Settings.getSettings('scrollOffset');
    const isNewList = Utils.isEqualAdmittedFilter(this.state.filter, this.state.filterAdmitted)
      ? false
      : true;
    await this.requestItemData(isNewList, Settings.getSettings('timeoutPagination'));
  }

  /**
   * handler for search field
   * @param {Object} evt - object of field
   */
  async search(evt) {
    const value = evt.target.value;

    await this.setState({ searchValue: value });
    await this.requestItemData(true, Settings.getSettings('timeoutPrinting'));
  }

  /**
   * request data for pagination and search
   * @param {Boolean} isNewList - add list to current values or render new list
   * @param {Number} timeout - timeout ms, default 0
   */
  async requestItemData(isNewList, timeout = 0) {
    const url = isNewList ? this.getSearchUrl() : this.state.nextPage;

    clearTimeout(timeoutPrinting);
    return new Promise(resolve => {
      timeoutPrinting = setTimeout(async () => {
        this.setState({ loading: true });

        const result = await this.getFilterData(url);

        const subjectList = isNewList
          ? result.data.results
          : this.state.subjectList.concat(result.data.results);

        await this.setState({
          filterAdmitted: this.createNewFilter(this.state),
          subjectList: subjectList,
          nextPage: result.data.next
        });
        await this.setState({
          isPaginationButton: this.isPaginationButtonShow(!!result.data.next)
        });
        await this.setState({ loading: false });
        resolve();
      }, timeout);
    });
  }

  /**
   * show details for item
   * @param {Number} index - index of item
   */
  showDetails(index) {
    const subjectList = this.state.subjectList;
    let arrColumns = [];
    let cnt = 0;

    if (index === undefined || index === null) {
      this.setState({ modalDetails: [] });
      return;
    }

    const modalDetails = this.state.details
      .map((item, key) => {
        if (cnt === 0) {
          arrColumns = [];
        }
        if (subjectList[index][item.name]) {
          arrColumns.push({
            title: item.title,
            value: subjectList[index][item.name]
          });
          cnt++;
        }

        if (
          cnt === Settings.getSettings('countDetailColumns') ||
          key === this.state.details.length - 1
        ) {
          cnt = 0;
          return arrColumns;
        }
        return null;
      })
      .filter(item => {
        return item && item.length > 0;
      });

    this.setState({ modalDetails: modalDetails });
  }

  /**
   * reset search value
   */
  async resetSearchValue() {
    await this.setState({ searchValue: '' });
    await this.requestItemData(true, Settings.getSettings('timeoutPrinting'));
  }

  /**
   * error modal window
   */
  error() {
    Modal.error({
      title: Resources.getResource('error_message'),
      content: this.state.errorMessage
    });
  }

  render() {
    return (
      <div className="height-100">
        <Header
          menu={MenuList}
          onClickMenu={this.showDrawerMenu}
          isDrawerMenu={this.state.isDrawerMenu}
        />
        <main className="main-menu main-size">
          <Filter
            mobileShowFilter={this.state.isMobileShowFilter}
            onClickMobileHeader={this.mobileShowFilter}
            filterInputs={this.state.filter}
            filterAdmitted={this.state.filterAdmitted}
            onClickAdmit={this.admitFilter}
            onClickReset={this.resetFilter}
            saveFilterData={this.saveFilterData}
          />
          <SubjectsList
            isPaginationButton={this.state.isPaginationButton}
            setPaginationDiv={this.setPaginationDiv}
            onPagination={this.paginationData}
            onClickItem={this.showDetails}
            title={this.state.titleSubject}
            subjects={this.state.subjectList}
            titleSubjectField={this.state.titleSubjectField}
            onChangeSearch={this.search}
            searchValue={this.state.searchValue}
            onResetSearchValue={this.resetSearchValue}
          />
        </main>

        <div className="spin-loading" style={{ display: this.state.loading ? 'block' : 'none' }}>
          <div className="spin-loading-inner">
            <Spin
              tip={Resources.getResource('loading')}
              spinning={this.state.loading}
              size="large"
            />
          </div>
        </div>

        <Details
          details={this.state.modalDetails}
          onClose={() => {
            this.showDetails(null);
          }}
        />
      </div>
    );
  }
}

export default App;
