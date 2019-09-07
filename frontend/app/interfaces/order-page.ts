import { Order } from './order';

export interface OrderPage {
  count: number
  items: Order[]
  page: number
  pageSize: number
  total: number
}