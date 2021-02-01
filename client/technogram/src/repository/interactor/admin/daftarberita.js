import adminBeritaNetowrkSource from '../../datasource/api/admin/daftarberita'
const getAll = async() => {
    return await adminBeritaNetowrkSource.getAll()
}

const searchBy = async(params) => {
    return await adminBeritaNetowrkSource.searchBy(params)
}

const publish = async(id, token) => {
    return await adminBeritaNetowrkSource.publish(id , token)
}

const deleteBy = async(id, token) => {
    return await adminBeritaNetowrkSource.deleteBy(id , token)
}

// const deleteAll = async() => {
//     try{
//         const deleteAll = NEWS_URL + '/delete-all'
//         const result = await axios.delete(deleteAll,
//         {
//             timeout : TIMEOUT,
//             headers: {
//                 "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTgsInJvbGVzIjoiXCJhZG1pblwiOyIsImlhdCI6MTYwNTYyMTM0MiwiZXhwIjoxNjA1NjI0OTQyfQ.7YzYqk4TAxr6RPHjd2pUtOXyyMpKk8ELQ_B_iFQiew4"
//             }
//         })
//         return result.data;
//     }catch(err){
//         return ErrorHandler.errorHandler(err);
//     }
// }

export default {
    getAll,
    searchBy,
    publish,
    deleteBy,
    //deleteAll
}