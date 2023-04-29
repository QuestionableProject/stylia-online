import {useSelector} from 'react-redux';

export function useCurt() {
    const {curt} = useSelector(state => state.curt)

    return {
        curt,
    }
}