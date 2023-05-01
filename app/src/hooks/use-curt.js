import { useSelector } from 'react-redux';

export function useCurt() {
    const { curt } = useSelector(state => state.curt)

    let prises = 0
    curt?.map(e => {
        prises += e.product.prise
    })

    return {
        curt, priseCurt: prises
    }
}