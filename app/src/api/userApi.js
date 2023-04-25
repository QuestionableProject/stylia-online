export const userCheck = async (token) => {
    const response = await fetch('http://localhost:5000/api/user/auth', {
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    })
    return response;
}