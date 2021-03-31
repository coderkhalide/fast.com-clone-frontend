import axios from 'axios'

export const getRequest = async (url) => {
    try{
        const data = await axios.get(url)
            .then(res => res?.data)
            .catch(err => ({error: err}))
        return data
    }catch(ex){
        return {error: "Something went wrong!"}
    }
}