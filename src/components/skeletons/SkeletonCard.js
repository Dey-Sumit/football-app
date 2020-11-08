import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
// background-image: linear-gradient( 90deg,#676262c4,#6c6a6a,#6c6a6a);
const SkeletonCard = ({ width, height, count, style }) => {
    return (
        <SkeletonTheme color="#343a40" highlightColor="#3c4147" >
            <Skeleton width={width} height={height} count={count}
                style={style} />
        </SkeletonTheme>
    );
};

export default SkeletonCard;