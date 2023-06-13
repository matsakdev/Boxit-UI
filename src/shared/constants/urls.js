import * as ApiConstants from './api-constants';
export const LOGIN_PATH = ApiConstants.BASE_URL + ApiConstants.AUTH_PATH + '/login';
export const REGISTRATION_PATH = ApiConstants.BASE_URL + ApiConstants.AUTH_PATH + '/signup';
export const GET_ALL_CONTAINERS_PATH = ApiConstants.BASE_URL + ApiConstants.CONTAINER_PATH;
export const GET_ALL_DUMPS_PATH = ApiConstants.BASE_URL + ApiConstants.ADMIN_PATH + '/dumps';
export const CREATE_DUMP_PATH = ApiConstants.BASE_URL + ApiConstants.ADMIN_PATH + '/dump-data';
export const GET_STATISTICS_PATH = ApiConstants.BASE_URL + ApiConstants.ADMIN_PATH + '/statistics/containers';
