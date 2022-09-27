const axios = require('axios')
const dotenv = require('dotenv')

dotenv.config()

let skey

const vid = process.env.WEREAD_VID
const deviceId = process.env.WEREAD_DEVICE_ID
const deviceToken = process.env.WEREAD_DEVICE_TOKEN
const refreshToken = process.env.WEREAD_REFRESH_TOKEN
const signature = process.env.WEREAD_SIGNATURE
const pf = 'weread_wx-2001-iap-2001-iphone'
const exchangeUrl = 'https://i.weread.qq.com/weekly/exchange'
const loginUrl = 'https://i.weread.qq.com/login'

/**
 * 查询兑换列表
 */
function queryAllAwards() {
    return axios.post(exchangeUrl, {
        awardLevelId: 0,
        awardChoiceType: 0,
        isExchangeAward: 0,
        pf: pf,
    }, {
        headers: {
            vid,
            skey,
        }
    }).then(resp => {
        return awardFilter(resp.data)
    }).catch((err) => {
        const error = formatError(err.response)
        throw new Error(JSON.stringify(error))
    })
}

function awardFilter(data) {
    const awards = []
    awards.push(
        ...data.readtimeAwards.map(item => ({
            id: item.awardLevelId,
            status: item.awardStatus,
        }))
    )
    awards.push(
        ...data.readdayAwards.map(item => ({
            id: item.awardLevelId,
            status: item.awardStatus,
        }))
    )
    return awards
}

function formatError(resp) {
    let error = {
        status: resp.status,
        statusText: resp.statusText,
    }
    if (resp.data) {
        error = {
            ...error,
            ...resp.data,
        }
    }
    return error
}

/**
 * 兑换体验卡
 * @param {number} id 兑换项id
 */
function exchangeAward(id) {
    return axios.post(exchangeUrl, {
        awardLevelId: id,
        awardChoiceType: 1, // 免费账户只能兑换体验卡
        isExchangeAward: 1,
        pf: pf,
    }, {
        headers: {
            vid,
            skey,
        }
    }).catch(err => {
        const error = formatError(err.response)
        throw new Error(JSON.stringify(error))
    })
}

/**
 * 兑换所有体验卡
 * @param {number[]} ids
 * @return {Promise<void>}
 */
async function exchangeAllAwards(ids) {
    for (let i = 0; i < ids.length; i++) {
        await exchangeAward(ids[i])
    }
}

/**
 * 登录
 * @return {Promise<void>}
 */
async function login() {
    return new Promise((resolve, reject) => {
        axios.post(loginUrl, {
            deviceId,
            deviceToken,
            refCgi: "",
            signature,
            refreshToken,
            wxToken: 1,
            inBackground: 1,
        }).catch(err => {
            if (err.response && err.response.data && err.response.data.accessToken) {
                resolve(err.response.data.accessToken)
            } else {
                reject(err)
            }
        })
    })
}

async function run() {
    try {
        skey = await login()
        let awards = await queryAllAwards()
        console.log('兑换前：')
        console.log(awards)
        await exchangeAllAwards(awards.filter(award => award.status === 1).map(award => award.id))

        // 兑换完成之后，再查询一次进行确认
        awards = await queryAllAwards()
        console.log('兑换后：')
        console.log(awards)
    } catch (err) {
        console.log(err)
    }
}

;(async () => {
    await run()
})()
