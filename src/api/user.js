import request from '@/utils/request'

export function login(data) {
    return request({
        url: '/api/courseuser/dissertation/backend/admin/login',
        method: 'post',
        data
    })
}

export function getInfo(token) {
    return request({
        url: '/api/courseuser/dissertation/backend/admin/info',
        method: 'get',
        params: { token }
    })
}