# 微信读书API

## 时长兑福利

这个接口用来用阅读时长兑换免费体验卡天数，兑换方式一般会有2种：看视频兑换和分享兑换。

看视频兑换需要强制等待30秒广告，分享兑换需要好友点击链接进入，都不是很友好，所以提取出该接口直接进行兑换。

### 接口地址

```
https://i.weread.qq.com/weekly/exchange
```

### 调用示例

```http request
POST /weekly/exchange HTTP/1.1
Host: i.weread.qq.com
vid: 81613721
skey: DMlRcvdm
Content-Type: application/json

{
  "awardLevelId": 11,
  "awardChoiceType": 1,
  "isExchangeAward": 1,
  "pf": "weread_wx-2001-iap-2001-iphone"
}
```

### 参数说明

| 参数名             | 参数说明           | 参数位置   |
|-----------------|----------------|--------|
| vid             | 用户id           | header |
| skey            | 登录凭证           | header |
| awardLevelId    | 兑换项id(见响应结果)   | body   |
| awardChoiceType | 兑换内容(1体验卡/2书币) | body   |
| isExchangeAward | 是否兑换(0不兑换/1兑换) | body   |
| pf              | 固定字符串(类似于UA)   | body   |

### 响应结果

```json5
{
  // 阅读时长(本周)
  "readingTime": 241140,
  // 阅读天数(本周)
  "readingDay": 5,
  // 是否为付费会员卡用户
  "isMCardVip": 0,
  // 阅读时长兑换项
  "readtimeAwards": [
    {
      // 兑换项id
      "awardLevelId": 4,
      // 已兑换的方式，只有已兑换时才有值，未兑换时为0
      "awardChooseType": 1,
      // 兑换状态: 0不可兑换/1未兑换/2已兑换
      "awardStatus": 2,
      "awardStatusDesc": "已领取",
      "awardLevelDesc": "读 1 分钟",
      "awardChoicesDesc": "可得 1 天无限卡",
      // 兑换时的选项
      "awardChoices": [
        {
          // 兑换内容: 1免费体验卡/2书币
          "choiceType": 1,
          // 兑换数量
          "awardNum": 1,
          // 是否可选择
          "canChoice": 1,
        }
      ]
    },
    {
      "awardLevelId": 1,
      "awardChooseType": 1,
      "awardStatus": 2,
      "awardStatusDesc": "已领取",
      "awardLevelDesc": "读 1 小时",
      "awardChoicesDesc": "可得 1 天无限卡",
      "awardChoices": [
        {
          "choiceType": 1,
          "awardNum": 1,
          "canChoice": 1
        },
        {
          "choiceType": 2,
          "awardNum": 1,
          "canChoice": 0
        }
      ]
    },
    {
      "awardLevelId": 2,
      "awardChooseType": 1,
      "awardStatus": 2,
      "awardStatusDesc": "已领取",
      "awardLevelDesc": "读 3 小时",
      "awardChoicesDesc": "可得 1 天无限卡",
      "awardChoices": [
        {
          "choiceType": 1,
          "awardNum": 1,
          "canChoice": 1
        },
        {
          "choiceType": 2,
          "awardNum": 2,
          "canChoice": 0
        }
      ]
    },
    {
      "awardLevelId": 3,
      "awardChooseType": 0,
      "awardStatus": 1,
      "awardStatusDesc": "领取",
      "awardLevelDesc": "读 5 小时",
      "awardChoicesDesc": "可得 1 天无限卡",
      "awardChoices": [
        {
          "choiceType": 1,
          "awardNum": 1,
          "canChoice": 1
        },
        {
          "choiceType": 2,
          "awardNum": 2,
          "canChoice": 0
        }
      ]
    }
  ],
  // 阅读天数兑换项
  "readdayAwards": [
    {
      "awardLevelId": 11,
      "awardChooseType": 0,
      "awardStatus": 1,
      "awardStatusDesc": "领取",
      "awardLevelDesc": "读 2 天",
      "awardChoicesDesc": "可得 1 天无限卡",
      "awardChoices": [
        {
          "choiceType": 1,
          "awardNum": 1,
          "canChoice": 1
        }
      ]
    },
    {
      "awardLevelId": 12,
      "awardChooseType": 0,
      "awardStatus": 1,
      "awardStatusDesc": "领取",
      "awardLevelDesc": "读 4 天",
      "awardChoicesDesc": "可得 1 天无限卡",
      "awardChoices": [
        {
          "choiceType": 1,
          "awardNum": 1,
          "canChoice": 1
        }
      ]
    },
    {
      "awardLevelId": 13,
      "awardChooseType": 0,
      "awardStatus": 0,
      "awardStatusDesc": "差2天",
      "awardLevelDesc": "读 7 天",
      "awardChoicesDesc": "可得 2 天无限卡",
      "awardChoices": [
        {
          "choiceType": 1,
          "awardNum": 2,
          "canChoice": 1
        }
      ]
    }
  ],
  "readgoalAwards": [],
  "memberCardExchange": [
    {
      "productId": "com.tencent.weread.f5day_10",
      "days": 5,
      "price": 100,
      "pricePerMonth": 100,
      "isLimitedTime": 0,
      "isAutoRenewable": 0,
      "name": "兑换 5 天付费卡",
      "canExchange": 1,
      "buttonText": "1 元兑换 5 天付费卡",
      "description": "使用 10 天免费无限卡",
      "needFreeCardCnt": 10
    }
  ],
  "awardStatusOuterDesc": "领取3天无限卡",
  "validDayMinSecond": 1,
  "infiniteCard": {
    "day": 0,
    "cardType": 6,
    "itemId": "8"
  }
}
```

