import axios from 'axios'

const instance = axios.create({
  baseURL: '/api',
})

export default {
  async get(url: string, params = {}, options = {}): Promise<any> {
    const { data } = await instance.get(url, {
      params,
      ...options,
    })

    return data
  },

  async post(url: string, data: object): Promise<any> {
    const { data: returnedData } = await instance.post(url, data)

    return returnedData
  },

  async put(url: string, data: object): Promise<any> {
    const { data: returnedData } = await instance.put(url, data)

    return returnedData
  },

  async delete(url: string): Promise<any> {
    const { data: returnedData } = await instance.delete(url)

    return returnedData
  },
}
