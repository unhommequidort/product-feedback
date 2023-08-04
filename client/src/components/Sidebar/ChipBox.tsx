import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { useNavigate } from 'react-router';

import { categoryApi } from '@/redux/api/categoryApi';
import { ICategory } from '@/redux/api/types';

import RoundedBox from '../shared/containers/RoundedBox';
import { Chip } from '../shared/interactiveElements/Chip/Chip';

import 'react-loading-skeleton/dist/skeleton.css';

export const ChipBox = () => {
  const { isLoading, isFetching } =
    categoryApi.endpoints.getCategories.useQuery(null, {
      skip: false,
      refetchOnMountOrArgChange: true,
    });

  const navigate = useNavigate();

  const categories = categoryApi.endpoints.getCategories.useQueryState(null, {
    selectFromResult: ({ data }) => data as ICategory[],
  });

  const range = (start: number, end: number) => {
    return Array.from({ length: end - start }, (_, i) => start + i);
  };

  const randomNumber = (min: number, max: number): number => {
    return Math.random() * (max - min) + min;
  };

  return (
    <RoundedBox className="flex flex-wrap content-start gap-[14px] p-6 h-[11.6875rem] xl:h-[10.375rem]">
      {isLoading || isFetching ? (
        <SkeletonTheme baseColor="#eee" highlightColor="#ddd">
          {range(0, 6).map((i) => {
            const width = Math.floor(randomNumber(38, 80)).toString() + 'px';
            return (
              <Skeleton
                key={i}
                containerClassName="flex-1 mb-0"
                style={{ width }}
                className="rounded-10px inline-block"
                height={32}
              />
            );
          })}
        </SkeletonTheme>
      ) : (
        <>
          <Chip
            value="All"
            onClick={() =>
              navigate({
                pathname: '/',
                search: '',
              })
            }
          />
          {categories?.map((category) => (
            <Chip
              key={category.name}
              value={category.name}
              onClick={() =>
                navigate({
                  pathname: '/',
                  search: `?c=${category.name}`,
                })
              }
            />
          ))}
        </>
      )}
    </RoundedBox>
  );
};

export default ChipBox;
