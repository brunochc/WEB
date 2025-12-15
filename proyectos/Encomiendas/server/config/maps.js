const { Client } = require('@googlemaps/google-maps-services-js');

const mapsClient = new Client({});

module.exports = {
    getDistanceMatrix: async (params) => {
        try {
            const response = await mapsClient.distancematrix({
                params: {
                    ...params,
                    key: process.env.GOOGLE_MAPS_API_KEY
                }
            });
            return response.data;
        } catch (err) {
            console.error('Error en Google Maps API:', err);
            throw err;
        }
    }
};