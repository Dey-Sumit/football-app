import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
// background-image: linear-gradient( 90deg,#676262c4,#6c6a6a,#6c6a6a);
const SkeletonCard = ({ width, height, count }) => {
    console.log(width, height, count);
    return (
        <SkeletonTheme color="#343a40" highlightColor="#3c4147" >
            <Skeleton width={width} height={height} count={count} />
        </SkeletonTheme>
    );
};

export default SkeletonCard;