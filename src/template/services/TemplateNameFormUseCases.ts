import { BaseFormUseCases } from '@omnichats/core';
import { TemplateNameModel } from './TemplateNameModel';

export class TemplateNameFormUseCases extends BaseFormUseCases<any, any> {
  constructor(private readonly templateNameModel: TemplateNameModel) {
    super(templateNameModel);
  }
}
