/** @format */
import { backendUrl } from './config';

export const unauthPOSTReq = async (route, body) => {
	const response = await fetch(backendUrl + route, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(body),
		credentials: 'include',
	});
	const formattedResponse = await response.json();
	return formattedResponse;
};

export const authPOSTReq = async (route, body) => {
	const token = getToken();
	const response = await fetch(backendUrl + route, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify(body),
		credentials: 'include',
	});
	const formattedResponse = await response.json();
	return formattedResponse;
};

export const authGETReq = async (route) => {
	const token = getToken();
	const response = await fetch(backendUrl + route, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
		credentials: 'include',
	});
	const formattedResponse = await response.json();
	return formattedResponse;
};

const getToken = () => {
	const accessToken = document.cookie.replace(
		/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
		'$1',
	);
	return accessToken;
};
