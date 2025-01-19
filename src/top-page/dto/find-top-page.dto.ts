import { IsEnum } from 'class-validator';
import { ETopLevelCategory } from '../top-page.model';

export class FindTopPageDto {
  @IsEnum(ETopLevelCategory)
  firstCategory: ETopLevelCategory;
}
