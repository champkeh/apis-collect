const axios = require('axios')
const dotenv = require('dotenv')

dotenv.config()


const vid = process.env.WEREAD_VID
const skey = process.env.WEREAD_SKEY
const pf = 'weread_wx-2001-iap-2001-iphone'
const url = 'https://i.weread.qq.com/weekly/exchange'

/**
 * 查询兑换列表
 */
function queryAllAwards() {
    return axios.post(url, {
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
 */
function exchange(id) {
    return axios.post(url, {
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

async function exchangeAllAwards(ids) {
    for (let i = 0; i < ids.length; i++) {
        await exchange(ids[i])
    }
}

queryAllAwards().then(awards => {
    console.log('兑换前：')
    console.log(awards)
    return exchangeAllAwards(awards.filter(award => award.status === 1).map(award => award.id))
}).then(() => {
    // 兑换完成之后，再查询一次进行确认
    queryAllAwards().then(awards => {
        console.log('兑换后：')
        console.log(awards)
    })
}).catch(err => {
    console.log(err)
})
