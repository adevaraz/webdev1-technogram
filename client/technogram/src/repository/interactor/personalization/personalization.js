import personalizationNetworkSource from "../../datasource/api/personalization/personalization";

const retrieveAll = async() => {
    return await personalizationNetworkSource.retrieveAll()

}

const getByName = async(name) => {
    return await personalizationNetworkSource.getByName(name)
}

const addPersonalize = async(category, token) => {
    return await personalizationNetworkSource.addPersonalize(category , token)
}
export default{
    retrieveAll ,
    getByName,
    addPersonalize
}