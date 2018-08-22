import axiox from './ajax';
import { AjaxUrl } from './serverPublic';
import { commonParams } from './config.js';

const data = Object.assign({}, commonParams, {
  channel: 'singer',
  page: 'list',
  key: 'all_all_all',
  pagesize: 100,
  pagenum: 1,
  hostUin: 0,
  needNewCode: 0,
  platform: 'yqq'
});

export const getSingerList = function () {
  return axiox.get(AjaxUrl.SingerListUrl, data).then((res) => {
    return Promise.resolve(res.data);
  });
};
