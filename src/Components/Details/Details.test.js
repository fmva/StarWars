import Details from './Details';
import { shallow, mount } from 'enzyme';
import React from 'react';

const details = [
  [{ title: 'title 1', value: 'value 1' }, { title: 'title 2', value: 'value 2' }],
  [{ title: 'title 3', value: 'value 3' }, { title: 'title 4', value: 'value 4' }]
];
const mockOnClose = jest.fn();

describe('Details', () => {
  it('Компонент Details с входными данными по какой-либо сущности', () => {
    const wrapper = shallow(<Details details={details} onClose={mockOnClose} />);
    expect(wrapper).toMatchSnapshot();

    expect(wrapper.find('.detail-main li').length).toBe(2);
    expect(wrapper.find('.detail-title').length).toBe(4);

    expect(
      wrapper
        .find('.detail-title')
        .at(0)
        .text()
    ).toBe('title 1');
    expect(
      wrapper
        .find('.detail-title')
        .at(1)
        .text()
    ).toBe('title 2');
    expect(
      wrapper
        .find('.detail-title')
        .at(2)
        .text()
    ).toBe('title 3');
    expect(
      wrapper
        .find('.detail-title')
        .at(3)
        .text()
    ).toBe('title 4');

    expect(wrapper.find('.detail-value').length).toBe(4);
    expect(
      wrapper
        .find('.detail-value')
        .at(0)
        .text()
    ).toBe('value 1');
    expect(
      wrapper
        .find('.detail-value')
        .at(1)
        .text()
    ).toBe('value 2');
    expect(
      wrapper
        .find('.detail-value')
        .at(2)
        .text()
    ).toBe('value 3');
    expect(
      wrapper
        .find('.detail-value')
        .at(3)
        .text()
    ).toBe('value 4');
  });
});

it('При клике на кнопку ОК должно сработать событие onClose', () => {
  const wrapper = mount(<Details details={details} onClose={mockOnClose} />);
  expect(wrapper).toMatchSnapshot();

  wrapper.find('button.ant-modal-close').simulate('click');
  expect(mockOnClose.mock.calls.length).toBe(1);
});
