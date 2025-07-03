import Skeleton from 'react-loading-skeleton';

export default function MealSkeletonCard() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm p-5">
      <Skeleton height={192} className="mb-4" />
      <Skeleton height={24} width="80%" className="mb-2" />
      <Skeleton height={20} width={100} />
    </div>
  );
}
