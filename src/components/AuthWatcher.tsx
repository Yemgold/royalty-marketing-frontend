import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { UserState } from '../constants/types';
import { useEffect } from 'react';
import { checkTokenExpiration } from '../hooks/authChecker';

const AuthWatcher = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { access } = useSelector((state: { user: UserState }) => state.user);

  useEffect(() => {
    if (access) {
      checkTokenExpiration(access, dispatch, navigate);
    }
  }, [access, dispatch, navigate]);
  return null;
};

export default AuthWatcher;
