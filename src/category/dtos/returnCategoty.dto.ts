//import { ReturnStateDto } from "src/state/dtos/returnState.dto";
import { CategoryEntity} from "../entities/category.entity"

export class ReturnCategoryDto{
  id: number;
    name: string;
   //state?: ReturnStateDto

    constructor(categoryEntity: CategoryEntity){
       this.id = categoryEntity.id;
       this.name = categoryEntity.name

        //this.state = city.state ? new ReturnStateDto(city.state) : undefined
   }
}