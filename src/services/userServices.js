export async function login(email, password) {

    try{
        const response = await fetch('', {method: 'POST',
            body: JSON.stringify({email:email, password:password}),
            headers:
        }) 
    }
}