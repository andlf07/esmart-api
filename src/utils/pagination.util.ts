import { Pagination } from '../models/interface/Pagination.interface';

export const pagination = (pager: Pagination) => {
  let { page, pageSize } = pager;

  page = typeof page === 'string' ? parseInt(page) : page;
  pageSize = typeof pageSize === 'string' ? parseInt(pageSize) : pageSize;

  page = page ? page : 1;

  pageSize = pageSize ? pageSize : 12;

  pageSize = pageSize > 50 ? 50 : pageSize;

  return { page, pageSize };
};
