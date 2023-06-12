import { BaseUseCasesDndHandler } from '@omnichats/core';
import { TemplateNameModel } from './TemplateNameModel';

export class TemplateNameUseCases extends BaseUseCasesDndHandler<any, any> {
  constructor(private readonly templateNameModel: TemplateNameModel) {
    super(templateNameModel);
  }
}
