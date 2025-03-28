
import { FoodItem } from '../data/food-data';

export interface CartItem extends FoodItem {
  quantity: number;
}
