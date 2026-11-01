export const categories = [
 ['overview','城市概览','Compass'],['history','历史文化','Landmark'],['transport','交通出行','TrainFront'],['culture','公共文化','BookOpen'],['park','公园运动','Trees'],['travel','景区游览','Camera'],['event','展览活动','CalendarDays'],['food','饮食物产','Utensils'],['housing','居住社区','House'],['career','就业人才','BriefcaseBusiness'],['education','教育家庭','GraduationCap'],['health','医疗服务','HeartPulse'],['service','日常办事','ClipboardList'],['industry','产业园区','Building2'],['accessibility','无障碍服务','Accessibility'],['international','国际服务','Globe']
].map(([id,name,icon])=>({id,name,icon}));
export const districts=['东城区','西城区','朝阳区','海淀区','丰台区','石景山区','通州区','顺义区','昌平区','大兴区','门头沟区','房山区','怀柔区','平谷区','密云区','延庆区'];
export const sourceSeeds=[
 ['beijing','首都之窗','北京市人民政府','https://www.beijing.gov.cn/','portal','reviewed'],
 ['data','北京市公共数据开放平台','北京市公共数据开放平台','https://data.beijing.gov.cn/','dataset','reviewed'],
 ['gazetteer','北京市数字方志馆','北京市地方志相关机构','https://bjsfzg.bjdsdfz.cn/','history','reviewed'],
 ['culture','北京市文化和旅游局','北京市文化和旅游局','https://whlyj.beijing.gov.cn/','portal','catalogued'],
 ['heritage','北京市文物局','北京市文物局','https://wwj.beijing.gov.cn/','portal','catalogued'],
 ['transport','北京市交通委员会','北京市交通委员会','https://jtw.beijing.gov.cn/','portal','catalogued'],
 ['subway','北京地铁','北京市地铁运营有限公司','https://www.bjsubway.com/','operator','catalogued'],
 ['parks','北京市园林绿化局','北京市园林绿化局','https://yllhj.beijing.gov.cn/','portal','catalogued'],
 ['dpm','故宫博物院','故宫博物院','https://www.dpm.org.cn/','institution','reviewed'],
 ['capital','首都博物馆','首都博物馆','https://www.capitalmuseum.org.cn/','institution','reviewed'],
 ['national','中国国家博物馆','中国国家博物馆','https://www.chnmuseum.cn/','institution','catalogued'],
 ['library','首都图书馆','首都图书馆','https://www.clcn.net.cn/','institution','catalogued'],
 ['housing','北京市住房和城乡建设委员会','北京市住房和城乡建设委员会','https://zjw.beijing.gov.cn/','portal','catalogued'],
 ['career','北京市人力资源和社会保障局','北京市人力资源和社会保障局','https://rsj.beijing.gov.cn/','portal','catalogued'],
 ['education','北京市教育委员会','北京市教育委员会','https://jw.beijing.gov.cn/','portal','catalogued'],
 ['health','北京市卫生健康委员会','北京市卫生健康委员会','https://wjw.beijing.gov.cn/','portal','catalogued'],
 ['insurance','北京市医疗保障局','北京市医疗保障局','https://ybj.beijing.gov.cn/','portal','catalogued'],
 ['fund','北京住房公积金网','北京住房公积金管理中心','https://gjj.beijing.gov.cn/','portal','catalogued'],
 ['international','北京国际版门户网站','北京市人民政府','https://english.beijing.gov.cn/','portal','catalogued'],
 ['stats','北京市统计局','北京市统计局','https://tjj.beijing.gov.cn/','portal','catalogued']
].map(([id,title,publisher,url,type,status])=>({id,title,publisher,url,type,status,checkedAt:status==='reviewed'?'2026-10-29':null,refreshDays:type==='history'?180:7}));
// Editorial summaries: not copied articles. Coordinates are approximate WGS84 points,
// for orientation only; entrance/accessibility/price require their own verification.
const placeRows=[
 ['gugong','故宫博物院','东城区','travel',116.397,39.918,'沿着宫殿与院落，读懂一座城的历史。','宫廷建筑,历史,中轴线','dpm',false,180],
 ['capital-museum','首都博物馆','西城区','culture',116.343,39.906,'从城市历史与文物出发，建立对北京的第一印象。','博物馆,室内,历史,亲子','capital',true,120],
 ['national-museum','中国国家博物馆','东城区','culture',116.402,39.905,'通过专题展览与藏品，展开跨越时代的文化探索。','博物馆,室内,历史,亲子','national',true,150],
 ['jingshan','景山公园','西城区','park',116.397,39.925,'从城市中心的山景，观察中轴与老城的关系。','公园,中轴线,登高','parks',false,90],
 ['beihai','北海公园','西城区','park',116.389,39.925,'在水面、园林与建筑之间，慢下来认识北京。','公园,园林,历史','parks',false,120],
 ['tiantan','天坛公园','东城区','travel',116.407,39.882,'把坛庙建筑与城市礼制放在一起理解。','历史,中轴线,公园','parks',false,150],
 ['shichahai','什刹海','西城区','history',116.386,39.941,'从湖岸与胡同，观察老城的水系和街巷。','胡同,历史,城市漫步','gazetteer',false,90],
 ['nanluogu','南锣鼓巷','东城区','history',116.403,39.937,'以街巷格局为线索，理解北京胡同的空间。','胡同,历史,城市漫步','gazetteer',false,60],
 ['summer-palace','颐和园','海淀区','travel',116.272,39.999,'从湖山与园林建筑，探索皇家园林。','园林,历史,公园','culture',false,180],
 ['olympic','奥林匹克森林公园','朝阳区','park',116.391,40.022,'在较大的绿地空间中安排散步与户外活动。','公园,运动,自然','parks',false,90],
 ['capital-library','首都图书馆','朝阳区','culture',116.46,39.874,'把阅读与公共文化活动放进日常生活。','阅读,室内,亲子','library',true,90],
 ['canal-museum','北京大运河博物馆','通州区','culture',116.718,39.87,'从运河与城市的关系出发，认识北京。','运河,博物馆,室内,亲子','capital',true,120],
 ['fragrant-hills','香山公园','海淀区','park',116.189,39.994,'了解西山风景与园林，登山需考虑体力。','公园,登山,自然','parks',false,150],
 ['shougang','首钢园','石景山区','industry',116.158,39.913,'以工业遗存为线索，观察城市空间的更新。','工业遗产,建筑,城市更新','beijing',false,120],
 ['yuanboyuan','北京园博园','丰台区','park',116.202,39.861,'围绕不同园林主题安排户外探索。','园林,公园,亲子','parks',false,120],
 ['mutianyu','慕田峪长城','怀柔区','travel',116.57,40.432,'在山地环境中认识长城，需提前核对交通与天气。','长城,登山,历史','culture',false,180],
 ['badaling','八达岭长城','延庆区','travel',116.016,40.358,'在长城游览中理解地形与历史防御空间。','长城,登山,历史','culture',false,180],
 ['ming-tombs','明十三陵','昌平区','travel',116.225,40.255,'以陵寝与山地景观为线索认识历史。','历史,建筑,户外','culture',false,150],
 ['zhoukoudian','周口店北京人遗址','房山区','history',115.925,39.69,'从考古遗址出发了解北京地区的史前历史。','考古,历史,亲子','heritage',false,120],
 ['mentougou','门头沟文化探索','门头沟区','overview',116.101,39.941,'了解京西山地、村落与交通之间的关系。','京西,历史,自然','gazetteer',false,90],
 ['shunyi','顺义生活服务入口','顺义区','service',116.654,40.13,'从官方入口了解本区公共服务与办事信息。','社区,办事,生活','beijing',true,60],
 ['daxing','大兴生活服务入口','大兴区','service',116.341,39.727,'查询区域公共服务，结合实际地址确认服务范围。','社区,办事,生活','beijing',true,60],
 ['pinggu','平谷自然与文化','平谷区','overview',117.121,40.14,'把自然环境与地方文化联系起来认识平谷。','自然,地方文化,周末','gazetteer',false,90],
 ['miyun','密云自然与文化','密云区','overview',116.843,40.377,'了解山水环境与地方历史，出行前核对天气交通。','自然,地方文化,周末','gazetteer',false,90]
];
export const placeSeeds=placeRows.map(([id,name,district,category,lng,lat,summary,tags,sourceId,indoor,duration])=>({id,name,district,category,lng,lat,summary,tags:tags.split(','),sourceId,indoor,duration,coordinateStatus:'approximate',opening:'开放及预约要求请通过官方入口核实',price:null,accessibility:'无障碍入口与设施尚待逐项核验',status:'published',verifiedAt:null}));
const articles=[
 ['city-first','初来北京：先建立一张自己的城市地图','overview','全市','认识北京,区域,第一次,初来','先标记到达点、住处和工作或学习地点，再围绕这些地点了解交通与公共服务。行政区、生活片区和地铁站周边是不同的空间尺度，比较区域时应使用同一尺度。','beijing'],
 ['city-data','从数据认识北京','overview','全市','人口,经济,统计,城市','查询人口、经济等指标时，记录年份、地区范围和统计口径。北京市统计局与公共数据开放平台可作为检索入口；本条不提供未经核实的最新数值。','stats'],
 ['old-city','从地方志进入北京的历史','history','全市','胡同,历史,地名,街道,老城','北京市数字方志馆提供旧志、新志与年鉴等资源。研究同一条街道时，应区分旧地名、现地名和记载年代，并把文献记载与现场观察分开。','gazetteer'],
 ['axis','如何探索北京中轴线','history','东城区','中轴线,历史,建筑,文化','可以以南北方向上的城市空间和建筑关系为观察线索。探索前分别核实各地点的预约、开放和出入口；不要将多个大型场馆压在同一半天。具体历史判断应回到专题文献核对。','gazetteer'],
 ['arrival','抵达北京后的交通安排','transport','全市','机场,车站,交通,地铁,公交,抵达,通勤','先确认具体机场或车站、到达时间和目的地。公共交通末班与临时调整需通过交通运营单位核实；本地资料库不提供实时末班、车流或余票。可从北京地铁和交通主管部门的官方渠道查询。','transport'],
 ['commute','比较生活区域：把通勤与配套一起看','housing','全市','租房,居住,通勤,住哪里,区域,上班','先给出工作地点、可接受通勤时间、预算和出行方式，再比较候选区域。看房时核实实际交通、噪声、合同和费用。当前没有接入实时房源与成交租金，不能据此断言某区域租金或通勤时长。','housing'],
 ['reading','把公共文化设施放进日常生活','culture','全市','图书馆,阅读,文化馆,夜校,讲座','可从图书馆、文化馆和博物馆的官方渠道查阅服务及活动。借阅资格、预约名额、课程报名与临时调整需要逐项确认。收藏感兴趣的地点后，可以在个人清单中持续安排。','library'],
 ['capital-rule','首都博物馆参观规则：以官方公告为准','culture','西城区','首博,首都博物馆,闭馆,开放,博物馆','2026年10月29日查看的首都博物馆首页列出9:00—17:00开放、16:00停止入馆、每周二闭馆。节假日与临时公告可能调整，请出行前再次查看参观指南。本条记录核验时的网页内容，不代表实时开馆。','capital'],
 ['park-plan','公园与户外活动的安排方法','park','全市','公园,运动,散步,亲子,登山','区分城市散步、园林参观和山地徒步；根据同行者体力、天气和交通调整。地图中的近似点位不代表具体无障碍入口，山地路线不能仅靠直线距离判断难度。','parks'],
 ['museum-booking','博物馆预约与替代安排','travel','全市','预约,门票,故宫,博物馆,闭馆','故宫博物院官网设有开放时间、在线订票、交通路线与参观须知入口。不同场馆的规则各自独立，不能套用同一预约时间。没有预约成功时，可切换到其他已确认开放的公共文化空间。','dpm'],
 ['events-how','查找本周展览与讲座','event','全市','周末,展览,活动,讲座,演出,节庆','优先查看场馆与主办方当期公告，核对开始结束日期、场地、报名和取消通知。本产品只将具备日期且经审核的活动列入当前活动；没有已核验活动时提供官方查找入口，不生成虚构活动。','culture'],
 ['food-culture','从地方资料理解北京饮食','food','全市','美食,小吃,北京菜,老字号,饮食','可以围绕地方物产、节俗与饮食记载阅读地方志，再结合授权的当代体验资料补充。官方名录不等于每家门店的实时营业、价格和口味评价；当前不提供未经核验的商家排名。','gazetteer'],
 ['career-start','初到北京的就业与人才服务','career','全市','工作,招聘,就业,人才,补贴,创业','通过人社部门官方渠道查询公共就业服务与政策。申请条件通常涉及个人身份、单位、地区和时间，应逐条核对现行文件与受理入口。资料不足时不能直接判断个人是否符合条件。','career'],
 ['school-start','带孩子来北京：教育信息核对清单','education','全市','孩子,学校,入学,教育,托育,亲子','先确认居住区、孩子年龄、拟入学年份与实际情况，再查询市区教育部门当年公告。招生要求和时间安排应以对应区当期文件为准，本条不作入学资格结论。','education'],
 ['health-start','就医与医保服务入口','health','全市','医院,就医,挂号,医保,陪护','查询医院信息可从卫健部门、医院官网和医保部门入手。挂号、费用与医保待遇需通过相应官方渠道核实。紧急情况应寻求当地急救服务；本产品提供信息导航，不进行诊断。','health'],
 ['service-start','初来北京的办事准备','service','全市','居住证,社保,办事,证照,登记','按个人情况建立居住、就业、社保与证照的待办清单。先看主管部门的现行办事指南，核实适用对象、材料、办理方式和受理地点，避免使用过期的攻略材料清单。','beijing'],
 ['fund-start','住房公积金查询与办事','service','全市','公积金,租房提取,贷款','公积金缴存、提取和贷款涉及不同条件。请通过北京住房公积金管理中心查询现行办事指南；本产品未接入个人账户，不读取余额，也不代替官方资格审核。','fund'],
 ['industry-city','从产业与园区认识工作生活空间','industry','全市','园区,产业,亦庄,中关村,工作','了解产业布局时，可交叉查看统计资料、政府发布和园区官方介绍。规划目标、已建成项目和正在招商的项目应分开记录，不能把规划直接当成当前状况。','stats'],
 ['access-start','带老人或使用轮椅出行','accessibility','全市','老人,父母,轮椅,无障碍,步行,婴儿车','出行前向场馆确认无障碍出入口、电梯、卫生间与借用设施。减少地点数量，预留休息和接驳。当前点位无障碍信息尚待核验，不能仅因标记为室内就视为适合轮椅。','beijing'],
 ['international-start','外籍来访者的北京服务入口','international','全市','外国,外籍,英文,国际,入境','北京国际版门户网站可作为来京生活、工作与旅行的官方信息入口。签证、入境和个人资格应查看对应主管机关现行要求。本产品当前仅提供中文界面及官方多语言入口。','international']
];
export const articleSeeds=articles.map(([id,title,category,district,tags,body,sourceId])=>({id,title,category,district,tags:tags.split(','),body,sourceId,status:'published',verification: ['capital-rule','museum-booking','old-city'].includes(id)?'source-checked':'editorial',verifiedAt:['capital-rule','museum-booking','old-city'].includes(id)?'2026-10-29':null,expiresAt:id==='capital-rule'?'2026-11-05':null,createdAt:'2026-10-29T10:00:00.000Z'}));
export const checklistSeeds=[
 {id:'arrive',title:'安顿下来的第一周',audience:'新居民',items:['标记住处与工作／学习地点','通过官方渠道确认通勤路线','寻找附近图书馆、公园与公共服务入口','按个人情况核对居住登记与证照事项','了解社区及物业服务联系方式']},
 {id:'visit',title:'第一次来北京',audience:'游客',items:['确认车站／机场与到达时间','核实住宿位置和到达交通','查看场馆官方预约与开放要求','给行程保留休息和交通时间','准备下雨或闭馆时的替代安排']},
 {id:'family',title:'带父母轻松出行',audience:'家庭',items:['向场馆核实无障碍出入口和电梯','减少每日游览点并安排休息','关注天气与体力情况','确认洗手间、接驳和就餐安排','保存同行者联系方式和返程方案']}
];
