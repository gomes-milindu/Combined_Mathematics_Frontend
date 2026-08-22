import api from '../config/axios';

export const getRegistrations = () => {
    return api.get('/lms/registrations');
};

export const getLmsVideos = (institute, batch) => {
    return api.get('/lms/videos', { params: { institute, batch } });
};
