import axiox from './ajax';
import {AjaxUrl} from './serverPublic';
import { commonParams } from './config.js';
const data = Object.assign({}, commonParams, {
  platform: 'yqq',
  hostUin: 0,
  sin: 0,
  ein: 29,
  sortId: 5,
  needNewCode: 0,
  categoryId: 10000000,
  rnd: Math.random(),
  format: 'json'
});
export const getRecommendList = function() {
  return axiox.get(AjaxUrl.recommendListUrl, data).then((res) => {
    return Promise.resolve(res.data);
  });
};

export const getSlideList = function() {
  return axiox.get(AjaxUrl.slideList).then((res) => {
    return Promise.resolve(res.data);
  });
};
