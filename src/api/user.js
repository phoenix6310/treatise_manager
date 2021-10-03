import request from '@/utils/request'

export function login(data) {
    return request({
        url: '/api/dissertation/backend/admin/login/account',
        method: 'post',
        data
    })
}

export function getInfo(token) {
    return request({
        url: '/api/dissertation/backend/admin/info',
        method: 'get',
        params: { token }
    })
}