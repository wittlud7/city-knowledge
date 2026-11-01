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
    "title": "第一次来兰州",
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
    "id": "lanzhou",
    "title": "兰州市政府门户",
    "publisher": "兰州市人民政府",
    "url": "https://www.lanzhou.gov.cn/",
    "type": "portal",
    "status": "catalogued",
    "checkedAt": null,
    "refreshDays": 7,
    "documentRead": false,
    "cityId": "lanzhou",
    "scopeLevel": "local"
  },
  {
    "id": "map-lanzhou-0",
    "title": "甘肃省图书馆：公开地图数据记录",
    "publisher": "OpenStreetMap contributors（非机构官网）",
    "url": "https://www.openstreetmap.org/node/10588992661",
    "type": "dataset",
    "status": "reviewed",
    "checkedAt": "2026-10-31",
    "refreshDays": 90,
    "documentRead": false,
    "scopeLevel": "local",
    "cityId": "lanzhou",
    "scope": "地图名称与参考位置；不是机构官方服务说明，也未核验当前开放或入口",
    "readMethod": "读取Nominatim返回的OpenStreetMap记录，排除地铁站、公交站、跨城结果及名称不符项"
  },
  {
    "id": "map-lanzhou-1",
    "title": "甘肃省博物馆：公开地图数据记录",
    "publisher": "OpenStreetMap contributors（非机构官网）",
    "url": "https://www.openstreetmap.org/way/405352719",
    "type": "dataset",
    "status": "reviewed",
    "checkedAt": "2026-10-31",
    "refreshDays": 90,
    "documentRead": false,
    "scopeLevel": "local",
    "cityId": "lanzhou",
    "scope": "地图名称与参考位置；不是机构官方服务说明，也未核验当前开放或入口",
    "readMethod": "读取Nominatim返回的OpenStreetMap记录，排除地铁站、公交站、跨城结果及名称不符项"
  },
  {
    "id": "map-lanzhou-2",
    "title": "甘肃科技馆：公开地图数据记录",
    "publisher": "OpenStreetMap contributors（非机构官网）",
    "url": "https://www.openstreetmap.org/way/409830486",
    "type": "dataset",
    "status": "reviewed",
    "checkedAt": "2026-10-31",
    "refreshDays": 90,
    "documentRead": false,
    "scopeLevel": "local",
    "cityId": "lanzhou",
    "scope": "地图名称与参考位置；不是机构官方服务说明，也未核验当前开放或入口",
    "readMethod": "读取Nominatim返回的OpenStreetMap记录，排除地铁站、公交站、跨城结果及名称不符项"
  }
];
export const placeSeeds=[
  {
    "id": "public-library",
    "name": "甘肃省图书馆",
    "district": "全市",
    "category": "culture",
    "lng": 103.8592449,
    "lat": 36.0579485,
    "summary": "公共地图记录名：甘肃省图书馆。位置描述：甘肃省图书馆, 读者大道, 渭源路街道, 兰州市, 城关区, 兰州市, 甘肃省, 730001, 中国。参考点可能是建筑或园区范围，不代表具体入口；当前开放、预约和服务规则尚须向机构核验。",
    "tags": [
      "图书馆",
      "公共文化",
      "室内",
      "阅读与文化"
    ],
    "sourceId": "doc-local-lanzhou",
    "indoor": true,
    "duration": 90,
    "coordinateStatus": "approximate",
    "opening": "请通过机构当前公告核实开放、预约与馆区",
    "price": null,
    "accessibility": "无障碍入口、设施可用性与协助方式尚待核验",
    "status": "published",
    "verifiedAt": "2026-10-31",
    "sourceIds": [
      "doc-local-lanzhou",
      "map-lanzhou-0"
    ],
    "coordinateSource": {
      "publisher": "© OpenStreetMap contributors",
      "url": "https://www.openstreetmap.org/node/10588992661",
      "license": "ODbL 1.0",
      "licenseUrl": "https://opendatacommons.org/licenses/odbl/1-0/",
      "checkedAt": "2026-10-31",
      "osmId": "node/10588992661",
      "query": "兰州 甘肃省图书馆"
    },
    "coordinateNote": "位置取自公共地图，仅作参考；馆区、实际入口和当前开放未完成官方核验。",
    "verificationScope": "仅核对公共地图记录的名称与城市范围；不表示机构服务已核验"
  },
  {
    "id": "map-lanzhou-1",
    "name": "甘肃省博物馆",
    "district": "全市",
    "category": "culture",
    "lng": 103.7719976,
    "lat": 36.0668241,
    "summary": "公共地图记录名：甘肃省博物馆。位置描述：甘肃省博物馆, 3, 西津西路, 西站东路社区, 西站街道, 七里河区, 兰州市, 甘肃省, 730050, 中国。参考点可能是建筑或园区范围，不代表具体入口；当前开放、预约和服务规则尚须向机构核验。",
    "tags": [
      "博物馆",
      "公共文化",
      "室内",
      "阅读与文化"
    ],
    "sourceId": "map-lanzhou-1",
    "sourceIds": [
      "map-lanzhou-1"
    ],
    "indoor": true,
    "duration": 90,
    "coordinateStatus": "approximate",
    "coordinateSource": {
      "publisher": "© OpenStreetMap contributors",
      "url": "https://www.openstreetmap.org/way/405352719",
      "license": "ODbL 1.0",
      "licenseUrl": "https://opendatacommons.org/licenses/odbl/1-0/",
      "checkedAt": "2026-10-31",
      "osmId": "way/405352719",
      "query": "兰州 甘肃省博物馆"
    },
    "coordinateNote": "位置取自公共地图，仅作参考；馆区、实际入口和当前开放未完成官方核验。",
    "opening": "请通过机构当前公告核实开放、预约与馆区",
    "price": null,
    "accessibility": "无障碍入口、设施可用性与协助方式尚待核验",
    "status": "published",
    "verifiedAt": "2026-10-31",
    "verificationScope": "仅核对公共地图记录的名称与城市范围；不表示机构服务已核验"
  },
  {
    "id": "map-lanzhou-2",
    "name": "甘肃科技馆",
    "district": "全市",
    "category": "culture",
    "lng": 103.7025643,
    "lat": 36.0995115,
    "summary": "公共地图记录名：甘肃科技馆。位置描述：甘肃科技馆, 银安路, 前庄社区, 营门村, 银滩路街道, 安宁区, 兰州市, 甘肃省, 730070, 中国。参考点可能是建筑或园区范围，不代表具体入口；当前开放、预约和服务规则尚须向机构核验。",
    "tags": [
      "博物馆",
      "公共文化",
      "室内",
      "科普"
    ],
    "sourceId": "map-lanzhou-2",
    "sourceIds": [
      "map-lanzhou-2"
    ],
    "indoor": true,
    "duration": 90,
    "coordinateStatus": "approximate",
    "coordinateSource": {
      "publisher": "© OpenStreetMap contributors",
      "url": "https://www.openstreetmap.org/way/409830486",
      "license": "ODbL 1.0",
      "licenseUrl": "https://opendatacommons.org/licenses/odbl/1-0/",
      "checkedAt": "2026-10-31",
      "osmId": "way/409830486",
      "query": "兰州 甘肃科技馆"
    },
    "coordinateNote": "位置取自公共地图，仅作参考；馆区、实际入口和当前开放未完成官方核验。",
    "opening": "请通过机构当前公告核实开放、预约与馆区",
    "price": null,
    "accessibility": "无障碍入口、设施可用性与协助方式尚待核验",
    "status": "published",
    "verifiedAt": "2026-10-31",
    "verificationScope": "仅核对公共地图记录的名称与城市范围；不表示机构服务已核验"
  }
];
export const articleSeeds=[
  {
    "id": "map-public-culture",
    "title": "兰州图书馆、博物馆与科普空间：公共地图参考点",
    "category": "culture",
    "district": "全市",
    "tags": [
      "兰州",
      "图书馆",
      "博物馆",
      "科普",
      "阅读",
      "公共文化",
      "位置",
      "地址"
    ],
    "body": "公共地图记录名：甘肃省图书馆。位置描述：甘肃省图书馆, 读者大道, 渭源路街道, 兰州市, 城关区, 兰州市, 甘肃省, 730001, 中国。参考点可能是建筑或园区范围，不代表具体入口；当前开放、预约和服务规则尚须向机构核验。\n\n公共地图记录名：甘肃省博物馆。位置描述：甘肃省博物馆, 3, 西津西路, 西站东路社区, 西站街道, 七里河区, 兰州市, 甘肃省, 730050, 中国。参考点可能是建筑或园区范围，不代表具体入口；当前开放、预约和服务规则尚须向机构核验。\n\n公共地图记录名：甘肃科技馆。位置描述：甘肃科技馆, 银安路, 前庄社区, 营门村, 银滩路街道, 安宁区, 兰州市, 甘肃省, 730070, 中国。参考点可能是建筑或园区范围，不代表具体入口；当前开放、预约和服务规则尚须向机构核验。",
    "sourceId": "map-lanzhou-0",
    "sourceIds": [
      "map-lanzhou-0",
      "map-lanzhou-1",
      "map-lanzhou-2"
    ],
    "evidence": [
      {
        "sourceId": "map-lanzhou-0",
        "text": "公共地图记录名：甘肃省图书馆。位置描述：甘肃省图书馆, 读者大道, 渭源路街道, 兰州市, 城关区, 兰州市, 甘肃省, 730001, 中国。参考点可能是建筑或园区范围，不代表具体入口；当前开放、预约和服务规则尚须向机构核验。"
      },
      {
        "sourceId": "map-lanzhou-1",
        "text": "公共地图记录名：甘肃省博物馆。位置描述：甘肃省博物馆, 3, 西津西路, 西站东路社区, 西站街道, 七里河区, 兰州市, 甘肃省, 730050, 中国。参考点可能是建筑或园区范围，不代表具体入口；当前开放、预约和服务规则尚须向机构核验。"
      },
      {
        "sourceId": "map-lanzhou-2",
        "text": "公共地图记录名：甘肃科技馆。位置描述：甘肃科技馆, 银安路, 前庄社区, 营门村, 银滩路街道, 安宁区, 兰州市, 甘肃省, 730070, 中国。参考点可能是建筑或园区范围，不代表具体入口；当前开放、预约和服务规则尚须向机构核验。"
      }
    ],
    "scope": "公共地图索引；没有将这些记录当作机构官方开放、预约或服务承诺",
    "scopeLevel": "editorial",
    "cityId": "lanzhou",
    "status": "published",
    "verification": "editorial",
    "verifiedAt": null,
    "documentRead": false,
    "createdAt": "2026-10-31T00:00:00.000Z"
  }
];