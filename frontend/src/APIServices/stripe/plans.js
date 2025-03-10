import axios from "axios";
//create that must return a promise
const BASE_URL = "http://localhost:5000/api/v1/stripe";

//!Create post api
export const paymentIntentAPI = async (planId) => {
  const response = await axios.post(
    `${BASE_URL}/create-payment`,
    {
      subscriptionPlanId: planId,
    },
    {
      withCredentials: true,
    }
  );
  return response.data;
};
//!payment verification
export const paymentVerificationAPI = async (paymentId) => {
  const response = await axios.get(`${BASE_URL}/verify/${paymentId}`, {
    withCredentials: true,
  });
  return response.data;
};
//!Free pln
export const freePlanAPI = async () => {
  const response = await axios.get(`${BASE_URL}/free-plan`, {
    withCredentials: true,
  });
  return response.data;
};

//!Get user plan
export const getUserPlanAPI = async () => {
  const response = await axios.get(`${BASE_URL}/current-plan`, {
    withCredentials: true,
  });
  console.log("User Plan", response.data);
  return response.data;
};
