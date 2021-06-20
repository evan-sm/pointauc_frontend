import React, { useEffect, useState } from 'react';
import { Redirect, useLocation } from 'react-router';
import { useDispatch } from 'react-redux';
import { getQueryValue } from '../../utils/url.utils';
import ROUTES from '../../constants/routes.constants';
import { authenticateDA } from '../../api/twitchApi';
import { QUERIES } from '../../constants/common.constants';
import LoadingPage from '../LoadingPage/LoadingPage';
import { setHasDAAuth } from '../../reducers/User/User';
import withLoading from '../../decorators/withLoading';
import { loadUserData } from '../../reducers/AucSettings/AucSettings';

const DARedirect: React.FC = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [loadingMessage, setLoadingMessage] = useState<string>('Авторизация...');

  useEffect(() => {
    const code = getQueryValue(location.search, QUERIES.CODE);

    if (code) {
      authenticateDA(code).then(() => {
        setLoadingMessage('Загрузка аккаунта...');
        dispatch(setHasDAAuth(true));
        return dispatch(withLoading(setIsLoading, loadUserData));
      });
    }
  }, [dispatch, location]);

  return isLoading ? <LoadingPage helpText={loadingMessage} /> : <Redirect to={ROUTES.INTEGRATION} />;
};

export default DARedirect;
