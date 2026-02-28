import axios from 'axios'


export const createCategory = async (token, form) => {
    // code body
    return axios.post('http://a6033c0c47b864a2da8be7492fcf8988-86221655358c006a.elb.ap-southeast-1.amazonaws.com/api/category', form, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const listCategory = async () => {
    // code body
    return axios.get('http://a6033c0c47b864a2da8be7492fcf8988-86221655358c006a.elb.ap-southeast-1.amazonaws.com/api/category')
}

export const removeCategory = async (token, id) => {
    // code body
    return axios.delete('http://a6033c0c47b864a2da8be7492fcf8988-86221655358c006a.elb.ap-southeast-1.amazonaws.com/api/category/'+id, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}