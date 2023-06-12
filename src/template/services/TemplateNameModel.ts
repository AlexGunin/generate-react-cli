import { SyncGatewayService } from '@omnichats/core/dist/services/SyncGatewayService';
import { BaseModelWithDnd } from '@omnichats/core';

export class TemplateNameModel extends BaseModelWithDnd<any, any> {
  constructor(protected readonly syncService: SyncGatewayService) {
    super(syncService);
  }

  protected endpoint = 'templateName';
}
