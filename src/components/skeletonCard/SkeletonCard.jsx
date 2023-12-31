import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Card } from '../ui/card';
import { Skeleton } from '../ui/skeleton';

const SkeletonCard = () => {
  return (
    <>
      <Card className="bg-[rgb(255,255,255)] min-h-[350px]">
        <CardContent className="pt-6">
          <Skeleton className="rounded-lg w-full h-[300px] lg:h-[200px]" />
        </CardContent>
        <CardHeader>
          <CardTitle>{<Skeleton className="h-5 w-[50%]" />}</CardTitle>
          <CardDescription>
            <Skeleton className="h-10" />
          </CardDescription>
        </CardHeader>
        <div className="flex items-center justify-between p-6 pt-0">
          <div className="text-2xl flex-grow">
            <Skeleton className="h-4 w-[50%]" />
          </div>
        </div>
        <CardFooter className="block">
          <Skeleton className="h-12 w-[50%]" />
        </CardFooter>
      </Card>
    </>
  );
};

export default SkeletonCard;
