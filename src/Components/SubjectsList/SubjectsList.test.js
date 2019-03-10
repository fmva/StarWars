import SubjectsList from './SubjectsList';
import { shallow, mount } from 'enzyme';
import React from 'react';

const subjects = [
  {
    name: 'Luke Skywalker',
    height: '172',
    mass: '77',
    hair_color: 'blond',
    skin_color: 'fair',
    eye_color: 'blue',
    birth_year: '19BBY',
    gender: 'male'
  },
  {
    name: 'C-3PO',
    height: '167',
    mass: '75',
    hair_color: 'n/a',
    skin_color: 'gold',
    eye_color: 'yellow',
    birth_year: '112BBY',
    gender: 'n/a'
  }
];
let wrapper;
const titleSubjectField = 'name';
const title = 'People';
const onChangeSearch = jest.fn();
const setPaginationDiv = jest.fn();
const onPagination = jest.fn();
const onClickItem = jest.fn();
const onResetSearchValue = jest.fn();

describe('SubjectsList', () => {
  beforeAll(() => {
    wrapper = mount(
      <SubjectsList
        subjects={subjects}
        titleSubjectField={titleSubjectField}
        title={title}
        isPaginationButton={true}
        searchValue={'test'}
        onChangeSearch={onChangeSearch}
        setPaginationDiv={setPaginationDiv}
        onPagination={onPagination}
        onClickItem={onClickItem}
        onResetSearchValue={onResetSearchValue}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('Компонент SubjectsList с входными данными', () => {
    expect(wrapper.find('.list-subjects a').length).toBe(2);

    expect(
      wrapper
        .find('.list-subjects a')
        .at(0)
        .text()
    ).toBe('Luke Skywalker');
    expect(
      wrapper
        .find('.list-subjects a')
        .at(1)
        .text()
    ).toBe('C-3PO');
  });

  it(
    'Допустим пользователь вводит данные в поисковое поле, ' +
      'тогда должно сработать событие onChangeSearch',
    () => {
      wrapper.find('Input.search-input input.ant-input').simulate('change');
      expect(onChangeSearch.mock.calls.length).toBe(1);
    }
  );

  it(
    'Допустим пользователь нажимает на пункт списка, ' +
      'тогда должно сработать событие onClickItem',
    () => {
      wrapper
        .find('.list-subjects a')
        .at(0)
        .simulate('click');
      expect(onClickItem.mock.calls.length).toBe(1);
      wrapper
        .find('.list-subjects a')
        .at(1)
        .simulate('click');
      expect(onClickItem.mock.calls.length).toBe(2);
    }
  );

  it(
    'Допустим пользователь нажимает иконку очистки поискового поля, ' +
      'тогда должно сработать событие onResetSearchValue',
    () => {
      wrapper.find('Icon.search-input-icon i.search-input-icon').simulate('click');
      expect(onResetSearchValue.mock.calls.length).toBe(1);
    }
  );

  it('При формировании компонента, ' + 'должно сработать событие setPaginationDiv', () => {
    expect(setPaginationDiv.mock.calls.length).toBe(1);
  });
});
