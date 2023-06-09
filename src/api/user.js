// 用户相关的请求模块
import request from "@/utils/request"
// import store from "@/store"
// 用户登录
export const login = data => {
    return request({
        method: "post",
        url: "/v1_0/authorizations",
        data
    })
}

// 发送验证码 注意：每一个手机号每分钟1次
export const sendSms = mobile => {
    return request({
        method: "GET",
        url: `/v1_0/sms/codes/${mobile}`
    })
}

// 获取用户自己的信息
//  /v1_0/user
export const getUserInfo = () => {
    return request({
        method: "GET",
        url: `/v1_0/user`
            // headers: {
            //     Authorization: `Bearer ${store.state.user.token}`
            // }
    })
}

// 获取用户频道
export const getUserChannels = () => {
    return request({
        method: 'GET',
        url: '/v1_0/user/channels'
    })
}

// 关注用户
export const addFollow = target => {
    return request({
        method: 'POST',
        url: '/v1_0/user/followings',
        data: {
            target
        }
    })
}

// 取消用户
export const deleteFollow = target => {
    return request({
        method: 'DELETE',
        url: `/v1_0/user/followings/${target}`
    })
}

// 获取当前登录用户的个人资料
export const getUserProfile = () => {
    return request({
        method: "GET",
        url: '/v1_0/user/profile'
    })
}

// 更新用户资料
export const updateUserProfile = data => {
    return request({
        method: "PATCH",
        url: '/v1_0/user/profile',
        data
    })
}

// 更新用户照片资料
export const updateUserPhoto = data => {
    return request({
        method: "PATCH",
        url: '/v1_0/user/photo',
        data
    })
}