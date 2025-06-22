import cardStyles from '../Card/Card.module.css';
import { SkeletonBox, SkeletonText } from '../Skeleton';

function RecordCardSkeleton({ className }) {
    return (
        <div className={`${cardStyles.card} ${className}`}>
            <SkeletonBox height={25} className='mb2'/>
            <SkeletonText 
                lines={2} 
                width={200} 
                height={15} 
                gap={10} 
                className='mb4'
            />
            <SkeletonBox height={20} width={300} className='mb2'/>
        </div>
    );
};

export default RecordCardSkeleton;