import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom'
import renderer from 'react-test-renderer'
import { shallow, render } from 'enzyme';
import VideoCard from './';

const mockVideo = {
  description: 'mock description',
  ratings : [2,3,4,3,2]
}

it('renders without crashing', () => {
  const div = document.createElement('div');
  
  ReactDOM.render(<MemoryRouter><VideoCard video={mockVideo}/></MemoryRouter>, div);
});

