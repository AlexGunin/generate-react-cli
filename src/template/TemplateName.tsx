import React from 'react';
import { observer } from 'mobx-react';
import { TemplateNameViewModel } from './services/TemplateNameViewModel';

export interface Props {
  templateNameViewModel: TemplateNameViewModel;
}

const anchor = 'TemplateName';

const _TemplateName = ({ templateNameViewModel }: Props) => {
  return <></>;
};

export const TemplateName = observer(_TemplateName);
