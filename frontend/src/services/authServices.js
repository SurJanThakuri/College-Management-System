// authServices.js
import API_URL from '../api';

import axios from 'axios';

export const refreshToken = async () => {
    try {
        const refreshToken = localStorage.getItem('refreshToken');
        console.log(refreshToken);

        if (!refreshToken) {
            throw new Error('No refresh token found');
        }

        const response = await axios.post(`${API_URL}/admins/refresh-token`, {
            refreshToken,
        });

        const { accessToken, refreshToken: newRefreshToken } = response.data.data;

        // Set the expiry for the new access token (1 day)
        const accessTokenExpiry = new Date();
        accessTokenExpiry.setDate(accessTokenExpiry.getDate() + 1);
        localStorage.setItem('accessTokenExpiry', accessTokenExpiry.toISOString());

        // Set the expiry for the new refresh token (10 days)
        const refreshTokenExpiry = new Date();
        refreshTokenExpiry.setDate(refreshTokenExpiry.getDate() + 10);
        localStorage.setItem('refreshTokenExpiry', refreshTokenExpiry.toISOString());

        // Update the access token and refresh token in the frontend storage
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', newRefreshToken);

        return accessToken; // Return the new access token
    } catch (error) {
        console.error('Error refreshing access token:', error);
        throw error;
    }
};
