export const categories=[
  {
    "id": "overview",
    "name": "城市概览",
    "icon": "Compass"
  },
  {
    "id": "history",
    "name": "历史文化",
    "icon": "Landmark"
  },
  {
    "id": "transport",
    "name": "交通出行",
    "icon": "TrainFront"
  },
  {
    "id": "culture",
    "name": "公共文化",
    "icon": "BookOpen"
  },
  {
    "id": "park",
    "name": "公园运动",
    "icon": "Trees"
  },
  {
    "id": "travel",
    "name": "景区游览",
    "icon": "Camera"
  },
  {
    "id": "event",
    "name": "展览活动",
    "icon": "CalendarDays"
  },
  {
    "id": "food",
    "name": "饮食物产",
    "icon": "Utensils"
  },
  {
    "id": "housing",
    "name": "居住社区",
    "icon": "House"
  },
  {
    "id": "career",
    "name": "就业人才",
    "icon": "BriefcaseBusiness"
  },
  {
    "id": "education",
    "name": "教育家庭",
    "icon": "GraduationCap"
  },
  {
    "id": "health",
    "name": "医疗服务",
    "icon": "HeartPulse"
  },
  {
    "id": "service",
    "name": "日常办事",
    "icon": "ClipboardList"
  },
  {
    "id": "industry",
    "name": "产业园区",
    "icon": "Building2"
  },
  {
    "id": "accessibility",
    "name": "无障碍服务",
    "icon": "Accessibility"
  },
  {
    "id": "international",
    "name": "国际服务",
    "icon": "Globe"
  }
];
export const districts=[];
export const checklistSeeds=[
  {
    "id": "arrive",
    "title": "安顿下来的第一周",
    "audience": "新居民",
    "items": [
      "标记住处与工作／学习地点",
      "通过官方渠道确认通勤路线",
      "寻找附近图书馆、公园与公共服务入口",
      "按个人情况核对居住登记与证照事项",
      "了解社区及物业服务联系方式"
    ]
  },
  {
    "id": "visit",
    "title": "第一次来杭州",
    "audience": "游客",
    "items": [
      "确认车站／机场与到达时间",
      "核实住宿位置和到达交通",
      "查看场馆官方预约与开放要求",
      "给行程保留休息和交通时间",
      "准备下雨或闭馆时的替代安排"
    ]
  },
  {
    "id": "family",
    "title": "带父母轻松出行",
    "audience": "家庭",
    "items": [
      "向场馆核实无障碍出入口和电梯",
      "减少每日游览点并安排休息",
      "关注天气与体力情况",
      "确认洗手间、接驳和就餐安排",
      "保存同行者联系方式和返程方案"
    ]
  }
];
export const sourceSeeds=[
  {
    "id": "hangzhou",
    "title": "杭州市政府门户",
    "publisher": "杭州市人民政府",
    "url": "https://www.hangzhou.gov.cn/",
    "type": "portal",
    "status": "catalogued",
    "checkedAt": null,
    "refreshDays": 7,
    "documentRead": false,
    "cityId": "hangzhou",
    "scopeLevel": "local"
  },
  {
    "id": "map-hangzhou-0",
    "title": "浙江省博物馆(之江馆)：公开地图数据记录",
    "publisher": "OpenStreetMap contributors（非机构官网）",
    "url": "https://www.openstreetmap.org/way/1393054074",
    "type": "dataset",
    "status": "reviewed",
    "checkedAt": "2026-10-31",
    "refreshDays": 90,
    "documentRead": false,
    "scopeLevel": "local",
    "cityId": "hangzhou",
    "scope": "地图名称与参考位置；不是机构官方服务说明，也未核验当前开放或入口",
    "readMethod": "读取Nominatim返回的OpenStreetMap记录，排除地铁站、公交站、跨城结果及名称不符项"
  },
  {
    "id": "campus-hangzhou",
    "title": "浙江省博物馆：之江馆与其他馆区如何区分",
    "publisher": "中国博物馆协会",
    "url": "https://www.chinamuseum.org.cn/cma/detail.html?contentId=13081&id=13",
    "type": "institution",
    "status": "reviewed",
    "checkedAt": "2026-10-31",
    "refreshDays": 30,
    "documentRead": true,
    "publishedAt": "2023-09-01",
    "scope": "2023年新馆介绍；本条不提供当前临展、开放或预约承诺",
    "scopeLevel": "local",
    "cityId": "hangzhou",
    "readMethod": "已打开并读取馆区说明，仅采用原文支持的事实，未以历史资料承诺当前开放"
  }
];
export const placeSeeds=[
  {
    "id": "map-hangzhou-0",
    "name": "浙江省博物馆（之江馆）",
    "district": "全市",
    "category": "culture",
    "lng": 120.0968744,
    "lat": 30.1620244,
    "summary": "馆址参考：浙江省之江文化中心；以馆方公布的实际入口为准。中国博物馆协会介绍，浙江省博物馆之江馆在2023年8月29日对公众开放，位于之江文化中心，提供历史文化陈列与公共教育空间；介绍同时提及孤山馆区等其他组成部分。本库选取明确标记“之江馆”的公共地图记录，不把孤山与之江的位置混作一个入口。2023年的启幕信息不等于当前展览、开放或预约规则已核验。",
    "tags": [
      "博物馆",
      "公共文化",
      "室内",
      "阅读与文化"
    ],
    "sourceId": "campus-hangzhou",
    "sourceIds": [
      "campus-hangzhou",
      "map-hangzhou-0"
    ],
    "indoor": true,
    "duration": 90,
    "coordinateStatus": "approximate",
    "coordinateSource": {
      "publisher": "© OpenStreetMap contributors",
      "url": "https://www.openstreetmap.org/way/1393054074",
      "license": "ODbL 1.0",
      "licenseUrl": "https://opendatacommons.org/licenses/odbl/1-0/",
      "checkedAt": "2026-10-31",
      "osmId": "way/1393054074",
      "query": "杭州 浙江省博物馆"
    },
    "coordinateNote": "馆区已根据公开资料区分，坐标仍为OpenStreetMap参考位置；实际入口、当期开馆和服务规则另行核实。",
    "opening": "请通过机构当前公告核实开放、预约与馆区",
    "price": null,
    "accessibility": "无障碍入口、设施可用性与协助方式尚待核验",
    "status": "published",
    "verifiedAt": "2026-10-31",
    "verificationScope": "核对文献中的馆区与馆址，并匹配公共地图参考点；不表示当前开放或资格已核验"
  }
];
export const articleSeeds=[
  {
    "id": "map-public-culture",
    "title": "杭州图书馆、博物馆与科普空间：公共地图参考点",
    "category": "culture",
    "district": "全市",
    "tags": [
      "杭州",
      "图书馆",
      "博物馆",
      "科普",
      "阅读",
      "公共文化",
      "位置",
      "地址"
    ],
    "body": "馆址参考：浙江省之江文化中心；以馆方公布的实际入口为准。中国博物馆协会介绍，浙江省博物馆之江馆在2023年8月29日对公众开放，位于之江文化中心，提供历史文化陈列与公共教育空间；介绍同时提及孤山馆区等其他组成部分。本库选取明确标记“之江馆”的公共地图记录，不把孤山与之江的位置混作一个入口。2023年的启幕信息不等于当前展览、开放或预约规则已核验。",
    "sourceId": "campus-hangzhou",
    "sourceIds": [
      "campus-hangzhou",
      "map-hangzhou-0"
    ],
    "evidence": [
      {
        "sourceId": "campus-hangzhou",
        "text": "馆址参考：浙江省之江文化中心；以馆方公布的实际入口为准。中国博物馆协会介绍，浙江省博物馆之江馆在2023年8月29日对公众开放，位于之江文化中心，提供历史文化陈列与公共教育空间；介绍同时提及孤山馆区等其他组成部分。本库选取明确标记“之江馆”的公共地图记录，不把孤山与之江的位置混作一个入口。2023年的启幕信息不等于当前展览、开放或预约规则已核验。"
      }
    ],
    "scope": "公共地图索引；没有将这些记录当作机构官方开放、预约或服务承诺",
    "scopeLevel": "editorial",
    "cityId": "hangzhou",
    "status": "published",
    "verification": "editorial",
    "verifiedAt": null,
    "documentRead": false,
    "createdAt": "2026-10-31T00:00:00.000Z"
  }
];