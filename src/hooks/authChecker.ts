import { jwtDecode, JwtPayload } from 'jwt-decode';
import { clearUser } from '../redux/userSlice';

export const checkTokenExpiration = (
  access: string,
  dispatch: any,
  navigate: any
) => {
  if (!access) return;

  try {
    const decoded: JwtPayload = jwtDecode<JwtPayload>(access);

    if (decoded.exp) {
      const expirationTime = decoded.exp * 1000;
      const currentTime = Date.now();

      if (expirationTime < currentTime) {
        dispatch(clearUser());
        navigate('/login');
      } else {
        setTimeout(() => {
          dispatch(clearUser());
          navigate('/login');
        }, expirationTime - currentTime);
      }
    }
  } catch (error) {
    console.log(error);
  }
};
