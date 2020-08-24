import React, { useEffect } from 'react';
import './App.scss';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import ROUTES from '../../constants/routes.constants';
import AucPage from '../AucPage/AucPage';
import TwitchRedirect from '../TwitchRedirect/TwitchRedirect';
import VideoPointsPage from '../VideoPointsPage/VideoPointsPage';
import { connectToServer } from '../../reducers/PubSubSocket/PubSubSocket';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#a6d4fa',
    },
    secondary: {
      main: '#f48fb1',
    },
  },
});

const App: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(connectToServer());
  }, [dispatch]);

  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <Switch>
          <Route exact path={ROUTES.AUC_PAGE}>
            <AucPage />
          </Route>
          <Route path={ROUTES.TWITCH_REDIRECT}>
            <TwitchRedirect />
          </Route>
          <Route path={ROUTES.VIDEO_POINTS_PAGE}>
            <VideoPointsPage />
          </Route>
        </Switch>
      </BrowserRouter>
    </MuiThemeProvider>
  );
};

export default App;
