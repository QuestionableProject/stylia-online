import {useSelector} from 'react-redux';

export function useAuth() {
    const {token, nickname, image, id} = useSelector(state => state.user)

    return {
        isAuth: !!token,
        nickname,
        image,
        id
    }
}