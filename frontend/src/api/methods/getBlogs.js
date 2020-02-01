import {BLOGS} from 'api/constants';

export default () => {
    return new Promise((resolve, reject) => {
        fetch(BLOGS)
        .then(data => data.json())
        .then(jsonData => resolve(jsonData))
        .catch(e => reject(e))
    })
}
