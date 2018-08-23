import axiox from './ajax';
import { AjaxUrl } from './serverPublic';
import { commonParams } from './config.js';

export const getSingerList = function (singerId) {
  const data = Object.assign({}, commonParams, {
    loginUin: 0,
    hostUin: 0,
    needNewCode: 0,
    platform: 'yqq',
    order: 'listen',
    begin: 0,
    num: 80,
    songstatus: 1,
    singermid: singerId
  });
  return axiox.get(AjaxUrl.singerDetailUrl, data).then((res) => {
    return Promise.resolve(res.data);
  });
};
