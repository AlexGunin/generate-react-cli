import { BaseViewModelWithDnd } from '@omnichats/core';
import { makeObservable } from 'mobx';
import { TemplateNameUseCases } from './TemplateNameUseCases';

export class TemplateNameViewModel extends BaseViewModelWithDnd<any, any> {
  constructor(private readonly templateNameUseCases: TemplateNameUseCases) {
    super(templateNameUseCases);
    makeObservable(this);
  }
}
