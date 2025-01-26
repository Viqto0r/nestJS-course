import { ETopLevelCategory } from 'src/top-page/top-page.model';

type TRouteMap = Record<ETopLevelCategory, string>;

export const CATEGORY_URL: TRouteMap = {
  [ETopLevelCategory.Courses]: '/courses',
  [ETopLevelCategory.Services]: '/services',
  [ETopLevelCategory.Books]: '/books',
  [ETopLevelCategory.Products]: '/products',
};
