import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import { store } from '../store';

function renderWithStore(element: any) {
  render(
    <HashRouter>
      <Provider store={store}>{element}</Provider>
    </HashRouter>,
  );
  return { store };
}

it('Should render with store', () => {});

export default renderWithStore;
