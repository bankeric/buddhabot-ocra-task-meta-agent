import { getBackEndUrl } from '@/configs/config';
import { Agent, Message, Section, SendMessageProps } from '@/types';
import axios from 'axios';

const url = getBackEndUrl();
const apiToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMjVmMmU1ZTUtOGUxMi00MzU1LWE1MjYtYmM1MzQ2NGFlYTQwIiwiZXhwIjoxNzU2NjIzMjMxLCJpYXQiOjE3NTY1MzY4MzF9.KTagw5Hvacbgnj0OkYqdSpPlufl7b7wwzwl-HDK6GNw';

export const getConversations = async (
  offset: number = 0,
  limit: number = 20,
) => {
  const response = await axios({
    method: 'GET',
    url: `${url}/api/v1/sections`,
    headers: {
      Authorization: `Bearer ${apiToken}`,
    },
    params: {
      offset,
      limit,
    },
  });
  return response.data as Section[];
};

export const getAgents = async (
  limit: number = 10,
  language: 'vi' | 'en' = 'vi',
) => {
  const response = await axios({
    method: 'GET',
    url: `${url}/api/v1/agents`,
    headers: {
      Authorization: `Bearer ${apiToken}`,
    },
    params: {
      language,
      limit,
    },
  });
  return response.data as Agent[];
};

export const getMessages = async (chatId: string) => {
  const response = await axios({
    method: 'GET',
    url: `${url}/api/v1/sections/${chatId}/messages`,
    headers: {
      Authorization: `Bearer ${apiToken}`,
    },
  });
  return response.data as Message[];
};

export const sendMessage = async (data: SendMessageProps) => {
  const response = await axios({
    method: 'POST',
    url: `${url}/api/v1/chat/${data.session_id}/ask`,
    headers: {
      Authorization: `Bearer ${apiToken}`,
    },
    data,
    responseType: 'stream',
  });
  return response.data;
};
