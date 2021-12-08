// api基础域名
let mainDomainName = '/devUrl';
let frontEndUrl = 'http://localhost:8082'
if (import.meta.env.MODE === 'test') {
     mainDomainName = "http://172.31.40.171:3000";
} 
if (import.meta.env.MODE === 'production') {
    mainDomainName = "";
}
if (import.meta.env.MODE === 'development') {
    mainDomainName = "/devUrl";
}
if (import.meta.env.MODE === 'preview') {
    mainDomainName = "";
}
export default mainDomainName