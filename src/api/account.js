import request from '@/utils/request'

export function getStudentList(data) {
 return request({
  url: '/treatise_manager/courseuser/dissertation/backend/admin/user/getStudents',
  method: 'post',
  data
 })
}

export function getTeacherList(data) {
 return request({
  url: '/treatise_manager/courseuser/dissertation/backend/admin/user/getTeachers',
  method: 'post',
  data
 })
}

export function getReviewerList(data) {
 return request({
  url: '/treatise_manager/courseuser/dissertation/backend/admin/user/getTeachers',
  method: 'post',
  data
 })
}

export function getAdminList(data) {
 return request({
  url: '/treatise_manager/courseuser/dissertation/backend/admin/admins/getAdmins',
  method: 'post',
  data
 })
}

export function addAdmin(data) {
 return request({
  url: '/treatise_manager/courseuser/dissertation/backend/admin/admins/add',
  method: 'post',
  data
 })
}

export function updateAdmin(data) {
 return request({
  url: '/treatise_manager/courseuser/dissertation/backend/admin/admins/updateAdmin',
  method: 'post',
  data
 })
}

export function resetAdminPWD(data) {
 return request({
  url: '/treatise_manager/courseuser/dissertation/backend/admin/admins/resetPwd',
  method: 'post',
  data
 })
}