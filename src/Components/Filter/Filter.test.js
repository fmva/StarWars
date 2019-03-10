import Filter from './Filter';
import React from 'react';
import { shallow, mount } from 'enzyme/build';
import Mobile from '../../Utils/Mobile';

const filter = [
  {
    title: 'title 1',
    value: '',
    name: 'cost_in_credits'
  },
  {
    title: 'title 2',
    value: '',
    name: 'manufacturer'
  },
  {
    title: 'title 3',
    value: 'value 3',
    name: 'starship_class'
  }
];

const filterAdmitted = [
  {
    title: 'title 1',
    value: '',
    name: 'cost_in_credits'
  },
  {
    title: 'title 2',
    value: '',
    name: 'manufacturer'
  },
  {
    title: 'title 3',
    value: 'value 3',
    name: 'starship_class'
  }
];

const onClickMobileHeader = jest.fn();
const onClickAdmit = jest.fn();
const onClickReset = jest.fn();
const saveFilterData = jest.fn();

let wrapper;

describe('Filter', () => {
  beforeAll(() => {
    wrapper = mount(
      <Filter
        mobileShowFilter={false}
        onClickMobileHeader={onClickMobileHeader}
        filterInputs={filter}
        filterAdmitted={filterAdmitted}
        onClickAdmit={onClickAdmit}
        onClickReset={onClickReset}
        saveFilterData={saveFilterData}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('Компонент Filter c входными данными', () => {
    const wrapperShallow = shallow(
      <Filter
        mobileShowFilter={false}
        onClickMobileHeader={onClickMobileHeader}
        filterInputs={filter}
        filterAdmitted={filterAdmitted}
        onClickAdmit={onClickAdmit}
        onClickReset={onClickReset}
        saveFilterData={saveFilterData}
      />
    );
    expect(wrapperShallow).toMatchSnapshot();

    expect(wrapperShallow.find('Form.filter-fields Input').length).toBe(3);

    expect(
      wrapperShallow
        .find('Form.filter-fields Input')
        .at(0)
        .props().placeholder
    ).toBe('title 1');
    expect(
      wrapperShallow
        .find('Form.filter-fields Input')
        .at(1)
        .props().placeholder
    ).toBe('title 2');
    expect(
      wrapperShallow
        .find('Form.filter-fields Input')
        .at(2)
        .props().placeholder
    ).toBe('title 3');
    expect(
      wrapperShallow
        .find('Form.filter-fields Input')
        .at(2)
        .props().value
    ).toBe('value 3');
  });

  it(
    'Допустим пользователь нажимает на заголовок в мобильном телефоне, ' +
      'должно сработать событие onClickMobileHeader',
    () => {
      Mobile.mobileCheck = jest.fn();
      Mobile.mobileCheck.mockReturnValue(true);

      wrapper.find('div.filter-header-title').simulate('click');
      expect(onClickMobileHeader.mock.calls.length).toBe(1);

      Mobile.mobileCheck.mockReset();
      onClickMobileHeader.mockClear();
    }
  );

  it(
    'Допустим пользователь нажимает на заголовок в десктопном приложении, ' +
      'событие onClickMobileHeader не должно сработать',
    () => {
      Mobile.mobileCheck = jest.fn();
      Mobile.mobileCheck.mockReturnValue(false);

      wrapper.find('div.filter-header-title').simulate('click');
      expect(onClickMobileHeader.mock.calls.length).toBe(0);

      Mobile.mobileCheck.mockReset();
      onClickMobileHeader.mockClear();
    }
  );

  it(
    'Допустим пользователь нажимает на кнопку применить фильтр, ' +
      'событие onClickAdmit должно сработать',
    () => {
      wrapper.find('form.filter-fields').simulate('submit');
      expect(onClickAdmit.mock.calls.length).toBe(1);

      onClickAdmit.mockClear();
    }
  );

  it(
    'Допустим пользователь нажимает на кнопку отменить фильтр, ' +
      'событие onClickReset должно сработать',
    () => {
      wrapper
        .find('div.filter-button-block button')
        .at(1)
        .simulate('click');
      expect(onClickReset.mock.calls.length).toBe(1);

      onClickReset.mockClear();
    }
  );

  it(
    'Допустим пользователь вводит данные в поля формы, ' +
      'событие saveFilterData должно сработать',
    () => {
      wrapper
        .find('form.filter-fields input')
        .at(0)
        .simulate('change');
      expect(saveFilterData.mock.calls.length).toBe(1);

      saveFilterData.mockClear();
    }
  );
});