```json5
{
  "readingTime": 241140,
  "readingDay": 5,
  "isMCardVip": 0,
  "readtimeAwards": [
    {
      "awardLevelId": 4,
      "awardChooseType": 1,
      "awardStatus": 2,
      "awardStatusDesc": "已领取",
      "awardLevelDesc": "读 1 分钟",
      "awardChoicesDesc": "可得 1 天体验卡",
      "awardChoices": [
        {
          "choiceType": 1,
          "awardNum": 1,
          "canChoice": 1
        }
      ]
    },
    {
      "awardLevelId": 1,
      "awardChooseType": 1,
      "awardStatus": 2,
      "awardStatusDesc": "已领取",
      "awardLevelDesc": "读 1 小时",
      "awardChoicesDesc": "可得 1 天体验卡",
      "awardChoices": [
        {
          "choiceType": 1,
          "awardNum": 1,
          "canChoice": 1
        },
        {
          "choiceType": 2,
          "awardNum": 1,
          "canChoice": 0
        }
      ]
    },
    {
      "awardLevelId": 2,
      "awardChooseType": 1,
      "awardStatus": 2,
      "awardStatusDesc": "已领取",
      "awardLevelDesc": "读 3 小时",
      "awardChoicesDesc": "可得 1 天体验卡",
      "awardChoices": [
        {
          "choiceType": 1,
          "awardNum": 1,
          "canChoice": 1
        },
        {
          "choiceType": 2,
          "awardNum": 2,
          "canChoice": 0
        }
      ]
    },
    {
      "awardLevelId": 3,
      "awardChooseType": 0,
      "awardStatus": 1,
      "awardStatusDesc": "领取",
      "awardLevelDesc": "读 5 小时",
      "awardChoicesDesc": "可得 1 天体验卡",
      "awardChoices": [
        {
          "choiceType": 1,
          "awardNum": 1,
          "canChoice": 1
        },
        {
          "choiceType": 2,
          "awardNum": 2,
          "canChoice": 0
        }
      ]
    }
  ],
  "readdayAwards": [
    {
      "awardLevelId": 11,
      "awardChooseType": 0,
      "awardStatus": 1,
      "awardStatusDesc": "领取",
      "awardLevelDesc": "读 2 天",
      "awardChoicesDesc": "可得 1 天体验卡",
      "awardChoices": [
        {
          "choiceType": 1,
          "awardNum": 1,
          "canChoice": 1
        },
        {
          "choiceType": 2,
          "awardNum": 1,
          "canChoice": 0
        }
      ]
    },
    {
      "awardLevelId": 12,
      "awardChooseType": 0,
      "awardStatus": 1,
      "awardStatusDesc": "领取",
      "awardLevelDesc": "读 4 天",
      "awardChoicesDesc": "可得 1 天体验卡",
      "awardChoices": [
        {
          "choiceType": 1,
          "awardNum": 1,
          "canChoice": 1
        },
        {
          "choiceType": 2,
          "awardNum": 3,
          "canChoice": 0
        }
      ]
    },
    {
      "awardLevelId": 13,
      "awardChooseType": 0,
      "awardStatus": 0,
      "awardStatusDesc": "差2天",
      "awardLevelDesc": "读 7 天",
      "awardChoicesDesc": "可得 2 天体验卡",
      "awardChoices": [
        {
          "choiceType": 1,
          "awardNum": 2,
          "canChoice": 1
        },
        {
          "choiceType": 2,
          "awardNum": 6,
          "canChoice": 0
        }
      ]
    }
  ],
  "readgoalAwards": [],
  "memberCardExchange": [
    {
      "productId": "com.tencent.weread.f5day_10",
      "days": 5,
      "price": 100,
      "pricePerMonth": 100,
      "isLimitedTime": 0,
      "isAutoRenewable": 0,
      "name": "兑换 5 天付费会员卡",
      "canExchange": 1,
      "buttonText": "1 元兑换 5 天付费会员卡",
      "description": "使用 10 天体验卡",
      "needFreeCardCnt": 10
    }
  ],
  "awardStatusOuterDesc": "领取3天体验卡",
  "validDayMinSecond": 1,
  "infiniteCard": {
    "day": 0,
    "cardType": 6,
    "itemId": "8"
  }
}
```

