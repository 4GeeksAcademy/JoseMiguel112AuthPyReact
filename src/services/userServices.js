

export async function login(email, password) {

    try{
        const response = await fetch(import.meta.env.VITE_BACKEND_URL+'/api/login', 
            {method: 'POST',
            body: JSON.stringify({email:email, password:password}),
            headers:{
                'Content-Type':'application/json'
            }
        }) 
        const data = await response.json()
        console.log(data)
        if(response.status===200){
            return true
        }
    } catch (error) {
        console.log(error)
        return false
    }
}