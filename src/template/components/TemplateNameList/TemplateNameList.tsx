import React from 'react';
import { ScrollBarWithShadow } from '@omnichats/core';
import { observer } from 'mobx-react';
import { TemplateNameViewModel } from '../../services/TemplateNameViewModel';
import { ColumnWrapper } from '../../../pages/BaseElements/BaseElements';
import { Skeleton } from '../Skeleton/Skeleton';

interface Props {
  templateNameViewModel: TemplateNameViewModel;
  children?: React.ReactNode;
}

const _TemplateNameList = ({ templateNameViewModel, children }: Props) => (
  <>
    {templateNameViewModel.isLoading ? (
      <ColumnWrapper $style={{ gap: 12 }}>
        <Skeleton />
      </ColumnWrapper>
    ) : (
      <ScrollBarWithShadow style={{ height: '100%', paddingRight: 0 }}>
        <ColumnWrapper $style={{ gap: 12 }}>{children}</ColumnWrapper>
      </ScrollBarWithShadow>
    )}
  </>
);

export const TemplateNameList = observer(_TemplateNameList);
