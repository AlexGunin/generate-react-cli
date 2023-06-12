import React from 'react';
import { Skeleton as CoreSkeleton } from '@omnichats/core';
import { SkeletonWrapper } from '../../../pages/BaseElements/BaseElements';

interface Props {
  delay?: number;
}

const SkeletonItem = ({ delay }: Props) => (
  <SkeletonWrapper>
    <CoreSkeleton delay={delay} height="38px" width="28px" style={{ marginRight: 12, marginLeft: 24 }} />
    <CoreSkeleton delay={delay} height="38px" width="281px" style={{ marginRight: 12, marginLeft: 12 }} />
    <CoreSkeleton delay={delay} height="38px" width="224px" style={{ marginRight: 12, marginLeft: 12 }} />
    <CoreSkeleton delay={delay} height="38px" width="224px" style={{ marginRight: 12, marginLeft: 12 }} />
    <CoreSkeleton delay={delay} height="38px" width="412px" style={{ marginRight: 12, marginLeft: 12 }} />
  </SkeletonWrapper>
);

export const Skeleton = () => (
  <>
    <SkeletonItem />
    <SkeletonItem delay={0.5} />
    <SkeletonItem delay={1} />
  </>
);
