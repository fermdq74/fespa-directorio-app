export const getCompanies = (type = 'getAsociados') => {

    return new Promise( (resolve, reject) => {

        fetch(
            `https://us-central1-fespa-directorio.cloudfunctions.net/${type}`
          )
            .then((response) => response.json())
            .then((result) => {
                if(type == 'getAsociados') {
                    resolve(result.results);
                } else {
                    resolve(result);
                }
            })
            .catch((error) => {
                reject(error);
            });

    });

}