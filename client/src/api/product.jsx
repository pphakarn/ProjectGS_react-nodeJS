import axios from "axios";

export const createProduct = async (token, form) => {
  // code body
  return axios.post("http://a6033c0c47b864a2da8be7492fcf8988-86221655358c006a.elb.ap-southeast-1.amazonaws.com/api/product", form, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const listProduct = async (count = 20) => {
  // code body
  return axios.get("http://a6033c0c47b864a2da8be7492fcf8988-86221655358c006a.elb.ap-southeast-1.amazonaws.com/api/products/" + count);
};

export const readProduct = async (token, id) => {
  // code body
  return axios.get("http://a6033c0c47b864a2da8be7492fcf8988-86221655358c006a.elb.ap-southeast-1.amazonaws.com/api/product/" + id, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const deleteProduct = async (token, id) => {
  // code body
  return axios.delete("http://a6033c0c47b864a2da8be7492fcf8988-86221655358c006a.elb.ap-southeast-1.amazonaws.com/api/product/" + id, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const updateProduct = async (token, id, form) => {
  // code body
  return axios.put("http://a6033c0c47b864a2da8be7492fcf8988-86221655358c006a.elb.ap-southeast-1.amazonaws.com/api/product/" + id, form, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const uploadFiles = async (token, form) => {
  // code
  // console.log('form api frontent', form)
  return axios.post(
    "http://a6033c0c47b864a2da8be7492fcf8988-86221655358c006a.elb.ap-southeast-1.amazonaws.com/api/images",
    {
      image: form,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const removeFiles = async (token, public_id) => {
  // code
  // console.log('form api frontent', form)
  return axios.post(
    "http://a6033c0c47b864a2da8be7492fcf8988-86221655358c006a.elb.ap-southeast-1.amazonaws.com/api/removeimages",
    {
      public_id,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const searchFilters = async (arg) => {
  // code body
  return axios.post("http://a6033c0c47b864a2da8be7492fcf8988-86221655358c006a.elb.ap-southeast-1.amazonaws.com/api/search/filters", arg);
};

export const listProductBy = async (sort, order, limit) => {
  // code body
  return axios.post("http://a6033c0c47b864a2da8be7492fcf8988-86221655358c006a.elb.ap-southeast-1.amazonaws.com/api/productby", {
    sort,
    order,
    limit,
  });
};