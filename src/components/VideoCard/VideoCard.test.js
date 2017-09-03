import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom'
import VideoCard from './';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const mockVideo = {
      description: 'mock description',
      ratings : [2,3,4,3,2]
  }
  ReactDOM.render(<MemoryRouter><VideoCard video={mockVideo}/></MemoryRouter>, div);
});
