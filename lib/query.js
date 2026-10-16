export const normalize=value=>String(value??'').normalize('NFKC').toLocaleLowerCase('ko').replace(/\s+/g,'');
export function matches(record,filter={}){
 if(filter.sido&&record.sido!==filter.sido)return false;
 if(filter.sigungu&&record.sigungu!==filter.sigungu&&!record.sigungu.startsWith(filter.sigungu+' '))return false;
 if(filter.query&&!(record.search??normalize(record.name+' '+record.address)).includes(filter.normalizedQuery??normalize(filter.query)))return false;
 if(filter.count!==null&&filter.count!==undefined&&record.topics.length!==Number(filter.count))return false;
 const topics=filter.topics??[];
 return !topics.length||(filter.mode==='or'?topics.some(t=>record.topics.includes(t)):topics.every(t=>record.topics.includes(t)));
}
export function topicCount(facts){return new Set(facts.filter(f=>f.eligible).map(f=>({tourism:'taste',localTaste:'taste',model:'hygiene'}[f.topic??f.axis]??f.topic??f.axis))).size;}
export function safeURL(value){try{const u=new URL(value);return ['https:','http:'].includes(u.protocol)?u.href:null}catch{return null}}
export function mapURL(record,provider='kakao'){
 const query=encodeURIComponent(record.name+' '+record.address);
 if(provider==='naver')return 'https://map.naver.com/p/search/'+query;
 if(Number.isFinite(record.lat)&&Number.isFinite(record.lng))return `https://map.kakao.com/link/to/${encodeURIComponent(record.name)},${record.lat},${record.lng}`;
 return 'https://map.kakao.com/link/search/'+query;
}
