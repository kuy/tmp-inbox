import React from 'react';
import { Provider } from 'react-redux';
import App from './containers/App';
import configureStore from './store/configureStore';

$ = jQuery;

const store = configureStore();

$(document).ready(function () {
  React.render(
    <Provider store={store}>
      {() => <App />}
    </Provider>,
    document.getElementById('tmp-inbox-root')
  );
});
