import { action, makeObservable, observable } from 'mobx';
import { BaseFormViewModel, NotificationTypesMessage } from '@omnichats/core';
import { messageInterface } from '@omnichats/core/dist/Interfaces/FormViewModel/FormViewModel';
import { TemplateNameViewModel } from './TemplateNameViewModel';
import { TemplateNameFormUseCases } from './TemplateNameFormUseCases';

export class TemplateNameFormViewModel extends BaseFormViewModel<any, any> {
  constructor(
    protected readonly templateNameViewModel: TemplateNameViewModel,
    protected readonly templateNameFormUseCases: TemplateNameFormUseCases
  ) {
    super(templateNameFormUseCases, templateNameViewModel);
    makeObservable(this);
  }

  @observable
  public formItem = {};

  @action
  public createDefaultMessage = (): messageInterface => ({
    type: NotificationTypesMessage.success,
    text: '',
  });

  @action
  public openCreateModal = () => {};
}
