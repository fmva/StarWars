import Header from './Header';
import { mount } from 'enzyme';
import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

const menu = [
  {
    path: 'path 1',
    title: 'title 1'
  },
  {
    path: 'path 2',
    title: 'title 2'
  }
];

const onClickMenu = jest.fn();
let wrapper;

describe('Header', () => {
  beforeAll(() => {
    wrapper = mount(
      <BrowserRouter>
        <Route>
          <Header menu={menu} onClickMenu={onClickMenu} />
        </Route>
      </BrowserRouter>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('Компонент Header c входными данными', () => {
    expect(wrapper.find('div.main-size ul.menu-list a').length).toBe(2);

    expect(
      wrapper
        .find('div.main-size ul.menu-list a')
        .at(0)
        .text()
    ).toBe('title 1');
    expect(
      wrapper
        .find('div.main-size ul.menu-list a')
        .at(1)
        .text()
    ).toBe('title 2');

    expect(
      wrapper
        .find('div.main-size ul.menu-list Link')
        .at(0)
        .props().to
    ).toBe('/path 1');
    expect(
      wrapper
        .find('div.main-size ul.menu-list Link')
        .at(1)
        .props().to
    ).toBe('/path 2');
  });

  it(
    'Допустим пользователь нажимает на иконку меню в мобильной версии, ' +
      'тогда должно сработать событие onClickMenu',
    () => {
      wrapper.find('i.icon-bars').simulate('click');
      expect(onClickMenu.mock.calls.length).toBe(1);
    }
  );
});
