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
    "title": "第一次来太原",
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
    "id": "taiyuan",
    "title": "太原市政府门户",
    "publisher": "太原市人民政府",
    "url": "https://www.taiyuan.gov.cn/",
    "type": "portal",
    "status": "catalogued",
    "checkedAt": null,
    "refreshDays": 7,
    "documentRead": false,
    "cityId": "taiyuan",
    "scopeLevel": "local"
  },
  {
    "id": "map-taiyuan-0",
    "title": "山西省图书馆：公开地图数据记录",
    "publisher": "OpenStreetMap contributors（非机构官网）",
    "url": "https://www.openstreetmap.org/way/892698944",
    "type": "dataset",
    "status": "reviewed",
    "checkedAt": "2026-10-31",
    "refreshDays": 90,
    "documentRead": false,
    "scopeLevel": "local",
    "cityId": "taiyuan",
    "scope": "地图名称与参考位置；不是机构官方服务说明，也未核验当前开放或入口",
    "readMethod": "读取Nominatim返回的OpenStreetMap记录，排除地铁站、公交站、跨城结果及名称不符项"
  },
  {
    "id": "map-taiyuan-1",
    "title": "山西博物院：公开地图数据记录",
    "publisher": "OpenStreetMap contributors（非机构官网）",
    "url": "https://www.openstreetmap.org/way/182057463",
    "type": "dataset",
    "status": "reviewed",
    "checkedAt": "2026-10-31",
    "refreshDays": 90,
    "documentRead": false,
    "scopeLevel": "local",
    "cityId": "taiyuan",
    "scope": "地图名称与参考位置；不是机构官方服务说明，也未核验当前开放或入口",
    "readMethod": "读取Nominatim返回的OpenStreetMap记录，排除地铁站、公交站、跨城结果及名称不符项"
  },
  {
    "id": "campus-taiyuan",
    "title": "山西省图书馆：分清长风馆与文源馆",
    "publisher": "中国图书馆学会阅读推广委员会",
    "url": "https://www.lsc.org.cn/cns/html_pass/contents/1129/1777168449631191040.html",
    "type": "institution",
    "status": "reviewed",
    "checkedAt": "2026-10-31",
    "refreshDays": 30,
    "documentRead": true,
    "publishedAt": "2024-04-08",
    "scope": "2024年会议通知中的馆址参考；不是当前会议报名、借阅或开馆指南",
    "scopeLevel": "local",
    "cityId": "taiyuan",
    "readMethod": "已打开并读取馆区说明，仅采用原文支持的事实，未以历史资料承诺当前开放"
  }
];
export const placeSeeds=[
  {
    "id": "map-taiyuan-0",
    "name": "山西省图书馆（长风馆）",
    "district": "全市",
    "category": "culture",
    "lng": 112.5272538,
    "lat": 37.8093496,
    "summary": "馆址参考：太原市长风商务区广经路5号。中国图书馆学会2024年研讨会通知分别列出长风馆位于太原市长风商务区广经路5号，文源馆位于迎泽区文源巷1号。同一机构有不同馆区，地图点位、到馆交通和服务范围不能混用。本库选择长风馆对应的公共地图参考点，实际入口与当期开馆安排仍须查馆方。本条不把已结束的研讨会作为当前活动提供。",
    "tags": [
      "图书馆",
      "公共文化",
      "室内",
      "阅读与文化"
    ],
    "sourceId": "campus-taiyuan",
    "sourceIds": [
      "campus-taiyuan",
      "map-taiyuan-0"
    ],
    "indoor": true,
    "duration": 90,
    "coordinateStatus": "approximate",
    "coordinateSource": {
      "publisher": "© OpenStreetMap contributors",
      "url": "https://www.openstreetmap.org/way/892698944",
      "license": "ODbL 1.0",
      "licenseUrl": "https://opendatacommons.org/licenses/odbl/1-0/",
      "checkedAt": "2026-10-31",
      "osmId": "way/892698944",
      "query": "太原 山西省图书馆"
    },
    "coordinateNote": "馆区已根据公开资料区分，坐标仍为OpenStreetMap参考位置；实际入口、当期开馆和服务规则另行核实。",
    "opening": "请通过机构当前公告核实开放、预约与馆区",
    "price": null,
    "accessibility": "无障碍入口、设施可用性与协助方式尚待核验",
    "status": "published",
    "verifiedAt": "2026-10-31",
    "verificationScope": "核对文献中的馆区与馆址，并匹配公共地图参考点；不表示当前开放或资格已核验"
  },
  {
    "id": "map-taiyuan-1",
    "name": "山西博物院",
    "district": "全市",
    "category": "culture",
    "lng": 112.5247009,
    "lat": 37.864819,
    "summary": "公共地图记录名：山西博物院。位置描述：山西博物院, 玉门河北沿岸, 兴华街道, 万柏林区, 太原市, 山西省, 030024, 中国。参考点可能是建筑或园区范围，不代表具体入口；当前开放、预约和服务规则尚须向机构核验。",
    "tags": [
      "博物馆",
      "公共文化",
      "室内",
      "阅读与文化"
    ],
    "sourceId": "map-taiyuan-1",
    "sourceIds": [
      "map-taiyuan-1"
    ],
    "indoor": true,
    "duration": 90,
    "coordinateStatus": "approximate",
    "coordinateSource": {
      "publisher": "© OpenStreetMap contributors",
      "url": "https://www.openstreetmap.org/way/182057463",
      "license": "ODbL 1.0",
      "licenseUrl": "https://opendatacommons.org/licenses/odbl/1-0/",
      "checkedAt": "2026-10-31",
      "osmId": "way/182057463",
      "query": "太原 山西博物院"
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
    "title": "太原图书馆、博物馆与科普空间：公共地图参考点",
    "category": "culture",
    "district": "全市",
    "tags": [
      "太原",
      "图书馆",
      "博物馆",
      "科普",
      "阅读",
      "公共文化",
      "位置",
      "地址"
    ],
    "body": "馆址参考：太原市长风商务区广经路5号。中国图书馆学会2024年研讨会通知分别列出长风馆位于太原市长风商务区广经路5号，文源馆位于迎泽区文源巷1号。同一机构有不同馆区，地图点位、到馆交通和服务范围不能混用。本库选择长风馆对应的公共地图参考点，实际入口与当期开馆安排仍须查馆方。本条不把已结束的研讨会作为当前活动提供。\n\n公共地图记录名：山西博物院。位置描述：山西博物院, 玉门河北沿岸, 兴华街道, 万柏林区, 太原市, 山西省, 030024, 中国。参考点可能是建筑或园区范围，不代表具体入口；当前开放、预约和服务规则尚须向机构核验。",
    "sourceId": "campus-taiyuan",
    "sourceIds": [
      "campus-taiyuan",
      "map-taiyuan-0",
      "map-taiyuan-1"
    ],
    "evidence": [
      {
        "sourceId": "campus-taiyuan",
        "text": "馆址参考：太原市长风商务区广经路5号。中国图书馆学会2024年研讨会通知分别列出长风馆位于太原市长风商务区广经路5号，文源馆位于迎泽区文源巷1号。同一机构有不同馆区，地图点位、到馆交通和服务范围不能混用。本库选择长风馆对应的公共地图参考点，实际入口与当期开馆安排仍须查馆方。本条不把已结束的研讨会作为当前活动提供。"
      },
      {
        "sourceId": "map-taiyuan-1",
        "text": "公共地图记录名：山西博物院。位置描述：山西博物院, 玉门河北沿岸, 兴华街道, 万柏林区, 太原市, 山西省, 030024, 中国。参考点可能是建筑或园区范围，不代表具体入口；当前开放、预约和服务规则尚须向机构核验。"
      }
    ],
    "scope": "公共地图索引；没有将这些记录当作机构官方开放、预约或服务承诺",
    "scopeLevel": "editorial",
    "cityId": "taiyuan",
    "status": "published",
    "verification": "editorial",
    "verifiedAt": null,
    "documentRead": false,
    "createdAt": "2026-10-31T00:00:00.000Z"
  }
];