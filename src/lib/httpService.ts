import { AxiosResponse } from "axios";
import axiosInstance from "./axios-Instance";

type RequestParams = Record<string, unknown>;

interface RequestOptions {
  url: string;
  params?: RequestParams;
  data?: unknown;
}

const get = async <T>({ url, params = {} }: RequestOptions): Promise<T> => {
  try {
    const res: AxiosResponse<T> = await axiosInstance.get(url, { params });
    return res.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

const post = async <T>({
  url,
  data = {},
  params = {},
}: RequestOptions): Promise<T> => {
  try {
    const res: AxiosResponse<T> = await axiosInstance.post(url, data, {
      params,
    });
    return res.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

const postFormData = async <T>({
  url,
  data = {},
  params = {},
}: RequestOptions): Promise<T> => {
  try {
    const res: AxiosResponse<T> = await axiosInstance.postForm(url, data, {
      headers: { "Content-Type": "multipart/form-data" },
      params,
    });
    return res.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

const patch = async <T>({
  url,
  data = {},
  params = {},
}: RequestOptions): Promise<T> => {
  try {
    const res: AxiosResponse<T> = await axiosInstance.patch(url, data, {
      params,
    });
    return res.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

const patchFormData = async <T>({
  url,
  data = {},
  params = {},
}: RequestOptions): Promise<T> => {
  try {
    const res: AxiosResponse<T> = await axiosInstance.patch(url, data, {
      params,
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

const put = async <T>({
  url,
  data = {},
  params = {},
}: RequestOptions): Promise<T> => {
  try {
    const res: AxiosResponse<T> = await axiosInstance.put(url, data, {
      params,
    });
    return res.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

const deleteRequest = async <T>({
  url,
  params = {},
}: RequestOptions): Promise<T> => {
  try {
    const res: AxiosResponse<T> = await axiosInstance.delete(url, { params });
    return res.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

const httpService = {
  get,
  post,
  postFormData,
  patch,
  patchFormData,
  put,
  delete: deleteRequest,
};

export default httpService;
