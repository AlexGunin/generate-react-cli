import React from 'react';
import { observer } from 'mobx-react';
import { TemplateNameFormViewModel } from '../../services/TemplateNameFormViewModel';

interface Props {
  templateNameFormViewModel: TemplateNameFormViewModel;
}

const _TemplateNameForm = ({ templateNameFormViewModel }: Props) => {
  const { formItem } = templateNameFormViewModel;

  return <></>;
};

export const TemplateNameForm = observer(_TemplateNameForm);
