import { useDispatch } from "react-redux";
import { setCurt } from "../../store/slices/curtSlice";
import { useCurt } from "../../hooks/use-curt";


export default function Trash({ data, userId }) {
    const { priseCurt } = useCurt()
    const dispatch = useDispatch()

    const removeItem = async () => {

        await fetch(`${process.env.REACT_APP_SERVER}/api/curt/delete`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId: userId,
                productId: data
            })
        })
            .then(response => {
                return response.json()
            }).then((data) => {
                if (data) {
                    dispatch(setCurt({
                        curt: data.curtProducts,
                        priseCurt: priseCurt
                    }))
                }
            }).catch((e) => {
                console.log(e);
            });
    }
    return (
        <svg onClick={removeItem} id="i-trash" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="none" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
            <path d="M28 6 L6 6 8 30 24 30 26 6 4 6 M16 12 L16 24 M21 12 L20 24 M11 12 L12 24 M12 6 L13 2 19 2 20 6" />
        </svg>
    )
}