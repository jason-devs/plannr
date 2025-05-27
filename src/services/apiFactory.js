import api from "./api";

export async function createOne(resource, data) {
  const response = await api.post(`/${resource}`, data);
  return response.data.data.newDoc;
}

export async function getAll(resource, queryObj) {
  const queryStr = Object.keys(queryObj).map(key => `${key}=${queryObj[key]}`);
  const response = await api.get(`/${resource}?${queryStr}`);
  return response.data.data.docs;
}

export async function getOne(resource, resourceId) {
  const response = await api.get(`/${resource}/${resourceId}`);
  return response.data.data.doc;
}

export async function updateOne(resource, resourceId, data) {
  const response = await api.patch(`/${resource}/${resourceId}`, data);
  return response.data.data.updatedDoc;
}

export async function deleteAll(resource, queryObj) {
  const queryStr = Object.keys(queryObj).map(key => `${key}=${queryObj[key]}`);
  const response = await api.delete(`/${resource}/${queryStr}`);
  return response.data.data.deletedCount;
}

export async function deleteOne(resource, resourceId) {
  const response = await api.delete(`/${resource}/${resourceId}`);
  return response.data;
}
