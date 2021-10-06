import request from '@/utils/request'

export function addRule(data) {
    return request({
        url: '/api/courseuser/dissertation/backend/admin/category/score/updateAll',
        method: 'post',
        data
    })
}

export function getRuleList(data) {
    return request({
        url: '/api/courseuser/dissertation/backend/admin/category/type/list',
        method: 'post',
        data
    })
}

export function getRuleById(data) {
    return request({
        url: '/api/courseuser/dissertation/backend/admin/category/score/getLevelOne',
        method: 'post',
        data
    })
}

export function delRuleById(data) {
    return request({
        url: '/api/courseuser/dissertation/backend/admin/category/type/deleteAll',
        method: 'post',
        data
    })
}

export function getOrgs(params) {
    return request({
        url: '/api/courseuser/dissertation/backend/admin/org/getOrgs',
        method: 'get',
        params
    })
}

export function addCompetition(data) {
    return request({
        url: '/api/courseuser/dissertation/backend/admin/diss/add',
        method: 'post',
        data
    })
}

export function updateCompetition(data) {
    return request({
        url: '/api/courseuser/dissertation/backend/admin/diss/update',
        method: 'post',
        data
    })
}

export function delCompetition(data) {
    return request({
        url: '/api/courseuser/dissertation/backend/admin/diss/del',
        method: 'post',
        data
    })
}

export function getCompetitionList(data) {
    return request({
        url: '/api/courseuser/dissertation/backend/admin/diss/list',
        method: 'post',
        data
    })
}