### 响应字段说明

见上面的备注。

### 分析过程

在点【领取】按钮时会调用2次这个接口，参数分别如下：

```json5
{
  "awardLevelId": 0,
  "awardChoiceType": 0,
  "isExchangeAward": 0,
  "pf": "weread_wx-2001-iap-2001-iphone",
}
```

```json5
{
  // 兑换项id
  "awardLevelId": 2,
  // 兑换内容: 1免费体验卡/2书币
  "awardChoiceType": 1,
  // 是否兑换
  "isExchangeAward": 1,
  "pf": "weread_wx-2001-iap-2001-iphone",
}
```

可以看到，第一次调用时都是传的0，表示不进行兑换，估计是查询目的。

### 关于登录超时

`skey`参数有超时时间，超时后需要重新请求微信接口进行刷新，参考下面的【skey刷新】接口。

## skey刷新

### 接口地址

```
https://i.weread.qq.com/login
```

### 调用示例

```http request
POST /login HTTP/1.1
Host: i.weread.qq.com
Content-Type: application/json

{
  "random": 1481696734,
  "deviceId": "xxx",
  "refCgi": "",
  "signature": "xxx",
  "refreshToken": "xxx",
  "wxToken": 1,
  "timestamp": 1664275752,
  "inBackground": 0,
  "deviceToken": "xxx"
}
```

### 参数说明

| 参数名          | 参数说明         | 是否必填        | 是否参与鉴权 |
|--------------|--------------|-------------|--------|
| refreshToken | 刷新skey的token | true        | true   |
| deviceId     | 设备id         | true (不可为空) | false  |
| refCgi       | 未知           | true (可以为空) | false  |
| random       | 随机数          | false       | false  |
| signature    | 签名           | false       | false  |
| wxToken      | 未知           | false       | false  |
| timestamp    | 时间戳          | false       | false  |
| inBackground | 未知           | false       | false  |
| deviceToken  | 设备token      | false       | false  |


### 响应结果

> 虽然请求结果状态是401，并且有错误码，但是不影响`accessToken`的正常使用。
> 目前不确定`refreshToken`的有效期是多少。

```json
{
  "errcode": -2013,
  "errmsg": "微信登录授权已过期，继续购买需跳转到微信重新登录",
  "vid": 86604721,
  "accessToken": "zEGrRJwr",
  "alertType": 1
}
```

`accessToken`就是我们在兑换时用到的`skey`参数。
