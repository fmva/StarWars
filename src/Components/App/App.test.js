import App from './App';
import Server from '../../Utils/Server';
import { shallow } from 'enzyme/build';
import React from 'react';
import AppStubs from '../../Stubs/AppStubs';

describe('App', () => {
  beforeAll(() => {});

  it('Компонент App с входными данными для актеров', async () => {
    Server.fetch = jest.fn();
    Server.fetch.mockReturnValue(AppStubs.fetchValue);

    const wrapper = shallow(<App namePage={AppStubs.namePage} />, {
      disableLifecycleMethods: true
    });
    wrapper.instance().scrollableDiv = AppStubs.scrollableDiv;

    wrapper.update();

    await wrapper.instance().componentDidMount();
    expect(wrapper).toMatchSnapshot();

    expect(wrapper.state('subjectList').length).toBe(2);
    expect(wrapper.state('subjectList')[0].name).toBe('Luke Skywalker');
    expect(wrapper.state('subjectList')[1].name).toBe('C-3PO');

    expect(wrapper.state('filter').length).toBe(3);
    expect(wrapper.state('filter')[0].title).toBe('Hairs');
    expect(wrapper.state('filter')[1].title).toBe('Birth year');
    expect(wrapper.state('filter')[2].title).toBe('Eye color');

    expect(wrapper.state('details').length).toBe(8);
    expect(wrapper.state('details')[0].title).toBe('Name');
    expect(wrapper.state('details')[1].title).toBe('Birth year');
    expect(wrapper.state('details')[2].title).toBe('Eye color');
    expect(wrapper.state('details')[3].title).toBe('Gender');
    expect(wrapper.state('details')[4].title).toBe('Hairs');
    expect(wrapper.state('details')[5].title).toBe('Height (cm)');
    expect(wrapper.state('details')[6].title).toBe('Mass (kg)');
    expect(wrapper.state('details')[7].title).toBe('Skin');

    expect(wrapper.state('nextPage')).toBe('https://swapi.co/api/people/?page=2');
    expect(wrapper.state('titleSubject')).toBe('People');
    expect(wrapper.state('titleSubjectField')).toBe('name');

    Server.fetch.mockReset();
  });

  it(
    'Если пользователь нажал на иконку открыть/закрыть меню (мобильные устройства), ' +
      'тогда необходимо изменить параметр isDrawerMenu',
    async () => {
      const wrapper = shallow(<App namePage={AppStubs.namePage} />, {
        disableLifecycleMethods: true
      });
      wrapper.instance().loadData = jest.fn();

      wrapper.setState(Object.assign({}, AppStubs.defaultState));
      await wrapper.instance().componentDidMount();

      wrapper.find('Header').prop('onClickMenu')();
      expect(wrapper.state('isDrawerMenu')).toBeTruthy();

      wrapper.instance().loadData.mockReset();
    }
  );

  it(
    'Если пользователь нажал на заголовок фильтра (мобильные устройства), ' +
      'тогда необходимо изменить параметр isMobileShowFilter',
    async () => {
      const wrapper = shallow(<App namePage={AppStubs.namePage} />, {
        disableLifecycleMethods: true
      });
      wrapper.instance().loadData = jest.fn();

      wrapper.setState(Object.assign({}, AppStubs.defaultState));
      await wrapper.instance().componentDidMount();

      wrapper.find('Filter').prop('onClickMobileHeader')();
      expect(wrapper.state('isMobileShowFilter')).toBeTruthy();

      wrapper.instance().loadData.mockReset();
    }
  );

  it(
    'Если пользователь нажал на кнопку применить фильтр, ' +
      'тогда необходимо применить фильтр к данным',
    async () => {
      const wrapper = shallow(<App namePage={AppStubs.namePage} />, {
        disableLifecycleMethods: true
      });
      wrapper.instance().scrollableDiv = AppStubs.scrollableDiv;
      wrapper.instance().loadData = jest.fn();

      const filter = AppStubs.filter;
      filter[2].value = 'blue';

      wrapper.setState(
        Object.assign({}, AppStubs.defaultState, {
          subjectList: [],
          filter: filter
        })
      );

      Server.fetch = jest.fn();
      Server.fetch.mockReturnValue(AppStubs.fetchFilterValue);

      await wrapper.instance().componentDidMount();

      await wrapper.find('Filter').prop('onClickAdmit')();

      expect(wrapper.state('subjectList').length).toBe(2);
      expect(wrapper.state('subjectList')[0].name).toBe('Owen Lars');
      expect(wrapper.state('subjectList')[0].eye_color).toBe('blue');
      expect(wrapper.state('subjectList')[1].name).toBe('Beru Whitesun lars');
      expect(wrapper.state('subjectList')[1].eye_color).toBe('blue');

      wrapper.instance().loadData.mockReset();
      Server.fetch.mockReset();
    }
  );

  it(
    'Если пользователь нажал на кнопку отменить фильтр, ' +
      'тогда необходимо вернуть прежние данные',
    async () => {
      const wrapper = shallow(<App namePage={AppStubs.namePage} />, {
        disableLifecycleMethods: true
      });
      wrapper.instance().scrollableDiv = AppStubs.scrollableDiv;
      wrapper.instance().loadData = jest.fn();

      const filter = AppStubs.filter;
      filter[2].value = 'blue';

      wrapper.setState(
        Object.assign({}, AppStubs.defaultState, {
          subjectList: [],
          filter: filter,
          filterAdmitted: filter
        })
      );

      Server.fetch = jest.fn();
      Server.fetch.mockReturnValue(AppStubs.fetchFilterValue);

      await wrapper.instance().componentDidMount();

      await wrapper.find('Filter').prop('onClickReset')();

      expect(wrapper.state('subjectList').length).toBe(3);
      expect(wrapper.state('subjectList')[0].name).toBe('Owen Lars');
      expect(wrapper.state('subjectList')[0].eye_color).toBe('blue');
      expect(wrapper.state('subjectList')[1].name).toBe('Beru Whitesun lars');
      expect(wrapper.state('subjectList')[1].eye_color).toBe('blue');
      expect(wrapper.state('subjectList')[2].name).toBe('R5-D4');
      expect(wrapper.state('subjectList')[2].eye_color).toBe('red');

      wrapper.instance().loadData.mockReset();
      Server.fetch.mockReset();
    }
  );

  it(
    'Если пользователь ввел данные в поисковую строку, ' +
      'тогда необходимо вернуть данные с сервера',
    async () => {
      const wrapper = shallow(<App namePage={AppStubs.namePage} />, {
        disableLifecycleMethods: true
      });
      wrapper.instance().scrollableDiv = AppStubs.scrollableDiv;
      wrapper.instance().loadData = jest.fn();

      const filter = AppStubs.filter;
      const evt = AppStubs.evt;

      wrapper.setState(
        Object.assign({}, AppStubs.defaultState, {
          subjectList: AppStubs.fetchValue.data.results,
          filter: filter
        })
      );

      Server.fetch = jest.fn();
      Server.fetch.mockReturnValue(AppStubs.fetchFilterValue);

      await wrapper.instance().componentDidMount();

      await wrapper.find('SubjectsList').prop('onChangeSearch')(evt);

      expect(wrapper.state('subjectList').length).toBe(3);
      expect(wrapper.state('subjectList')[0].name).toBe('Owen Lars');
      expect(wrapper.state('subjectList')[0].eye_color).toBe('blue');
      expect(wrapper.state('subjectList')[1].name).toBe('Beru Whitesun lars');
      expect(wrapper.state('subjectList')[1].eye_color).toBe('blue');
      expect(wrapper.state('subjectList')[2].name).toBe('R5-D4');
      expect(wrapper.state('subjectList')[2].eye_color).toBe('red');

      wrapper.instance().loadData.mockReset();
      Server.fetch.mockReset();
    }
  );

  it(
    'Если пользователь выполняет пагинацию, ' + 'тогда необходимо добавить данные к текущим данным',
    async () => {
      const wrapper = shallow(<App namePage={AppStubs.namePage} />, {
        disableLifecycleMethods: true
      });
      wrapper.instance().scrollableDiv = AppStubs.scrollableDiv;
      wrapper.instance().loadData = jest.fn();

      const filter = AppStubs.filter;

      wrapper.setState(
        Object.assign({}, AppStubs.defaultState, {
          nextPage: AppStubs.fetchValue.data.next,
          subjectList: AppStubs.fetchValue.data.results,
          filter: filter,
          filterAdmitted: filter
        })
      );

      Server.fetch = jest.fn();
      Server.fetch.mockReturnValue(AppStubs.fetchFilterValue);

      await wrapper.instance().componentDidMount();

      await wrapper.find('SubjectsList').prop('onPagination')();

      expect(wrapper.state('subjectList').length).toBe(5);
      expect(wrapper.state('subjectList')[0].name).toBe('Luke Skywalker');
      expect(wrapper.state('subjectList')[0].eye_color).toBe('blue');
      expect(wrapper.state('subjectList')[1].name).toBe('C-3PO');
      expect(wrapper.state('subjectList')[1].eye_color).toBe('yellow');
      expect(wrapper.state('subjectList')[2].name).toBe('Owen Lars');
      expect(wrapper.state('subjectList')[2].eye_color).toBe('blue');
      expect(wrapper.state('subjectList')[3].name).toBe('Beru Whitesun lars');
      expect(wrapper.state('subjectList')[3].eye_color).toBe('blue');
      expect(wrapper.state('subjectList')[4].name).toBe('R5-D4');
      expect(wrapper.state('subjectList')[4].eye_color).toBe('red');

      wrapper.instance().loadData.mockReset();
      Server.fetch.mockReset();
    }
  );

  it(
    'Если пользователь выполняет пагинацию, и при этом установлен фильтр, ' +
      'тогда необходимо добавить данные к текущим данным с учетом фильтра',
    async () => {
      const wrapper = shallow(<App namePage={AppStubs.namePage} />, {
        disableLifecycleMethods: true
      });
      wrapper.instance().scrollableDiv = AppStubs.scrollableDiv;
      wrapper.instance().loadData = jest.fn();

      const filter = AppStubs.filter;
      filter[2].value = 'blue';

      wrapper.setState(
        Object.assign({}, AppStubs.defaultState, {
          nextPage: AppStubs.fetchValue.data.next,
          subjectList: AppStubs.fetchValue.data.results,
          filter: filter,
          filterAdmitted: filter
        })
      );

      Server.fetch = jest.fn();
      Server.fetch.mockReturnValue(AppStubs.fetchFilterValue);

      await wrapper.instance().componentDidMount();

      await wrapper.find('SubjectsList').prop('onPagination')();

      expect(wrapper.state('subjectList').length).toBe(4);
      expect(wrapper.state('subjectList')[0].name).toBe('Luke Skywalker');
      expect(wrapper.state('subjectList')[0].eye_color).toBe('blue');
      expect(wrapper.state('subjectList')[1].name).toBe('C-3PO');
      expect(wrapper.state('subjectList')[1].eye_color).toBe('yellow');
      expect(wrapper.state('subjectList')[2].name).toBe('Owen Lars');
      expect(wrapper.state('subjectList')[2].eye_color).toBe('blue');
      expect(wrapper.state('subjectList')[3].name).toBe('Beru Whitesun lars');
      expect(wrapper.state('subjectList')[3].eye_color).toBe('blue');

      wrapper.instance().loadData.mockReset();
      Server.fetch.mockReset();
    }
  );

  it(
    'Если пользователь выбрал список для просмотра деталей, ' +
      'тогда необходимо сформировать данные для этого',
    async () => {
      const wrapper = shallow(<App namePage={AppStubs.namePage} />, {
        disableLifecycleMethods: true
      });
      wrapper.instance().loadData = jest.fn();

      wrapper.setState(
        Object.assign({}, AppStubs.defaultState, {
          nextPage: AppStubs.fetchValue.data.next,
          subjectList: AppStubs.fetchValue.data.results,
          details: AppStubs.detail
        })
      );

      await wrapper.instance().componentDidMount();

      await wrapper.find('SubjectsList').prop('onClickItem')(0);

      expect(wrapper.state('modalDetails').length).toBe(2);
      expect(wrapper.state('modalDetails')[0][0].title).toBe('name_title');
      expect(wrapper.state('modalDetails')[0][0].value).toBe('Luke Skywalker');
      expect(wrapper.state('modalDetails')[0][1].title).toBe('birth_year_title');
      expect(wrapper.state('modalDetails')[0][1].value).toBe('19BBY');
      expect(wrapper.state('modalDetails')[1][0].title).toBe('eye_color_title');
      expect(wrapper.state('modalDetails')[1][0].value).toBe('blue');

      wrapper.instance().loadData.mockReset();
      //Server.fetch.mockReset();
    }
  );
});
