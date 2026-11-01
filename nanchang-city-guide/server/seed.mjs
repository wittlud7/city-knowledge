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
    "title": "第一次来南昌",
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
    "id": "nanchang",
    "title": "南昌市政府门户",
    "publisher": "南昌市人民政府",
    "url": "https://www.nc.gov.cn/",
    "type": "portal",
    "status": "catalogued",
    "checkedAt": null,
    "refreshDays": 7,
    "documentRead": false,
    "cityId": "nanchang",
    "scopeLevel": "local"
  },
  {
    "id": "map-nanchang-0",
    "title": "江西省图书馆：公开地图数据记录",
    "publisher": "OpenStreetMap contributors（非机构官网）",
    "url": "https://www.openstreetmap.org/way/971091005",
    "type": "dataset",
    "status": "reviewed",
    "checkedAt": "2026-10-31",
    "refreshDays": 90,
    "documentRead": false,
    "scopeLevel": "local",
    "cityId": "nanchang",
    "scope": "地图名称与参考位置；不是机构官方服务说明，也未核验当前开放或入口",
    "readMethod": "读取Nominatim返回的OpenStreetMap记录，排除地铁站、公交站、跨城结果及名称不符项"
  },
  {
    "id": "map-nanchang-1",
    "title": "江西省博物馆：公开地图数据记录",
    "publisher": "OpenStreetMap contributors（非机构官网）",
    "url": "https://www.openstreetmap.org/way/971091001",
    "type": "dataset",
    "status": "reviewed",
    "checkedAt": "2026-10-31",
    "refreshDays": 90,
    "documentRead": false,
    "scopeLevel": "local",
    "cityId": "nanchang",
    "scope": "地图名称与参考位置；不是机构官方服务说明，也未核验当前开放或入口",
    "readMethod": "读取Nominatim返回的OpenStreetMap记录，排除地铁站、公交站、跨城结果及名称不符项"
  },
  {
    "id": "campus-nanchang",
    "title": "江西省博物馆：馆址线索与预约表述不能混用",
    "publisher": "博物馆大全（第三方目录，非机构官网）",
    "url": "https://www.bw10000.com/topic/2475/appoint",
    "type": "institution",
    "status": "reviewed",
    "checkedAt": "2026-10-31",
    "refreshDays": 30,
    "documentRead": true,
    "publishedAt": null,
    "scope": "第三方目录中的馆址线索；预约规则未获馆方原文核验",
    "scopeLevel": "local",
    "cityId": "nanchang",
    "readMethod": "已打开并读取馆区说明，仅采用原文支持的事实，未以历史资料承诺当前开放"
  }
];
export const placeSeeds=[
  {
    "id": "map-nanchang-0",
    "name": "江西省图书馆",
    "district": "全市",
    "category": "culture",
    "lng": 115.8757519,
    "lat": 28.7073547,
    "summary": "公共地图记录名：江西省图书馆。位置描述：江西省图书馆, 666号, 赣江北大道, 凤凰村, 凤凰洲街道, 南昌市, 红谷滩区, 南昌市, 江西省, 330000, 中国。参考点可能是建筑或园区范围，不代表具体入口；当前开放、预约和服务规则尚须向机构核验。",
    "tags": [
      "图书馆",
      "公共文化",
      "室内",
      "阅读与文化"
    ],
    "sourceId": "map-nanchang-0",
    "sourceIds": [
      "map-nanchang-0"
    ],
    "indoor": true,
    "duration": 90,
    "coordinateStatus": "approximate",
    "coordinateSource": {
      "publisher": "© OpenStreetMap contributors",
      "url": "https://www.openstreetmap.org/way/971091005",
      "license": "ODbL 1.0",
      "licenseUrl": "https://opendatacommons.org/licenses/odbl/1-0/",
      "checkedAt": "2026-10-31",
      "osmId": "way/971091005",
      "query": "南昌 江西省图书馆"
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
    "id": "map-nanchang-1",
    "name": "江西省博物馆（赣江北大道馆址参考点）",
    "district": "全市",
    "category": "culture",
    "lng": 115.8769495,
    "lat": 28.7092504,
    "summary": "馆址参考：南昌市赣江北大道698号。这份第三方目录列出江西省博物馆馆址为南昌市赣江北大道698号，并指向馆方官网和公众号。页内预约核验方式的不同段落存在不一致，因此本库只将地址用于区分赣江北大道与新洲路的地图记录，不采纳其中放票、二维码或免预约条件作为当前办理规则。预约与入馆应回到江西省博物馆的官方渠道核实。",
    "tags": [
      "博物馆",
      "公共文化",
      "室内",
      "阅读与文化"
    ],
    "sourceId": "campus-nanchang",
    "sourceIds": [
      "campus-nanchang",
      "map-nanchang-1"
    ],
    "indoor": true,
    "duration": 90,
    "coordinateStatus": "approximate",
    "coordinateSource": {
      "publisher": "© OpenStreetMap contributors",
      "url": "https://www.openstreetmap.org/way/971091001",
      "license": "ODbL 1.0",
      "licenseUrl": "https://opendatacommons.org/licenses/odbl/1-0/",
      "checkedAt": "2026-10-31",
      "osmId": "way/971091001",
      "query": "南昌 江西省博物馆"
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
    "title": "南昌图书馆、博物馆与科普空间：公共地图参考点",
    "category": "culture",
    "district": "全市",
    "tags": [
      "南昌",
      "图书馆",
      "博物馆",
      "科普",
      "阅读",
      "公共文化",
      "位置",
      "地址"
    ],
    "body": "公共地图记录名：江西省图书馆。位置描述：江西省图书馆, 666号, 赣江北大道, 凤凰村, 凤凰洲街道, 南昌市, 红谷滩区, 南昌市, 江西省, 330000, 中国。参考点可能是建筑或园区范围，不代表具体入口；当前开放、预约和服务规则尚须向机构核验。\n\n馆址参考：南昌市赣江北大道698号。这份第三方目录列出江西省博物馆馆址为南昌市赣江北大道698号，并指向馆方官网和公众号。页内预约核验方式的不同段落存在不一致，因此本库只将地址用于区分赣江北大道与新洲路的地图记录，不采纳其中放票、二维码或免预约条件作为当前办理规则。预约与入馆应回到江西省博物馆的官方渠道核实。",
    "sourceId": "map-nanchang-0",
    "sourceIds": [
      "map-nanchang-0",
      "campus-nanchang",
      "map-nanchang-1"
    ],
    "evidence": [
      {
        "sourceId": "map-nanchang-0",
        "text": "公共地图记录名：江西省图书馆。位置描述：江西省图书馆, 666号, 赣江北大道, 凤凰村, 凤凰洲街道, 南昌市, 红谷滩区, 南昌市, 江西省, 330000, 中国。参考点可能是建筑或园区范围，不代表具体入口；当前开放、预约和服务规则尚须向机构核验。"
      },
      {
        "sourceId": "campus-nanchang",
        "text": "馆址参考：南昌市赣江北大道698号。这份第三方目录列出江西省博物馆馆址为南昌市赣江北大道698号，并指向馆方官网和公众号。页内预约核验方式的不同段落存在不一致，因此本库只将地址用于区分赣江北大道与新洲路的地图记录，不采纳其中放票、二维码或免预约条件作为当前办理规则。预约与入馆应回到江西省博物馆的官方渠道核实。"
      }
    ],
    "scope": "公共地图索引；没有将这些记录当作机构官方开放、预约或服务承诺",
    "scopeLevel": "editorial",
    "cityId": "nanchang",
    "status": "published",
    "verification": "editorial",
    "verifiedAt": null,
    "documentRead": false,
    "createdAt": "2026-10-31T00:00:00.000Z"
  }
];